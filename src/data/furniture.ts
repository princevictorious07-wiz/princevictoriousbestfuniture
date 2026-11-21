import heroLivingImg from "../assets/images/hero_royal_living_1795220138083.jpg";
import prodRoyalSofaImg from "../assets/images/prod_royal_sofa_1795220138476.jpg";
import prodKingBedImg from "../assets/images/prod_king_bed_1795220138156.jpg";
import prodDiningSixImg from "../assets/images/prod_dining_six_1795220139320.jpg";
import prodExecDeskImg from "../assets/images/prod_exec_desk_1795220140183.jpg";
import prodWardrobeImg from "../assets/images/prod_sliding_wardrobe_1795220138077.jpg";
import prodTvConsoleImg from "../assets/images/prod_tv_console_1795220139316.jpg";
import prodStudyDeskImg from "../assets/images/prod_study_desk_1795220140260.jpg";
import prodMarbleDiningImg from "../assets/images/prod_marble_dining_1795220138970.jpg";
import aboutWorkshopImg from "../assets/images/about_wood_workshop_1795220138595.jpg";

export const BUSINESS_INFO = {
  name: "Prince Victorious Best Furnitures",
  shortName: "Prince Victorious",
  whatsappDigits: "2348067711844",
  phoneDisplay: "080-677-11844",
  phoneHref: "tel:08067711844",
  email: "princevictorious07@gmail.com",
  address:
    "Along Kasinala Road, opposite Federal University, Wukari LGA, Exit Gate, Taraba State.",
  hours: "Monday – Saturday: 8:00 AM – 6:30 PM",
  mapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=Federal+University+Wukari,+Taraba+State,+Nigeria",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Federal+University+Wukari,+Taraba+State,+Nigeria&output=embed",
};

export const MEDIA_ASSETS = {
  heroLiving: heroLivingImg,
  aboutWorkshop: aboutWorkshopImg,
};

export type FurnitureCategory = "all" | "living" | "bedroom" | "dining" | "office";

export interface FurnitureProduct {
  id: number;
  name: string;
  category: Exclude<FurnitureCategory, "all">;
  categoryLabel: string;
  price: number;
  wood: string;
  dimensions: string;
  leadTime: string;
  finishes: string[];
  desc: string;
  image: string;
}

