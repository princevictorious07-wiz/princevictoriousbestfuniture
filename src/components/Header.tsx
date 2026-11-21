import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BUSINESS_INFO } from "../data/furniture";

interface HeaderProps {
  quoteCount: number;
  onOpenQuote: () => void;
}

const NAV_LINKS = [
  { href: "#catalog", label: "Showroom" },
  { href: "#custom", label: "Custom Orders" },
  { href: "#about", label: "Workshop" },
  { href: "#contact", label: "Contact" },
];

export function Header({ quoteCount, onOpenQuote }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E0D6] bg-[#FAF9F6]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-[#2D1B10] whitespace-nowrap shrink-0"
        >
          {BUSINESS_INFO.shortName}
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent py-1 text-sm font-medium text-[#4A3C32] transition-colors duration-150 hover:border-[#9A631D] hover:text-[#2D1B10] whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenQuote}
            aria-label={`Open quote list with ${quoteCount} items`}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2D1B10] px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#462B1A] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-[#E3B46F]" aria-hidden="true" />
            <span>Quote List</span>
            <span className="tabular-nums text-xs font-bold text-[#E3B46F]">
              ({quoteCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D8CFC2] bg-white text-[#2D1B10] transition-colors hover:bg-[#F3F0EA] md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E6E0D6] bg-white px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#2D1B10] transition-colors hover:bg-[#F3F0EA]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
