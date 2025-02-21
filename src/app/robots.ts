import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://www.prometheusreg.com/sitemap.xml',
    };
  }

  // In non-production environments
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
