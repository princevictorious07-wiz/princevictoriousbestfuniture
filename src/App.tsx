import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Hammer,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Search,
  Star,
  Truck,
  GraduationCap,
} from "lucide-react";
import {
  BUSINESS_INFO,
  CATEGORY_OPTIONS,
  FURNITURE_PRODUCTS,
  MEDIA_ASSETS,
  TESTIMONIALS,
  formatNaira,
  type FurnitureCategory,
  type FurnitureProduct,
} from "./data/furniture";
import { Header } from "./components/Header";
import { ResilientImage } from "./components/ResilientImage";
import { QuoteDrawer, type QuoteItem } from "./components/QuoteDrawer";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CustomOrderSection } from "./components/CustomOrderSection";

type SortMode = "featured" | "price-asc" | "price-desc";

const CRAFT_PILLARS = [
  {
    icon: Hammer,
    title: "Solid Hardwood Craft",
    description:
      "Built with seasoned, termite-resistant mahogany, teak, and iroko timber.",
  },
  {
    icon: Ruler,
    title: "Custom Measurements",
    description:
      "Tailored to your exact room dimensions, upholstery fabric, and wood polish.",
  },
  {
    icon: Truck,
    title: "Safe Delivery & Setup",
    description:
      "Reliable doorstep delivery and installation across Wukari and Taraba State.",
  },
  {
    icon: GraduationCap,
    title: "Home, Office & Student",
    description:
      "Luxury home suites, executive desks, and durable FUW hostel furnishings.",
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FurnitureCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<FurnitureProduct | null>(null);

  const totalQuoteCount = useMemo(
    () => quoteItems.reduce((sum, item) => sum + item.quantity, 0),
    [quoteItems]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const list = FURNITURE_PRODUCTS.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.wood.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });

    if (sortMode === "price-asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortMode === "price-desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortMode]);

  const handleAddToQuote = (
    product: FurnitureProduct,
    finish = product.finishes[0] ?? "Standard Finish",
    quantity = 1
  ) => {
    const key = `${product.id}::${finish}`;
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { key, product, finish, quantity }];
    });
    setDrawerOpen(true);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setQuoteItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearAll = () => {
    setQuoteItems([]);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#221C18]">
      <Header
        quoteCount={totalQuoteCount}
        onOpenQuote={() => setDrawerOpen(true)}
      />

      <main>
        {/* Hero Split */}
        <section
          id="home"
          className="border-b border-[#E6E0D6] bg-gradient-to-br from-[#F7F4EE] via-[#FAF9F6] to-[#EFEAE0]"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8C5817]">
                  Wukari, Taraba State · Opposite FUW Exit Gate
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-[#2D1B10] [text-wrap:balance]">
                  Timeless Furniture Built for Comfort, Class &amp; Durability
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#574C44]">
                  Welcome to{" "}
                  <strong className="font-semibold text-[#2D1B10]">
                    {BUSINESS_INFO.name}
                  </strong>
                  . From royal living room sofas and executive office desks to
                  bespoke wardrobes and student reading sets, every piece is
                  crafted from seasoned hardwood to fit your space.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#catalog"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-[#2D1B10] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#462B1A] whitespace-nowrap shrink-0"
                  >
                    Explore Showroom
                  </a>
                  <a
                    href="#custom"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-[#8C5817] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#754912] whitespace-nowrap shrink-0"
                  >
                    Request Custom Design
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#2D1B10] bg-transparent px-5 text-sm font-semibold text-[#2D1B10] transition-colors duration-150 hover:bg-[#2D1B10] hover:text-white whitespace-nowrap shrink-0"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-[#E6E0D6] bg-[#EAE3D7] shadow-lg lg:min-h-[460px]">
                  <ResilientImage
                    src={MEDIA_ASSETS.heroLiving}
                    alt="Luxury handcrafted living room sofa suite by Prince Victorious Best Furnitures"
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-6 text-white">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#E3B46F]">
                          100% Seasoned Hardwood
                        </p>
                        <p className="mt-1 text-sm font-medium text-white/95">
                          Delivered across Wukari &amp; Taraba State
                        </p>
                      </div>
                      <a
                        href="#catalog"
                        className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-[#2D1B10] transition-colors hover:bg-[#F3F0EA] whitespace-nowrap shrink-0"
                      >
                        <span>View Catalog</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Craft Pillars Row */}
            <div className="mt-12 grid gap-6 border-t border-[#E6E0D6] pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {CRAFT_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E6E0D6] bg-white text-[#8C5817]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-sans text-sm font-semibold text-[#2D1B10]">
                        {pillar.title}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-[#645A52]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Showroom Catalog */}
        <section id="catalog" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C5817]">
                Showroom Collection
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#2D1B10] sm:text-4xl [text-wrap:balance]">
                Crafted Pieces Ready to Order
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#645A52] sm:text-base">
                Select pieces to add to your Quote List, customize wood polish or upholstery, and inquire directly via WhatsApp or Email.
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div
                className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E6E0D6] bg-[#F3F0EA] p-1"
                role="tablist"
                aria-label="Filter furniture by category"
              >
                {CATEGORY_OPTIONS.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-9 rounded-md px-3.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? "bg-[#2D1B10] text-white shadow-sm"
                          : "text-[#574C44] hover:bg-white/70 hover:text-[#2D1B10]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#786D63]"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search furniture catalog"
                    placeholder="Search sofa, bed, wardrobe, desk..."
                    className="h-10 w-full rounded-lg border border-[#D8CFC2] bg-white pl-10 pr-4 text-sm text-[#221C18] placeholder:text-[#8A7F75] focus:border-[#9A631D] focus:outline-none sm:w-64"
                  />
                </div>

                <select
                  aria-label="Sort furniture"
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="h-10 rounded-lg border border-[#D8CFC2] bg-white px-3 text-xs font-semibold text-[#2D1B10] focus:border-[#9A631D] focus:outline-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="mt-10 rounded-xl border border-[#E6E0D6] bg-white p-12 text-center">
                <p className="text-base font-semibold text-[#2D1B10]">
                  No showroom pieces matched "{searchQuery}".
                </p>
                <p className="mt-1.5 text-sm text-[#645A52]">
                  Clear your search filter or send us your exact specifications in the Custom Orders section below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-5 rounded-lg bg-[#2D1B10] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#462B1A] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
                  const quickOrderHref = `https://wa.me/${
                    BUSINESS_INFO.whatsappDigits
                  }?text=${encodeURIComponent(
                    `Hello ${BUSINESS_INFO.name}, I am interested in ordering: ${product.name} (${formatNaira(
                      product.price
                    )}).`
                  )}`;

                  return (
                    <article
                      key={product.id}
                      className="group flex flex-col overflow-hidden rounded-xl border border-[#E6E0D6] bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveProduct(product)}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F0EA] text-left cursor-pointer"
                        aria-label={`View details for ${product.name}`}
                      >
                        <ResilientImage
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </button>

                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#645A52]">
                            <span>{product.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.wood}</span>
                          </div>

                          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#2D1B10]">
                            <button
                              type="button"
                              onClick={() => setActiveProduct(product)}
                              className="text-left hover:text-[#8C5817] cursor-pointer"
                            >
                              {product.name}
                            </button>
                          </h3>

                          <p className="mt-1.5 text-sm leading-relaxed text-[#645A52]">
                            {product.desc}
                          </p>
                        </div>

                        <div className="mt-5 border-t border-[#EFEAE0] pt-4">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-lg font-bold tabular-nums text-[#2D1B10]">
                              {formatNaira(product.price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveProduct(product)}
                              className="text-xs font-semibold text-[#8C5817] underline-offset-4 hover:underline cursor-pointer"
                            >
                              View specs
                            </button>
                          </div>

                          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleAddToQuote(product)}
                              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#2D1B10] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#462B1A] whitespace-nowrap cursor-pointer"
                            >
                              + Add to Quote
                            </button>
                            <a
                              href={quickOrderHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#8C5817] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#754912] whitespace-nowrap"
                            >
                              Order Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Custom Orders */}
        <CustomOrderSection />

        {/* Workshop Story & Adjacent Client Proof */}
        <section id="about" className="border-b border-[#E6E0D6] bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-stretch gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="h-full min-h-[300px] overflow-hidden rounded-xl border border-[#E6E0D6] bg-[#F3F0EA]">
                  <ResilientImage
                    src={MEDIA_ASSETS.aboutWorkshop}
                    alt="Master carpenter inspecting seasoned mahogany joinery at Prince Victorious Best Furnitures"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8C5817]">
                  Our Wukari Workshop
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-[#2D1B10] sm:text-4xl [text-wrap:balance]">
                  Craftsmanship You Can Trust in Every Joint and Polish Coat
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#574C44] sm:text-base">
                  Located{" "}
                  <strong className="font-semibold text-[#2D1B10]">
                    {BUSINESS_INFO.address}
                  </strong>{" "}
                  Prince Victorious Best Furnitures combines seasoned Nigerian
                  woodworking skill with clean modern proportions.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#574C44] sm:text-base">
                  Every frame joint, high-density foam cushion, and satin wood
                  finish is inspected before leaving our workshop so your home,
                  office, or lodge stands out with lasting strength.
                </p>

                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E6E0D6] pt-6">
                  <div>
                    <dt className="text-xs text-[#645A52]">Pieces Delivered</dt>
                    <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-[#2D1B10]">
                      500+
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#645A52]">Seasoned Timber</dt>
                    <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-[#2D1B10]">
                      100%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#645A52]">Client Rating</dt>
                    <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-[#2D1B10]">
                      4.9 / 5
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Client Testimonials */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between rounded-xl border border-[#E6E0D6] bg-[#FAF9F6] p-6"
                >
                  <div>
                    <div
                      className="flex items-center gap-0.5 text-[#9A631D]"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-3.5 text-sm leading-relaxed text-[#3A302A]">
                      "{item.quote}"
                    </p>
                  </div>
                  <footer className="mt-5 border-t border-[#E6E0D6] pt-3.5">
                    <cite className="block text-sm font-semibold not-italic text-[#2D1B10]">
                      {item.author}
                    </cite>
                    <span className="text-xs text-[#645A52]">{item.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section id="contact" className="bg-[#F3F0EA] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C5817]">
                Showroom &amp; Workshop
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#2D1B10] sm:text-4xl [text-wrap:balance]">
                Visit Our Showroom or Get in Touch
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#645A52] sm:text-base">
                Stop by our workshop to inspect timber samples and finished
                pieces in person, or contact us directly for measurements.
              </p>
            </div>

            <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
              <div className="flex flex-col justify-between rounded-xl border border-[#E6E0D6] bg-white p-6 sm:p-8 lg:col-span-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2D1B10]">
                    Contact Information
                  </h3>

                  <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EA] text-[#2D1B10]">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#645A52]">
                          Showroom Address
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#221C18]">
                          {BUSINESS_INFO.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EA] text-[#2D1B10]">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#645A52]">
                          Phone &amp; WhatsApp
                        </p>
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="mt-1 inline-block text-sm font-semibold tabular-nums text-[#2D1B10] hover:text-[#8C5817]"
                        >
                          {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EA] text-[#2D1B10]">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#645A52]">
                          Email Address
                        </p>
                        <a
                          href={`mailto:${BUSINESS_INFO.email}`}
                          className="mt-1 inline-block break-all text-sm font-semibold text-[#2D1B10] hover:text-[#8C5817]"
                        >
                          {BUSINESS_INFO.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EA] text-[#2D1B10]">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#645A52]">
                          Opening Hours
                        </p>
                        <p className="mt-1 text-sm text-[#221C18]">
                          {BUSINESS_INFO.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2D1B10] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#462B1A] whitespace-nowrap"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(
                      "Hello Prince Victorious Best Furnitures, I would like to make an inquiry."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#8C5817] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#754912] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl border border-[#E6E0D6] bg-white lg:col-span-7">
                <iframe
                  title="Location Map - Federal University Wukari, Taraba State"
                  src={BUSINESS_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full flex-1 border-0 lg:min-h-[420px]"
                />
                <div className="flex items-center justify-between border-t border-[#E6E0D6] bg-[#FAF9F6] px-5 py-3 text-xs">
                  <span className="font-medium text-[#574C44]">
                    Opposite Federal University Wukari Exit Gate
                  </span>
                  <a
                    href={BUSINESS_INFO.mapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#8C5817] hover:underline whitespace-nowrap"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1D120B] py-14 text-[#D6C9BA]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-xl font-bold text-white">
                {BUSINESS_INFO.name}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#BFB0A0]">
                Crafting durable, elegant, and custom-made solid wood furniture
                for homes, offices, and institutions across Wukari and Taraba
                State.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Quick Links
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-[#E3B46F]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-[#E3B46F]">
                    Furniture Catalog
                  </a>
                </li>
                <li>
                  <a href="#custom" className="hover:text-[#E3B46F]">
                    Custom Orders
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#E3B46F]">
                    Workshop
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#E3B46F]">
                    Contact &amp; Location
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Reach Us
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#BFB0A0]">
                <li>{BUSINESS_INFO.address}</li>
                <li>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="tabular-nums text-white hover:text-[#E3B46F]"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="break-all text-white hover:text-[#E3B46F]"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-[#9E8F80]">
            &copy; {currentYear} {BUSINESS_INFO.name}. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Compact Floating WhatsApp Action */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(
          "Hello Prince Victorious Best Furnitures, I visited your website and want to inquire about furniture."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Prince Victorious Best Furnitures on WhatsApp"
        className="fixed bottom-4 right-4 z-30 inline-flex h-11 items-center gap-2 rounded-full bg-[#15803D] px-4 text-xs font-semibold text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#166534] whitespace-nowrap"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>WhatsApp Us</span>
      </a>

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToQuote={handleAddToQuote}
      />

      <QuoteDrawer
        open={drawerOpen}
        items={quoteItems}
        onClose={() => setDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
