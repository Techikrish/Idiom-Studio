import { inRanges } from '../scan.mjs';
import {
  callBody,
  containsEmoji,
  emojiOnly,
  finding,
  findAll,
  nearby,
} from './helpers.mjs';

function skipPreview(file, index) {
  return inRanges(index, file.previews ?? []);
}

function androidIconControl(file, pattern, label) {
  const results = [];
  for (const { index } of findAll(file.masked, pattern)) {
    const body = callBody(file.masked, index);
    if (!body) continue;
    if (/contentDescription\s*=\s*null\b/.test(body.text)) {
      results.push(
        finding(file, index, {
          confidence: 'certain',
          message: `${label} has contentDescription = null.`,
        }),
      );
      continue;
    }
    if (/Icon\s*\(/.test(body.text) && !/contentDescription\s*=/.test(body.text)) {
      results.push(
        finding(file, index, {
          confidence: 'likely',
          message: `${label} contains an icon with no contentDescription.`,
        }),
      );
    }
  }
  return results;
}

export const crossRules = [
  {
    id: 'a11y-label',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'certain',
    title: 'Icon-only control has no accessible label',
    why: 'Screen readers announce the symbol name or nothing, so the control is unusable without sight.',
    fix: 'Add an accessibilityLabel / contentDescription that names the action, or use a labeled Button.',
    detect({ file }) {
      const results = [];
      if (file.platform === 'android') {
        results.push(
          ...androidIconControl(file, /\bIconButton\s*\(/g, 'IconButton'),
          ...androidIconControl(file, /\bFloatingActionButton\s*\(/g, 'FloatingActionButton'),
        );
      } else {
        for (const { index } of findAll(file.masked, /Image\s*\(\s*systemName\s*:/g)) {
          if (skipPreview(file, index)) continue;
          const context = nearby(file.masked, index, 320);
          if (!/(Button|onTapGesture|toolbar|tabItem)/.test(context)) continue;
          if (/(accessibilityLabel|Label\s*\()/.test(context)) continue;
          results.push(
            finding(file, index, {
              confidence: 'likely',
              message: 'An image-based control has no accessibilityLabel.',
            }),
          );
        }
      }
      return results;
    },
  },

  {
    id: 'a11y-touch-target',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Touch target below the platform minimum',
    why: 'A 24pt icon with no padding is still a 24pt target, which is hard to hit and fails accessibility audits.',
    fix: 'Keep at least 44pt (iOS) or 48dp (Android) of tappable area, using padding or contentShape when the visual is smaller.',
    detect({ file }) {
      const results = [];
      if (file.platform === 'ios') {
        for (const { index, match } of findAll(
          file.masked,
          /\.frame\s*\(\s*width\s*:\s*(\d+(?:\.\d+)?)\s*,\s*height\s*:\s*(\d+(?:\.\d+)?)\s*\)/g,
        )) {
          const width = Number(match[1]);
          const height = Number(match[2]);
          if (width >= 44 && height >= 44) continue;
          if (!/(Button|onTapGesture)/.test(nearby(file.masked, index, 350))) continue;
          results.push(
            finding(file, index, {
              message: `A ${width}x${height}pt frame is used on an interactive element.`,
            }),
          );
        }
      } else {
        for (const { index, match } of findAll(
          file.masked,
          /\.size\s*\(\s*(\d+(?:\.\d+)?)\.dp\s*\)/g,
        )) {
          const size = Number(match[1]);
          if (size >= 48) continue;
          const before = file.masked.slice(Math.max(0, index - 400), index);
          // An icon's visual size is not its target size. If the icon sits
          // inside an IconButton/Button, the wrapper owns the tappable area.
          if (/(Icon|Image)\s*\([^()]*$/.test(before) && /(IconButton|Button|FloatingActionButton)\s*\(/.test(before)) {
            continue;
          }
          if (!/(clickable|IconButton|Button|FloatingActionButton)/.test(nearby(file.masked, index, 300))) {
            continue;
          }
          results.push(
            finding(file, index, {
              message: `A ${size}dp control is below the 48dp target minimum.`,
            }),
          );
        }
      }
      return results;
    },
  },

  {
    id: 'state-missing',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Data screen only implements the happy path',
    why: 'A screen that fetches or lists data without loading, empty, and error branches breaks the moment the network is slow, the result is empty, or the request fails.',
    fix: 'Declare a state model (loading, content, empty, error, offline, permission) and render each state deliberately.',
    detect({ file, project }) {
      if (!file.screen || file.test || file.token) return [];
      const strongData =
        /\b(URLSession|URLRequest|collectAsState|collectAsStateWithLifecycle|StateFlow|viewModel|repository|useCase|LazyColumn|LazyVStack|LazyVGrid|ForEach\s*\(|items\s*\(|\.task\s*\{|LaunchedEffect|fetch\s*\()|@StateObject|@ObservedObject|@EnvironmentObject|ObservableObject/;
      const dataMatch = strongData.exec(file.masked);
      if (!dataMatch) return [];
      const usage =
        /(?:LazyColumn|LazyVStack|LazyVGrid)\s*\(|ForEach\s*\(|items\s*\(|collectAsState(?:WithLifecycle)?\s*\(|URLSession|fetch\s*\(/.exec(
          file.masked,
        );
      const stateUi =
        /\b(ProgressView|CircularProgressIndicator|LinearProgressIndicator|LoadingView|Skeleton|Shimmer|ContentUnavailableView|EmptyState|ErrorView|ErrorState|errorMessage|isEmpty|UiState|ScreenState|when\s*\([^)]*(?:uiState|state)|if\s*\([^)]*(?:loading|isLoading)|case\s+\.(?:loading|empty|error)|\.(?:Loading|Empty|Error)\b|catch\s*[({])/;
      if (stateUi.test(file.masked)) return [];
      const strong =
        /LazyColumn|LazyVStack|ForEach\s*\(/.test(file.masked) &&
        !/LazyColumn[\s\S]{0,120}LazyColumn/.test(file.masked);
      return [
        finding(file, usage ? usage.index : dataMatch.index, {
          confidence: strong ? 'certain' : 'likely',
          message: 'A data-backed screen has no loading, empty, or error branch.',
        }),
      ];
    },
  },

  {
    id: 'dead-control',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'certain',
    title: 'Visible control has an empty action',
    why: 'A dead control is a lie about what the app can do. Agents generate these constantly when scaffolding a screen.',
    fix: 'Implement the action, disable the control with an explanation, or remove it from the screen.',
    detect({ file }) {
      if (file.test || file.token) return [];
      const patterns =
        file.platform === 'android'
          ? [
              /onClick\s*=\s*\{\s*\}/g,
              /onClick\s*=\s*\{\s*TODO\s*\(/g,
              /Button\s*\([^)]*\)\s*\{\s*\}/g,
              /onTap\s*=\s*\{\s*\}/g,
              /clickable\s*\{\s*\}/g,
            ]
          : [
              /Button\s*\([^)]*\)\s*\{\s*\}/g,
              /Button\s*\{\s*\}\s*label\s*:/g,
              /action\s*:\s*\{\s*\}/g,
              /onTapGesture\s*\{\s*\}/g,
            ];
      const results = [];
      for (const pattern of patterns) {
        for (const { index } of findAll(file.masked, pattern)) {
          if (skipPreview(file, index)) continue;
          results.push(
            finding(file, index, {
              message: 'The action body is empty.',
            }),
          );
        }
      }
      return results;
    },
  },

  {
    id: 'fake-data',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'certain',
    title: 'Placeholder data in a production view',
    why: 'Seeded names, emails, and prices ship as fake content and hide the missing loading and empty states.',
    fix: 'Move fixtures into previews, tests, or a debug-only source set; render real content and real empty states.',
    detect({ file }) {
      if (file.test || file.token) return [];
      if (/preview/i.test(file.base)) return [];
      const patterns = [
        /\b(?:John|Jane)\s+(?:Doe|Smith|Cooper)\b/,
        /@example\.(?:com|org|net)\b/i,
        /Lorem ipsum/i,
        /\b123 Main St\b/i,
        /\+1\s*\(?555\)?/,
        /\$1,234\.56/,
        /\bAcme\s+(?:Corp|Inc|Co)\b/i,
      ];
      const results = [];
      for (const string of file.strings) {
        if (skipPreview(file, string.start)) continue;
        if (!patterns.some((pattern) => pattern.test(string.value))) continue;
        results.push(
          finding(file, string.start, {
            message: `Placeholder content ${JSON.stringify(string.value.slice(0, 48))} is present.`,
          }),
        );
      }
      return results;
    },
  },

  {
    id: 'fake-success',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Write can fail silently',
    why: 'A swallowed error still shows a success state, so the user believes data was saved when it was not.',
    fix: 'Handle the failure, surface a retry, and roll back any optimistic state.',
    detect({ file }) {
      const results = [];
      for (const { index } of findAll(
        file.masked,
        /try\?\s+(?:await\s+)?[\w.]+\.(?:save|update|delete|submit|post|send|publish|create)\b/g,
      )) {
        results.push(
          finding(file, index, {
            message: 'A write is attempted with try?, which discards the error.',
          }),
        );
      }
      for (const { index } of findAll(file.masked, /\.onSuccess\s*\{/g)) {
        if (/(onFailure|catch)\b/.test(file.masked)) continue;
        results.push(
          finding(file, index, {
            message: 'A success-only callback has no failure branch.',
          }),
        );
      }
      return results;
    },
  },

  {
    id: 'dark-pattern-consent',
    tier: 'floor',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Consent is pre-selected',
    why: 'Pre-checked consent is a dark pattern and invalid opt-in in many jurisdictions.',
    fix: 'Default consent to off and require an explicit choice before sharing data.',
    detect({ file }) {
      const text = `${file.masked}\n${file.strings.map((string) => string.value).join('\n')}`;
      if (!/(consent|marketing|newsletter|privacy|terms|subscribe)/i.test(text)) return [];
      const patterns = [
        /mutableStateOf\s*\(\s*true\s*\)/g,
        /isChecked\s*=\s*true/g,
        /@State[^\n=]*=\s*true/g,
        /Checkbox\s*\([^)]*checked\s*=\s*true/g,
      ];
      const results = [];
      for (const pattern of patterns) {
        for (const { index } of findAll(file.masked, pattern)) {
          results.push(
            finding(file, index, {
              message: 'A consent or marketing choice defaults to true.',
            }),
          );
        }
      }
      return results;
    },
  },

  {
    id: 'raw-color',
    tier: 'reflex',
    platforms: ['both'],
    confidence: 'certain',
    title: 'Raw color outside the design tokens',
    why: 'Off-token colors drift across screens, break dark mode, and cannot be audited for contrast.',
    fix: 'Add a semantic color role to the theme and reference it.',
    detect({ file }) {
      if (file.token) return [];
      const patterns =
        file.platform === 'ios'
          ? [
              /\bColor\s*\(\s*hex\s*:/g,
              /\bColor\s*\(\s*red\s*:/g,
              /\bColor\s*\(\s*\.sRGB\s*,/g,
              /\bUIColor\s*\(\s*red\s*:/g,
            ]
          : [/\bColor\s*\(\s*0x[0-9A-Fa-f]{8}\s*\)/g];
      const results = [];
      for (const pattern of patterns) {
        for (const { index } of findAll(file.masked, pattern)) {
          results.push(
            finding(file, index, {
              message: 'A color literal bypasses the theme.',
            }),
          );
        }
      }
      return results;
    },
  },

  {
    id: 'emoji-icon',
    tier: 'reflex',
    platforms: ['android'],
    confidence: 'likely',
    title: 'Emoji used as an interface icon',
    why: 'Emoji render differently across versions and manufacturers, cannot inherit tint, and read as decoration.',
    fix: 'Use Material Symbols for interface icons.',
    detect({ file }) {
      if (!/(Button|NavigationBarItem|Icon|Tab\s*\(|tab)/.test(file.masked)) return [];
      return file.strings
        .filter((string) => {
          if (!containsEmoji(string.value)) return false;
          if (!emojiOnly(string.value)) return false;
          return !skipPreview(file, string.start);
        })
        .map((string) =>
          finding(file, string.start, {
            message: `Emoji ${JSON.stringify(string.value)} is used as an icon.`,
          }),
        );
    },
  },

  {
    id: 'card-stack',
    tier: 'reflex',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Cards are the only layout primitive',
    why: 'A stack of elevated cards flattens hierarchy and reads as a template rather than a designed screen.',
    fix: 'Use plain lists and dividers, and reserve one elevated surface for the thing that actually matters.',
    detect({ file }) {
      if (file.token || file.test) return [];
      if (file.platform === 'android') {
        const cards = findAll(file.masked, /\bCard\s*\(/g);
        if (cards.length >= 3) {
          return [
            finding(file, cards[2].index, {
              message: `${cards.length} Card containers are declared.`,
            }),
          ];
        }
        if (cards.length >= 1 && /\b(items|ForEach)\s*\(/.test(file.masked)) {
          return [
            finding(file, cards[0].index, {
              message: 'A card is repeated inside a list.',
            }),
          ];
        }
      } else {
        const cards = findAll(file.masked, /RoundedRectangle\s*\(\s*cornerRadius/g);
        if (cards.length >= 3) {
          return [
            finding(file, cards[2].index, {
              message: `${cards.length} rounded card surfaces are declared.`,
            }),
          ];
        }
      }
      return [];
    },
  },

  {
    id: 'pill-everything',
    tier: 'reflex',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Every container is fully rounded',
    why: 'Pills everywhere erase shape hierarchy: controls, tags, and content all look the same.',
    fix: 'Use a radius scale with small, medium, and large steps; reserve capsules for tags and single-line controls.',
    detect({ file }) {
      const patterns =
        file.platform === 'android'
          ? [/RoundedCornerShape\s*\(\s*50\s*\)/g, /\bCircleShape\b/g]
          : [/\bCapsule\s*\(\s*\)/g];
      let matches = 0;
      let first = null;
      for (const pattern of patterns) {
        for (const { index } of findAll(file.masked, pattern)) {
          matches += 1;
          if (first === null) first = index;
        }
      }
      const threshold = file.platform === 'android' ? 2 : 3;
      if (matches < threshold) return [];
      return [
        finding(file, first, {
          message: `${matches} fully rounded shapes are declared.`,
        }),
      ];
    },
  },

  {
    id: 'gradient-glass',
    tier: 'reflex',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Decorative gradient or glass on content',
    why: 'Gradients and blur are often standing in for hierarchy, and they fight the platform material system.',
    fix: 'Remove it, or give it a semantic job and keep it away from text.',
    detect({ file }) {
      if (file.token || file.test) return [];
      const patterns =
        file.platform === 'ios'
          ? [
              /\b(?:LinearGradient|RadialGradient|AngularGradient)\s*\(/g,
              /\.(?:ultraThinMaterial|thinMaterial|regularMaterial|thickMaterial)\b/g,
            ]
          : [/\bBrush\.\w*Gradient\s*\(/g, /\.blur\s*\(/g];
      for (const pattern of patterns) {
        const match = pattern.exec(file.masked);
        if (match) {
          return [
            finding(file, match.index, {
              message: 'A decorative gradient or material is applied.',
            }),
          ];
        }
      }
      return [];
    },
  },

  {
    id: 'motion-reduce',
    tier: 'finish',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Animation has no reduce-motion fallback',
    why: 'Reduce Motion is an accessibility setting, not a preference. Unconditional motion can cause discomfort.',
    fix: 'Check accessibilityReduceMotion / LocalMotionDurationScale and provide a crossfade or no-motion fallback.',
    detect({ file, project }) {
      if (project.features.reduceMotion) return [];
      const match =
        file.platform === 'ios'
          ? /withAnimation|\.animation\s*\(|\.transition\s*\(|matchedGeometryEffect/.exec(
              file.masked,
            )
          : /animate[A-Za-z]*AsState|AnimatedVisibility|animateContentSize|updateTransition|rememberInfiniteTransition/.exec(
              file.masked,
            );
      if (!match) return [];
      return [
        finding(file, match.index, {
          message: 'An animation is unconditional.',
        }),
      ];
    },
  },

  {
    id: 'spacing-grid',
    tier: 'finish',
    platforms: ['both'],
    confidence: 'likely',
    title: 'Spacing is off the 4pt grid',
    why: 'Arbitrary spacing values accumulate into visual drift that is hard to see in any single screen.',
    fix: 'Use a spacing scale (4/8/12/16/24/32) and keep exceptions deliberate.',
    detect({ file }) {
      if (file.token) return [];
      const pattern =
        file.platform === 'android'
          ? /\.(?:padding|spacedBy)\s*\(\s*(\d+(?:\.\d+)?)\.dp/g
          : /\.padding\s*\(\s*(\d+(?:\.\d+)?)\s*\)/g;
      const offGrid = [];
      for (const { index, match } of findAll(file.masked, pattern)) {
        const value = Number(match[1]);
        if (value > 2 && value % 4 !== 0) offGrid.push({ index, value });
      }
      if (offGrid.length === 0) return [];
      return [
        finding(file, offGrid[0].index, {
          message: `${offGrid.length} spacing value${offGrid.length === 1 ? ' is' : 's are'} off the 4pt grid (e.g. ${offGrid[0].value}).`,
        }),
      ];
    },
  },
];
