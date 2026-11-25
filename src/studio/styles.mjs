import { BASE_CSS } from './styles/base.mjs';
import { EDITORIAL_CSS } from './styles/editorial.mjs';
import { INSTRUMENT_CSS } from './styles/instrument.mjs';
import { CINEMATIC_CSS } from './styles/cinematic.mjs';
import { SPATIAL_CSS } from './styles/spatial.mjs';
import { RITUAL_CSS } from './styles/ritual.mjs';
import { PLAYGROUND_CSS } from './styles/playground.mjs';
import { LUXE_CSS } from './styles/luxe.mjs';
import { UTILITY_CSS } from './styles/utility.mjs';
import { CIVIC_CSS } from './styles/civic.mjs';
import { ORGANIC_CSS } from './styles/organic.mjs';

function fillTokens(css, tokens) {
  const light = tokens.color.light;
  const dark = tokens.color.dark;
  const values = {
    BG_LIGHT: light.background,
    SURFACE_LIGHT: light.surface,
    ELEV_LIGHT: light.elevated,
    TEXT_LIGHT: light.text,
    MUTED_LIGHT: light.muted,
    BORDER_LIGHT: light.border,
    ACCENT_LIGHT: light.accent,
    ONACCENT_LIGHT: light.onAccent,
    SUCCESS_LIGHT: light.success,
    WARNING_LIGHT: light.warning,
    DANGER_LIGHT: light.danger,
    BG_DARK: dark.background,
    SURFACE_DARK: dark.surface,
    ELEV_DARK: dark.elevated,
    TEXT_DARK: dark.text,
    MUTED_DARK: dark.muted,
    BORDER_DARK: dark.border,
    ACCENT_DARK: dark.accent,
    ONACCENT_DARK: dark.onAccent,
    SUCCESS_DARK: dark.success,
    WARNING_DARK: dark.warning,
    DANGER_DARK: dark.danger,
    FONT_DISPLAY: tokens.type.css.display,
    FONT_BODY: tokens.type.css.body,
    FONT_MONO: tokens.type.css.numeric,
    DISPLAY_SIZE: tokens.type.sizes.display,
    BODY_SIZE: tokens.type.sizes.body,
    TITLE_SIZE: tokens.type.sizes.title,
    HEADLINE_SIZE: tokens.type.sizes.headline,
    LABEL_SIZE: tokens.type.sizes.label,
    CAPTION_SIZE: tokens.type.sizes.caption,
    TRACK_DISPLAY: tokens.type.tracking.display,
    TRACK_LABEL: tokens.type.tracking.label,
    RADIUS_SM: tokens.radius.small,
    RADIUS_MD: tokens.radius.medium,
    RADIUS_LG: tokens.radius.large,
    MARGIN: tokens.layout.margin,
    GUTTER: tokens.layout.gutter,
    EASE: tokens.motion.easing,
  };
  let result = css;
  for (const [key, value] of Object.entries(values)) {
    result = result.replaceAll(`__${key}__`, String(value));
  }
  return result;
}

export function buildStyles(tokens) {
  return [
    BASE_CSS,
    EDITORIAL_CSS,
    INSTRUMENT_CSS,
    CINEMATIC_CSS,
    SPATIAL_CSS,
    RITUAL_CSS,
    PLAYGROUND_CSS,
    LUXE_CSS,
    UTILITY_CSS,
    CIVIC_CSS,
    ORGANIC_CSS,
  ]
    .map((chunk) => fillTokens(chunk, tokens))
    .join('\n');
}
