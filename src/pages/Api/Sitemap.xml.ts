import { NextApiRequest, NextApiResponse } from 'next';

const DOMAIN = 'https://fmovies4u.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy example — replace with your real IDs or TMDB fetch
  const movieUrls = Array.from({ length: 100 }, (_, i) => `${DOMAIN}/movie/${100000 + i}`);
  const tvUrls = Array.from({ length: 100 }, (_, i) => `${DOMAIN}/tv/${200000 + i}`);

  const urls = [...movieUrls, ...tvUrls];

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

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}
