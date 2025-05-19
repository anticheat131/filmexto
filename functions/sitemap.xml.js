export async function onRequestGet() {
  const baseUrl = "https://fmovies4u.com";

  // 1. Static URLs
  const staticPaths = [
    "", "movie", "tv", "privacy-policy", "terms", "dmca"
  ];

  // 2. Fetch Movies & TV Shows from TMDB
  const tmdbKey = "7ac6de5ca5060c7504e05da7b218a30c";
  const maxPages = 5; // You can increase this

  const fetchMedia = async (type) => {
    const results = [];

    for (let page = 1; page <= maxPages; page++) {
      const res = await fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${tmdbKey}&page=${page}`);
      const data = await res.json();
      if (!data.results) break;

      for (const item of data.results) {
        const titleSlug = item.title || item.name;
        const year = (item.release_date || item.first_air_date || "").split("-")[0];
        const slug = `${item.id}-${titleSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-")}${year ? `-${year}` : ""}`;
        results.push(`${type}/${slug}`);
      }
    }

    return results;
  };

  const [moviePaths, tvPaths] = await Promise.all([
    fetchMedia("movie"),
    fetchMedia("tv")
  ]);

  const allUrls = [
    ...staticPaths.map(p => `${baseUrl}/${p}`),
    ...moviePaths.map(p => `${baseUrl}/${p}`),
    ...tvPaths.map(p => `${baseUrl}/${p}`)
  ];

  // 3. Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === baseUrl ? "1.0" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
