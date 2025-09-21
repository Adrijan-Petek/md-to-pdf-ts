import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer';

async function markdownToHtml(md: string) {
  const mdIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  const body = mdIt.render(md);

  // Basic CSS for nicer PDF rendering
  const css = `
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 40px; color: #222; }
    h1,h2,h3 { color: #111; }
    pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow: auto; }
    code { background: #f6f8fa; padding: 2px 6px; border-radius: 4px; }
    img { max-width: 100%; }
  `;

  return `<!doctype html>
  <html>
  <head><meta charset="utf-8"><style>${css}</style></head>
  <body>${body}</body>
  </html>`;
}

async function convert(inputPath: string, outputPath: string) {
  if (!fs.existsSync(inputPath)) {
    throw new Error('Input file not found: ' + inputPath);
  }
  const md = fs.readFileSync(inputPath, 'utf-8');
  const html = await markdownToHtml(md);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
  await browser.close();
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node dist/convert.js <input.md> <output.pdf>');
    console.error('Or: npm run convert -- <input.md> <output.pdf> (uses ts-node)');
    process.exit(1);
  }
  const input = path.resolve(args[0]);
  const output = path.resolve(args[1]);
  try {
    await convert(input, output);
    console.log('Saved PDF to', output);
  } catch (err) {
    console.error('Error:', err);
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}
