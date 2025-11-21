"use strict";

const fs = require('fs');
const path = require('path');

function wrapMain(file) {
    const text = fs.readFileSync(file, 'utf8');
    if (/<main\b/i.test(text) || !text.includes('</header>') || !text.includes('id="Footer-section"')) {
        return false;
    }
    const headerIndex = text.indexOf('</header>') + '</header>'.length;
    const beforeMain = text.slice(0, headerIndex);
    const afterHeader = text.slice(headerIndex);
    const mainOpen = '\n    <main id="main-content" role="main">\n';

    const footerIndex = afterHeader.indexOf('<div id="Footer-section"');
    if (footerIndex === -1) return false;

    const beforeFooter = afterHeader.slice(0, footerIndex);
    const footerAndBeyond = afterHeader.slice(footerIndex);

    const updated = `${beforeMain}${mainOpen}${beforeFooter.trimStart()}\n    </main>\n${footerAndBeyond}`;
    fs.writeFileSync(file, updated);
    return true;
}

function processDir(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stats = fs.statSync(full);
        if (stats.isDirectory()) {
            processDir(full);
        } else if (full.endsWith('.html')) {
            if (wrapMain(full)) {
                console.log(`Added <main> landmark in ${path.relative(process.cwd(), full)}`);
            }
        }
    }
}

processDir(path.resolve(__dirname, '..'));

