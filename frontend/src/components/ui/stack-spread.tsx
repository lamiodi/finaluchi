// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const IMG_BASE =
  "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread";

const IMG = {
  plane: `${IMG_BASE}/img1.png`,
  painting: `${IMG_BASE}/img2.png`,
  breaker: `${IMG_BASE}/img3.png`,
  dog: `${IMG_BASE}/img4.png`,
  footballer: `${IMG_BASE}/img5.png`,
  jacket: `${IMG_BASE}/img6.png`,
  meadow: `${IMG_BASE}/img7.png`,
  stripes: `${IMG_BASE}/img8.png`,
} as const;

// per-image rest scale, keyed by img index (1-8). default 1, drop below to shrink.
const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};
const s = (i: number) => SCALE[i] ?? 1;

// array order = stack order, back (z 2) -> front (z 9)
const DEFAULT_CARDS: StackSpreadCard[] = [
  // top-left stripes (img08) — sm row 1 left
  {
    item: { src: IMG.stripes, alt: "Colour stripes" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right meadow (img07) — sm row 1 right
  {
    item: { src: IMG.meadow, alt: "Wildflower meadow" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left jacket (img06) — sm row 2 left
  {
    item: { src: IMG.jacket, alt: "Figure in a leather jacket" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre footballer (img05) — sm row 2 right
  {
    item: { src: IMG.footballer, alt: "Footballer mid-kick" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right dog (img04) — sm row 3 left
  {
    item: { src: IMG.dog, alt: "Terrier in profile" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left breaker (img03) — sm row 3 right
  {
    item: { src: IMG.breaker, alt: "Breakdancer holding a pose" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre painting (img02) — sm row 4 left
  {
    item: { src: IMG.painting, alt: "Renaissance fresco detail" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right plane (img01) — sm row 4 right
  {
    item: { src: IMG.plane, alt: "Vintage fighter plane" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

// Scroll progress where the cluster starts scattering and where it finishes.
const SCATTER_START = 0.06;
const SCATTER_END = 0.88;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB = "Digital products, interfaces, and experiences built around people.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    rowY: null as number | null,
    card: null as { width: string; height: string } | null,
  },
};

type StackSpreadLayout = "responsive" | "desktop" | "mobile";

function resolveResponsive(layout: StackSpreadLayout) {
  const hasWindow = typeof window !== "undefined";
  const isSmall =
    layout === "mobile" ||
    (layout === "responsive" && hasWindow && window.innerWidth < 1024);

  if (!isSmall) return RESPONSIVE.desktop;

  const viewportWidth = hasWindow ? window.innerWidth : 390;
  const viewportHeight = hasWindow ? window.innerHeight : 844;
  const isShortLandscape = viewportWidth > viewportHeight && viewportHeight <= 520;
  const minCardWidth = isShortLandscape ? 64 : 78;
  const cardWidth = Math.max(
    minCardWidth,
    Math.min(132, viewportWidth * 0.3, viewportHeight * (isShortLandscape ? 0.18 : 0.22)),
  );
  const cardHeight = cardWidth * (4 / 3);
  const edgeReserve = isShortLandscape ? 36 : 88;
  const rowY = Math.max(
    18,
    ((viewportHeight / 2 - edgeReserve - cardHeight / 2) / viewportHeight) * 100,
  );

  return {
    scale: 1,
    small: true,
    colX: isShortLandscape ? 31 : 32,
    rowY,
    card: {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    },
  };
}

function useResponsive(layout: StackSpreadLayout) {
  const [r, setR] = useState(() => resolveResponsive(layout));

  useEffect(() => {
    const update = () => setR(resolveResponsive(layout));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [layout]);

  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  tagline?: string;
  onClick?: () => void;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  /** final x/y (vw/vh) for tablet + mobile; falls back to `target` */
  targetSm?: {
    x: number;
    y: number;
    rotate?: number;
    scale?: number;
    w?: number;
    h?: number;
  };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (vw/vh) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  rowY,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  /** uniform rest-scale for every card; null = use each card's own scale */
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  rowY: number | null;
  fixedCard: { width: string; height: string } | null;
  /** scale of the cards while clustered, before the scatter */
  stackScale: number;
  /** corner radius on each card, in px (desktop) */
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  // final resting spot: custom sm target if specified, otherwise fallback to column grid on small screens
  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? sm.x
    : isSmall && colX != null
    ? Math.sign(target.x) * colX
    : target.x;
  const endY = sm
    ? sm.y
    : isSmall && rowY != null
    ? Math.sign(target.y) * rowY
    : target.y;
  const endRotate = flat ? 0 : isSmall ? (sm?.rotate ?? 0) : target.rotate;
  const cardRestScale = (isSmall && sm?.scale !== undefined) ? sm.scale : restScale;

  // -50% keeps the card centred on its anchor. Keep every animated property
  // in one compositor-friendly transform so mobile scrolling stays smooth.
  const transform = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      const rotation = stackRotate + (endRotate - stackRotate) * p;
      const cardScale = stackScale + (cardRestScale - stackScale) * p;
      const verticalUnit = isSmall ? "svh" : "vh";
      return `translate(calc(-50% + ${dx}vw), calc(-50% + ${dy}${verticalUnit})) rotate(${rotation}deg) scale(${cardScale})`;
    },
  );

  const cardFace = (
    <CardFace item={item} cardRadius={cardRadius} compact={isSmall} interactive={Boolean(item.onClick)} />
  );

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: isSmall && sm?.w ? `${sm.w}vw` : fixedCard?.width ?? `${target.w}vw`,
        height: isSmall && sm?.h ? `${sm.h}svh` : fixedCard?.height ?? `${target.h}vh`,
        zIndex: card.z ?? 1,
        transform,
      }}
    >
      {item.onClick ? (
        <button
          type="button"
          onClick={item.onClick}
          aria-label={`Explore ${item.title ?? item.category ?? item.alt ?? "this category"}`}
          data-compact={isSmall}
          className="stack-spread-card group/card pointer-events-auto block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left btn-luxury focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {cardFace}
        </button>
      ) : (
        <div data-compact={isSmall} className="stack-spread-card h-full w-full">
          {cardFace}
        </div>
      )}
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
  compact,
  interactive,
}: {
  item: StackSpreadItem;
  cardRadius: number;
  compact: boolean;
  interactive: boolean;
}) {
  return (
    <div
      className="stack-spread-card__face relative h-full w-full overflow-hidden bg-neutral-100"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={interactive ? "" : item.alt ?? ""}
        draggable={false}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="stack-spread-card__image absolute inset-0 h-full w-full object-cover"
      />
      {/* Compact cards keep their identity visible on touch; desktop reveals detail on intent. */}
      {item.title && (
        <div className="stack-spread-card__info absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 via-55% to-transparent p-2.5 text-white sm:p-4">
          {compact ? (
            <span className="line-clamp-2 text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.04em]">
              {item.title}
            </span>
          ) : (
            <>
              {item.category && (
                <span className="text-[9px] uppercase tracking-widest text-neutral-300 font-mono">
                  {item.category}
                </span>
              )}
              <span className="text-xs font-semibold uppercase tracking-tight sm:text-sm">
                {item.title}
              </span>
              {item.tagline && (
                <span className="mt-0.5 line-clamp-1 text-[10px] text-neutral-300">
                  {item.tagline}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export interface StackSpreadStageProps {
  cards?: StackSpreadCard[];
  /** force a layout profile when the parent already owns the breakpoint */
  layout?: StackSpreadLayout;
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
  /** show the "scroll to spread" hint at the bottom until the scatter begins */
  showScrollHint?: boolean;
  /** Custom heading node or string */
  heading?: ReactNode;
  /** Custom subtitle node or string */
  subtitle?: ReactNode;
  /** Extra slot inside sticky viewport */
  children?: ReactNode;
}

export function StackSpreadStage({
  cards = DEFAULT_CARDS,
  layout = "responsive",
  scrollLength = 350,
  bgColor = "#FFFFFF",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 6,
  textColor = "#000000",
  textFadeStart = 0.25,
  showScrollHint = true,
  heading,
  subtitle,
  children,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const {
    scale: scaleMul,
    small: isSmall,
    colX,
    rowY,
    card: fixedCard,
  } = useResponsive(layout);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // hold, scatter, then settle
  const animatedProgress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );
  const reducedProgress = useMotionValue(1);
  const progress = reduce === true ? reducedProgress : animatedProgress;

  // centre text always fades in on scroll; the scale-in is dropped only when
  // reduced motion is confirmed (`true`), not on the null SSR value.
  const [spread, setSpread] = useState(false);
  const [copyRevealed, setCopyRevealed] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
    const nextCopyRevealed = p >= textFadeStart + 0.28;
    setCopyRevealed((was) => (was === nextCopyRevealed ? was : nextCopyRevealed));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyIsInteractive = reduce === true || copyRevealed;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);

  // scroll hint: visible while clustered, gone by the time the scatter starts
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{
        height: reduce === true ? (isSmall ? "100svh" : "100vh") : `${scrollLength}${isSmall ? "svh" : "vh"}`,
        backgroundColor: bgColor,
      }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: isSmall ? "100svh" : "100vh" }}
      >
        {/* centre text */}
        <motion.div
          aria-hidden={!copyIsInteractive}
          inert={!copyIsInteractive ? true : undefined}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center max-md:px-5"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {heading ? (
            heading
          ) : (
            <h2
              className="w-full whitespace-pre-line text-[4.5vw] font-normal leading-none tracking-tight max-md:text-[10vw]"
              style={{ color: textColor }}
            >
              Design
              <span className="opacity-60"> That </span>
              Responds.
            </h2>
          )}
          {subtitle ? (
            subtitle
          ) : (
            <p
              className="mt-[1.2vw] w-full max-w-[42ch] text-[1.15vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.6vw]"
              style={{ color: textColor, opacity: 0.6 }}
            >
              {SUB}
            </p>
          )}
        </motion.div>

        {/* scattering cards */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={`${card.item.src}-${i}`}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              rowY={rowY}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* extra overlay elements (actions/filters/controls) */}
        {children}

        {/* scroll hint */}
        {showScrollHint && reduce !== true && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 z-30 flex flex-col items-center gap-1.5 text-[0.8vw] font-medium uppercase tracking-[0.2em] max-md:text-[11px]"
            style={{
              bottom: isSmall ? "max(1.25rem, env(safe-area-inset-bottom))" : "3vh",
              color: textColor,
              opacity: hintOpacity,
            }}
          >
            <span>Scroll to Explore</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stack-spread-hint-icon h-4 w-4"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export interface StackSpreadProps extends StackSpreadStageProps {}

export default function StackSpread(props: StackSpreadProps) {
  return <StackSpreadStage {...props} />;
}
