// Static site generator for Top Creative Nails.
// Usage: node build.mjs   → writes every page + llms.txt / robots.txt / sitemap.xml into ./site
import fs from "node:fs";
import path from "node:path";
import { site, hours, gallery, extraImages, serviceCategories, services, reviews, faqs, nav, navMore } from "./data.mjs";

const OUT = path.resolve("site");
const D = site.domain;
const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
const warnings = [];

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (html) => html.replace(/<[^>]+>/g, "");
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const fmt = (t) => {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")} ${ap}` : `${hh} ${ap}`;
};
const hoursRows = () =>
  hours.map((h) => `<tr><th scope="row">${h.day}</th><td>${h.opens ? `${fmt(h.opens)} – ${fmt(h.closes)}` : "Closed"}</td></tr>`).join("");
const hoursLine = "Mon–Thu 10 AM–7 PM · Fri–Sat 9 AM–7 PM · Sun closed";
const fullAddress = `${site.street}, ${site.city}, ${site.region} ${site.zip}`;

const img = (key, alt, { w = 1080, h = 1350, sizes = "(max-width: 700px) 50vw, 33vw", cls = "", eager = false } = {}) =>
  `<img src="/assets/img/${key}-1080.webp" srcset="/assets/img/${key}-540.webp 540w, /assets/img/${key}-1080.webp 1080w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const altFor = (key) => gallery.find((g) => g.key === key)?.alt || extraImages[key] || "Nails by Top Creative Nails";

const bookBtn = (label = "Book now", extra = "") =>
  `<a class="btn btn--primary js-book-cta ${extra}" href="tel:${site.tel}">${esc(label)}</a>`;

// ---------- schema ----------
const businessId = `${D}/#nailsalon`;
function salonSchema() {
  const s = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "@id": businessId,
    name: site.name,
    alternateName: site.altName,
    description: "Nail salon in Grand Prairie, TX offering acrylic nails, dip powder, gel and classic manicures, pedicures, French tips, custom nail art, nail repair and eyebrow waxing. Walk-ins welcome.",
    url: `${D}/`,
    telephone: site.tel,
    image: [`${D}/assets/img/og-image.jpg`, `${D}/assets/img/nails-07-1080.webp`, `${D}/assets/img/nails-12-1080.webp`],
    logo: `${D}/assets/img/logo-512.png`,
    address: { "@type": "PostalAddress", streetAddress: site.street, addressLocality: site.city, addressRegion: site.region, postalCode: site.zip, addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
    hasMap: site.maps,
    openingHoursSpecification: hours.filter((h) => h.opens).map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.day, opens: h.opens, closes: h.closes })),
    areaServed: site.areaServed.map((c) => ({ "@type": "City", name: c, containedInPlace: { "@type": "State", name: site.regionName } })),
    currenciesAccepted: "USD",
    publicAccess: true,
    sameAs: [site.facebook, site.instagram].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nail services",
      itemListElement: serviceCategories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: services.filter((s) => s.cat === c.id).map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.short, url: `${D}/services/${s.slug}/` },
        })),
      })),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      publisher: { "@type": "Organization", name: r.source },
    })),
    potentialAction: { "@type": "ReserveAction", name: "Book an appointment", target: { "@type": "EntryPoint", urlTemplate: `${D}/book/` } },
  };
  // Standing rule: only publish the star rating when the real Google average is 4.6 or higher.
  if (site.googleRating >= 4.6) {
    s.aggregateRating = { "@type": "AggregateRating", ratingValue: String(site.googleRating), reviewCount: String(site.googleReviewCount), bestRating: "5" };
  }
  return s;
}
const breadcrumb = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: `${D}${t.href}` })),
});
const faqSchema = (list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: strip(f.a) } })),
});

