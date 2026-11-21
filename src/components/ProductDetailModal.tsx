import { useEffect, useState } from "react";
import { MessageCircle, Minus, Plus, X } from "lucide-react";
import {
  BUSINESS_INFO,
  formatNaira,
  type FurnitureProduct,
} from "../data/furniture";
import { ResilientImage } from "./ResilientImage";

interface ProductDetailModalProps {
  product: FurnitureProduct | null;
  onClose: () => void;
  onAddToQuote: (product: FurnitureProduct, finish: string, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToQuote,
}: ProductDetailModalProps) {
  const [selectedFinish, setSelectedFinish] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0] ?? "Standard Showroom Finish");
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeFinish = selectedFinish || product.finishes[0] || "Standard Finish";
  const whatsappText = `Hello ${BUSINESS_INFO.name}, I would like to order ${quantity}x ${product.name} (${activeFinish}) listed at ${formatNaira(product.price)}. Please confirm availability and delivery details.`;
  const whatsappHref = `https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(
    whatsappText
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative grid w-full max-w-3xl overflow-hidden rounded-xl border border-[#E6E0D6] bg-white shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-[#2D1B10] shadow-sm transition-colors hover:bg-[#F3F0EA] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-[4/3] bg-[#F3F0EA] md:aspect-auto md:h-full">
          <ResilientImage
            src={product.image}
            alt={product.name}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#645A52]">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{product.wood}</span>
            </div>

            <h3
              id="pdp-modal-title"
              className="mt-2 font-display text-2xl font-bold text-[#2D1B10]"
            >
              {product.name}
            </h3>

            <p className="mt-2 text-xl font-bold tabular-nums text-[#2D1B10]">
              {formatNaira(product.price)}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[#574C44]">
              {product.desc}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-[#E6E0D6] py-3.5 text-xs">
              <div>
                <dt className="text-[#786D63]">Dimensions</dt>
                <dd className="mt-0.5 font-semibold text-[#2D1B10]">
                  {product.dimensions}
                </dd>
              </div>
              <div>
                <dt className="text-[#786D63]">Build Time</dt>
                <dd className="mt-0.5 font-semibold text-[#2D1B10]">
                  {product.leadTime}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <label
                htmlFor="finish-select"
                className="block text-xs font-semibold text-[#2D1B10]"
              >
                Preferred Polish / Fabric Finish
              </label>
              <select
                id="finish-select"
                value={activeFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
              >
                {product.finishes.map((finish) => (
                  <option key={finish} value={finish}>
                    {finish}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex h-11 items-center rounded-lg border border-[#D8CFC2] bg-[#FAF9F6]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="inline-flex h-full w-10 items-center justify-center text-[#2D1B10] hover:bg-[#EFE9E0] cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#2D1B10]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="inline-flex h-full w-10 items-center justify-center text-[#2D1B10] hover:bg-[#EFE9E0] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToQuote(product, activeFinish, quantity);
                  onClose();
                }}
                className="h-11 flex-1 rounded-lg bg-[#2D1B10] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#462B1A] whitespace-nowrap cursor-pointer"
              >
                Add to Quote List
              </button>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#2D1B10] bg-white px-5 text-sm font-semibold text-[#2D1B10] transition-colors hover:bg-[#F3F0EA] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Order Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
