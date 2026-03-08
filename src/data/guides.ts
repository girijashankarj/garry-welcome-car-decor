export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: 'ppf-vs-vinyl-wrap',
    title: 'PPF vs Vinyl Wrap: Which is Right for Your Car?',
    description: 'Compare PPF (paint protection film) and vinyl wrap. Pros, cons, cost, and when to choose each for your car in India.',
    content: `
PPF (Paint Protection Film) and vinyl wrap both protect and change your car's appearance, but they serve different purposes.

**PPF (Paint Protection Film)**
- Transparent or matte film that protects the original paint
- Self-healing properties – minor scratches disappear with heat
- 8–10 year warranty on premium brands like Aegis, UltrashieldX
- Best for: preserving resale value, protecting against stone chips, UV damage
- Cost: ₹38,000–₹52,000+ for full car

**Vinyl Wrap**
- Coloured film that changes the look of your car
- Matte, gloss, or textured finishes
- Easier to remove; typically 3–5 year lifespan
- Best for: custom looks, temporary colour change, accents
- Cost: ₹25,000+ for full wrap

**When to choose PPF:** You want to protect your car's paint and maintain its original look. Ideal for new cars or high-value vehicles.

**When to choose vinyl:** You want a new colour or finish without repainting. Good for older cars or custom styling.

At Welcome Car Decor, we offer both PPF and vinyl wrap. We deliver all over India and provide installation at our Pune location. Contact us for a quote.
    `.trim(),
  },
  {
    slug: 'best-dash-cam-budget',
    title: 'Best Dash Cam Under ₹5000 – Buying Guide 2026',
    description: 'Top dash cam picks under ₹5000 in India. Features to look for, 70mai and Toreto options, night vision, parking mode.',
    content: `
A good dash cam under ₹5000 can record your drives, help with insurance claims, and provide peace of mind. Here's what to look for.

**Key features**
- **1080p Full HD** – Minimum for readable number plates
- **Night vision** – WDR or HDR for low-light clarity
- **Loop recording** – Overwrites old footage automatically
- **G-sensor** – Saves footage on impact (parking mode)
- **Wide angle** – 120°–140° for good coverage

**Top brands we stock**
- **70mai** – Reliable, good app, parking mode
- **Toreto** – Value for money, dual channel options
- **Metaflix** – Budget-friendly with essential features

**Installation**
We can help with dash cam selection and installation. Hardwiring for parking mode is available at our Pune store.

**Delivery**
We ship dash cams all over India. COD available for select areas. Contact us on WhatsApp or visit our store in Kasarwadi, Pune.
    `.trim(),
  },
  {
    slug: 'car-accessories-pune',
    title: 'Car Accessories in Pune – PPF, Chargers, Dash Cams',
    description: 'Welcome Car Decor – your car accessories dealer in Pune. PPF, filming, chargers, headlights, dash cams. Kasarwadi, delivery all over India.',
    content: `
Welcome Car Decor is your trusted car accessories dealer in Pune. Located near Bhandari Petrol Pump, Mumbai-Pune Road, Kasarwadi, we serve Pune and all of India.

**What we offer**
- **PPF & vinyl wrap** – Aegis, UltrashieldX, Ultraguard, Metaflix. Installation at our Pune location.
- **Car chargers** – Toreto, UBON fast chargers. 65W to 145W options.
- **LED headlights** – Metaflix 200W, 260W kits. DRL strips.
- **Dash cams** – 70mai, Toreto. Front and dual channel.
- **Speakers** – JBL coaxial and component sets.
- **Accessories** – Organisers, sunshades, holders, vacuum cleaners.

**Visit us**
Near Bhandari Petrol Pump, Mumbai-Pune Road, Kasarwadi, Pune-411034

**Delivery**
We deliver in Pune and surrounding areas. We also ship all over India via courier.

**Contact**
WhatsApp: +91 8888770071 | Phone: +91 8888770071

We're open for collaboration and provide references for insurance, garages, and car services.
    `.trim(),
  },
  {
    slug: 'how-to-choose-led-headlights',
    title: 'How to Choose LED Headlights for Your Car',
    description: 'LED headlight buying guide – wattage, beam pattern, installation. Metaflix, Toreto options. Car headlights India.',
    content: `
Upgrading to LED headlights improves visibility and gives your car a modern look. Here's how to choose.

**Wattage**
- **60–90W** – Good for city driving, budget-friendly
- **120–150W** – Balanced brightness, most popular
- **200W+** – Maximum output, best for highway and rural roads

**Beam pattern**
- **DOT approved** – Legal for road use in India
- **Low beam + high beam** – Versatile for all conditions
- **DRL (Daytime Running Light)** – Adds visibility and style

**Brands we stock**
- **Metaflix** – 200W and 260W kits, good value
- **Toreto** – DRL strips, various options

**Installation**
LED headlights need proper alignment. We offer installation at our Pune store. Incorrect alignment can dazzle other drivers.

**Warranty**
Most LED kits come with 1–2 year warranty. We share details at purchase.

**Delivery**
We ship LED headlights all over India. Contact us for compatibility with your car model.
    `.trim(),
  },
  {
    slug: 'car-charger-buying-guide',
    title: 'Car Charger Buying Guide – Fast Charging for Your Phone',
    description: 'How to choose a car charger. Wattage, USB-C, SuperVOOC, dual port. Toreto, UBON options. Car charger India.',
    content: `
A good car charger keeps your phone charged on the go. Here's what to consider.

**Wattage**
- **18–30W** – Basic charging, older phones
- **65W** – Fast charging for most smartphones
- **100W+** – Laptops, tablets, multiple devices

**Ports**
- **Single USB-C** – Simplest, one device
- **Dual port** – USB-C + USB-A for multiple devices
- **Multi-port** – 3–4 devices, higher wattage

**Fast charging support**
- **SuperVOOC / VOOC** – Oppo, Realme, OnePlus
- **Flash Charge** – Vivo, iQOO
- **PD (Power Delivery)** – iPhone, Samsung, laptops

**Brands we stock**
- **Toreto** – 145W dual port, SuperVOOC support
- **UBON** – 65W fast charger, wireless charger mounts

**Wireless car charger**
For cable-free charging, we have UBON wireless charger mounts. Qi compatible.

**Delivery**
We deliver car chargers all over India. COD available. Visit our store in Kasarwadi, Pune, or order online.
    `.trim(),
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
