
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve('src');

// Helper to recursively get all files and folders
function getAllPaths(dir, list = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.startsWith('.') || file === 'node_modules') continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        list.push({ path: fullPath, isDir: stat.isDirectory() });

        if (stat.isDirectory()) {
            getAllPaths(fullPath, list);
        }
    }
    return list;
}

// 1. Collect all paths
console.log('Scanning files...');
const allItems = getAllPaths(SRC_DIR);

// 2. Sort by depth (deepest first) to avoid renaming parent before child
allItems.sort((a, b) => b.path.length - a.path.length);

// 3. Rename loop
// Track renames to avoid confusion? No, just Rename on disk.
allItems.forEach(item => {
    const dir = path.dirname(item.path);
    const oldName = path.basename(item.path);

    // Skip if already lowercase (and not a special case like Page.tsx -> page.tsx which is strictly lowercase)
    // Actually, we want EVERYTHING lowercase except [dynamic] and preservation of known Next.js files (which are usually lowercase anyway, except Page->page).
    // Wait, 'Page.tsx' -> 'page.tsx'. 'page.tsx' -> 'page.tsx'.
    // 'Layout.tsx' -> 'layout.tsx'.

    let newName = oldName.toLowerCase();

    // Preservation rules:
    // [dynamic] -> keep as is (Plan said preserve as-is)
    // (group) -> plan said lowercase it: (Authentication) -> (authentication)

    if (oldName.startsWith('[') && oldName.endsWith(']')) {
        // Keep original case for dynamic routes
        newName = oldName;
    }

    if (oldName === newName) return;

    const newPath = path.join(dir, newName);

    // Rename with temp step for Windows case-insensitivity
    const tempPath = path.join(dir, `${newName}_${Date.now()}_temp`);

    try {
        if (fs.existsSync(newPath) && newName !== oldName.toLowerCase()) {
            // Target exists and is different file? standard fs.rename might overwrite.
            // But here we generally expect target to NOT exist unless collision.
            // In Windows 'A' and 'a' collide.
            // So checking existsSync might return true for 'a' if 'A' exists.
            // We trust the temp rename strategy.
        }

        console.log(`Renaming: ${oldName} -> ${newName}`);
        fs.renameSync(item.path, tempPath);
        fs.renameSync(tempPath, newPath);
    } catch (e) {
        console.error(`Error renaming ${item.path}:`, e.message);
    }
});


// 4. Update Imports
// Now re-scan all files to find code files
const newItems = getAllPaths(SRC_DIR).filter(i => !i.isDir);

newItems.forEach(item => {
    if (!/\.(ts|tsx|js|jsx|css|scss|mjs)$/.test(item.path)) return;

    let content = fs.readFileSync(item.path, 'utf8');
    let changed = false;

    const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"])|(export\s+.*?from\s+['"])(.*?)(['"])|(require\s*\(\s*['"])(.*?)(['"])|(\bimport\s*\(\s*['"])(.*?)(['"])/g;

    content = content.replace(importRegex, (match, ...args) => {
        // Extract the path part
        // args indices shift depending on groups
        // p1-p3 (import), p4-p6 (export), p7-p9 (require), p10-p12 (dynamic import)

        let prefix, importPath, suffix;
        if (args[0]) { prefix = args[0]; importPath = args[1]; suffix = args[2]; }
        else if (args[3]) { prefix = args[3]; importPath = args[4]; suffix = args[5]; }
        else if (args[6]) { prefix = args[6]; importPath = args[7]; suffix = args[8]; }
        else if (args[9]) { prefix = args[9]; importPath = args[10]; suffix = args[11]; }

        if (!importPath) return match;

        // Filter local paths
        if (importPath.startsWith('.') || importPath.startsWith('@/')) {
            const parts = importPath.split('/');
            const newParts = parts.map(part => {
                // Keep . and ..
                if (part === '.' || part === '..') return part;
                // Keep [dynamic]
                if (part.startsWith('[') && part.endsWith(']')) return part;
                // Lowercase others
                return part.toLowerCase();
            });
            const newImportPath = newParts.join('/');

            if (newImportPath !== importPath) {
                changed = true;
                return `${prefix}${newImportPath}${suffix}`;
            }
        }
        return match;
    });

    if (changed) {
        console.log(`Updating imports: ${path.basename(item.path)}`);
        fs.writeFileSync(item.path, content, 'utf8');
    }
});

console.log('Core Refactor Complete.');
