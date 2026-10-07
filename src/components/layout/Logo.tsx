import Image from "next/image";

export default function Logo({
  size = 38,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="brand-logo">
      <Image
        src="/logo/logo.png"
        alt="Kiphnic logo"
        width={size}
        height={size}
        priority
        className="brand-logo-img"
      />
      {withWordmark ? (
        <span className="brand-word">
          KIPHNIC<small>INTELLIGENCE. ELEVATED.</small>
        </span>
      ) : null}
    </span>
  );
}
