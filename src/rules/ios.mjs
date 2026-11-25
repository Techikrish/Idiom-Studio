import {
  callArguments,
  callBody,
  containsEmoji,
  finding,
  findAll,
  nearby,
} from './helpers.mjs';

export const iosRules = [
  {
    id: 'ios-fixed-type',
    tier: 'floor',
    platforms: ['ios'],
    confidence: 'certain',
    title: 'Fixed font size bypasses Dynamic Type',
    why: 'A point size does not scale with the user\'s text-size setting, so the layout breaks for anyone who needs larger type.',
    fix: 'Use a semantic style (.body, .headline, .title2) or .font(.custom(_, size:, relativeTo:)).',
    detect({ file }) {
      if (file.token) return [];
      const found = [];
      for (const pattern of [
        /\.font\(\s*\.system\(\s*size\s*:/g,
        /\bUIFont\.(?:systemFont|boldSystemFont)\(\s*ofSize\s*:/g,
      ]) {
        for (const { index } of findAll(file.masked, pattern)) {
          if (nearby(file.masked, index, 160).includes('UIFontMetrics')) continue;
          found.push(
            finding(file, index, {
              message: 'A fixed point size is used instead of a semantic text style.',
            }),
          );
        }
      }
      for (const { index } of findAll(file.masked, /\.font\(\s*\.custom\s*\(/g)) {
        const args = callArguments(file.masked, index + '.font'.length);
        if (!args) continue;
        if (!/size\s*:/.test(args.text)) continue;
        if (/relativeTo\s*:/.test(args.text)) continue;
        found.push(
          finding(file, index, {
            message: 'A custom font is given a fixed size without a Dynamic Type anchor.',
          }),
        );
      }
      return found;
    },
  },

  {
    id: 'ios-liquid-glass-content',
    tier: 'floor',
    platforms: ['ios'],
    confidence: 'likely',
    title: 'Liquid Glass is applied to the content layer',
    why: 'Liquid Glass belongs to the navigation and control layer. Using it on cards, rows, or media makes content harder to read and fights the platform hierarchy.',
    fix: 'Keep glass on navigation, toolbars, and controls. Use standard materials or solid surfaces for content.',
    detect({ file }) {
      const base = file.base.toLowerCase();
      const contentFile =
        /(view|card|row|list|feed|profile|home|detail|settings)/.test(base) &&
        !/(nav|toolbar|control|button|tab|bar|menu)/.test(base);
      if (!contentFile) return [];
      return findAll(file.masked, /(?:\.glassEffect\s*\(|GlassEffectContainer\s*\{)/g).map(
        ({ index }) =>
          finding(file, index, {
            message: 'Glass treatment appears in a content view.',
          }),
      );
    },
  },

  {
    id: 'ios-custom-back',
    tier: 'floor',
    platforms: ['ios'],
    confidence: 'certain',
    title: 'System back button is hidden',
    why: 'Hiding the back button removes swipe-back and the platform back affordance unless both are rebuilt correctly.',
    fix: 'Keep the system back button, or preserve interactivePopGestureRecognizer and provide a labeled back control.',
    detect({ file }) {
      return findAll(file.masked, /\.navigationBarBackButtonHidden\s*\(\s*true\s*\)/g).map(
        ({ index }) =>
          finding(file, index, {
            message: 'The system back button is hidden.',
          }),
      );
    },
  },

  {
    id: 'ios-safe-area-ignore',
    tier: 'floor',
    platforms: ['ios'],
    confidence: 'likely',
    title: 'Content ignores the safe area',
    why: 'Ignoring the safe area on a scroll or content view can place text under the status bar and home indicator.',
    fix: 'Ignore the safe area on a background layer only; keep content inside the safe area or account for it explicitly.',
    detect({ file }) {
      if (!/(ScrollView|List\s*\(|Form\s*\{)/.test(file.masked)) return [];
      const found = [];
      for (const { index } of findAll(file.masked, /\.ignoresSafeArea\s*\(/g)) {
        const before = file.masked.slice(Math.max(0, index - 80), index);
        const backgroundOnly =
          /\b(Color|Rectangle|LinearGradient|RadialGradient|AngularGradient|Material)\b[^;{}]*$/.test(
            before,
          );
        if (backgroundOnly) continue;
        found.push(
          finding(file, index, {
            message: 'A scroll or content view ignores the safe area.',
          }),
        );
      }
      return found;
    },
  },

  {
    id: 'ios-web-chrome',
    tier: 'reflex',
    platforms: ['ios'],
    confidence: 'likely',
    title: 'Web navigation chrome on iOS',
    why: 'Hamburger plus overflow is a web pattern. iOS users expect a navigation title, a back affordance, and a tab bar.',
    fix: 'Use NavigationStack, a real title and toolbar, and a tab bar for top-level destinations.',
    detect({ file }) {
      if (!file.masked.includes('line.3.horizontal')) return [];
      if (!/(ellipsis|more)/.test(file.masked)) return [];
      return [
        finding(file, file.masked.indexOf('line.3.horizontal'), {
          message: 'Hamburger and overflow controls appear together.',
        }),
      ];
    },
  },

  {
    id: 'ios-manual-modal',
    tier: 'reflex',
    platforms: ['ios'],
    confidence: 'likely',
    title: 'Hand-built modal sheet',
    why: 'A custom drag-to-dismiss surface loses detents, focus handling, VoiceOver dismissal, and the platform gesture.',
    fix: 'Use .sheet with .presentationDetents and .presentationDragIndicator.',
    detect({ file }) {
      if (file.masked.includes('.sheet(')) return [];
      if (!/DragGesture\s*\(/.test(file.masked)) return [];
      if (!/\.offset\s*\(/.test(file.masked)) return [];
      if (!/(presentationMode|@Environment\(\\\.dismiss\))/.test(file.masked)) return [];
      return [
        finding(file, file.masked.search(/DragGesture\s*\(/), {
          message: 'A modal is built from a drag gesture and an offset.',
        }),
      ];
    },
  },

  {
    id: 'ios-emoji-content',
    tier: 'reflex',
    platforms: ['ios'],
    confidence: 'likely',
    title: 'Emoji used as interface chrome',
    why: 'Emoji render differently across OS versions, cannot inherit tint or weight, and read as decoration rather than interface.',
    fix: 'Use SF Symbols for interface icons; keep emoji for user content only.',
    detect({ file }) {
      if (!/(Button|Label|TabView|toolbar|navigationTitle)/.test(file.masked)) return [];
      const found = [];
      for (const string of file.strings) {
        if (!containsEmoji(string.value)) continue;
        if (string.value.replace(/\s/g, '').length > 6) continue;
        found.push(
          finding(file, string.start, {
            message: `Emoji string ${JSON.stringify(string.value)} is used near interface chrome.`,
          }),
        );
      }
      return found;
    },
  },
];
