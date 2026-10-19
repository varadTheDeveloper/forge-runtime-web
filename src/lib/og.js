// Builds 1200x630 social-preview (Open Graph) images at build time with sharp.
// No browser, no extra packages: an SVG template rendered to PNG.
import sharp from 'sharp';
import logoSvg from '../../public/logo.svg?raw';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inner markup of the logo, so it can be nested inside the card.
const logoInner = logoSvg
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<title>[\s\S]*?<\/title>/, '');

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function ogImage({ title, subtitle = '', footer = 'The Forge Project' }) {
  // Styled like a 1991 web page: white background, black serif text, blue underlined link.
  const serif = "'Times New Roman', 'Liberation Serif', 'FreeSerif', 'DejaVu Serif', serif";
  let size = 80;
  let lines = wrap(title, 24);
  if (lines.length > 3) { size = 62; lines = wrap(title, 32); }
  if (lines.length > 4) lines = [...lines.slice(0, 3), lines.slice(3).join(' ').slice(0, 28) + '…'];
  const lineH = Math.round(size * 1.1);
  const titleTop = 250;
  let subLines = subtitle ? wrap(subtitle, 62) : [];
  const maxSub = lines.length >= 3 ? 2 : 3;
  if (subLines.length > maxSub) {
    subLines = subLines.slice(0, maxSub);
    subLines[maxSub - 1] = subLines[maxSub - 1].replace(/[\\s,.;:]*$/, '') + '…';
  }
  const subTop = titleTop + lines.length * lineH + 22;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <svg x="80" y="64" width="112" height="112" viewBox="0 0 512 512">${logoInner}</svg>
  <text x="212" y="148" font-family="${serif}" font-weight="700" font-size="64" fill="#000000">Forge</text>
  <line x1="80" y1="196" x2="1120" y2="196" stroke="#808080" stroke-width="2"/>
  ${lines
    .map((l, i) => `<text x="80" y="${titleTop + 40 + i * lineH}" font-family="${serif}" font-weight="700" font-size="${size}" fill="#000000">${esc(l)}</text>`)
    .join('\n  ')}
  ${subLines
    .map((l, i) => `<text x="80" y="${subTop + 40 + i * 42}" font-family="${serif}" font-size="34" fill="#000000">${esc(l)}</text>`)
    .join('\n  ')}
  <line x1="80" y1="540" x2="1120" y2="540" stroke="#808080" stroke-width="2"/>
  <text x="80" y="588" font-family="${serif}" font-size="30" fill="#0000EE" text-decoration="underline">${esc(footer)}</text>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function iconPng(size, { background = '#120d0b', padding = 0.14 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const icon = await sharp(Buffer.from(logoSvg.replace(/stroke-width="50"/, 'stroke-width="64"')))
    .resize(inner, inner)
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toBuffer();
}
