// Coverflow Reel — the capsule presented as a cinematic coverflow: the
// active garment faces the viewer while its neighbours recede in rotation
// and dim behind it. Built on Swiper's coverflow effect; every piece of
// chrome (counter, arrows, caption) is drawn here so it speaks the house
// palette instead of Swiper's default blue. Stage sizing and the
// recede-dim live in index.css under `.coverflow-reel-stage`.

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { cn } from "@/lib/utils";
import { onImageError } from "@/utils/images";

export type CoverflowReelItem = {
  /** Card image. On error it falls back to the crest via the shared
   * handler, on the same noir ground as a real photo. */
  src?: string;
  alt?: string;
  /** Caption line under the stage: garment name. */
  label?: string;
  /** Caption line under the stage: price. */
  sublabel?: string;
};

export interface CoverflowReelProps {
  items: CoverflowReelItem[];
  /** Fired when the viewer commits to a piece — clicking the active card
   * or its caption. Clicking a receding card just slides it forward. */
  onSelect?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
}

/* The stage runs without Swiper's `loop` mode: in the installed Swiper
 * generation it initialises before the React slides register (leaving the
 * instance parked on the last slide with autoplay running into a wall).
 * Instead the items are triplicated and the view starts inside the middle
 * copy, so both ends always have receding neighbours and the reel can
 * drift in either direction forever. When the view wanders outside the
 * middle copy it is re-centred with an instant jump nobody sees. */
const COPIES = 3;

export function CoverflowReel({
  items,
  onSelect,
  ariaLabel = "Collection carousel",
  className,
}: CoverflowReelProps) {
  const swiperRef = React.useRef<SwiperClass | null>(null);
  const [active, setActive] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const count = items.length;

  const slides = React.useMemo(
    () => Array.from({ length: COPIES }, () => items).flat(),
    [items],
  );

  if (!count) return null;

  const current = items[active] ?? items[0];

  const syncFrom = (swiper: SwiperClass) => {
    setActive(swiper.realIndex % count);
    // Re-centre when the view leaves the middle copy (autoplay drifting
    // forward, or many arrow presses). Instant and silent.
    if (swiper.realIndex < count || swiper.realIndex >= count * 2) {
      const centred =
        swiper.realIndex < count
          ? swiper.realIndex + count
          : swiper.realIndex - count;
      swiper.slideTo(centred, 0);
    }
  };

  const slideBy = (direction: 1 | -1) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (reduceMotion) {
      swiper.slideTo(
        (swiper.realIndex + direction + count) % count + count,
        0,
      );
      return;
    }
    if (direction === 1) swiper.slideNext();
    else swiper.slidePrev();
  };

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative w-full text-white", className)}
    >
      <Swiper
        onSwiper={(s: SwiperClass) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s: SwiperClass) => syncFrom(s)}
        initialSlide={count}
        modules={[EffectCoverflow, Autoplay, Keyboard]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        slideToClickedSlide
        speed={720}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={
          reduceMotion
            ? false
            : {
                delay: 4200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        coverflowEffect={{
          rotate: 34,
          stretch: 0,
          depth: 260,
          modifier: 1,
          slideShadows: false,
        }}
        className="coverflow-reel-stage"
      >
        {slides.map((item, i) => {
          const itemIndex = i % count;
          return (
          <SwiperSlide key={i}>
            <button
              type="button"
              aria-label={
                itemIndex === active && item.label
                  ? `View ${item.label}`
                  : `Bring ${item.label ?? "this piece"} to the front`
              }
              onClick={() => {
                if (itemIndex === active) onSelect?.(itemIndex);
              }}
              className="reel-card group/card relative block h-full w-full cursor-pointer overflow-hidden bg-noir outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <div className="absolute inset-0 bg-noir" />
              {item.src && (
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  draggable={false}
                  onError={onImageError}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
              )}
              {/* champagne keyline that arrives with the active card */}
              <span className="reel-keyline pointer-events-none absolute inset-3 border border-transparent transition-colors duration-500" />
            </button>
          </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Arrows — on phones the swipe is the control. */}
      <button
        type="button"
        aria-label="Previous piece"
        onClick={() => slideBy(-1)}
        className="btn-luxury absolute left-6 top-[38%] z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-noir focus-visible:ring-2 focus-visible:ring-champagne md:flex lg:left-14"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Next piece"
        onClick={() => slideBy(1)}
        className="btn-luxury absolute right-6 top-[38%] z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-noir focus-visible:ring-2 focus-visible:ring-champagne md:flex lg:right-14"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* Counter + caption for the piece at the front */}
      <div className="flex flex-col items-center gap-4 px-4 pt-8 pb-2 text-center">
        <span className="font-mono-luxury text-[10px] tracking-[0.4em] text-champagne tabular-nums">
          {String(active + 1).padStart(2, "0")} — {String(count).padStart(2, "0")}
        </span>
        {current && (
          <button
            type="button"
            onClick={() => onSelect?.(active)}
            className="group/caption inline-flex flex-col items-center gap-1.5 px-2 outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            {current.label && (
              <span className="font-display text-2xl leading-tight tracking-[0.08em] text-white uppercase sm:text-3xl">
                {current.label}
              </span>
            )}
            {current.sublabel && (
              <span className="font-mono-luxury text-[11px] tracking-[0.22em] text-white/60">
                {current.sublabel}
              </span>
            )}
            <span className="mt-1 inline-flex items-center gap-2 font-mono-luxury text-[10px] tracking-[0.3em] text-champagne uppercase transition-all group-hover/caption:gap-3.5">
              View Piece <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default CoverflowReel;
