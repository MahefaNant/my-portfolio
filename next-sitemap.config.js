/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/404', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Gestion des langues
    const locales = ['fr', 'en'];
    const paths = [];

    if (path === '/') {
      for (const locale of locales) {
        paths.push({
          loc: `${config.siteUrl}/${locale}`,
          changefreq: locale === 'fr' ? 'weekly' : 'monthly',
          priority: 1,
          lastmod: new Date().toISOString(),
        });
      }
      paths.push({
        loc: config.siteUrl,
        changefreq: 'yearly',
        priority: 1,
        lastmod: new Date().toISOString(),
      });
      return paths;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};