// ---------- layout ----------
function head({ title, description, pathName, ogImage = "/assets/img/og-image.jpg", schema = [] }) {
  if (title.length > 60) warnings.push(`title > 60 (${title.length}): ${pathName}`);
  if (description.length > 160 || description.length < 110) warnings.push(`description ${description.length} chars: ${pathName}`);
  const url = `${D}${pathName}`;
  const robots = site.indexable ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${robots}">
<meta name="author" content="${site.name}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#241b2b">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="US-${site.region}">
<meta name="geo.placename" content="${site.city}, ${site.regionName}">
<meta name="geo.position" content="${site.lat};${site.lng}">
<meta name="ICBM" content="${site.lat}, ${site.lng}">
<meta property="og:type" content="business.business">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="${D}${ogImage}">
<meta property="og:image:alt" content="Inside Top Creative Nails in Grand Prairie, TX">
<meta property="business:contact_data:street_address" content="${site.street}">
<meta property="business:contact_data:locality" content="${site.city}">
<meta property="business:contact_data:region" content="${site.region}">
<meta property="business:contact_data:postal_code" content="${site.zip}">
<meta property="business:contact_data:country_name" content="United States">
<meta property="place:location:latitude" content="${site.lat}">
<meta property="place:location:longitude" content="${site.lng}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${D}${ogImage}">
<meta name="apple-mobile-web-app-title" content="Top Creative">
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="${site.name}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" href="/assets/img/favicon-256.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
${schema.map(ld).join("\n")}
</head>`;
}

function header(current) {
  const link = (n) => `<li><a href="${n.href}"${current === n.href ? ' aria-current="page"' : ""}>${n.label}</a></li>`;
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="/" aria-label="${site.name} home">
      <img src="/assets/img/logo-192.png" width="192" height="192" alt="${site.name} logo">
      <span class="brand__name">Top Creative <em>Nails</em></span>
    </a>
    <nav class="nav" aria-label="Main">
      <button class="nav__toggle" aria-expanded="false" aria-controls="nav-list"><span class="sr-only">Menu</span><span class="bars" aria-hidden="true"></span></button>
      <ul id="nav-list" class="nav__list">
        ${nav.map(link).join("")}
        <li class="nav__more">
          <button class="nav__more-btn" aria-expanded="false">More <span aria-hidden="true">▾</span></button>
          <ul class="nav__sub">${navMore.map(link).join("")}</ul>
        </li>
      </ul>
    </nav>
    <a class="btn btn--primary btn--sm header-book" href="tel:${site.tel}">Book now</a>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap footer-cta">
    <div>
      <p class="eyebrow eyebrow--light">Ready for new nails?</p>
      <p class="footer-cta__title">Walk in, or call ahead for a set time.</p>
    </div>
    <div class="cta-row">${bookBtn("Call (972) 264-2744")}</div>
  </div>
  <div class="wrap footer-grid">
    <div>
      <img class="footer-logo" src="/assets/img/logo-light-256.png" width="256" height="256" alt="${site.name} logo" loading="lazy">
      <p>Nail salon in Grand Prairie, Texas. Acrylic, dip, gel, pedicures and custom nail art.</p>
    </div>
    <div>
      <h2 class="footer-h">Visit</h2>
      <p><a href="${site.directions}" target="_blank" rel="noopener">${site.street}<br>${site.city}, ${site.region} ${site.zip}</a></p>
      <p><a href="tel:${site.tel}">${site.phone}</a></p>
    </div>
    <div>
      <h2 class="footer-h">Hours</h2>
      <p>Mon – Thu: 10 AM – 7 PM<br>Fri – Sat: 9 AM – 7 PM<br>Sun: Closed</p>
    </div>
    <div>
      <h2 class="footer-h">Explore</h2>
      <ul class="footer-links">
        ${[...nav, ...navMore].map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
      </ul>
      <p class="socials"><a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a></p>
    </div>
  </div>
  <div class="wrap footer-base">
    <p>© ${new Date().getFullYear()} ${site.name}. All rights reserved.</p>
    <a class="powered" href="https://eatfuti.ai/" target="_blank" rel="noopener">
      <span>Powered by</span>
      <img src="/assets/img/eatfuti-logo-light.png" width="1201" height="701" alt="EatFuti" loading="lazy">
    </a>
  </div>
</footer>`;
}

function promo() {
  if (!site.promo.enabled) return "";
  const p = site.promo;
  return `<div class="promo" id="promo" role="dialog" aria-modal="true" aria-labelledby="promo-title" hidden>
  <div class="promo__card">
    <button class="promo__close" aria-label="Close">×</button>
    <img src="/assets/img/nails-01-540.webp" width="540" height="675" alt="${esc(altFor("nails-01"))}">
    <div class="promo__body">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <p class="promo__title" id="promo-title">${esc(p.title)}</p>
      <p>${esc(p.text)}</p>
      <a class="btn btn--primary js-book-cta" href="tel:${site.tel}">${esc(p.cta)}</a>
    </div>
  </div>
</div>`;
}

