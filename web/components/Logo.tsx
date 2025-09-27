'use client';

import { useEffect, useId, useRef, useState } from 'react';

type LogoVariant = 'primary' | 'contrast';

type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const MIN_CONTRAST = 4.5;
const DEFAULT_PRIMARY = { r: 5, g: 125, b: 240, a: 1 } satisfies Rgba;
const DEFAULT_CONTRAST = { r: 255, g: 255, b: 255, a: 1 } satisfies Rgba;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function parseColor(input: string | null | undefined): Rgba | null {
  if (!input) {
    return null;
  }
  const value = input.trim();
  if (!value) {
    return null;
  }

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b, a: 1 };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b, a: 1 };
    }
    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      return { r, g, b, a };
    }
    return null;
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(',')
      .map((part) => part.trim())
      .map((part) => (part.endsWith('%') ? (parseFloat(part) * 255) / 100 : parseFloat(part)));
    if (parts.length >= 3) {
      const [r, g, b] = parts;
      const a = parts.length === 4 ? parts[3] : 1;
      if ([r, g, b, a].every((component) => Number.isFinite(component))) {
        return { r, g, b, a };
      }
    }
  }

  return null;
}

function blend(foreground: Rgba, background: Rgba): Rgba {
  const alpha = foreground.a + background.a * (1 - foreground.a);
  if (alpha === 0) {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  const r =
    (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) /
    alpha;
  const g =
    (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) /
    alpha;
  const b =
    (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) /
    alpha;
  return { r, g, b, a: alpha };
}

function relativeLuminance(color: Rgba): number {
  const transform = (channel: number) => {
    const scaled = channel / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
  };

  const r = transform(color.r);
  const g = transform(color.g);
  const b = transform(color.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(colorA: Rgba, colorB: Rgba): number {
  const lumA = relativeLuminance(colorA);
  const lumB = relativeLuminance(colorB);
  const brighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (brighter + 0.05) / (darker + 0.05);
}

function getEffectiveBackground(element: HTMLElement | null): Rgba {
  let current: HTMLElement | null = element;
  let fallback = parseColor('#ffffff') ?? { r: 255, g: 255, b: 255, a: 1 };

  while (current) {
    const style = window.getComputedStyle(current);
    const custom = style.getPropertyValue('--logo-surface');
    const parsedCustom = parseColor(custom);
    if (parsedCustom && parsedCustom.a > 0) {
      fallback = parsedCustom;
      break;
    }

    const background = parseColor(style.backgroundColor);
    if (background) {
      if (background.a >= 1) {
        fallback = background;
        break;
      }
      const parent = current.parentElement as HTMLElement | null;
      const parentBackground = getEffectiveBackground(parent);
      fallback = blend(background, parentBackground);
      break;
    }

    current = current.parentElement as HTMLElement | null;
  }

  if (!fallback) {
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  return fallback;
}

function pickVariant(
  background: Rgba,
  primary: Rgba,
  contrast: Rgba,
): { variant: LogoVariant; needsBoost: boolean } {
  const primaryContrast = contrastRatio(primary, background);
  const contrastContrast = contrastRatio(contrast, background);

  if (primaryContrast >= MIN_CONTRAST && primaryContrast >= contrastContrast) {
    return { variant: 'primary', needsBoost: false };
  }

  if (contrastContrast >= MIN_CONTRAST) {
    return { variant: 'contrast', needsBoost: false };
  }

  if (primaryContrast >= contrastContrast) {
    return { variant: 'primary', needsBoost: true };
  }

  return { variant: 'contrast', needsBoost: true };
}

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [variant, setVariant] = useState<LogoVariant>('primary');
  const [needsBoost, setNeedsBoost] = useState(false);
  const maskId = useId();

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) {
      return;
    }

    const evaluate = () => {
      if (!wrapperRef.current) {
        return;
      }
      const host = wrapperRef.current.parentElement as HTMLElement | null;
      if (!host) {
        return;
      }
      const background = getEffectiveBackground(host);
      const style = window.getComputedStyle(wrapperRef.current);
      const primaryColor =
        parseColor(style.getPropertyValue('--logo-fg')) ??
        parseColor(getComputedStyle(document.documentElement).getPropertyValue('--logo-fg')) ??
        DEFAULT_PRIMARY;
      const contrastColor =
        parseColor(style.getPropertyValue('--logo-fg-contrast')) ??
        parseColor(getComputedStyle(document.documentElement).getPropertyValue('--logo-fg-contrast')) ??
        DEFAULT_CONTRAST;

      const selection = pickVariant(background, primaryColor, contrastColor);
      setVariant(selection.variant);
      setNeedsBoost(selection.needsBoost);
    };

    evaluate();

    const resizeListener = () => evaluate();
    window.addEventListener('resize', resizeListener);

    const themeListener = () => evaluate();
    window.addEventListener('fv-theme-change', themeListener);

    const mutation = new MutationObserver(evaluate);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    const ancestors = new Set<HTMLElement>();
    let current: HTMLElement | null = node.parentElement;
    while (current) {
      ancestors.add(current);
      current = current.parentElement;
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => evaluate()) : null;
    if (resizeObserver) {
      ancestors.forEach((ancestor) => resizeObserver.observe(ancestor));
    }

    return () => {
      window.removeEventListener('resize', resizeListener);
      window.removeEventListener('fv-theme-change', themeListener);
      mutation.disconnect();
      resizeObserver?.disconnect();
    };
  }, []);

  const colorStyle = variant === 'primary' ? 'var(--logo-fg)' : 'var(--logo-fg-contrast)';

  return (
    <span
      ref={wrapperRef}
      className={cn('inline-flex h-16 min-w-[140px] items-center sm:min-w-[160px] md:h-20', className)}
      style={{ color: colorStyle }}
      aria-hidden="false"
    >
      <svg
        viewBox="0 0 500 280"
        role="img"
        aria-label="FindVee"
        className={cn('logo-svg h-full w-auto', needsBoost && 'logo-svg--boost')}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>FindVee</title>
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            style={{ maskType: 'alpha' }}
          >
            <image href="/logo.png" width="500" height="280" preserveAspectRatio="xMidYMid meet" />
          </mask>
        </defs>
        <rect width="500" height="280" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    </span>
  );
}
