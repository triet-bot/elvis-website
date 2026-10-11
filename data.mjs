// Single source of truth for the Top Creative Nails site.
// Every page, the JSON-LD, llms.txt and sitemap are generated from this file by build.mjs.

export const site = {
  name: "Top Creative Nails",
  altName: "The Top Creative Nails",
  // LAUNCH STEP: set to the real domain and flip indexable to true, then rebuild.
  domain: "https://www.topcreativenails.com",
  indexable: true,
  phone: "(972) 264-2744",
  tel: "+19722642744",
  street: "830 Mayfield Rd, Suite 500",
  city: "Grand Prairie",
  region: "TX",
  regionName: "Texas",
  zip: "75052",
  lat: 32.6924446,
  lng: -97.0174446,
  facebook: "https://www.facebook.com/people/The-Top-Creative-Nail-Official/61567842008159/",
  messenger: "https://m.me/61567842008159",
  instagram: "https://www.instagram.com/thetopcreativenails/",
  instagramHandle: "@thetopcreativenails",
  maps: "https://www.google.com/maps?cid=16948320454350346401",
  directions: "https://www.google.com/maps/dir/?api=1&destination=Top+Creative+Nails+830+Mayfield+Rd+Suite+500+Grand+Prairie+TX+75052",
  // Real Google rating. The star rating (aggregateRating) is only published at 4.6 and above.
  googleRating: 4.3,
  googleReviewCount: 84,
  areaServed: ["Grand Prairie", "Arlington", "Mansfield", "Cedar Hill", "Dallas"],
  promo: {
    enabled: true,
    eyebrow: "Walk-ins welcome",
    title: "Your next set starts here",
    text: "Call to book a time, or walk in Monday to Saturday. Bring a photo of the look you want and we will match it.",
    cta: "Call (972) 264-2744",
  },
};

// dayOfWeek for schema, label for humans
export const hours = [
  { day: "Monday", opens: "10:00", closes: "19:00" },
  { day: "Tuesday", opens: "10:00", closes: "19:00" },
  { day: "Wednesday", opens: "10:00", closes: "19:00" },
  { day: "Thursday", opens: "10:00", closes: "19:00" },
  { day: "Friday", opens: "09:00", closes: "19:00" },
  { day: "Saturday", opens: "09:00", closes: "19:00" },
  { day: "Sunday", opens: null, closes: null },
];

// Gallery: Higgsfield-retouched versions of the salon's own Google Maps / Instagram photos.
// "tag" links each photo to its service guide.
export const gallery = [
  { key: "nails-s8", tag: "acrylic-nails", alt: "Long coffin nails with black-and-white stripes, baby blue accents and black stars" },
  { key: "nails-s7", tag: "french-tip-nails", alt: "Hot pink French tip nails with hand-painted white flowers and rhinestones" },
  { key: "nails-s4", tag: "french-tip-nails", alt: "Almond nails with neon rainbow swirl French tips" },
  { key: "nails-s1", tag: "acrylic-nails", alt: "Long square nails with neon pink tips and sheer pink marble swirls" },
  { key: "nails-s6", tag: "french-tip-nails", alt: "Square white French tip nails with rows of rhinestones" },
  { key: "nails-s2", tag: "french-tip-nails", alt: "Soft almond nails with pastel yellow French tips" },
  { key: "nails-s3", tag: "nail-art", alt: "Sheer pink square nails with gold foil leaf accents" },
  { key: "nails-s5", tag: "nail-art", alt: "Natural almond nails with delicate gold glitter accents" },
  { key: "nails-01", tag: "french-tip-nails", alt: "Nude French tip nails with a crystal accent stripe on a lavender backdrop" },
  { key: "nails-07", tag: "acrylic-nails", alt: "Long coffin acrylic nails in sky-blue glitter" },
  { key: "nails-12", tag: "nail-art", alt: "Orange and pink marble nail art with rhinestone accents" },
  { key: "nails-15", tag: "nail-art", alt: "Short black-and-white zebra nail art with red star accents" },
  { key: "nails-24", tag: "nail-art", alt: "Pink stiletto nails with silver glitter and multicolor rhinestones" },
  { key: "nails-28", tag: "acrylic-nails", alt: "Mauve almond nails with crystal rhinestone accents" },
  { key: "nails-30", tag: "french-tip-nails", alt: "Short square French tip nails held around a coffee cup" },
  { key: "nails-09", tag: "french-tip-nails", alt: "Deep white French tip coffin nails with a crystal gem accent" },
  { key: "nails-22", tag: "nail-art", alt: "Burnt orange coffin nails with gold glitter and rhinestones" },
  { key: "nails-08", tag: "acrylic-nails", alt: "Milky white coffin nails with rhinestone accent nails" },
  { key: "nails-11", tag: "acrylic-nails", alt: "Long almond nails in a soft peach color" },
  { key: "nails-33", tag: "nail-art", alt: "Long coffin nails with a yellow ombre fade and a gold-flake accent nail" },
  { key: "nails-18", tag: "nail-art", alt: "White almond nails with delicate white lace art on two accent nails" },
  { key: "nails-10", tag: "nail-art", alt: "Square nails with a mint-green glitter ombre and a crystal accent" },
  { key: "nails-02", tag: "acrylic-nails", alt: "Long lavender stiletto nails" },
  { key: "nails-21", tag: "french-tip-nails", alt: "Long natural-look French tip nails" },
  { key: "nails-06", tag: "nail-art", alt: "Red glitter coffin nails with a silver glitter accent nail" },
  { key: "nails-34", tag: "french-tip-nails", alt: "Soft pink French tip nails with small white bow accents" },
  { key: "nails-14", tag: "acrylic-nails", alt: "Long milky white square acrylic nails" },
  { key: "nails-03", tag: "nail-art", alt: "Long sheer pink nails with fine white line art" },
  { key: "nails-26", tag: "classic-manicure", alt: "Short rounded nails in deep burgundy polish" },
  { key: "nails-31", tag: "acrylic-nails", alt: "Pale pink square nails with a gold-flake accent nail" },
];
export const extraImages = {
  "pedicure-chairs": "Row of white pedicure spa chairs with glowing foot basins at Top Creative Nails",
};

