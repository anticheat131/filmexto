import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://fmovies4u.com';

const generateSitemap = () => {
  const urls: string[] = [];

  for (let i = 0; i < 1000; i++) {
    urls.push(`${DOMAIN}/movie/${100000 + i}`);
    urls.push(`${DOMAIN}/tv/${200000 + i}`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(filePath, xml, 'utf8');
  console.log('✅ Sitemap generated at public/sitemap.xml');
};

generateSitemap();
