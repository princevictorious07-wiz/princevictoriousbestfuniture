import { useEffect, useState } from "react";
import { Check, Copy, Mail, MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import {
  BUSINESS_INFO,
  formatNaira,
  type FurnitureProduct,
} from "../data/furniture";
import { ResilientImage } from "./ResilientImage";

export interface QuoteItem {
  key: string;
  product: FurnitureProduct;
  finish: string;
  quantity: number;
}

interface QuoteDrawerProps {
  open: boolean;
  items: QuoteItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearAll: () => void;
}

export function QuoteDrawer({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}: QuoteDrawerProps) {
  const [deliveryLocation, setDeliveryLocation] = useState("Wukari Town / FUW Axis");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const summaryLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (${item.finish}) × ${item.quantity} — ${formatNaira(
          item.product.price * item.quantity
        )}`
    )
    .join("\n");

  const fullQuoteText = `Hello ${BUSINESS_INFO.name},\n\nI would like a quote and delivery confirmation for the following furniture:\n${summaryLines}\n\nEstimated Total: ${formatNaira(
    subtotal
  )}\nPreferred Delivery Area: ${deliveryLocation || "Wukari, Taraba State"}\n\nPlease share availability and payment milestones.`;

  const whatsappHref = `https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(
    fullQuoteText
  )}`;

  const emailHref = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
    "Furniture Quote Request - Prince Victorious Best Furnitures"
  )}&body=${encodeURIComponent(fullQuoteText)}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(fullQuoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full w-full max-w-md flex-col justify-between bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E6E0D6] px-6 py-5">
          <div>
            <h3
              id="quote-drawer-title"
              className="font-display text-xl font-bold text-[#2D1B10]"
            >
              Your Quote List
            </h3>
            <p className="text-xs text-[#645A52]">
              Review items and send directly to our workshop
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote list"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#4A3C32] transition-colors hover:bg-[#F3F0EA] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <p className="text-sm font-medium text-[#2D1B10]">
                Your quote list is currently empty.
              </p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-[#645A52]">
                Browse our showroom pieces and add items to build an estimate or send a custom inquiry.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-lg bg-[#2D1B10] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#462B1A] cursor-pointer"
              >
                Browse Showroom
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3.5 rounded-lg border border-[#E6E0D6] bg-[#FAF9F6] p-3"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md bg-[#EAE3D7]">
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold text-[#2D1B10]">
                          {item.product.name}
                        </h4>
                        <p className="truncate text-xs text-[#645A52]">{item.finish}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.key)}
                        aria-label={`Remove ${item.product.name}`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#786D63] transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex h-8 items-center rounded-md border border-[#D8CFC2] bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, -1)}
                          aria-label="Decrease quantity"
                          className="inline-flex h-full w-7 items-center justify-center text-[#2D1B10] hover:bg-[#F3F0EA] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#2D1B10]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, 1)}
                          aria-label="Increase quantity"
                          className="inline-flex h-full w-7 items-center justify-center text-[#2D1B10] hover:bg-[#F3F0EA] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-[#2D1B10]">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <label
                  htmlFor="quote-delivery-location"
                  className="block text-xs font-semibold text-[#2D1B10]"
                >
                  Delivery Area (Optional)
                </label>
                <input
                  id="quote-delivery-location"
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Opposite FUW Exit Gate, Takum, Jalingo"
                  className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3 py-2 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E6E0D6] bg-[#FAF9F6] px-6 py-5">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-semibold text-[#2D1B10]">
                  Estimated Total
                </span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="ml-3 text-xs font-medium text-[#786D63] underline hover:text-[#2D1B10] cursor-pointer"
                >
                  Clear all
                </button>
              </div>
              <span className="text-xl font-bold tabular-nums text-[#2D1B10]">
                {formatNaira(subtotal)}
              </span>
            </div>

            <div className="space-y-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#8C5817] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#754912] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Send Quote via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={emailHref}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#2D1B10] bg-white px-3 text-xs font-semibold text-[#2D1B10] transition-colors hover:bg-[#F3F0EA] whitespace-nowrap"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Email Quote</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#D8CFC2] bg-white px-3 text-xs font-semibold text-[#2D1B10] transition-colors hover:bg-[#F3F0EA] whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy List</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