function page({ pathName, title, description, schema, body, current, ogImage }) {
  const html = `${head({ title, description, pathName, schema, ogImage })}
<body>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${promo()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
  const file = path.join(OUT, pathName, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  const h1s = (body.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) warnings.push(`${h1s} H1s on ${pathName}`);
  pages.push(pathName);
}
const pages = [];

const crumbs = (trail) =>
  `<ol class="crumbs">${trail.map((t, i) => (i < trail.length - 1 ? `<li><a href="${t.href}">${t.name}</a></li>` : `<li aria-current="page">${t.name}</li>`)).join("")}</ol>`;

const reviewCard = (r) => `<figure class="review" data-key="${esc(`${r.source}|${r.when}|${r.author}`)}">
  <p class="review__stars" aria-label="5 out of 5 stars">★★★★★</p>
  <blockquote><p>${esc(r.text)}</p></blockquote>
  <figcaption><strong>${esc(r.author)}</strong><span>${r.source} review</span></figcaption>
</figure>`;
const reviewsCarousel = (list) => `<div class="carousel" data-per="3">
  <div class="carousel__track">${list.map(reviewCard).join("")}</div>
  <div class="carousel__controls">
    <button class="carousel__btn" data-dir="-1" aria-label="Previous reviews">←</button>
    <span class="carousel__count" aria-live="polite"></span>
    <button class="carousel__btn" data-dir="1" aria-label="Next reviews">→</button>
  </div>
</div>`;

const faqList = (list) => `<div class="faq">${list.map((f) => `<details class="faq__item"><summary>${esc(f.q)}</summary><div class="faq__a"><p>${f.a}</p></div></details>`).join("")}</div>`;

const serviceLink = (slug) => `<a href="/services/${slug}/">${bySlug[slug].name}</a>`;

// ---------- pages ----------
function home() {
  const fav = ["acrylic-nails", "pedicure", "dip-powder-nails", "french-tip-nails", "nail-art", "gel-manicure", "nail-repair", "eyebrow-waxing"];
  const grid = ["nails-01", "nails-07", "nails-12", "nails-15", "nails-24", "nails-28", "nails-30", "nails-35"];
  const navList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Main navigation",
    itemListElement: [...nav, { label: "FAQ", href: "/faq/" }, { label: "How to book", href: "/book/" }].map((n, i) => ({
      "@type": "SiteNavigationElement", position: i + 1, name: n.label, url: `${D}${n.href}`,
    })),
  };
  const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${D}/#website`, name: site.name, url: `${D}/`, publisher: { "@id": businessId } };
  page({
    pathName: "/",
    current: "/",
    title: "Top Creative Nails | Nail Salon in Grand Prairie, TX",
    description: "Nail salon on Mayfield Rd in Grand Prairie, TX. Acrylic full sets and fills, dip powder, gel, pedicures, French tips and custom nail art. Walk-ins welcome.",
    schema: [salonSchema(), website, navList],
    body: `
<section class="hero">
  <div class="hero__media">
    <img src="/assets/img/salon-interior-2000.webp" srcset="/assets/img/salon-interior-1200.webp 1200w, /assets/img/salon-interior-2000.webp 2000w" sizes="100vw" width="2000" height="1130" alt="Inside Top Creative Nails: white pedicure spa chairs, manicure stations and a wall of polish" fetchpriority="high">
    <div class="hero__scrim" aria-hidden="true"></div>
  </div>
  <div class="hero__inner">
    <div class="wrap hero__layout">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--light">830 Mayfield Rd · Grand Prairie, TX</p>
        <h1 class="hero__title">Top Creative Nails <span>Nail salon in Grand Prairie, TX</span></h1>
        <p class="hero__lede">Acrylic, dip and gel sets, relaxing pedicures and nail art built from your photo. Walk-ins welcome six days a week.</p>
        <div class="cta-row">${bookBtn("Call to book")}<a class="btn btn--ghost-light" href="/services/">See services</a></div>
        <p class="hero__hours">${hoursLine}</p>
      </div>
    </div>
  </div>
</section>

<section class="band band--tight">
  <ul class="wrap values">
    <li><strong>Walk-ins welcome</strong><span>Mon – Sat</span></li>
    <li><strong>Acrylic, dip &amp; gel</strong><span>Full sets and fills</span></li>
    <li><strong>Spa pedicure chairs</strong><span>Soak, scrub, massage</span></li>
    <li><strong>Custom nail art</strong><span>Bring a photo</span></li>
  </ul>
</section>

<section class="band">
  <div class="wrap split">
    <figure class="split__media">${img("nails-11", altFor("nails-11"), { sizes: "(max-width: 900px) 100vw, 45vw" })}</figure>
    <div class="prose">
      <p class="eyebrow">Most booked</p>
      <h2>What Grand Prairie comes in for</h2>
      <p>Long acrylic sets and spa pedicures top the list, with French tips and custom art close behind.</p>
      <ul class="fav-list">${fav.map((s) => `<li><a href="/services/${s}/">${bySlug[s].name} <span aria-hidden="true">→</span></a></li>`).join("")}</ul>
      <a class="btn btn--outline" href="/services/">See all services →</a>
    </div>
  </div>
</section>

<section class="band band--soft">
  <div class="wrap split split--reverse">
    <figure class="split__media">${img("nails-09", altFor("nails-09"), { sizes: "(max-width: 900px) 100vw, 45vw" })}</figure>
    <div class="prose">
      <p class="eyebrow">The nail rescue</p>
      <h2>Set gone wrong somewhere else? Bring it here.</h2>
      <p>Lumpy dip, lifting acrylic, art that is not what you asked for. Our techs rebuild it the way you wanted, often in the same visit.</p>
      <blockquote class="pull">"I came in here after a botched dip job at another salon and THEY SAVED ME!"<cite>Paulette O., Google review</cite></blockquote>
      <blockquote class="pull">"He salvaged a botched nail art I got at another place and I'm so thrilled."<cite>Google review</cite></blockquote>
      <div class="cta-row">${bookBtn("Call (972) 264-2744")}<a class="btn btn--outline" href="/services/nail-repair/">Nail repair and redo →</a></div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Recent sets</p>
      <h2>Fresh from the salon</h2>
      <p>Every set below was done at Top Creative Nails. Tap one to read about the service.</p>
    </div>
    <ul class="grid grid--4">
      ${grid.map((k) => { const g = gallery.find((x) => x.key === k); return `<li><a class="tile" href="/services/${g.tag}/">${img(k, g.alt, { sizes: "(max-width: 700px) 50vw, 25vw" })}<span>${bySlug[g.tag].name}</span></a></li>`; }).join("")}
    </ul>
    <p class="center"><a class="btn btn--outline" href="/gallery/">See the full gallery →</a></p>
  </div>
</section>

<section class="band band--soft">
  <div class="wrap split">
    <figure class="split__media split__media--wide"><img src="/assets/img/salon-interior-1200.webp" width="1200" height="678" loading="lazy" decoding="async" alt="The pedicure spa chairs and manicure stations at Top Creative Nails"></figure>
    <div class="prose">
      <p class="eyebrow">The salon</p>
      <h2>Bright, spacious and very clean</h2>
      <p>A long row of white massage spa chairs for pedicures, manicure stations along the wall and a full wall of polish to choose from. Clients mention the clean salon more than anything else.</p>
      <blockquote class="pull">"I was a walk in and when I tell you that It was a beautiful and very clean establishment."<cite>Deshondra S., Google review</cite></blockquote>
      <a class="btn btn--outline" href="/about/">About the salon →</a>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Reviews</p>
      <h2>What clients say</h2>
    </div>
    ${reviewsCarousel(reviews)}
    <p class="center"><a href="${site.maps}" target="_blank" rel="noopener">Read all reviews on Google →</a></p>
  </div>
</section>

<section class="band band--soft">
  <div class="wrap faq-wrap">
    <div class="section-head">
      <p class="eyebrow">Good to know</p>
      <h2>Questions, answered</h2>
    </div>
    ${faqList(faqs.slice(0, 5))}
    <p><a href="/faq/">All questions →</a></p>
  </div>
</section>

<section class="band">
  <div class="wrap split visit">
    <div class="prose">
      <p class="eyebrow">Visit</p>
      <h2>830 Mayfield Rd, Suite 500</h2>
      <p>${site.city}, ${site.region} ${site.zip}<br><a href="tel:${site.tel}">${site.phone}</a></p>
      <table class="hours">${hoursRows()}</table>
      <div class="cta-row"><a class="btn btn--outline" href="${site.directions}" target="_blank" rel="noopener">Get directions</a><a class="btn btn--outline" href="/visit/">Visit &amp; hours →</a></div>
    </div>
    <div class="map"><iframe title="Map to Top Creative Nails" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Top+Creative+Nails,+830+Mayfield+Rd+Suite+500,+Grand+Prairie,+TX+75052&output=embed"></iframe></div>
  </div>
</section>`,
  });
}

