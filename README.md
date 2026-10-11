# Top Creative Nails website

Static site for Top Creative Nails, 830 Mayfield Rd, Suite 500, Grand Prairie, TX 75052.

- Edit content in `data.mjs` (services, hours, reviews, FAQ, gallery).
- Run `node build.mjs` to regenerate every page, llms.txt, robots.txt and sitemap.xml into `site/`.
- Vercel builds with `node build.mjs` and serves `site/` (see vercel.json).

Launch step: set `site.domain` to the real domain and `indexable: true` in data.mjs.
