
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SEARCH_DIR = 'src';
const DRY_RUN = false; // Set to false to actually execute

// Helper to check if a path exists (case insensitive check on Windows if needed, but we rely on fs.existsSync)
function exists(p) {
    return fs.existsSync(p);
}

// Helper to run git commands
function runGitCmd(cmd) {
    try {
        console.log(`EXEC: ${cmd}`);
        if (!DRY_RUN) execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`FAILED: ${cmd}`);
        console.error(e.message);
        // Continue globally but log error
    }
}

// 1. Rename Files and Folders Depth-First (so we rename children before parents? No, parents before children so paths remain valid? 
// No, if we rename parent 'A' to 'a', then child 'A/B' becomes 'a/B'. We must find deep files first?
// Actually, 'git mv' handles path updates locally strictly, but for recursive traversal we should rely on current file structure.
// Best approach: 
// 1. Rename files in a directory. 
// 2. Rename the directory itself.
// 3. Repeat. 
// Actually, standard modification of FS structure while traversing is tricky.
// Better: Collect all rename operations, then execute them. 
// We should rename deepest paths first? 
// If we rename 'Components/Shared/Navbar.tsx' to 'components/shared/navbar.tsx':
// We can rename 'Components/Shared/Navbar.tsx' -> 'Components/Shared/navbar.tsx'
// then 'Components/Shared' -> 'Components/shared'
// then 'Components' -> 'components'.
// Yes, Bottom-up traversal is safer for renaming directories so we don't lose track of children.

function getAllPaths(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    fileList.push({ path: dir, isDir: true });
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getAllPaths(filePath, fileList);
        } else {
            fileList.push({ path: filePath, isDir: false });
        }
    }
    return fileList;
}

// We need to process deepest directories first to avoid 'path not found' when parent is renamed.
// Sort by path length descending.
const allItems = getAllPaths(SEARCH_DIR).sort((a, b) => b.path.length - a.path.length);

// Map to track oldPath -> newPath for import updates
const renameMap = new Map();

for (const item of allItems) {
    if (item.path === SEARCH_DIR) continue; // Don't rename 'src'

    const dirVal = path.dirname(item.path);
    const baseVal = path.basename(item.path);

    // Determine new name
    let newBase = baseVal;

    // Rule: Next.js Dynamic Routes [id], [slug] -> Keep case? 
    // Plan said: "Dynamic Routes: Folders like [id] or [slug] will be preserved as-is".
    // "Route Groups: Folders like (Authentication) will be renamed to (authentication)".

    if (baseVal.startsWith('[') && baseVal.endsWith(']')) {
        // Keep as is, unless user meant lowercase keys? Usually [Id] is bad practice, [id] is standard.
        // Let's assume user wants strictly lowercase unless it breaks something. 
        // But Plan said "preserved as-is". So we stick to that.
        // Wait, if content inside defines parameters, usually casing matches.
        // I will adhere strictly: "Dynamic Routes ... unchanged".
        continue;
    } else {
        newBase = baseVal.toLowerCase();
    }

    if (baseVal !== newBase) {
        const oldPath = item.path;
        // The parent directory MIGHT have been renamed already in previous iterations?
        // Wait, we generate the list UP FRONT. `item.path` contains original parents.
        // But we are processing Bottom-Up.
        // So when we process 'src/Components/Shared/Navbar.tsx', 'src/Components/Shared' hasn't been renamed yet.
        // Perfect.

        const newPath = path.join(dirVal, newBase);

        // Check if we already have a rename scheduled for this path (unlikely with unique list)

        renameMap.set(oldPath, newPath); // Store for import updates later (Wait, imports use relative paths...)

        console.log(`Renaming: ${oldPath} -> ${newPath}`);

        // Git move with temp file to handle case sensitivity on Windows
        // git mv file FILE -> failure or no-op usually.
        // Safe way: git mv file file_TEMP; git mv file_TEMP FILE

        const tempPath = path.join(dirVal, `${newBase}_temp_${Date.now()}`);
        runGitCmd(`git mv "${oldPath}" "${tempPath}"`);
        runGitCmd(`git mv "${tempPath}" "${newPath}"`);
    }
}


// 2. Update Imports
// We need to re-scan files because the paths have changed on disk!
// OR we can rely on our knowledge of what changed. 
// Easier: Re-scan 'src' for all code files.

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

// Wait, we just renamed everything. We need the NEW paths.
const newFiles = getAllFiles(SEARCH_DIR);

newFiles.forEach(subPath => {
    if (!/\.(ts|tsx|js|jsx|css|scss)$/.test(subPath)) return;

    let content = fs.readFileSync(subPath, 'utf8');
    let changed = false;

    // Regex for imports
    // import ... from '...'
    // export ... from '...'
    // require('...')
    // import('...')

    // We match standard static imports/exports
    const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"])|(export\s+.*?from\s+['"])(.*?)(['"])|(require\s*\(\s*['"])(.*?)(['"])|(\bimport\s*\(\s*['"])(.*?)(['"])/g;

    content = content.replace(importRegex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => {
        // Identify the path part
        let prefix, importPath, suffix;
        if (p1) { prefix = p1; importPath = p2; suffix = p3; }
        else if (p4) { prefix = p4; importPath = p5; suffix = p6; }
        else if (p7) { prefix = p7; importPath = p8; suffix = p9; }
        else if (p10) { prefix = p10; importPath = p11; suffix = p12; }

        if (!importPath) return match;

        // Only touch relative paths or aliases
        if (importPath.startsWith('.') || importPath.startsWith('@/')) {
            // Logic to adhere to:
            // 1. Lowercase paths matching the file modifications.
            // 2. Preserve dynamic route segments [id].

            const parts = importPath.split('/');
            const newParts = parts.map(part => {
                if (part.startsWith('[') && part.endsWith(']')) return part;
                if (part === '.' || part === '..') return part;
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
        console.log(`Updating imports in: ${subPath}`);
        if (!DRY_RUN) fs.writeFileSync(subPath, content, 'utf8');
    }
});

console.log('Done!');
