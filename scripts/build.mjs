import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'lightningcss';
import esbuild from 'esbuild';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist', 'assets');
mkdirSync(distDir, { recursive: true });

const cssSources = [
    'static/css/bootstrap.min_3df5a96666177c2dd0d71b69e3d8ae30.css',
    'static/css/style_v1_213b414c0822bacacd0e7f5ab75ee25c.css',
    'static/css/main_573bbf5fd84932071f049c4177f12166.css',
    'static/css/header_nav_9092549643bdb9b4a690f1551f74eefc.css',
    'static/css/banner_3f76bac52dbebc63d4192006005d0b85.css',
    'static/css/chart_rating_1b21ab7ca6d8a3afe536c1c68fa38221.css',
    'static/css/sidebar_102a869f3a1475574f0fabbfadde0cd4.css',
    'static/css/footer_9836129436180a0696decdea89b942a7.css',
    'static/css/sticky_cta_dec559ebc40ce7ef9c2981efbd152e01.css',
    'static/css/offer_chart_dce3e5e8659b41822fdab4563f2679c2.css',
    'static/css/logooffer_stacked_2af2cd811bcf80ba21ae7d84e947dab4.css',
    'static/css/carousel_a27ddc4b65579161e2eaa8d0600579f7.css',
    'static/css/chart_reviews_ff8f667ffd0032c31c13dee98b1346d5.css',
    'static/css/custom-header.css',
    'css/custom-overrides.css'
].map((file) => resolve(root, file));

const combinedCss = cssSources
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n');

const cssResult = transform({
    filename: 'site.css',
    code: Buffer.from(combinedCss),
    minify: true,
    sourceMap: false
});

writeFileSync(resolve(distDir, 'site.min.css'), cssResult.code);

await esbuild.build({
    entryPoints: [resolve(root, 'js', 'site.js')],
    bundle: true,
    minify: true,
    outfile: resolve(distDir, 'site.min.js'),
    target: ['es2018'],
    format: 'iife',
    legalComments: 'none'
});

console.log('Build complete: dist/assets/site.min.{css,js}');