export const serviceCategories = [
  { id: "manicures", name: "Manicures" },
  { id: "pedicures", name: "Pedicures" },
  { id: "enhancements", name: "Nail enhancements" },
  { id: "art", name: "Nail art and repair" },
  { id: "waxing", name: "Waxing" },
  { id: "kids", name: "Kids" },
];

const priceLine = "Pricing depends on length, shape and design. Call or ask at the front desk for today's price.";

export const services = [
  {
    slug: "classic-manicure",
    cat: "manicures",
    name: "Classic manicure",
    short: "Shape, cuticle care, hand massage and your choice of regular polish.",
    title: "Classic Manicure in Grand Prairie, TX | Top Creative Nails",
    description: "Classic manicures at Top Creative Nails on Mayfield Rd in Grand Prairie, TX: shaping, cuticle care, a hand massage and fresh polish. Walk-ins welcome.",
    h1: "Classic manicure in Grand Prairie, TX",
    img: null,
    paras: [
      "A classic manicure is the reset button for your hands. Your tech files and shapes your natural nails, softens and tidies the cuticles, and finishes with a short hand massage before the polish goes on.",
      "Pick any shade from the polish wall. If you want the color to last longer, ask about upgrading to a <a href=\"/services/gel-manicure/\">gel manicure</a> or adding a simple <a href=\"/services/french-tip-nails/\">French tip</a>.",
    ],
    items: [
      { name: "Nail shaping", note: "Square, round, oval, almond or coffin on natural nails" },
      { name: "Cuticle care", note: "Softened, pushed back and tidied" },
      { name: "Hand massage", note: "A short massage before polish" },
      { name: "Regular polish", note: "Your choice from the polish wall" },
    ],
    related: ["gel-manicure", "pedicure", "nail-art"],
  },
  {
    slug: "gel-manicure",
    cat: "manicures",
    name: "Gel manicure",
    short: "Manicure finished with LED-cured gel color for a glossy, chip-resistant finish.",
    title: "Gel Manicure in Grand Prairie, TX | Top Creative Nails",
    description: "Gel manicures at Top Creative Nails in Grand Prairie, TX: LED-cured gel color on natural nails for a high-shine, chip-resistant finish. Walk-ins welcome.",
    h1: "Gel manicure in Grand Prairie, TX",
    img: null,
    paras: [
      "A gel manicure starts like a <a href=\"/services/classic-manicure/\">classic manicure</a>, then swaps regular polish for gel color cured under an LED lamp. You leave with nails that are fully dry and shine like glass.",
      "Gel is a good middle ground when you want color that lasts but do not want added length. If you want length or strength, ask about <a href=\"/services/acrylic-nails/\">acrylic</a> or <a href=\"/services/dip-powder-nails/\">dip powder</a> instead.",
    ],
    items: [
      { name: "Gel color", note: "Cured under LED, dry before you leave" },
      { name: "Gel French", note: "Classic or colored tips in gel" },
      { name: "Gel removal", note: "Ask the front desk when you book" },
    ],
    related: ["classic-manicure", "french-tip-nails", "dip-powder-nails"],
  },
  {
    slug: "pedicure",
    cat: "pedicures",
    name: "Pedicure",
    short: "Soak in a spa chair, nail and cuticle care, callus smoothing, massage and polish.",
    title: "Pedicure in Grand Prairie, TX | Top Creative Nails",
    description: "Pedicures in Grand Prairie, TX at Top Creative Nails: a warm soak in our white spa chairs, nail and cuticle care, callus smoothing, massage and polish.",
    h1: "Pedicure in Grand Prairie, TX",
    img: "pedicure-chairs",
    paras: [
      "Our pedicures happen in a row of white massage spa chairs along the salon wall. You soak, your tech trims and shapes your toenails, tidies the cuticles, smooths rough heels and finishes with a lower-leg massage and polish.",
      "Pedicures are what many of our regulars come back for. One client wrote that she always gets her pedicures here and called us \"the best in GP\". Want designs on your toes? Our <a href=\"/services/nail-art/\">nail art</a> works on toes too, from hand-painted designs to gems. Or pair it with a <a href=\"/services/classic-manicure/\">manicure</a>.",
    ],
    items: [
      { name: "Spa pedicure", note: "Soak, nail care, callus smoothing, massage, polish" },
      { name: "Gel polish on toes", note: "Longer-lasting shine" },
      { name: "Toe nail art", note: "Hand-painted designs, accents and gems" },
      { name: "Mani and pedi together", note: "Ask to book both in one visit" },
    ],
    related: ["classic-manicure", "nail-art", "kids-nails"],
  },
  {
    slug: "acrylic-nails",
    cat: "enhancements",
    name: "Acrylic nails",
    short: "Full sets and fills in any length and shape: coffin, almond, stiletto, square.",
    title: "Acrylic Nails in Grand Prairie, TX | Top Creative Nails",
    description: "Acrylic nails in Grand Prairie, TX: full sets and fills in coffin, almond, stiletto or square, with glitter, chrome, French or rhinestones. Top Creative Nails.",
    h1: "Acrylic nails in Grand Prairie, TX",
    img: "nails-07",
    paras: [
      "Acrylic is our most requested service. We build full sets in whatever length and shape you want, from short squares to long coffins, almonds and stilettos, then finish them in solid color, glitter, chrome or a <a href=\"/services/french-tip-nails/\">French tip</a>.",
      "Already wearing a set? Come back every two to three weeks for a fill to keep it balanced and strong. Want something more? Every set can carry <a href=\"/services/nail-art/\">nail art</a>, rhinestones or an accent nail.",
    ],
    items: [
      { name: "Full set", note: "New acrylic set, any length and shape" },
      { name: "Fill", note: "Rebalance grown-out acrylic, usually every 2 to 3 weeks" },
      { name: "Shapes", note: "Square, coffin, almond, stiletto, oval" },
      { name: "Finishes", note: "Solid, glitter, chrome, ombre, French" },
    ],
    related: ["dip-powder-nails", "nail-art", "nail-repair"],
  },
  {
    slug: "dip-powder-nails",
    cat: "enhancements",
    name: "Dip powder nails",
    short: "Durable powder color, with or without added length. No UV lamp needed.",
    title: "Dip Powder Nails in Grand Prairie, TX | Top Creative Nails",
    description: "Dip powder nails at Top Creative Nails in Grand Prairie, TX: strong, long-wearing powder color on natural nails or with added length. Walk in or call.",
    h1: "Dip powder nails in Grand Prairie, TX",
    img: null,
    paras: [
      "Dip powder builds color and strength in thin layers of powder, sealed for a smooth, glossy finish. It is lighter than acrylic and tougher than regular polish, which makes it a favorite for people who are hard on their hands.",
      "One client who came in for powder nails told us they were the strongest nails she had ever worn. Another came in after a dip job at a different salon went wrong, and we gave her a new set with the design she wanted. See <a href=\"/services/nail-repair/\">nail repair</a>.",
    ],
    items: [
      { name: "Dip color", note: "On natural nails" },
      { name: "Dip with tips", note: "Added length and shape" },
      { name: "Dip French or ombre", note: "Two-tone looks in powder" },
    ],
    related: ["acrylic-nails", "gel-manicure", "nail-repair"],
  },
  {
    slug: "french-tip-nails",
    cat: "enhancements",
    name: "French tip nails",
    short: "Classic white tips, deep French, colored tips or a crystal accent.",
    title: "French Tip Nails in Grand Prairie, TX | Top Creative Nails",
    description: "French tip nails in Grand Prairie, TX: classic, deep, colored or chrome tips on acrylic, gel or dip, from short square to long coffin.",
    h1: "French tip nails in Grand Prairie, TX",
    img: "nails-30",
    paras: [
      "The French tip never goes out of style, and we do every version of it: the soft, short square French shown here, a deep French that runs halfway down the nail, colored or chrome tips, and Frenches finished with a single crystal accent.",
      "French tips work on <a href=\"/services/acrylic-nails/\">acrylic</a>, <a href=\"/services/gel-manicure/\">gel</a> and <a href=\"/services/dip-powder-nails/\">dip powder</a>, so pick the base that fits how long you want them to last.",
    ],
    items: [
      { name: "Classic French", note: "Clean white tip on a nude base" },
      { name: "Deep French", note: "A bold, extended white tip" },
      { name: "Colored or chrome French", note: "Any shade, any finish" },
      { name: "French with accent", note: "Add a crystal or design to one nail" },
    ],
    related: ["acrylic-nails", "gel-manicure", "nail-art"],
  },
  {
    slug: "nail-art",
    cat: "art",
    name: "Nail art and designs",
    short: "Hand-painted designs, marble, animal print, glitter, chrome and rhinestones.",
    title: "Nail Art & Designs in Grand Prairie, TX | Top Creative Nails",
    description: "Custom nail art in Grand Prairie, TX: hand-painted designs, marble, animal print, chrome, glitter and rhinestones. Bring a photo and we will match it.",
    h1: "Nail art and designs in Grand Prairie, TX",
    img: "nails-12",
    paras: [
      "Creative is in our name. Bring a screenshot, a Pinterest board or just an idea, and your tech will build it: marble swirls, zebra lines, hand-painted leaves, chrome, glitter fades and as many rhinestones as you dare.",
      "Clients tell us we give them exactly the design they asked for. Everything in our <a href=\"/gallery/\">gallery</a> was done in the salon, on <a href=\"/services/acrylic-nails/\">acrylic</a>, <a href=\"/services/dip-powder-nails/\">dip</a> and natural nails. We paint designs on toes too during a <a href=\"/services/pedicure/\">pedicure</a>.",
    ],
    items: [
      { name: "Hand-painted designs", note: "Florals, leaves, lines, characters" },
      { name: "Marble and ombre", note: "Blended color effects" },
      { name: "Chrome and glitter", note: "Full nail or accent nails" },
      { name: "Rhinestones and gems", note: "Single accents to full bling" },
    ],
    related: ["acrylic-nails", "french-tip-nails", "pedicure"],
  },
  {
    slug: "nail-repair",
    cat: "art",
    name: "Nail repair and redo",
    short: "Broken nail fixes, and rescues for sets that went wrong somewhere else.",
    title: "Nail Repair & Redo in Grand Prairie, TX | Top Creative Nails",
    description: "Nail repair in Grand Prairie, TX: broken nail fixes and full redos of sets or nail art that went wrong at another salon. Top Creative Nails, 830 Mayfield Rd.",
    h1: "Nail repair and redo in Grand Prairie, TX",
    img: null,
    paras: [
      "A broken nail does not have to mean a whole new set. Come in and we will fix the one nail, or rebalance the set if it needs more.",
      "We also see a lot of rescues. One client came in after a botched dip job at another salon and left with a new set and the design she wanted. Another told us our tech salvaged nail art from another place and she was thrilled. If yours went wrong, bring it in and we will make it right with <a href=\"/services/acrylic-nails/\">acrylic</a>, <a href=\"/services/dip-powder-nails/\">dip</a> or fresh <a href=\"/services/nail-art/\">nail art</a>.",
    ],
    items: [
      { name: "Single nail repair", note: "Fix a broken or lifted nail" },
      { name: "Set redo", note: "Remove and rebuild a set that went wrong" },
      { name: "Design fix", note: "Rework nail art you are not happy with" },
    ],
    related: ["acrylic-nails", "dip-powder-nails", "nail-art"],
  },
  {
    slug: "eyebrow-waxing",
    cat: "waxing",
    name: "Eyebrow waxing",
    short: "Quick brow shaping with wax while you are in for nails.",
    title: "Eyebrow Waxing in Grand Prairie, TX | Top Creative Nails",
    description: "Eyebrow waxing at Top Creative Nails in Grand Prairie, TX: quick, clean brow shaping, easy to add on to a manicure or pedicure. Walk-ins welcome Mon to Sat.",
    h1: "Eyebrow waxing in Grand Prairie, TX",
    img: null,
    paras: [
      "Get your brows shaped in the same visit as your nails. Eyebrow waxing takes a few minutes and cleans up stray hairs while keeping your natural arch.",
      "One client who came in to have her nails fixed added a brow wax and told us her eyebrows came out amazing too. Ask for it when you check in for your <a href=\"/services/classic-manicure/\">manicure</a> or <a href=\"/services/pedicure/\">pedicure</a>.",
    ],
    items: [
      { name: "Eyebrow wax", note: "Shape and clean up" },
      { name: "Add-on", note: "Easy to pair with any nail service" },
    ],
    related: ["pedicure", "classic-manicure", "gel-manicure"],
  },
  {
    slug: "kids-nails",
    cat: "kids",
    name: "Kids manicure and polish",
    short: "A gentle polish change or mini manicure for kids visiting with a parent.",
    title: "Kids Nails in Grand Prairie, TX | Top Creative Nails",
    description: "Kids manicures and polish at Top Creative Nails in Grand Prairie, TX: a gentle mini manicure or polish change while a parent gets their nails done.",
    h1: "Kids manicure and polish in Grand Prairie, TX",
    img: null,
    paras: [
      "Bringing the kids along? While you get your set, your little one can get a polish change or a gentle mini manicure with a color of their own.",
      "One mom brought her daughter on her visit and told us her daughter got her nails painted and was super excited. Pair it with your <a href=\"/services/pedicure/\">pedicure</a> and make it a trip together.",
    ],
    items: [
      { name: "Polish change", note: "Fresh regular polish" },
      { name: "Mini manicure", note: "Gentle shaping and polish" },
    ],
    related: ["pedicure", "classic-manicure", "nail-art"],
  },
];

