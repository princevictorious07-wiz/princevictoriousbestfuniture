import { useState, type FormEvent } from "react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "../data/furniture";

const CUSTOM_CATEGORIES = [
  "Living Room Sofa Set",
  "Bed Frame & Wardrobe",
  "Dining Table Set",
  "Office Desk & Chair",
  "Kitchen Cabinets & Doors",
  "Other Custom Woodwork",
];

const WORKSHOP_GUARANTEES = [
  "Choose your preferred velvet, leatherette, or wood polish shade",
  "Complimentary measurement & consultation within Wukari",
  "Transparent milestone pricing with written workshop receipt",
  "Fast turnaround and neat edge finishing",
];

export function CustomOrderSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(CUSTOM_CATEGORIES[0]);
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [preparedMode, setPreparedMode] = useState<"whatsapp" | "email" | null>(null);

  const buildMessage = () => {
    return `Hello ${BUSINESS_INFO.name},\n\nCustom Furniture Request\nName: ${name.trim()}\nPhone: ${phone.trim()}\nCategory: ${category}\nEstimated Budget: ${
      budget.trim() || "Not specified"
    }\nDetails: ${details.trim()}`;
  };

  const isValid = name.trim().length > 0 && phone.trim().length > 0 && details.trim().length > 0;

  const whatsappHref = `https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(
    buildMessage()
  )}`;
  const emailHref = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
    `Custom Furniture Inquiry from ${name.trim() || "Client"}`
  )}&body=${encodeURIComponent(buildMessage())}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg("Please enter your name, phone number, and design details.");
      setPreparedMode(null);
      return;
    }
    setErrorMsg("");
    setPreparedMode("whatsapp");
  };

  const handleEmailPrepare = () => {
    if (!isValid) {
      setErrorMsg("Please enter your name, phone number, and design details.");
      setPreparedMode(null);
      return;
    }
    setErrorMsg("");
    setPreparedMode("email");
  };

  return (
    <section id="custom" className="bg-[#2D1B10] py-20 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E3B46F]">
            Bespoke Carpentry &amp; Upholstery
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl [text-wrap:balance]">
            Have a Specific Design in Mind? We Build It From Scratch.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#E4D9CB]">
            Whether you want a custom living room sofa, fitted kitchen cabinets, or durable hostel beds and reading tables near Federal University Wukari, our craftsmen build to your exact dimensions.
          </p>

          <ul className="mt-8 space-y-3.5">
            {WORKSHOP_GUARANTEES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#EFE7DC]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B46F]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white p-6 text-[#221C18] shadow-xl sm:p-8">
          <h3 className="font-display text-2xl font-bold text-[#2D1B10]">
            Request a Custom Quote
          </h3>
          <p className="mt-1 text-sm text-[#645A52]">
            Enter your project specifications to generate a direct WhatsApp or Email brief.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cust-name"
                  className="block text-xs font-semibold text-[#2D1B10]"
                >
                  Your Name *
                </label>
                <input
                  id="cust-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. Mr. Emmanuel"
                  className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="cust-phone"
                  className="block text-xs font-semibold text-[#2D1B10]"
                >
                  Phone Number *
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. 0803..."
                  className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cust-category"
                  className="block text-xs font-semibold text-[#2D1B10]"
                >
                  Furniture Category
                </label>
                <select
                  id="cust-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
                >
                  {CUSTOM_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="cust-budget"
                  className="block text-xs font-semibold text-[#2D1B10]"
                >
                  Estimated Budget (₦)
                </label>
                <input
                  id="cust-budget"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₦250,000"
                  className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cust-details"
                className="block text-xs font-semibold text-[#2D1B10]"
              >
                Dimensions, Finish &amp; Delivery Location *
              </label>
              <textarea
                id="cust-details"
                rows={3}
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="Describe size, timber/fabric color, or delivery area in Wukari/Taraba..."
                className="mt-1.5 w-full rounded-lg border border-[#D8CFC2] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#221C18] focus:border-[#9A631D] focus:bg-white focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p role="alert" className="text-xs font-medium text-red-700">
                {errorMsg}
              </p>
            )}

            <div className="grid gap-3 pt-1 sm:grid-cols-2">
              {isValid ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPreparedMode("whatsapp")}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#8C5817] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#754912] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send via WhatsApp</span>
                </a>
              ) : (
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#8C5817] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#754912] whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send via WhatsApp</span>
                </button>
              )}

              {isValid ? (
                <a
                  href={emailHref}
                  onClick={() => setPreparedMode("email")}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2D1B10] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#462B1A] whitespace-nowrap"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Send via Email</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleEmailPrepare}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2D1B10] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#462B1A] whitespace-nowrap cursor-pointer"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Send via Email</span>
                </button>
              )}
            </div>

            {preparedMode && isValid && (
              <p className="text-xs font-medium text-emerald-800">
                {preparedMode === "whatsapp"
                  ? "Custom brief ready — opening WhatsApp message with your specifications."
                  : "Custom brief ready — opening your email client."}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
