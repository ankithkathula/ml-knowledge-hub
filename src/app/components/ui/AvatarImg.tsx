import { useState } from "react";

export function AvatarImg({
  src,
  fallback,
  size = 36,
  className = "",
  style = {},
  fallbackBg = "linear-gradient(135deg,#ff6a3d,#e8522a)",
  borderStyle,
}: {
  src?: string;
  fallback: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  fallbackBg?: string;
  borderStyle?: string;
}) {
  const [failed, setFailed] = useState(false);
  const border = borderStyle ?? `1.5px solid rgba(255,106,61,0.2)`;

  if (!src || failed) {
    return (
      <div
        className={`rounded-full flex items-center justify-center text-white flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          background: fallbackBg,
          fontSize: Math.round(size * 0.3),
          fontWeight: 700,
          border,
          ...style,
        }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size, minWidth: size, border, ...style }}
    >
      <img
        src={src}
        alt={fallback}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