function servicesIndex() {
  const trail = [{ name: site.name, href: "/" }, { name: "Services", href: "/services/" }];
  page({
    pathName: "/services/",
    current: "/services/",
    title: "Nail Services in Grand Prairie, TX | Top Creative Nails",
    description: "Nail services in Grand Prairie, TX: acrylic full sets and fills, dip powder, gel and classic manicures, pedicures, nail art, repair and waxing.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}
  <h1>Nail services in Grand Prairie, TX</h1>
  <p class="lede">Everything we do, by category. Tap a service for details and photos. Prices depend on length, shape and design, so call <a href="tel:${site.tel}">${site.phone}</a> or ask at the front desk for today's price.</p>
</div></section>
${serviceCategories.map((c, i) => `
<section class="band band--tight${i % 2 ? " band--soft" : ""}" id="${c.id}">
  <div class="wrap">
    <h2>${c.name}</h2>
    <ul class="svc-list">
      ${services.filter((s) => s.cat === c.id).map((s) => `<li><a href="/services/${s.slug}/"><strong>${s.name}</strong><span>${s.short}</span><em>Details →</em></a></li>`).join("")}
    </ul>
  </div>
</section>`).join("")}
<section class="band band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call to book")}<a class="btn btn--outline" href="/gallery/">See our work</a></div></section>`,
  });
}

function servicePage(s) {
  const trail = [{ name: site.name, href: "/" }, { name: "Services", href: "/services/" }, { name: s.name, href: `/services/${s.slug}/` }];
  const svc = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: strip(s.paras[0]),
    url: `${D}/services/${s.slug}/`,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: site.city },
    ...(s.img ? { image: `${D}/assets/img/${s.img}-1080.webp` } : {}),
  };
  const photos = gallery.filter((g) => g.tag === s.slug && g.key !== s.img);
  page({
    pathName: `/services/${s.slug}/`,
    current: "/services/",
    title: s.title,
    description: s.description,
    schema: [breadcrumb(trail), svc],
    ogImage: s.img ? `/assets/img/${s.img}-1080.webp` : undefined,
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}</div></section>
<section class="band band--tight">
  <div class="wrap ${s.img ? "split" : "narrow"}">
    ${s.img ? `<figure class="split__media">${img(s.img, altFor(s.img), { sizes: "(max-width: 900px) 100vw, 45vw", eager: true })}</figure>` : ""}
    <div class="prose">
      <h1>${s.h1}</h1>
      <p class="price-line">${esc(priceNote)}</p>
      ${s.paras.map((p) => `<p>${p}</p>`).join("")}
      <div class="cta-row">${bookBtn("Call to book")}<a class="btn btn--outline" href="/services/">All services</a></div>
    </div>
  </div>
</section>
<section class="band band--tight">
  <div class="wrap narrow">
    <h2>What's included</h2>
    <dl class="items">${s.items.map((it) => `<div><dt>${esc(it.name)}</dt><dd>${esc(it.note)}</dd></div>`).join("")}</dl>
    <p><a href="/services/#${s.cat}">See it with the other ${serviceCategories.find((c) => c.id === s.cat).name.toLowerCase()} →</a></p>
  </div>
</section>
${photos.length ? `<section class="band band--tight"><div class="wrap"><h2>More ${s.name.toLowerCase()} from the salon</h2><ul class="grid grid--4">${photos.slice(0, 4).map((g) => `<li>${img(g.key, g.alt, { sizes: "(max-width: 700px) 50vw, 25vw" })}</li>`).join("")}</ul></div></section>` : ""}
<section class="band band--soft band--tight">
  <div class="wrap narrow">
    <h2>Also popular</h2>
    <ul class="svc-list svc-list--compact">${s.related.map((r) => `<li><a href="/services/${r}/"><strong>${bySlug[r].name}</strong><span>${bySlug[r].short}</span><em>Details →</em></a></li>`).join("")}</ul>
    <p>Walk-ins welcome Monday to Saturday at ${site.street}, ${site.city}. <a href="/visit/">Hours and directions</a>.</p>
  </div>
</section>`,
  });
}
const priceNote = "Pricing depends on length, shape and design. Call or ask at the front desk for today's price.";

function galleryPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "Gallery", href: "/gallery/" }];
  page({
    pathName: "/gallery/",
    current: "/gallery/",
    title: "Nail Art Gallery | Top Creative Nails, Grand Prairie TX",
    description: "Real nail sets from Top Creative Nails in Grand Prairie, TX: coffin and almond acrylics, French tips, marble and zebra nail art, rhinestones and pedicure art.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}
  <h1>Nail art gallery</h1>
  <p class="lede">Sets done in our Grand Prairie salon. Tap a photo to read about the service, then bring a screenshot to your appointment. More on Instagram at <a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramHandle}</a>.</p>
</div></section>
<section class="band band--tight"><div class="wrap">
  <ul class="grid grid--3">
    ${gallery.map((g) => `<li><a class="tile" href="/services/${g.tag}/">${img(g.key, g.alt, { sizes: "(max-width: 700px) 50vw, 33vw" })}<span>${bySlug[g.tag].name}</span></a></li>`).join("")}
  </ul>
</div></section>
<section class="band band--soft band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call to book this look")}<a class="btn btn--outline" href="/services/nail-art/">About our nail art →</a></div></section>`,
  });
}

function aboutPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "About", href: "/about/" }];
  page({
    pathName: "/about/",
    current: "/about/",
    title: "About Top Creative Nails | Grand Prairie, TX Nail Salon",
    description: "Top Creative Nails is a clean, friendly nail salon on Mayfield Rd in Grand Prairie, TX, known for creative nail art, strong acrylic and dip sets and pedicures.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}<h1>About Top Creative Nails</h1></div></section>
<section class="band band--tight">
  <div class="wrap split">
    <figure class="split__media split__media--wide"><img src="/assets/img/salon-interior-1200.webp" width="1200" height="678" alt="Inside Top Creative Nails, Grand Prairie" loading="lazy" decoding="async"></figure>
    <div class="prose">
      <p>Top Creative Nails is a neighborhood nail salon at ${fullAddress}. Inside you will find a row of white massage spa chairs for <a href="/services/pedicure/">pedicures</a>, manicure stations along the wall and a full wall of polish colors.</p>
      <p>Creative is in the name for a reason. Our techs build long <a href="/services/acrylic-nails/">acrylic sets</a>, strong <a href="/services/dip-powder-nails/">dip powder</a>, crisp <a href="/services/french-tip-nails/">French tips</a> and <a href="/services/nail-art/">custom nail art</a> from whatever photo you bring. We also <a href="/services/nail-repair/">fix sets that went wrong elsewhere</a>.</p>
      <p>What clients mention most is how they feel here: a clean salon, friendly staff who take their time, and nails that come out exactly the way they asked.</p>
    </div>
  </div>
</section>
<section class="band band--soft band--tight">
  <div class="wrap">
    <h2>In our clients' words</h2>
    <div class="quotes">
      <blockquote class="pull">"Super great service, clean environment.. love my nails"<cite>racquel k., Google review</cite></blockquote>
      <blockquote class="pull">"I finally found a nail shop that gave me exactly what I wanted and didn't hurt me in the process."<cite>Cassius H., Google review</cite></blockquote>
      <blockquote class="pull">"The staff was great ! Friendly and professional. The salon was so clean!!"<cite>Tonya A., Google review</cite></blockquote>
    </div>
    <p><a href="/reviews/">More reviews →</a></p>
  </div>
</section>
<section class="band band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call to book")}<a class="btn btn--outline" href="/visit/">Hours and directions</a></div></section>`,
  });
}

function reviewsPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "Reviews", href: "/reviews/" }];
  page({
    pathName: "/reviews/",
    current: "/reviews/",
    title: "Reviews | Top Creative Nails, Grand Prairie TX",
    description: "Read what clients say about Top Creative Nails in Grand Prairie, TX: clean salon, friendly techs, strong acrylic and dip sets, pedicures and nail rescues.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}
  <h1>Client reviews</h1>
  <p class="lede">Real reviews from our Google listing. Thank you to everyone who took the time to write one.</p>
</div></section>
<section class="band band--tight"><div class="wrap">
  ${reviewsCarousel(reviews)}
  <p class="center"><a href="${site.maps}" target="_blank" rel="noopener">See all reviews on Google</a> · <a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a></p>
</div></section>
<section class="band band--soft band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call to book")}<a class="btn btn--outline" href="/gallery/">See our work</a></div></section>`,
  });
}

function visitPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "Visit & Hours", href: "/visit/" }];
  page({
    pathName: "/visit/",
    current: "/visit/",
    title: "Hours & Directions | Top Creative Nails, Grand Prairie TX",
    description: "Top Creative Nails is at 830 Mayfield Rd, Suite 500, Grand Prairie, TX 75052. Open Mon to Thu 10 AM to 7 PM, Fri and Sat 9 AM to 7 PM. Call (972) 264-2744.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}<h1>Visit Top Creative Nails</h1></div></section>
<section class="band band--tight">
  <div class="wrap split visit">
    <div class="prose">
      <h2>Address</h2>
      <p>${site.street}<br>${site.city}, ${site.region} ${site.zip}</p>
      <p><a class="btn btn--outline" href="${site.directions}" target="_blank" rel="noopener">Get directions</a></p>
      <h2>Hours</h2>
      <table class="hours">${hoursRows()}</table>
      <h2>Contact</h2>
      <p>Phone: <a href="tel:${site.tel}">${site.phone}</a><br>Facebook: <a href="${site.messenger}" target="_blank" rel="noopener">send us a message</a><br>Instagram: <a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramHandle}</a></p>
      <p>We see clients from across Grand Prairie and nearby Arlington, Mansfield, Cedar Hill and Dallas.</p>
    </div>
    <div class="map map--tall"><iframe title="Map to Top Creative Nails" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Top+Creative+Nails,+830+Mayfield+Rd+Suite+500,+Grand+Prairie,+TX+75052&output=embed"></iframe></div>
  </div>
</section>
<section class="band band--soft band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call to book")}<a class="btn btn--outline" href="/services/">See services</a></div></section>`,
  });
}

function faqPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "FAQ", href: "/faq/" }];
  page({
    pathName: "/faq/",
    current: "/faq/",
    title: "FAQ | Top Creative Nails, Grand Prairie TX",
    description: "Answers about Top Creative Nails in Grand Prairie, TX: hours, walk-ins, booking, services, pricing, nail repair, kids nails and eyebrow waxing.",
    schema: [breadcrumb(trail), faqSchema(faqs)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}<h1>Frequently asked questions</h1></div></section>
<section class="band band--tight"><div class="wrap narrow">${faqList(faqs)}</div></section>
<section class="band band--soft band--tight"><div class="wrap cta-row cta-row--center">${bookBtn("Call (972) 264-2744")}<a class="btn btn--outline" href="/visit/">Hours and directions</a></div></section>`,
  });
}

function bookPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "How to book", href: "/book/" }];
  page({
    pathName: "/book/",
    current: "/book/",
    title: "Book a Nail Appointment | Top Creative Nails, Grand Prairie",
    description: "Book your nails at Top Creative Nails in Grand Prairie, TX: call (972) 264-2744, message us on Facebook, or walk in Monday to Saturday during open hours.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}
  <h1>Book a nail appointment</h1>
  <p class="lede">Three easy ways in. For long sets or detailed nail art, booking ahead helps us save the right amount of time for you.</p>
</div></section>
<section class="band band--tight"><div class="wrap">
  <ul class="ways">
    <li><h2>Call</h2><p>Fastest way to get a time. Tell us the service, length and design you want.</p>${bookBtn(site.phone)}</li>
    <li><h2>Message us</h2><p>Send a photo of the look you want on Facebook and ask for a time.</p><a class="btn btn--outline" href="${site.messenger}" target="_blank" rel="noopener">Message on Facebook</a></li>
    <li><h2>Walk in</h2><p>Walk-ins welcome during open hours. Weekends get busy, so a short wait is possible.</p><a class="btn btn--outline" href="/visit/">Hours and directions</a></li>
  </ul>
  <table class="hours hours--center">${hoursRows()}</table>
</div></section>
<section class="band band--soft band--tight"><div class="wrap narrow prose">
  <h2>Before you come in</h2>
  <p>Save a photo of the design you want from our <a href="/gallery/">gallery</a> or Instagram. If you are wearing a set from another salon that needs fixing, mention it when you call so we can plan for a <a href="/services/nail-repair/">redo</a>.</p>
</div></section>`,
  });
}

