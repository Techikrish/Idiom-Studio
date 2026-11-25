import { finding, findAll } from './helpers.mjs';

function count(source, pattern) {
  return findAll(source, pattern).length;
}

export const androidRules = [
  {
    id: 'android-default-purple',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Unmodified Material baseline purple',
    why: 'The stock M3 purple is the clearest signal that the visual system was never decided.',
    fix: 'Define a semantic color scheme with measured contrast. Dynamic color is optional, not a substitute for a direction.',
    detect({ file }) {
      const matches = [];
      for (const { index } of findAll(file.masked, /\b0xFF6750A4\b/gi)) matches.push(index);
      for (const { index } of findAll(
        file.masked,
        /\bPurple(?:40|80|Container|Grey(?:40|80)?)?\b/g,
      )) {
        matches.push(index);
      }
      for (const { index } of findAll(file.masked, /#6750A4/gi)) matches.push(index);
      if (matches.length === 0) return [];
      matches.sort((a, b) => a - b);
      return [
        finding(file, matches[0], {
          message: `Baseline Material purple appears ${matches.length} time${matches.length === 1 ? '' : 's'}.`,
        }),
      ];
    },
  },

  {
    id: 'android-orientation-lock',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Orientation or resizability is locked',
    why: 'Android 17 ignores these restrictions on large screens for apps targeting API 37. Locking them hides layout failures instead of fixing them.',
    fix: 'Remove the lock and build an adaptive layout with WindowSizeClass and sw600dp resources.',
    detect({ file }) {
      const found = [];
      for (const { index, match } of findAll(
        file.masked,
        /android:(screenOrientation|resizeableActivity)\s*=\s*"([^"]+)"/g,
      )) {
        const [, attribute, value] = match;
        if (attribute === 'resizeableActivity' && value === 'false') {
          found.push(finding(file, index, { message: 'resizeableActivity is false.' }));
        }
        if (
          attribute === 'screenOrientation' &&
          !/^(unspecified|fullSensor|fullUser|user|sensor)$/.test(value)
        ) {
          found.push(finding(file, index, { message: `screenOrientation is ${value}.` }));
        }
      }
      for (const { index } of findAll(
        file.masked,
        /requestedOrientation\s*=\s*(?:ActivityInfo\.)?SCREEN_ORIENTATION_\w+/g,
      )) {
        found.push(finding(file, index, { message: 'The activity requests a fixed orientation.' }));
      }
      for (const { index } of findAll(file.masked, /setRequestedOrientation\s*\(/g)) {
        found.push(finding(file, index, { message: 'The activity requests a fixed orientation.' }));
      }
      return found;
    },
  },

  {
    id: 'android-predictive-back',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Legacy back handling',
    why: 'Overriding onBackPressed or intercepting KEYCODE_BACK breaks the predictive back gesture and its preview animation.',
    fix: 'Use OnBackPressedDispatcher, the predictive back APIs, or Compose BackHandler.',
    detect({ file }) {
      const found = [];
      for (const { index } of findAll(file.masked, /override\s+fun\s+onBackPressed\s*\(/g)) {
        found.push(finding(file, index, { message: 'onBackPressed is overridden.' }));
      }
      for (const { index } of findAll(
        file.masked,
        /onKeyDown\s*\([^)]*KEYCODE_BACK/g,
      )) {
        found.push(finding(file, index, { message: 'Back is intercepted through a key event.' }));
      }
      return found;
    },
  },

  {
    id: 'android-system-bar-color',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'likely',
    title: 'Deprecated system bar coloring',
    why: 'Direct status and navigation bar colors are deprecated in edge-to-edge Android and produce unreadable icons across themes.',
    fix: 'Use enableEdgeToEdge() with SystemBarStyle, and draw your own scrims where needed.',
    detect({ file }) {
      return findAll(file.masked, /window\.(?:statusBarColor|navigationBarColor)\s*=/g).map(
        ({ index }) =>
          finding(file, index, { message: 'A system bar color is set directly.' }),
      );
    },
  },

  {
    id: 'android-tab-overflow',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Too many navigation bar destinations',
    why: 'Material navigation bars support three to five destinations. More than five makes targets small and the bar unreadable.',
    fix: 'Keep three to five top-level destinations and move the rest into overflow or a different surface.',
    detect({ file }) {
      const matches = findAll(file.masked, /NavigationBarItem\s*\(/g);
      if (matches.length <= 5) return [];
      return [
        finding(file, matches[5].index, {
          message: `${matches.length} NavigationBarItems are declared.`,
        }),
      ];
    },
  },

  {
    id: 'android-five-tabs',
    tier: 'reflex',
    platforms: ['android'],
    confidence: 'likely',
    title: 'Five equal top-level destinations',
    why: 'Five equal tabs is usually an unedited information architecture. It gives every destination the same weight and leaves no room for the primary task.',
    fix: 'Keep two or three primary destinations and move the rest to a secondary surface, or use a different navigation model.',
    detect({ file }) {
      const matches = findAll(file.masked, /NavigationBarItem\s*\(/g);
      if (matches.length !== 5) return [];
      return [
        finding(file, matches[0].index, {
          message: 'Five equal destinations are declared.',
        }),
      ];
    },
  },

  {
    id: 'android-fab-stack',
    tier: 'floor',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Competing floating action buttons',
    why: 'Two FABs occupy the same primary-action slot and make the screen ambiguous.',
    fix: 'Use FloatingActionButtonMenu for two to six related actions, or move secondary actions into the app bar.',
    detect({ file }) {
      const matches = findAll(file.masked, /FloatingActionButton\s*\(/g);
      if (matches.length < 2) return [];
      return [
        finding(file, matches[1].index, {
          message: `${matches.length} floating action buttons are declared.`,
        }),
      ];
    },
  },

  {
    id: 'android-default-fab',
    tier: 'reflex',
    platforms: ['android'],
    confidence: 'likely',
    title: 'Default FAB as the primary action',
    why: 'A FAB is the loudest control on the screen. Using one everywhere flattens hierarchy and implies every screen has the same job.',
    fix: 'Use a FAB only for the single most common action, or use FloatingActionButtonMenu for related actions.',
    detect({ file }) {
      const matches = findAll(file.masked, /FloatingActionButton\s*\(/g);
      if (matches.length === 0 || matches.length > 1) return [];
      return [
        finding(file, matches[0].index, {
          message: 'A floating action button is the primary action.',
        }),
      ];
    },
  },

  {
    id: 'android-custom-topbar',
    tier: 'reflex',
    platforms: ['android'],
    confidence: 'likely',
    title: 'Hand-built top bar',
    why: 'A row with a menu icon, centered text, and an overflow icon is web chrome. It loses insets, scroll behavior, and accessibility semantics.',
    fix: 'Use TopAppBar or CenterAlignedTopAppBar with navigationIcon and actions.',
    detect({ file }) {
      if (file.masked.includes('TopAppBar')) return [];
      const menu = /Icons\.(?:Default|Filled|Outlined)\.Menu\b/.test(file.masked);
      const overflow = /Icons\.(?:Default|Filled|Outlined)\.MoreVert\b/.test(file.masked);
      if (!menu || !overflow) return [];
      return [
        finding(file, file.masked.search(/Icons\.(?:Default|Filled|Outlined)\.Menu\b/), {
          message: 'Menu and overflow icons are composed by hand.',
        }),
      ];
    },
  },

  {
    id: 'android-fixed-sp',
    tier: 'reflex',
    platforms: ['android'],
    confidence: 'certain',
    title: 'Raw sp size outside the type scale',
    why: 'The size still scales with font settings, but it bypasses the app type scale and drifts from every other screen.',
    fix: 'Use MaterialTheme.typography.* or a semantic text style.',
    detect({ file }) {
      if (file.token) return [];
      const found = [];
      for (const { index } of findAll(
        file.masked,
        /\bfontSize\s*=\s*\d+(?:\.\d+)?\.sp\b/g,
      )) {
        found.push(finding(file, index, { message: 'A raw sp font size is used.' }));
      }
      for (const { index } of findAll(
        file.masked,
        /android:textSize\s*=\s*"\d+(?:\.\d+)?sp"/g,
      )) {
        found.push(finding(file, index, { message: 'A raw sp text size is used.' }));
      }
      return found;
    },
  },
];
