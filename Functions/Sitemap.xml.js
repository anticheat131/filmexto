export async function onRequestGet(context) {
  const domain = 'https://fmovies4u.com';
  const urls = [];

  for (let i = 0; i < 1000; i++) {
    urls.push(`${domain}/movie/${100000 + i}`);
    urls.push(`${domain}/tv/${200000 + i}`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
