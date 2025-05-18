export async function onRequestGet() {
  return new Response("Hello from sitemap.xml!", {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
