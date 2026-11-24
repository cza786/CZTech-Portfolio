/**
 * json-render +jev (JSON Evaluator Value / Composition Architecture)
 * 
 * Provides type definitions, schema validation, and evaluator runtime for 
 * declarative Generative UI rendering in Astro components.
 */

export interface JevMeta {
  model: string;
  target: string;
  framework: string;
}

export interface JevBrand {
  name: string;
  href: string;
  label: string;
}

export interface JevNavLink {
  label: string;
  href: string;
  isPill?: boolean;
}

export interface JevSkyLayer {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  heightClass: string;
  maskGradient: string;
  loading: 'eager' | 'lazy';
  fetchpriority: 'high' | 'low' | 'auto';
}

export interface JevVectorCurve {
  d: string;
  opacity: number;
  dashArray?: string;
}

export interface JevVectorLinesLayer {
  enabled: boolean;
  viewBox: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  curves: JevVectorCurve[];
}

export interface JevGridLayer {
  enabled: boolean;
  size: number;
  backgroundColor: string;
  lineColor: string;
}

export interface JevLayers {
  grid: JevGridLayer;
  sky: JevSkyLayer;
  vectorLines: JevVectorLinesLayer;
}

export interface JevInlineCard {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  loading: 'eager' | 'lazy';
  fetchpriority: 'high' | 'low' | 'auto';
}

export interface JevHeadline {
  line1: {
    leftText: string;
    card: JevInlineCard;
    rightText: string;
  };
  line2: string;
  srDescription: string;
}

export interface JevSticker {
  id: string;
  name: string;
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  posClass: string;
  animClass: string;
  sizeClass: string;
  rotationDeg: number;
  animDuration: string;
  animDelay: string;
}

export interface JevCTA {
  text: string;
  href: string;
  ariaLabel: string;
}

export interface JevHeroSpec {
  $schema?: string;
  version: string;
  jev: JevMeta;
  brand: JevBrand;
  navLinks: JevNavLink[];
  layers: JevLayers;
  headline: JevHeadline;
  stickers: JevSticker[];
  cta: JevCTA;
}

/**
 * JEV Spec Evaluator
 * Normalizes and evaluates the declarative spec to guarantee safe,
 * high-performance defaults across all responsive viewports.
 */
export function evaluateHeroSpec(rawSpec: unknown): JevHeroSpec {
  const spec = rawSpec as JevHeroSpec;

  // Lightweight verification & fallback resolution
  if (!spec.brand?.name) {
    throw new Error('JEV Evaluation Error: brand.name is required');
  }

  // Ensure all sticker images prefer WebP
  const optimizedStickers = spec.stickers.map((stk) => ({
    ...stk,
    src: stk.src.replace(/\.(png|jpe?g)$/i, '.webp'),
    fallbackSrc: stk.fallbackSrc || stk.src,
  }));

  // Ensure sky and card prefer WebP
  const optimizedSky = {
    ...spec.layers.sky,
    src: spec.layers.sky.src.replace(/\.(png|jpe?g)$/i, '.webp'),
  };

  const optimizedCard = {
    ...spec.headline.line1.card,
    src: spec.headline.line1.card.src.replace(/\.(png|jpe?g)$/i, '.webp'),
  };

  return {
    ...spec,
    layers: {
      ...spec.layers,
      sky: optimizedSky,
    },
    headline: {
      ...spec.headline,
      line1: {
        ...spec.headline.line1,
        card: optimizedCard,
      },
    },
    stickers: optimizedStickers,
  };
}
