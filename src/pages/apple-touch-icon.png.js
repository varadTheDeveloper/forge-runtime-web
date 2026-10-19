import { iconPng } from '../lib/og.js';
export async function GET() {
  return new Response(await iconPng(180), { headers: { 'Content-Type': 'image/png' } });
}
