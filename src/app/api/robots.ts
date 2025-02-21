export default function handler(req: any, res: any) {
  let robotContent: string = '';
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    robotContent = `User-agent: *
      Disallow: /admin
      Sitemap: https://www.prometheusreg.com/sitemap.xml`;
  } else {
    robotContent = `User-agent: *
      Disallow: /`;
  }
  res.send(robotContent); // Send your `robots.txt content here
}
