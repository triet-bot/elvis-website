// Content for the guide pages and the Spanish landing page. Rendered by build.mjs.

export const guides = [
  {
    slug: "dip-vs-acrylic-vs-gel",
    title: "Dip vs Acrylic vs Gel Nails | Top Creative Nails",
    description: "Dip, acrylic or gel? Compare how long each lasts, how strong it is, whether it adds length and who it suits, from Top Creative Nails in Grand Prairie, TX.",
    h1: "Dip vs acrylic vs gel: which nails are right for you?",
    crumb: "Dip vs acrylic vs gel",
    intro: [
      'Dip powder, acrylic and gel are the three most popular ways to get nails that last longer than regular polish. They look similar when they are done, but they wear differently. Here is how they compare, so you know what to ask for at <a href="/">Top Creative Nails</a> in Grand Prairie.',
    ],
    table: {
      head: ["", "Gel", "Dip powder", "Acrylic"],
      rows: [
        ["Best for", "Glossy color on natural nails", "Strong, chip-resistant natural-length nails", "Length, dramatic shapes and nail art"],
        ["Typical wear", "About 2 to 3 weeks", "About 3 to 4 weeks", "Fills every 2 to 3 weeks"],
        ["Adds length", "No", "Yes, with tips", "Yes, any length"],
        ["Strength", "Flexible, thinner", "Hard and durable", "Hardest, holds long shapes"],
        ["Drying", "Cured under an LED lamp", "Hardens without a lamp", "Air hardens as it is shaped"],
        ["Feel", "Lightest and most natural", "Light", "Thickest"],
      ],
    },
    sections: [
      {
        h2: "Gel: glossy color on your natural nails",
        paras: [
          'A <a href="/services/gel-manicure/">gel manicure</a> is polish that cures under an LED lamp, so it is completely dry before you leave and shines like glass. It is thin and flexible, which makes it feel the most like your own nails. Choose gel when you want color that outlasts regular polish but you do not need extra length.',
        ],
      },
      {
        h2: "Dip powder: strength without the bulk",
        paras: [
          '<a href="/services/dip-powder-nails/">Dip powder</a> builds color in thin layers of powder that harden into a tough, chip-resistant finish. It is a favorite for people who work with their hands. Dip can be done on natural nails, or with tips for added length. One of our clients told us her powder nails were the strongest she had ever worn.',
        ],
      },
      {
        h2: "Acrylic: length, shape and room for art",
        paras: [
          '<a href="/services/acrylic-nails/">Acrylic</a> is the go-to for long coffins, almonds and stilettos. It is the strongest option for length and gives the most room for <a href="/services/nail-art/">nail art</a>, chrome and rhinestones. Acrylic sets need a fill every two to three weeks as your nails grow out.',
        ],
      },
      {
        h2: "Still not sure?",
        paras: [
          'Tell your tech how long you want your nails, how hard you are on your hands and how often you want to come back. They will recommend the best fit. Want a <a href="/services/french-tip-nails/">French tip</a>? It works on all three. Browse our <a href="/gallery/">gallery</a> for ideas, then call or walk in.',
        ],
      },
    ],
    faqs: [
      { q: "Which lasts longest: dip, acrylic or gel?", a: "Dip powder usually wears the longest between visits, often three to four weeks. Acrylic lasts as long as you keep up with fills every two to three weeks. Gel typically lasts about two to three weeks." },
      { q: "Which is best for long nails?", a: 'Acrylic is the best choice for long, dramatic shapes like coffin and stiletto. See our <a href="/services/acrylic-nails/">acrylic nails</a> page.' },
      { q: "Can I switch from acrylic to dip or gel?", a: "Yes. Your tech can remove your current set and start fresh with a different option. Mention it when you call so we can plan the time." },
    ],
  },
];

// Spanish landing page (/es/). Grand Prairie has a large Spanish-speaking community.
export const spanish = {
  title: "Salón de uñas en Grand Prairie, TX | Top Creative Nails",
  description: "Salón de uñas en 830 Mayfield Rd, Grand Prairie, TX. Uñas acrílicas, dip, gel, pedicure, diseños de uñas y depilación de cejas. Sin cita previa. (972) 264-2744.",
  h1: "Salón de uñas en Grand Prairie, TX",
  intro: [
    "Top Creative Nails es un salón de uñas en 830 Mayfield Rd, Suite 500, Grand Prairie, TX 75052. Hacemos uñas acrílicas, dip powder, manicure de gel, pedicure en sillas de spa con masaje, puntas francesas y diseños de uñas a partir de la foto que traigas.",
    "Puedes llegar sin cita de lunes a sábado, o llamar al (972) 264-2744 para reservar una hora.",
  ],
  services: [
    { name: "Uñas acrílicas", slug: "acrylic-nails", text: "Juegos completos y rellenos, en cualquier largo y forma: coffin, almendra, stiletto o cuadrada." },
    { name: "Dip powder", slug: "dip-powder-nails", text: "Color fuerte y duradero, con o sin extensiones." },
    { name: "Manicure de gel", slug: "gel-manicure", text: "Color de gel curado con lámpara LED, seco antes de salir." },
    { name: "Manicure clásico", slug: "classic-manicure", text: "Forma, cuidado de cutícula, masaje de manos y esmalte." },
    { name: "Pedicure", slug: "pedicure", text: "Remojo en silla de spa con masaje, cuidado de uñas y talones, masaje y esmalte." },
    { name: "Puntas francesas", slug: "french-tip-nails", text: "Francesa clásica, profunda, de color o cromada." },
    { name: "Diseños de uñas", slug: "nail-art", text: "Diseños pintados a mano, mármol, cromo, glitter y pedrería." },
    { name: "Reparación de uñas", slug: "nail-repair", text: "Arreglamos uñas rotas y juegos hechos en otro salón." },
    { name: "Depilación de cejas", slug: "eyebrow-waxing", text: "Rápida, para agregar a tu manicure o pedicure." },
    { name: "Uñas para niños", slug: "kids-nails", text: "Cambio de esmalte o mini manicure mientras tú te arreglas las uñas." },
  ],
  hours: [
    ["Lunes a jueves", "10 AM a 7 PM"],
    ["Viernes y sábado", "9 AM a 7 PM"],
    ["Domingo", "Cerrado"],
  ],
  faqs: [
    { q: "¿Necesito cita?", a: "No. Aceptamos clientes sin cita durante el horario de atención. Los fines de semana hay más gente, así que llama al (972) 264-2744 si quieres una hora fija." },
    { q: "¿Cuánto cuesta un juego de uñas acrílicas?", a: "El precio depende del largo, la forma y el diseño. Llama o pregunta en recepción por el precio del día." },
    { q: "¿Pueden arreglar uñas hechas en otro salón?", a: "Sí. Con frecuencia arreglamos o rehacemos juegos de otros salones." },
    { q: "¿Puedo traer una foto del diseño que quiero?", a: "Sí. Muéstrale la foto a tu técnica y la haremos lo más parecido posible." },
  ],
};
