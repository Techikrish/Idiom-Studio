import { runLint } from './lint.mjs';
import { makeColor } from './util.mjs';

const DATA_SIGNAL =
  /\b(URLSession|URLRequest|collectAsState|collectAsStateWithLifecycle|StateFlow|viewModel|repository|useCase|LazyColumn|LazyVStack|LazyVGrid|ForEach\s*\(|items\s*\(|\.task\s*\{|LaunchedEffect|fetch\s*\()|@StateObject|@ObservedObject|@EnvironmentObject|ObservableObject/;
// State models are often SCREAMING_SNAKE enum cases (HomeState.ERROR), so these
// signals must be case-insensitive. String literals are masked before matching.
const LOADING_SIGNAL =
  /\b(ProgressView|CircularProgressIndicator|LinearProgressIndicator|LoadingView|Skeleton|Shimmer|isLoading|loading)\b/i;
const EMPTY_SIGNAL =
  /\b(ContentUnavailableView|EmptyState|EmptyView|isEmpty|emptyMessage|NoResults|NoItems|empty)\b/i;
const ERROR_SIGNAL =
  /\b(ErrorView|ErrorState|errorMessage|Result\.failure|is Error|UiState\.Error|Error)\b|catch\s*[({]/i;
const OFFLINE_SIGNAL = /\b(offline|NWPathMonitor|ConnectivityManager)\b/i;
const PERMISSION_SIGNAL =
  /\b(permission|authorizationStatus|shouldShowRequestPermissionRationale)\b/i;

export function auditStates(project, options = {}) {
  const lint =
    options.lint ??
    runLint(project, { mode: options.mode ?? project.mode, strict: false });

  const rows = [];
  for (const file of project.screens) {
    if (file.test) continue;
    const content = DATA_SIGNAL.test(file.masked);
    const loading = content && LOADING_SIGNAL.test(file.masked);
    const empty = content && EMPTY_SIGNAL.test(file.masked);
    const error = content && ERROR_SIGNAL.test(file.masked);
    const offline = content && OFFLINE_SIGNAL.test(file.masked);
    const permission = PERMISSION_SIGNAL.test(file.masked);
    const fileFindings = lint.findings.filter(
      (finding) => finding.file === file.rel && !finding.waived,
    );
    const dead = fileFindings.filter((finding) => finding.id === 'dead-control').length;
    const fake = fileFindings.filter((finding) => finding.id === 'fake-data').length;

    let status = 'static';
    if (content) {
      status = loading && empty && error ? 'complete' : 'partial';
    }

    rows.push({
      file: file.rel,
      screen: file.base.replace(/\.[^.]+$/, ''),
      content,
      loading,
      empty,
      error,
      offline,
      permission,
      dead,
      fake,
      status,
    });
  }

  const dataScreens = rows.filter((row) => row.content);
  const summary = {
    total: rows.length,
    complete: rows.filter((row) => row.status === 'complete').length,
    partial: rows.filter((row) => row.status === 'partial').length,
    static: rows.filter((row) => row.status === 'static').length,
    dead: rows.reduce((total, row) => total + row.dead, 0),
    fake: rows.reduce((total, row) => total + row.fake, 0),
    incomplete: dataScreens.filter((row) => row.status !== 'complete').length,
  };

  return { rows, summary };
}

function mark(value) {
  return value ? 'Y' : '-';
}

export function formatStates(result) {
  const color = makeColor();
  const lines = [];
  const { rows, summary } = result;

  if (rows.length === 0) {
    return 'No screen files found. Idiom looks for *View, *Screen, *ViewController, *Activity, and *Fragment.';
  }

  const header = [
    'SCREEN'.padEnd(32),
    'DATA'.padEnd(7),
    'LOAD'.padEnd(5),
    'EMPTY'.padEnd(6),
    'ERROR'.padEnd(6),
    'OFFLINE'.padEnd(8),
    'DEAD'.padEnd(5),
    'FAKE',
  ].join('');
  lines.push(color.bold(header));
  lines.push(color.dim('-'.repeat(header.length)));

  for (const row of rows) {
    const base = row.file.split('/').pop();
    const name = base.length > 31 ? `…${base.slice(-30)}` : base;
    const cells = [
      name.padEnd(32),
      (row.content ? 'Y' : 'static').padEnd(7),
      mark(row.loading).padEnd(5),
      mark(row.empty).padEnd(6),
      mark(row.error).padEnd(6),
      mark(row.offline).padEnd(8),
      String(row.dead || '-').padEnd(5),
      String(row.fake || '-'),
    ].join('');
    const needsWork = row.status === 'partial' || row.dead > 0 || row.fake > 0;
    lines.push(needsWork ? color.yellow(cells) : cells);
  }

  lines.push('');
  lines.push(
    `${summary.total} screens · ${summary.complete} complete · ${summary.partial} partial · ${summary.static} static`,
  );
  lines.push(
    `${summary.dead} dead control${summary.dead === 1 ? '' : 's'} · ${summary.fake} fake content string${
      summary.fake === 1 ? '' : 's'
    }`,
  );
  if (summary.partial > 0) {
    lines.push(color.red(`${summary.partial} data screen${summary.partial === 1 ? '' : 's'} missing at least one core state.`));
  } else if (summary.total > 0) {
    lines.push(color.green('All data screens declare loading, empty, and error states.'));
  }

  return lines.join('\n');
}
