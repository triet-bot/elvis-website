// Extra depth per service guide: typical timing, how long it lasts, aftercare, and service FAQs.
// Rendered on /services/<slug>/ and mirrored into that page's FAQPage JSON-LD.
export const serviceDetails = {
  "classic-manicure": {
    time: "About 30 to 45 minutes",
    lasts: "About 5 to 7 days with regular polish",
    aftercare: [
      "Give regular polish a few extra minutes to set before you grab your keys or phone.",
      "Wear gloves for dishes and cleaning to keep polish from chipping early.",
      "Use cuticle oil every day or two to keep the skin around your nails soft.",
    ],
    faqs: [
      { q: "What is the difference between a classic manicure and a gel manicure?", a: 'Both include shaping and cuticle care. A classic manicure finishes with regular polish that air dries, while a <a href="/services/gel-manicure/">gel manicure</a> uses gel color cured under an LED lamp, so it is dry right away and usually lasts longer.' },
      { q: "Can I get a classic manicure on short nails?", a: "Yes. A classic manicure works on any natural length. Your tech shapes what you have into a clean square, round or oval." },
      { q: "Can I add a design to a classic manicure?", a: 'Yes. Simple accents and a <a href="/services/french-tip-nails/">French tip</a> can be added. For detailed designs, see <a href="/services/nail-art/">nail art</a>.' },
    ],
  },
  "gel-manicure": {
    time: "About 45 minutes to 1 hour",
    lasts: "Usually 2 to 3 weeks",
    aftercare: [
      "Gel is cured and dry before you leave, so you can use your hands right away.",
      "Do not peel or pick off gel. It can take layers of your natural nail with it.",
      "Come back for professional removal when you are ready for a new color.",
    ],
    faqs: [
      { q: "How long does a gel manicure last?", a: "Most clients get about two to three weeks before they want a change, depending on how fast their nails grow and how hard they are on their hands." },
      { q: "Is gel the same as dip or acrylic?", a: 'No. Gel is a polish cured under a lamp on your natural nails. <a href="/services/dip-powder-nails/">Dip powder</a> and <a href="/services/acrylic-nails/">acrylic</a> build a stronger layer and can add length. See our <a href="/guides/dip-vs-acrylic-vs-gel/">dip vs acrylic vs gel guide</a>.' },
      { q: "Can you take off my old gel before the new one?", a: "Yes. Mention it when you check in so we can include removal in your appointment." },
    ],
  },
  pedicure: {
    time: "About 45 minutes to 1 hour",
    lasts: "Polish usually lasts 2 to 3 weeks on toes, longer with gel",
    aftercare: [
      "Wear open-toe shoes home so fresh polish does not smudge.",
      "Moisturize your heels daily to keep calluses from building back up.",
      "Book every 3 to 4 weeks to keep feet smooth and polish fresh.",
    ],
    faqs: [
      { q: "What is included in a pedicure?", a: "A warm soak in a massage spa chair, toenail trimming and shaping, cuticle care, callus smoothing, a lower-leg massage and polish of your choice." },
      { q: "Can I get gel polish on my toes?", a: "Yes. Gel on toes is dry before you leave and lasts longer than regular polish." },
      { q: "Can I get a manicure and pedicure at the same time?", a: 'Yes. Ask for both when you call or check in. Many clients pair a pedicure with a <a href="/services/classic-manicure/">classic</a> or <a href="/services/gel-manicure/">gel manicure</a>.' },
    ],
  },
  "acrylic-nails": {
    time: "A full set takes about 1 to 1.5 hours and a fill about 45 minutes to 1 hour. Long sets and detailed art take longer.",
    lasts: "Plan on a fill every 2 to 3 weeks as your nails grow",
    aftercare: [
      "Use your fingertips, not your nails, to open cans and pry things.",
      "Keep up with fills every 2 to 3 weeks so the set stays balanced and strong.",
      'If a nail lifts or breaks, come in for a <a href="/services/nail-repair/">repair</a> rather than gluing it at home.',
    ],
    faqs: [
      { q: "What is the difference between a full set and a fill?", a: "A full set builds brand-new acrylic nails from scratch. A fill rebalances an existing set by filling in the gap that grows out near your cuticles, usually every two to three weeks." },
      { q: "What shapes can I get?", a: 'Square, coffin, almond, stiletto and oval, in any length you like. See examples in our <a href="/gallery/">gallery</a>.' },
      { q: "Should I get acrylic or dip?", a: 'Acrylic is the best choice when you want length and dramatic shapes. <a href="/services/dip-powder-nails/">Dip powder</a> is lighter and great at natural length. Our <a href="/guides/dip-vs-acrylic-vs-gel/">comparison guide</a> explains the differences.' },
    ],
  },
  "dip-powder-nails": {
    time: "About 45 minutes to 1 hour",
    lasts: "Often 3 to 4 weeks",
    aftercare: [
      "Dip is fully hard when you leave, with no drying time.",
      "Avoid picking at the edges. If a nail lifts, come in to have it fixed.",
      "Have dip professionally removed to protect your natural nails.",
    ],
    faqs: [
      { q: "How long do dip powder nails last?", a: "Many clients wear dip for about three to four weeks. It is known for being hard to chip." },
      { q: "Can dip powder add length?", a: "Yes. Ask for dip with tips if you want extra length and shape." },
      { q: "Is dip better than gel?", a: 'Dip is usually stronger and longer-lasting than a <a href="/services/gel-manicure/">gel manicure</a>. Gel is thinner and more flexible. Read our <a href="/guides/dip-vs-acrylic-vs-gel/">dip vs acrylic vs gel guide</a> to choose.' },
    ],
  },
  "french-tip-nails": {
    time: "Depends on the base: about 45 minutes on gel or dip, longer on a new acrylic set",
    lasts: "Same as the base you choose: about 2 to 3 weeks for gel, 3 to 4 for dip, and fills every 2 to 3 weeks for acrylic",
    aftercare: [
      "White tips show wear first, so avoid using your nails as tools.",
      "Use cuticle oil to keep the nude base looking clean as nails grow.",
      "Book a fill or refresh when the grow-out gap starts to show.",
    ],
    faqs: [
      { q: "What is a deep French?", a: "A deep French runs the white tip much farther down the nail for a bold, modern look. It works best on medium to long nails." },
      { q: "Can I get colored French tips?", a: "Yes. Any shade, chrome or glitter can be used for the tip." },
      { q: "Can I get a French tip on my natural nails?", a: 'Yes, with a <a href="/services/gel-manicure/">gel manicure</a> or <a href="/services/dip-powder-nails/">dip powder</a>. For extra length, choose <a href="/services/acrylic-nails/">acrylic</a>.' },
    ],
  },
  "nail-art": {
    time: "Simple accents add about 10 to 15 minutes; full-hand detailed designs can add 30 minutes or more",
    lasts: "As long as the set underneath it",
    aftercare: [
      "Rhinestones and 3D accents can catch on fabric for the first day, so be gentle.",
      "A clear top coat refresh helps art stay glossy.",
      "Save a photo of your set if you want the same design again next time.",
    ],
    faqs: [
      { q: "Can you copy a design from a photo?", a: "Yes. Show your tech a screenshot or Pinterest photo and they will match it as closely as possible." },
      { q: "Can I get nail art on short natural nails?", a: 'Yes. Simple designs, lines and accents work on short nails too, like the zebra set in our <a href="/gallery/">gallery</a>.' },
      { q: "Do you do designs on toes?", a: 'Yes. Hand-painted designs and gems can be added during a <a href="/services/pedicure/">pedicure</a>.' },
    ],
  },
  "nail-repair": {
    time: "A single nail repair takes about 10 to 15 minutes; a full redo takes about as long as a new set",
    lasts: "A repaired nail lasts as long as the rest of the set",
    aftercare: [
      "Do not use nail glue at home on a lifted nail. It can trap moisture underneath.",
      "Come in as soon as a nail lifts or cracks so it can be fixed before it breaks.",
      "Keep up with fills to prevent future breaks.",
    ],
    faqs: [
      { q: "Can you fix nails that were done somewhere else?", a: "Yes. We regularly fix and redo sets from other salons, including dip and acrylic sets that came out lumpy or uneven." },
      { q: "Do I need a whole new set if one nail breaks?", a: "Usually not. One broken or lifted nail can be repaired on its own." },
      { q: "What if I do not like my nail art from another salon?", a: 'Bring it in. We can rework the design or start fresh with new <a href="/services/nail-art/">nail art</a>.' },
    ],
  },
  "eyebrow-waxing": {
    time: "About 10 to 15 minutes",
    lasts: "Usually 3 to 5 weeks before regrowth needs a cleanup",
    aftercare: [
      "Skip makeup and heavy creams on the area for the rest of the day.",
      "Avoid hot showers, saunas and direct sun on fresh skin for about a day.",
      "Let brows grow for a few weeks between waxes for the best shape.",
    ],
    faqs: [
      { q: "Can I add eyebrow waxing to my nail appointment?", a: 'Yes. It is a quick add-on to any <a href="/services/classic-manicure/">manicure</a> or <a href="/services/pedicure/">pedicure</a>. Just ask at check-in.' },
      { q: "Will you keep my natural brow shape?", a: "Yes. The goal is to clean up stray hairs and define your natural arch. Tell your tech how full you like your brows." },
      { q: "How often should I wax my eyebrows?", a: "Most people come back every three to five weeks." },
    ],
  },
  "kids-nails": {
    time: "About 15 to 30 minutes",
    lasts: "Regular polish usually lasts several days on kids' nails",
    aftercare: [
      "Give polish a few minutes to set before snacks or play.",
      "Kids' nails grow fast, so a quick polish change every week or two keeps them neat.",
      "Bring them along on your next visit for a matching color.",
    ],
    faqs: [
      { q: "What age can kids get their nails done?", a: "Kids visiting with a parent can get a polish change or a gentle mini manicure. Ask at the front desk if you are not sure what fits your child." },
      { q: "Can my child sit with me during my appointment?", a: 'Yes. Many parents book their own <a href="/services/pedicure/">pedicure</a> and have their child\'s nails done during the same visit.' },
      { q: "What polish do you use for kids?", a: "Kids get regular polish for a simple, gentle polish change." },
    ],
  },
};