// Real 5-star Google reviews (verbatim). Sub-5-star reviews are never shown.
export const reviews = [
  { author: "Paulette Otto", source: "Google", when: "2026", text: "I came in here after a botched dip job at another salon and THEY SAVED ME! I typically only get my toes done but decided to go for both since I'm about to go on vacation. Thank goodness they came to the rescue and gave me a new set with the design I wanted. I didn't catch the guys name, but he slays! I also brought my daughter with me and she got a paint job too. She was super excited. They are reasonably priced as well. Thank you!" },
  { author: "Ashley Vasquez", source: "Google", when: "2025", text: "I always get my pedicures here and have a great experience here. The two lady here are always helpful and nice. I do think they should hire maybe 1 or 2 more people because it does get a little busy at times. but nonetheless they're the best in GP!" },
  { author: "Isabel Rodriguez", source: "Google", when: "2023", text: "They are amazing! Super quick and did my nails sooooo good. 100% my favorite nail place" },
  { author: "racquel kellz", source: "Google", when: "2023", text: "Super great service, clean environment.. love my nails" },
  { author: "Deshondra Smith", source: "Google", when: "2022", text: "I was a walk in and when I tell you that It was a beautiful and very clean establishment. The ladies Linda and my pedicure lady was sooo sweet. They took their time and did a amazing job. I will be back again definately. My new nail salon.. Thank you for making me feel so special." },
  { author: "Brittany Xo", source: "Google", when: "2022", text: "Cindi did my nails ! Amazing beautiful job! They all made me feel Relaxed. They were all sweet when I walked in the door I'm a stay at home mom never go out and this experience was incredible these nails are the strongest nails I've ever had on absolutely gorgeous all from powder thank you so much Cindy I'm so glad I came to you guys I am very very very very happy" },
  { author: "Halo nHorns", source: "Google", when: "2022", text: "The nail tech was fanatic. He salvaged a botched nail art I got at another place and I'm so thrilled. My eyebrows came out amazing too. Very happy." },
  { author: "Cassius Haynes", source: "Google", when: "2022", text: "I finally found a nail shop that gave me exactly what I wanted and didn't hurt me in the process. They did a phenomenal job! Look how pretty they are!" },
  { author: "Tonya Adams", source: "Google", when: "2022", text: "First time coming to this salon.. the service was awesome. The staff was great ! Friendly and professional. The salon was so clean!! I will be back in 3 weeks!! Linda was the best!!!!" },
  { author: "Shanda Nikole", source: "Google", when: "2020", text: "I was a walk in; brand new to this establishment referred by my daughter. Post COVID-19 I was looking for a small salon close to home that was extremely clean, spacious, friendly, and most of all offered great pedicures. I received all of that and left feeling amazing. I will definitely be returning." },
];

