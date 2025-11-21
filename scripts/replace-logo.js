const fs = require('fs');
const path = require('path');

function collectHtmlFiles(dir, acc = []) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stats = fs.statSync(full);
        if (stats.isDirectory()) {
            collectHtmlFiles(full, acc);
        } else if (full.endsWith('.html')) {
            acc.push(full);
        }
    }
    return acc;
}

const files = collectHtmlFiles(path.resolve(__dirname, '..'));
const pattern = /src="data:image\/png;base64,[^"]+"/g;

files.forEach((file) => {
    const original = fs.readFileSync(file, 'utf8');
    if (!pattern.test(original)) return;
    const updated = original.replace(pattern, 'src="/assets/logo.svg"');
    fs.writeFileSync(file, updated);
    console.log(`Updated logo in ${path.relative(process.cwd(), file)}`);
});

