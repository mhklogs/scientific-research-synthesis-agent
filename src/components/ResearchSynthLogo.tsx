/**
 * ResearchSynth brand mark.
 * A bespoke retort-flask glyph with orbiting citation nodes: the flask holds
 * a measured meniscus with three bubbles, while dashed citations orbit the
 * neck like references circling a hypothesis. Stroke-based, rounded caps,
 * single accent color #C084FC.
 */

export function ResearchSynthLogo({
  size = 48,
  ring = true,
  className,
}: {
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {ring && (
        <circle
          cx="24"
          cy="24"
          r="21.5"
          stroke="#C084FC"
          strokeOpacity="0.28"
          strokeWidth="1.4"
          strokeDasharray="2 5"
        />
      )}

      {/* retort flask */}
      <path
        d="M20 6h8M20 8v2M28 8v2M22 10l-9.5 20M26 10l9.5 20M12.5 30a11.5 11.5 0 0 0 23 0"
        stroke="#C084FC"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* inner measured meniscus */}
      <path
        d="M14.5 30c2-1.8 4-1.8 6 0s4 1.8 6 0 4.5-1.8 7 0"
        stroke="#C084FC"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* bubbles */}
      <circle cx="19.5" cy="34.5" r="1.15" fill="#C084FC" />
      <circle cx="25.2" cy="31.4" r="0.9" fill="#C084FC" />
      <circle cx="28.4" cy="36.5" r="1.4" fill="#C084FC" />

      {/* orbiting citation nodes */}
      <ellipse
        cx="24"
        cy="12.5"
        rx="16"
        ry="6.5"
        transform="rotate(-14 24 12.5)"
        stroke="#C084FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
        strokeDasharray="3 4"
      />
      <circle cx="12" cy="8" r="2.2" fill="#C084FC" />
      <circle cx="38" cy="13" r="2.2" fill="#C084FC" />
      <circle cx="17" cy="3.6" r="1.4" fill="#C084FC" opacity="0.7" />
    </svg>
  );
}

export default ResearchSynthLogo;