// FAQ answers are HTML. Every service mention links to its /services/<slug>/ guide.
export const faqs = [
  { q: "Where is Top Creative Nails?", a: "We are at 830 Mayfield Rd, Suite 500, Grand Prairie, TX 75052. <a href=\"/visit/\">Get directions and hours</a>." },
  { q: "What are your hours?", a: "Monday to Thursday 10 AM to 7 PM, Friday and Saturday 9 AM to 7 PM. We are closed on Sunday." },
  { q: "Do you take walk-ins?", a: "Yes. Walk-ins are welcome during open hours. The salon can get busy, especially on weekends, so call ahead at (972) 264-2744 if you want a set time." },
  { q: "How do I book an appointment?", a: "Call us at (972) 264-2744 or send a message on Facebook. See <a href=\"/book/\">all the ways to book</a>." },
  { q: "What services do you offer?", a: "<a href=\"/services/acrylic-nails/\">Acrylic nails</a> (full sets and fills), <a href=\"/services/dip-powder-nails/\">dip powder</a>, <a href=\"/services/gel-manicure/\">gel</a> and <a href=\"/services/classic-manicure/\">classic manicures</a>, <a href=\"/services/pedicure/\">pedicures</a>, <a href=\"/services/french-tip-nails/\">French tips</a>, <a href=\"/services/nail-art/\">nail art</a>, <a href=\"/services/nail-repair/\">nail repair</a>, <a href=\"/services/eyebrow-waxing/\">eyebrow waxing</a> and <a href=\"/services/kids-nails/\">kids polish</a>." },
  { q: "Can you fix nails that were done at another salon?", a: "Yes. Clients regularly come to us after a set or design went wrong somewhere else, and we rebuild it the way they wanted. See <a href=\"/services/nail-repair/\">nail repair and redo</a>." },
  { q: "How much does a full set cost?", a: "Prices depend on the service, length, shape and how much design you add. Call (972) 264-2744 or ask at the front desk for today's price before we start." },
  { q: "Can I bring my kids?", a: "Yes. Kids can get a polish change or a mini manicure while you get your nails done. See <a href=\"/services/kids-nails/\">kids manicure and polish</a>." },
  { q: "Do you do eyebrow waxing?", a: "Yes. <a href=\"/services/eyebrow-waxing/\">Eyebrow waxing</a> is a quick add-on to any manicure or pedicure." },
  { q: "Can I bring a photo of the design I want?", a: "Please do. Show your tech a photo or screenshot and we will match it. Browse our <a href=\"/gallery/\">nail gallery</a> for ideas, or follow us on Instagram at @thetopcreativenails." },
];

// Header nav (standard IA, nail-salon labels) — also emitted as SiteNavigationElement JSON-LD.
export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Visit & Hours", href: "/visit/" },
];
export const navMore = [
  { label: "FAQ", href: "/faq/" },
  { label: "Dip vs acrylic vs gel", href: "/guides/dip-vs-acrylic-vs-gel/" },
  { label: "How to book", href: "/book/" },
  { label: "Español", href: "/es/" },
  { label: "Privacy", href: "/privacy/" },
];
