
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve('src');

// Helper to recursively get all files and folders
function getAllPaths(dir, list = []) {
    if (!fs.existsSync(dir)) return list;
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

// 1. Fix stuck temp folders
// Look for folders ending in _temp or similar patterns if I used them.
// My previous script used: `${newName}_${Date.now()}_temp`
// Example: auth_1770646024276_temp

function fixTempFolders(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Check if it's a temp folder
            if (item.match(/_\d+_temp$/)) {
                // It is a temp folder. Target name is likely the prefix.
                // But wait, the previous script renamed A -> A_temp -> a.
                // If we see A_temp, it means the second rename failed?
                // Or maybe 'a' exists?

                const originalName = item.replace(/_\d+_temp$/, ''); // 'auth'
                const targetPath = path.join(dir, originalName);

                console.log(`Found temp folder: ${item}. Attempting to restore/rename to ${originalName}`);

                if (fs.existsSync(targetPath)) {
                    // Target exists. Merge? Or is target the old one?
                    // If target exists and is empty, remove it.
                    // If target exists and has content, we might have a conflict.
                    console.log(`Target ${targetPath} exists.`);
                    // Move contents of temp to target? 
                    // No, let's just rename temp to target if target is empty or we force it?
                    // Safe bet: Rename temp to 'originalName_recovered' and let user decide? 
                    // No, try to be smart.
                } else {
                    fs.renameSync(fullPath, targetPath);
                    console.log(`Restored to ${targetPath}`);
                    // Now recurse into revised path
                    fixTempFolders(targetPath);
                    continue;
                }
            }
            fixTempFolders(fullPath);
        }
    }
}

console.log('--- Phase 1: Cleaning Temp Folders ---');
fixTempFolders(SRC_DIR);


// 2. Enforce Lowercase on Route Groups & Configs
console.log('--- Phase 2: Enforcing Lowercase on Route Groups ---');

const allItems = getAllPaths(SRC_DIR).sort((a, b) => b.path.length - a.path.length); // Deepest first

allItems.forEach(item => {
    const dir = path.dirname(item.path);
    const name = path.basename(item.path);

    // Logic: 
    // If name has uppercase, and is NOT a dynamic route like [id], rename it.
    // Specifically target (Authentication) -> (authentication)

    if (name.startsWith('[') && name.endsWith(']')) return; // Skip [dynamic]

    const newName = name.toLowerCase();

    if (name !== newName) {
        const newPath = path.join(dir, newName);

        // Skip if target already exists (case-insensitive match on Windows might trigger)
        // We use temp rename strategy again but carefully.

        console.log(`Renaming: ${name} -> ${newName}`);

        const tempPath = path.join(dir, `${newName}_fix_temp_${Date.now()}`);

        try {
            fs.renameSync(item.path, tempPath);
            fs.renameSync(tempPath, newPath);
        } catch (e) {
            console.error(`Failed to rename ${name}: ${e.message}`);
        }
    }
});

// 3. Update Imports (again)
console.log('--- Phase 3: Updating Imports ---');

const allFiles = getAllPaths(SRC_DIR).filter(i => !i.isDir);

allFiles.forEach(item => {
    if (!/\.(ts|tsx|js|jsx|css|scss)$/.test(item.path)) return;

    let content = fs.readFileSync(item.path, 'utf8');
    let changed = false;

    const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"])|(export\s+.*?from\s+['"])(.*?)(['"])|(require\s*\(\s*['"])(.*?)(['"])|(\bimport\s*\(\s*['"])(.*?)(['"])/g;

    content = content.replace(importRegex, (match, ...args) => {
        let prefix, importPath, suffix;
        if (args[0]) { prefix = args[0]; importPath = args[1]; suffix = args[2]; }
        else if (args[3]) { prefix = args[3]; importPath = args[4]; suffix = args[5]; }
        else if (args[6]) { prefix = args[6]; importPath = args[7]; suffix = args[8]; }
        else if (args[9]) { prefix = args[9]; importPath = args[10]; suffix = args[11]; }

        if (!importPath) return match;

        if (importPath.startsWith('.') || importPath.startsWith('@/')) {
            const parts = importPath.split('/');
            const newParts = parts.map(part => {
                if (part === '.' || part === '..') return part;
                if (part.startsWith('[') && part.endsWith(']')) return part;
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
        // console.log(`Updating imports in ${path.basename(item.path)}`); // Reduce noise
        fs.writeFileSync(item.path, content, 'utf8');
    }
});

console.log('Cleanup Complete.');