function privacyPage() {
  const trail = [{ name: site.name, href: "/" }, { name: "Privacy", href: "/privacy/" }];
  page({
    pathName: "/privacy/",
    current: "/privacy/",
    title: "Privacy Policy | Top Creative Nails",
    description: "Privacy policy for the Top Creative Nails website in Grand Prairie, TX. This site uses no tracking cookies and collects no personal information through forms.",
    schema: [breadcrumb(trail)],
    body: `
<section class="page-head"><div class="wrap">${crumbs(trail)}<h1>Privacy policy</h1></div></section>
<section class="band band--tight"><div class="wrap narrow prose">
  <p>This website does not use advertising or analytics cookies and does not collect personal information through forms.</p>
  <p>Your browser stores one small setting (in local storage) to remember that you closed the welcome message, so it does not show again. You can clear it at any time in your browser settings.</p>
  <p>The map on our Visit page is provided by Google Maps and is subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's privacy policy</a>. Links to Facebook and Instagram take you to those services, which have their own policies.</p>
  <p>Questions? Call us at <a href="tel:${site.tel}">${site.phone}</a>.</p>
</div></section>`,
  });
}

function notFound() {
  const html = `${head({ title: "Page not found | Top Creative Nails", description: "This page could not be found. Visit Top Creative Nails in Grand Prairie, TX for acrylic, dip, gel, pedicures and custom nail art. Call (972) 264-2744.", pathName: "/404/" })}
<body>${header("")}<main id="main"><section class="page-head"><div class="wrap narrow"><h1>Page not found</h1><p class="lede">That page does not exist. Try our <a href="/services/">services</a> or <a href="/">home page</a>.</p></div></section></main>${footer()}<script src="/assets/js/site.js" defer></script></body></html>`;
  fs.writeFileSync(path.join(OUT, "404.html"), html.replace('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">', '<meta name="robots" content="noindex">'));
}

// ---------- crawl files ----------
function crawlFiles() {
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${D}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(
    path.join(OUT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((p) => `  <url><loc>${D}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq><priority>${p === "/" ? "1.0" : p.startsWith("/services/") ? "0.8" : "0.6"}</priority></url>`)
      .join("\n")}\n</urlset>\n`,
  );
  const llms = `# ${site.name}

> ${site.name} is a nail salon at ${fullAddress}. It offers acrylic full sets and fills, dip powder, gel and classic manicures, pedicures in massage spa chairs, French tips, custom nail art, nail repair (including redos of sets done elsewhere), eyebrow waxing and kids polish. Walk-ins are welcome.

## Current Status (${new Date().getFullYear()})
Open six days a week (closed Sunday). Appointments by phone at ${site.phone} or by Facebook message; walk-ins welcome.

## Location & Contact
- Address: ${fullAddress}
- Phone: ${site.phone}
- Website: ${D}/
- Google Maps: ${site.maps}
- Facebook: ${site.facebook}
- Instagram: ${site.instagram}

## Hours
${hours.map((h) => `- ${h.day}: ${h.opens ? `${fmt(h.opens)} to ${fmt(h.closes)}` : "Closed"}`).join("\n")}

## Services
${serviceCategories.map((c) => `### ${c.name}\n${services.filter((s) => s.cat === c.id).map((s) => `- ${s.name}: ${s.short} (${D}/services/${s.slug}/)`).join("\n")}`).join("\n\n")}

Pricing depends on length, shape and design; call ${site.phone} for current prices.

## How to Book
- Call ${site.phone}
- Message on Facebook: ${site.messenger}
- Walk in during open hours

## What Clients Say
${reviews.slice(0, 5).map((r) => `- "${r.text}" (${r.author}, ${r.source})`).join("\n")}

## FAQ
${faqs.map((f) => `- Q: ${f.q}\n  A: ${strip(f.a)}`).join("\n")}

## Area Served
${site.areaServed.join(", ")}, Texas
`;
  fs.writeFileSync(path.join(OUT, "llms.txt"), llms);
}

// ---------- run ----------
for (const f of ["index.html"]) fs.rmSync(path.join(OUT, f), { force: true });
home();
servicesIndex();
services.forEach(servicePage);
galleryPage();
aboutPage();
reviewsPage();
visitPage();
faqPage();
bookPage();
privacyPage();
notFound();
crawlFiles();

console.log(`Built ${pages.length} pages into ${OUT}`);
if (warnings.length) console.log("WARNINGS:\n - " + warnings.join("\n - "));
