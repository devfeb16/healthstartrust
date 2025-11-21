"use strict";

const fs = require('fs');
const path = require('path');

const patterns = [
    /[ \t]*<script[^>]+static\/scripts\/[^<]+<\/script>\s*/g,
    /[ \t]*<script[^>]+js\/inline_scripts\.js[^<]+<\/script>\s*/g,
    /[ \t]*<script[^>]+js\/header\.js[^<]+<\/script>\s*/g
];

function processFile(file) {
    let text = fs.readFileSync(file, 'utf8');
    let updated = text;
    patterns.forEach((regex) => {
        updated = updated.replace(regex, '');
    });
    if (updated !== text) {
        fs.writeFileSync(file, updated);
        console.log(`Cleaned legacy scripts in ${path.relative(process.cwd(), file)}`);
    }
}

function collect(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stats = fs.statSync(full);
        if (stats.isDirectory()) {
            collect(full);
        } else if (full.endsWith('.html')) {
            processFile(full);
        }
    }
}

collect(path.resolve(__dirname, '..'));

