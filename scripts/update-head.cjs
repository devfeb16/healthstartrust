"use strict";

const fs = require('fs');
const path = require('path');

const cssJsBlock = [
    '    <!-- Performance-optimized assets -->',
    '    <link rel="icon" type="image/svg+xml" href="/assets/logo.svg">',
    '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>',
    '    <link rel="preload" href="/fonts.googleapis.com/css2" as="style">',
    '    <link rel="stylesheet" href="/fonts.googleapis.com/css2">',
    '    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" as="style">',
    '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" media="print" onload="this.media=\'all\'">',
    '    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"></noscript>',
    '    <link rel="preload" href="/dist/assets/site.min.css" as="style">',
    '    <link rel="stylesheet" href="/dist/assets/site.min.css" fetchpriority="high">',
    '    <script src="/dist/assets/site.min.js" defer></script>'
].join('\n') + '\n';

function updateFile(file) {
    const text = fs.readFileSync(file, 'utf8');
    const patternVariants = [
        /<!-- CSS Stylesheets -->[\s\S]*?<!-- JavaScript Libraries -->[\s\S]*?(?=<\/head>)/,
        /<!-- CSS -->[\s\S]*?<!-- JS -->[\s\S]*?(?=<\/head>)/
    ];
    let updated = text;
    let replaced = false;
    for (const pattern of patternVariants) {
        if (pattern.test(updated)) {
            updated = updated.replace(pattern, cssJsBlock);
            replaced = true;
            break;
        }
    }
    if (!replaced) return false;
    fs.writeFileSync(file, updated);
    return true;
}

function collect(dir, acc = []) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stats = fs.statSync(full);
        if (stats.isDirectory()) {
            collect(full, acc);
        } else if (full.endsWith('.html')) {
            acc.push(full);
        }
    }
    return acc;
}

const root = path.resolve(__dirname, '..');
const files = collect(root);
files.forEach((file) => {
    if (updateFile(file)) {
        console.log(`Updated head assets in ${path.relative(root, file)}`);
    }
});

