import { useState } from "react";
import { Armchair } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function ResilientImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F0EA] via-[#EAE3D7] to-[#DFD5C5] px-6 text-center text-[#5C4938] ${className}`}
      >
        <Armchair className="mb-2 h-8 w-8 text-[#9A631D]" aria-hidden="true" />
        <span className="max-w-[22ch] text-xs font-medium leading-snug">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
