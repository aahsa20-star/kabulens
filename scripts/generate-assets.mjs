import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// OG Image: 1200x630px, Navy background, Kabu Lens branding
async function generateOGImage() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0D2137"/>
        <stop offset="100%" style="stop-color:#1a3a5c"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#2E86C1"/>
        <stop offset="100%" style="stop-color:#5DADE2"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <!-- Grid pattern -->
    <g opacity="0.05">
      ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${height}" stroke="white" stroke-width="1"/>`).join("")}
      ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${width}" y2="${i * 60}" stroke="white" stroke-width="1"/>`).join("")}
    </g>
    <!-- Chart decoration -->
    <polyline points="100,480 200,420 300,450 400,380 500,350 600,300 700,320 800,250 900,200 1000,230 1100,180" fill="none" stroke="url(#accent)" stroke-width="3" opacity="0.3"/>
    <polyline points="100,500 200,470 300,490 400,430 500,400 600,370 700,390 800,320 900,280 1000,300 1100,250" fill="none" stroke="#10b981" stroke-width="2" opacity="0.2"/>
    <!-- Accent bar top -->
    <rect x="0" y="0" width="${width}" height="4" fill="url(#accent)"/>
    <!-- Main title -->
    <text x="600" y="240" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="white" letter-spacing="4">Kabu Lens</text>
    <!-- Japanese subtitle -->
    <text x="600" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#5DADE2" letter-spacing="8">株 レ ン ズ</text>
    <!-- Divider -->
    <rect x="480" y="340" width="240" height="2" fill="#2E86C1" rx="1"/>
    <!-- Tagline -->
    <text x="600" y="390" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#94a3b8" letter-spacing="2">日本株 × マクロ 投資家向け金融メディア</text>
    <!-- Bottom bar -->
    <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#accent)"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(publicDir, "og-image.png"));
  console.log("✓ og-image.png generated (1200x630)");
}

// Favicon: Navy background with "K" letter
async function generateFavicon() {
  const sizes = [
    { size: 32, name: "favicon-32x32.png" },
    { size: 16, name: "favicon-16x16.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 192, name: "android-chrome-192x192.png" },
    { size: 512, name: "android-chrome-512x512.png" },
  ];

  for (const { size, name } of sizes) {
    const fontSize = Math.round(size * 0.55);
    const yPos = Math.round(size * 0.65);
    const cornerRadius = Math.round(size * 0.15);

    const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="#0D2137"/>
      <text x="${size / 2}" y="${yPos}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#2E86C1">K</text>
    </svg>`;

    await sharp(Buffer.from(svg)).png().toFile(join(publicDir, name));
    console.log(`✓ ${name} generated (${size}x${size})`);
  }

  // Generate ICO from 32x32
  // For favicon.ico, just copy the 32x32 PNG (browsers accept PNG favicons)
  const png32 = await sharp(join(publicDir, "favicon-32x32.png")).toBuffer();
  writeFileSync(join(publicDir, "favicon.ico"), png32);
  console.log("✓ favicon.ico generated");
}

async function main() {
  await generateOGImage();
  await generateFavicon();
  console.log("\nAll assets generated successfully!");
}

main().catch(console.error);
