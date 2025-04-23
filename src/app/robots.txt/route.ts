export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahefa.vercel.app/";
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml?refresh=1`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}