export const CATEGORY_OPTIONS: { id: FurnitureCategory; label: string }[] = [
  { id: "all", label: "All Furniture" },
  { id: "living", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining Sets" },
  { id: "office", label: "Office & Study" },
];

export const FURNITURE_PRODUCTS: FurnitureProduct[] = [
  {
    id: 1,
    name: "Royal 7-Seater Velvet Sofa Set",
    category: "living",
    categoryLabel: "Living Room",
    price: 480000,
    wood: "Mahogany Frame",
    dimensions: "3 + 2 + 1 + 1 Configuration",
    leadTime: "7–10 working days",
    finishes: ["Royal Navy Velvet", "Emerald Green Velvet", "Warm Champagne", "Cognac Leatherette"],
    desc: "Plush high-density foam cushions wrapped in stain-resistant velvet with solid carved hardwood legs.",
    image: prodRoyalSofaImg,
  },
  {
    id: 2,
    name: "King-Size Tufted Bed Frame",
    category: "bedroom",
    categoryLabel: "Bedroom",
    price: 260000,
    wood: "Seasoned Iroko",
    dimensions: "6ft × 6ft (180 × 180 cm)",
    leadTime: "5–7 working days",
    finishes: ["Cream Linen / Iroko", "Charcoal Velvet / Walnut", "Warm Sand / Mahogany"],
    desc: "6x6 luxury upholstered headboard bed with reinforced orthopedic slats and optional under-bed drawers.",
    image: prodKingBedImg,
  },
  {
    id: 3,
    name: "6-Seater Solid Wood Dining Set",
    category: "dining",
    categoryLabel: "Dining Sets",
    price: 340000,
    wood: "Teak & Mahogany",
    dimensions: "180 × 95 × 76 cm Table + 6 Chairs",
    leadTime: "7–10 working days",
    finishes: ["High-Gloss Teak / Charcoal", "Satin Mahogany / Cream", "Dark Walnut / Taupe"],
    desc: "Gloss-finished family dining table paired with six ergonomic padded hardwood dining chairs.",
    image: prodDiningSixImg,
  },
  {
    id: 4,
    name: "Executive Office Desk & Credenza",
    category: "office",
    categoryLabel: "Office & Study",
    price: 210000,
    wood: "Laminated Hardwood",
    dimensions: "180 × 85 × 75 cm Desk + Side Return",
    leadTime: "5–7 working days",
    finishes: ["Rich Walnut", "Espresso Mahogany", "Natural Teak"],
    desc: "Spacious 1.8m executive table with lockable drawers, concealed cable grommets, and side storage cabinet.",
    image: prodExecDeskImg,
  },
  {
    id: 5,
    name: "3-Door Sliding Wardrobe with Mirror",
    category: "bedroom",
    categoryLabel: "Bedroom",
    price: 295000,
    wood: "Treated Marine & Hardwood",
    dimensions: "180 × 60 × 210 cm",
    leadTime: "7–10 working days",
    finishes: ["Warm Teak", "Dark Walnut", "Natural Oak Finish"],
    desc: "Spacious interior compartments, heavy-duty hanging rails, lower shoe rack, and full-length dressing mirror.",
    image: prodWardrobeImg,
  },
  {
    id: 6,
    name: "Modern Floating TV Console & Shelf",
    category: "living",
    categoryLabel: "Living Room",
    price: 135000,
    wood: "Walnut Finish",
    dimensions: "200 × 38 × 32 cm (Fits up to 75\" TV)",
    leadTime: "3–5 working days",
    finishes: ["Satin Walnut", "Dark Mahogany", "Matte Espresso"],
    desc: "Sleek wall-mounted entertainment unit built for large screens with concealed cable channels and wall shelf.",
    image: prodTvConsoleImg,
  },
  {
    id: 7,
    name: "Student & Lodge Reading Desk & Chair",
    category: "office",
    categoryLabel: "Office & Study",
    price: 65000,
    wood: "Solid Hardwood",
    dimensions: "110 × 55 × 145 cm (with Hutch)",
    leadTime: "2–4 working days",
    finishes: ["Natural Mahogany", "Honey Oak", "Dark Walnut"],
    desc: "Compact, heavy-duty study desk with bookshelf cubby and matching timber chair—ideal for FUW students and home study.",
    image: prodStudyDeskImg,
  },
  {
    id: 8,
    name: "4-Seater Marble-Top Dining Set",
    category: "dining",
    categoryLabel: "Dining Sets",
    price: 230000,
    wood: "Hardwood Base",
    dimensions: "135 × 85 × 76 cm Table + 4 Chairs",
    leadTime: "5–8 working days",
    finishes: ["White Carrara / Mahogany", "Cream Vein / Walnut"],
    desc: "Compact luxury 4-seater marble-top dining table resting on a sculpted solid hardwood pedestal base.",
    image: prodMarbleDiningImg,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Prince Victorious built my 7-seater living room sofa and TV console. The wood quality and neat upholstery exceeded my expectations.",
    author: "Engr. Musa T.",
    role: "Homeowner, Wukari",
  },
  {
    quote:
      "Very accessible right opposite FUW Exit Gate. They delivered a sturdy reading desk and wardrobe to my lodge right on schedule.",
    author: "Chidinma O.",
    role: "Student, Federal University Wukari",
  },
  {
    quote:
      "Professional finishing on our executive office tables and conference chairs. Highly recommended anywhere in Taraba State.",
    author: "Pastor Danjuma K.",
    role: "Ministry Administrator, Taraba State",
  },
];

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}
