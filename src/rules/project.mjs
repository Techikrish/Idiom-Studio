import { contrastRatio, formatRatio } from '../util.mjs';
import { finding } from './helpers.mjs';

function representativeAndroidFile(project) {
  return (
    project.screens.find((file) => file.platform === 'android') ??
    project.android.find((file) => !file.token) ??
    project.android[0] ??
    null
  );
}

function contrastPairs(colors) {
  const pairs = [];
  for (const name of colors.keys()) {
    let base = null;
    if (name.startsWith('on') && name.length > 2) {
      base = name.slice(2);
    } else if (/(text|label|content|foreground)/.test(name)) {
      const suffix = name.replace(/^.*?(text|label|content|foreground)/, '');
      base = suffix ? `surface${suffix}` : 'surface';
      if (!colors.has(base)) base = suffix ? `background${suffix}` : 'background';
      if (!colors.has(base)) base = 'surface';
      if (!colors.has(base)) base = 'background';
    }
    if (!base || base === name || !colors.has(base)) continue;
    pairs.push([name, base]);
  }
  return pairs;
}

export const projectRules = [
  {
    id: 'android-edge-to-edge',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'likely',
    scope: 'project',
    title: 'Edge-to-edge was never enabled',
    why: 'Apps targeting Android 15 and later draw edge-to-edge by default. Without explicit handling, content sits under the system bars or the app paints deprecated bar colors.',
    fix: 'Call enableEdgeToEdge() before setContent or setContentView, then consume insets with Scaffold or WindowInsets.',
    detectProject({ project }) {
      if (project.features.edgeToEdge) return [];
      if (project.activities.length === 0) return [];
      for (const file of project.activities) {
        const index = file.masked.search(/setContent\s*\{|setContentView\s*\(/);
        return [
          finding(file, index === -1 ? 0 : index, {
            message: 'An activity hosts UI but never calls enableEdgeToEdge().',
          }),
        ];
      }
      return [];
    },
  },

  {
    id: 'android-ime-insets',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'likely',
    scope: 'project',
    title: 'No IME inset handling',
    why: 'Forms and composers without IME insets are covered by the keyboard, which is one of the most common native layout failures.',
    fix: 'Apply Modifier.imePadding() to the form or composer, or use adjustResize with WindowInsets.ime.',
    detectProject({ project }) {
      if (project.features.imeInsets) return [];
      const textField = project.android.find((file) =>
        /(OutlinedTextField|TextField|BasicTextField)\s*\(/.test(file.masked),
      );
      if (!textField) return [];
      const index = textField.masked.search(
        /(OutlinedTextField|TextField|BasicTextField)\s*\(/,
      );
      return [
        finding(textField, index === -1 ? 0 : index, {
          message: 'Text input exists but no imePadding or adjustResize handling was found.',
        }),
      ];
    },
  },

  {
    id: 'android-no-adaptive',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'likely',
    scope: 'project',
    title: 'No adaptive layout branch',
    why: 'Android 17 ignores orientation and resizability restrictions on large screens for apps targeting API 37. A phone-only layout will stretch across tablets and foldables.',
    fix: 'Branch on WindowSizeClass, provide sw600dp resources, and use a two-pane layout where it earns its keep.',
    detectProject({ project }) {
      if (project.android.length < 3) return [];
      if (project.features.adaptive) return [];
      const file = representativeAndroidFile(project);
      if (!file) return [];
      return [
        finding(file, 0, {
          message: 'No WindowSizeClass or sw600dp branch was found in the project.',
        }),
      ];
    },
  },

  {
    id: 'a11y-contrast',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'certain',
    scope: 'project',
    title: 'Text contrast below 4.5:1',
    why: 'Low-contrast text fails WCAG AA and is flagged by both XCUITest accessibility audits and Android accessibility checks.',
    fix: 'Adjust the foreground or surface role and re-measure. Large text may use 3:1, but body text needs 4.5:1.',
    detectProject({ project }) {
      const results = [];
      for (const file of project.tokenFiles) {
        if (file.tokenColors.size === 0) continue;
        const pairs = contrastPairs(file.tokenColors);
        for (const [foreground, background] of pairs) {
          const ratio = contrastRatio(
            file.tokenColors.get(foreground),
            file.tokenColors.get(background),
          );
          if (ratio === null || ratio >= 4.5) continue;
          const namePattern = new RegExp(`\\b${foreground}\\b`, 'i');
          const match = namePattern.exec(file.raw);
          results.push(
            finding(file, match ? match.index : 0, {
              message: `${foreground} on ${background} measures ${formatRatio(ratio)}.`,
            }),
          );
        }
      }
      return results;
    },
  },
];
