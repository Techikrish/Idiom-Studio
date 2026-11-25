import { contrastRatio, formatRatio } from '../util.mjs';

export const EASING = {
  'ease-out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'linear-fast': 'cubic-bezier(0.2, 0, 0, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const MARGIN = { compact: 16, comfortable: 20, spacious: 24 };
const GUTTER = { compact: 12, comfortable: 16, spacious: 20 };

const FONT_KIND = {
  serif: {
    css: "'New York', 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif",
    ios: 'serif',
    android: 'serif',
    name: 'New York / Noto Serif',
  },
  sans: {
    css: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    ios: 'default',
    android: 'sans',
    name: 'SF Pro / Roboto',
  },
  rounded: {
    css: "'SF Pro Rounded', 'Nunito', 'Varela Round', ui-rounded, system-ui, sans-serif",
    ios: 'rounded',
    android: 'sans',
    name: 'SF Rounded / Roboto',
  },
  mono: {
    css: "'SF Mono', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ios: 'monospaced',
    android: 'mono',
    name: 'SF Mono / Roboto Mono',
  },
};

export function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'studio-app';
}

export function buildTokens(selection, options = {}) {
  const { family, variant, accent } = selection;
  const appName = options.name?.trim() || family.name;
  const slug = slugify(appName);
  const familyType = family.type ?? {};
  const displayKind = familyType.display ?? 'sans';
  const bodyKind = familyType.body ?? 'sans';
  const numericKind = familyType.numeric === 'tabular' || familyType.numeric === 'mono' ? 'mono' : bodyKind;
  const displayFont = FONT_KIND[displayKind] ?? FONT_KIND.sans;
  const bodyFont = FONT_KIND[bodyKind] ?? FONT_KIND.sans;
  const numericFont = FONT_KIND[numericKind] ?? FONT_KIND.mono;

  const color = {};
  for (const mode of ['light', 'dark']) {
    const palette = family.palette[mode];
    const accentColor = mode === 'light' ? accent.light : accent.dark;
    const onAccent = mode === 'light' ? accent.onLight : accent.onDark;
    color[mode] = {
      background: palette.background,
      surface: palette.surface,
      elevated: palette.elevated,
      text: palette.text,
      muted: palette.muted,
      border: palette.border,
      accent: accentColor,
      onAccent,
      success: family.palette.semantic[mode].success,
      warning: family.palette.semantic[mode].warning,
      danger: family.palette.semantic[mode].danger,
    };
  }

  const sizes = {
    display: variant.displaySize,
    title: familyType.sizes?.title ?? Math.round(variant.displaySize * 0.65),
    headline: familyType.sizes?.headline ?? Math.round(variant.displaySize * 0.5),
    body: variant.bodySize,
    label: familyType.sizes?.label ?? 13,
    caption: familyType.sizes?.caption ?? 11,
  };
  const type = {
    display: displayKind,
    body: bodyKind,
    numeric: familyType.numeric ?? 'proportional',
    displayFamily: displayFont.name,
    bodyFamily: bodyFont.name,
    numericFamily: numericFont.name,
    css: {
      display: displayFont.css,
      body: bodyFont.css,
      numeric: numericFont.css,
    },
    scale: familyType.scale ?? 1.25,
    sizes,
    tracking: familyType.tracking ?? { display: 0, label: 0.04 },
    lineHeight: {
      display: 1.05,
      title: 1.15,
      headline: 1.25,
      body: 1.5,
      label: 1.2,
      caption: 1.3,
    },
  };

  const motionCurve = family.motion?.curve ?? 'ease-out';
  const motion = {
    curve: motionCurve,
    easing: EASING[motionCurve] ?? EASING['ease-out'],
    fast: family.motion?.fast ?? 120,
    base: family.motion?.base ?? 200,
    slow: family.motion?.slow ?? 320,
  };

  const tokens = {
    name: `${family.name} / ${variant.name}`,
    appName,
    slug,
    family: { id: family.id, name: family.name },
    variant: { id: variant.id, name: variant.name },
    accent: { id: accent.id, name: accent.name },
    mode: selection.mode,
    seed: selection.seed,
    color,
    type,
    space: [4, 8, 12, 16, 24, 32, 48, 64],
    radius: {
      small: family.shape?.small ?? 4,
      medium: family.shape?.medium ?? 8,
      large: family.shape?.large ?? 16,
      pill: family.shape?.pill ?? 999,
    },
    layout: {
      density: family.density,
      margin: MARGIN[family.density] ?? 20,
      gutter: GUTTER[family.density] ?? 16,
      minTarget: { ios: 44, android: 48 },
      maxContentWidth: 680,
    },
    border: { width: 1 },
    motion,
    shapeFamily: family.shape?.family ?? 'plain',
    surface: family.surface,
  };

  tokens.contrast = contrastReport(tokens);
  const failures = Object.entries(tokens.contrast).flatMap(([mode, values]) =>
    Object.entries(values)
      .filter(([, check]) => !check.pass)
      .map(([key, check]) => `${mode} ${key} ${check.ratio} (min ${check.min})`),
  );
  if (failures.length) {
    throw new Error(`Palette contrast failed for ${family.id}: ${failures.join(', ')}`);
  }
  return tokens;
}

export function contrastReport(tokens) {
  const report = {};
  for (const mode of ['light', 'dark']) {
    const c = tokens.color[mode];
    report[mode] = {
      text: { ratio: formatRatio(contrastRatio(c.text, c.background)), min: '4.5:1', pass: contrastRatio(c.text, c.background) >= 4.5 },
      muted: { ratio: formatRatio(contrastRatio(c.muted, c.background)), min: '4.5:1', pass: contrastRatio(c.muted, c.background) >= 4.5 },
      accentOnSurface: { ratio: formatRatio(contrastRatio(c.accent, c.surface)), min: '3:1', pass: contrastRatio(c.accent, c.surface) >= 3 },
      onAccent: { ratio: formatRatio(contrastRatio(c.onAccent, c.accent)), min: '4.5:1', pass: contrastRatio(c.onAccent, c.accent) >= 4.5 },
    };
  }
  return report;
}

function hexToSwift(hex) {
  return `0x${String(hex).replace('#', '').toUpperCase()}`;
}

function swiftDesign(kind) {
  if (kind === 'serif') return '.serif';
  if (kind === 'rounded') return '.rounded';
  if (kind === 'mono') return '.monospaced';
  return '.default';
}

export function emitSwift(tokens) {
  const c = tokens.color;
  const names = ['background', 'surface', 'elevated', 'text', 'muted', 'border', 'accent', 'onAccent', 'success', 'warning', 'danger'];
  const colorLines = names
    .map((key) => `    static let ${key} = adaptive(light: ${hexToSwift(c.light[key])}, dark: ${hexToSwift(c.dark[key])})`)
    .join('\n');
  const spacing = tokens.space
    .map((value, index) => `    static let s${index + 1}: CGFloat = ${value}`)
    .join('\n');
  return `import SwiftUI
import UIKit

// Generated by Idiom Studio. Direction: ${tokens.name}.
// App: ${tokens.appName}. Mode in preview: ${tokens.mode}.
// This file has no third-party dependencies and uses system fonts only.

enum StudioTheme {
    enum Colors {
${colorLines}

        private static func adaptive(light: UInt32, dark: UInt32) -> Color {
            Color(uiColor: UIColor { traits in
                traits.userInterfaceStyle == .dark ? UIColor(rgb: dark) : UIColor(rgb: light)
            })
        }
    }

    enum Typography {
        static func display(_ size: CGFloat = ${tokens.type.sizes.display}, weight: Font.Weight = .semibold) -> Font {
            .system(size: size, weight: weight, design: ${swiftDesign(tokens.type.display)})
        }

        static func title(_ size: CGFloat = ${tokens.type.sizes.title}, weight: Font.Weight = .semibold) -> Font {
            .system(size: size, weight: weight, design: ${swiftDesign(tokens.type.display)})
        }

        static func body(_ size: CGFloat = ${tokens.type.sizes.body}, weight: Font.Weight = .regular) -> Font {
            .system(size: size, weight: weight, design: ${swiftDesign(tokens.type.body)})
        }

        static func label(_ size: CGFloat = ${tokens.type.sizes.label}, weight: Font.Weight = .semibold) -> Font {
            .system(size: size, weight: weight, design: ${swiftDesign(tokens.type.body)})
        }

        static func numeric(_ size: CGFloat = ${tokens.type.sizes.title}, weight: Font.Weight = .medium) -> Font {
            .system(size: size, weight: weight, design: ${swiftDesign(tokens.type.numeric === 'proportional' ? 'sans' : 'mono')})
                .monospacedDigit()
        }
    }

    enum Spacing {
${spacing}
        static let margin: CGFloat = ${tokens.layout.margin}
        static let gutter: CGFloat = ${tokens.layout.gutter}
        static let minTarget: CGFloat = ${tokens.layout.minTarget.ios}
    }

    enum Radius {
        static let small: CGFloat = ${tokens.radius.small}
        static let medium: CGFloat = ${tokens.radius.medium}
        static let large: CGFloat = ${tokens.radius.large}
        static let pill: CGFloat = ${tokens.radius.pill}
    }

    enum Motion {
        static let fast = Animation.easeOut(duration: ${(tokens.motion.fast / 1000).toFixed(2)})
        static let base = Animation.easeOut(duration: ${(tokens.motion.base / 1000).toFixed(2)})
        static let slow = Animation.easeInOut(duration: ${(tokens.motion.slow / 1000).toFixed(2)})
        static let spring = Animation.spring(response: 0.38, dampingFraction: 0.72)
    }
}

private extension UIColor {
    convenience init(rgb: UInt32) {
        self.init(
            red: CGFloat((rgb >> 16) & 0xFF) / 255,
            green: CGFloat((rgb >> 8) & 0xFF) / 255,
            blue: CGFloat(rgb & 0xFF) / 255,
            alpha: 1
        )
    }
}
`;
}

function kotlinColor(hex) {
  return `Color(0xFF${String(hex).replace('#', '').toUpperCase()})`;
}

export function emitKotlin(tokens) {
  const c = tokens.color;
  const colorNames = ['background', 'surface', 'elevated', 'text', 'muted', 'border', 'accent', 'onAccent', 'success', 'warning', 'danger'];
  const colorLines = (mode) =>
    colorNames
      .map((key) => `    val ${key}${mode === 'light' ? 'Light' : 'Dark'} = ${kotlinColor(c[mode][key])}`)
      .join('\n');
  const letterSpacing = (value) => `${Number(value).toFixed(3)}.em`;
  const textStyle = (name, size, weight, font, tracking, lineHeight) =>
    `        ${name} = TextStyle(\n            fontFamily = ${font},\n            fontWeight = FontWeight.${weight},\n            fontSize = ${size}.sp,\n            lineHeight = ${Math.round(size * lineHeight)}.sp,\n            letterSpacing = ${letterSpacing(tracking)}\n        )`;
  const styles = [
    textStyle('displayLarge', tokens.type.sizes.display, 'SemiBold', 'StudioFonts.Display', tokens.type.tracking.display, tokens.type.lineHeight.display),
    textStyle('titleLarge', tokens.type.sizes.title, 'SemiBold', 'StudioFonts.Display', tokens.type.tracking.display, tokens.type.lineHeight.title),
    textStyle('titleMedium', tokens.type.sizes.headline, 'Medium', 'StudioFonts.Display', 0, tokens.type.lineHeight.headline),
    textStyle('bodyLarge', tokens.type.sizes.body, 'Normal', 'StudioFonts.Body', 0, tokens.type.lineHeight.body),
    textStyle('labelLarge', tokens.type.sizes.label, 'SemiBold', 'StudioFonts.Body', tokens.type.tracking.label, tokens.type.lineHeight.label),
    textStyle('bodySmall', tokens.type.sizes.caption, 'Normal', 'StudioFonts.Body', 0, tokens.type.lineHeight.caption),
  ].join(',\n');
  return `package studio.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp

// Generated by Idiom Studio. Direction: ${tokens.name}.
// App: ${tokens.appName}. Mode in preview: ${tokens.mode}.
// Uses system font families only.

object StudioFonts {
    val Display = FontFamily.${tokens.type.display === 'serif' ? 'Serif' : tokens.type.display === 'mono' ? 'Monospace' : 'SansSerif'}
    val Body = FontFamily.${tokens.type.body === 'serif' ? 'Serif' : tokens.type.body === 'mono' ? 'Monospace' : 'SansSerif'}
    val Numeric = FontFamily.${tokens.type.numeric === 'proportional' ? 'SansSerif' : 'Monospace'}
}

object StudioTokens {
${colorLines('light')}

${colorLines('dark')}

    val space = listOf(${tokens.space.map((value) => `${value}.dp`).join(', ')})
    val margin = ${tokens.layout.margin}.dp
    val gutter = ${tokens.layout.gutter}.dp
    val minTarget = ${tokens.layout.minTarget.android}.dp

    val radiusSmall = ${tokens.radius.small}.dp
    val radiusMedium = ${tokens.radius.medium}.dp
    val radiusLarge = ${tokens.radius.large}.dp

    const val motionFast = ${tokens.motion.fast}
    const val motionBase = ${tokens.motion.base}
    const val motionSlow = ${tokens.motion.slow}
}

private val LightScheme = lightColorScheme(
    primary = StudioTokens.accentLight,
    onPrimary = StudioTokens.onAccentLight,
    background = StudioTokens.backgroundLight,
    onBackground = StudioTokens.textLight,
    surface = StudioTokens.surfaceLight,
    onSurface = StudioTokens.textLight,
    surfaceVariant = StudioTokens.elevatedLight,
    onSurfaceVariant = StudioTokens.mutedLight,
    outline = StudioTokens.borderLight,
    error = StudioTokens.dangerLight
)

private val DarkScheme = darkColorScheme(
    primary = StudioTokens.accentDark,
    onPrimary = StudioTokens.onAccentDark,
    background = StudioTokens.backgroundDark,
    onBackground = StudioTokens.textDark,
    surface = StudioTokens.surfaceDark,
    onSurface = StudioTokens.textDark,
    surfaceVariant = StudioTokens.elevatedDark,
    onSurfaceVariant = StudioTokens.mutedDark,
    outline = StudioTokens.borderDark,
    error = StudioTokens.dangerDark
)

val StudioTypography = Typography(
${styles}
)

val StudioShapes = Shapes(
    small = RoundedCornerShape(StudioTokens.radiusSmall),
    medium = RoundedCornerShape(StudioTokens.radiusMedium),
    large = RoundedCornerShape(StudioTokens.radiusLarge)
)

@Composable
fun StudioTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkScheme else LightScheme,
        typography = StudioTypography,
        shapes = StudioShapes,
        content = content
    )
}
`;
}
