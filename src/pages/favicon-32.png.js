import { iconPng } from '../lib/og.js';
export async function GET() {
  return new Response(await iconPng(32, { background: '#00000000', padding: 0.02 }), { headers: { 'Content-Type': 'image/png' } });
}
