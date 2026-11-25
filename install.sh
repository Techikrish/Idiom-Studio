#!/usr/bin/env bash
# Idiom Studio installer.
# Installs the skill into Claude Code, Codex, OpenCode, or any agent that reads SKILL.md.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NAME="idiom-studio"
MODE="link"
FORCE=0
UNINSTALL=0
TARGETS=()
BIN_DIR="${XDG_BIN_HOME:-$HOME/.local/bin}"

usage() {
  cat <<'EOF'
Idiom Studio installer

Usage
  ./install.sh                     Install for every agent found on this machine
  ./install.sh --copy              Copy the skill instead of symlinking it
  ./install.sh --target <dir>      Install into a specific skills directory
  ./install.sh --bin-dir <dir>     Put the CLI here (default: ~/.local/bin)
  ./install.sh --force             Replace an existing installation
  ./install.sh --uninstall         Remove the skill and CLI links
  ./install.sh --help              Show this help

Default locations
  ~/.agents/skills                 Codex, OpenCode compatibility, open Agent Skills standard
  ~/.claude/skills                 Claude Code
  ~/.config/opencode/skills        OpenCode native

Examples
  ./install.sh
  ./install.sh --copy --target .agents/skills
  ./install.sh --target ~/.hermes/skills
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --copy) MODE="copy"; shift ;;
    --link) MODE="link"; shift ;;
    --force) FORCE=1; shift ;;
    --uninstall) UNINSTALL=1; shift ;;
    --target)
      [[ $# -ge 2 ]] || { echo "error: --target needs a directory" >&2; exit 1; }
      TARGETS+=("$2"); shift 2 ;;
    --bin-dir)
      [[ $# -ge 2 ]] || { echo "error: --bin-dir needs a directory" >&2; exit 1; }
      BIN_DIR="$2"; shift 2 ;;
    --help|-h) usage; exit 0 ;;
    *) echo "error: unknown option $1" >&2; usage; exit 1 ;;
  esac
done

resolve() {
  (cd "$1" 2>/dev/null && pwd -P) || true
}

default_targets() {
  TARGETS=()
  TARGETS+=("$HOME/.agents/skills")
  if [[ -d "$HOME/.claude" ]] || command -v claude >/dev/null 2>&1; then
    TARGETS+=("$HOME/.claude/skills")
  fi
  if command -v opencode >/dev/null 2>&1 || [[ -d "$HOME/.config/opencode" ]]; then
    TARGETS+=("$HOME/.config/opencode/skills")
  fi
}

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  default_targets
fi

if [[ "$UNINSTALL" -eq 1 ]]; then
  for root in "${TARGETS[@]}"; do
    dest="$root/$NAME"
    if [[ -e "$dest" || -L "$dest" ]]; then
      rm -rf "$dest"
      echo "removed: $dest"
    fi
  done
  for bin in idiom-studio idiom-gate; do
    if [[ -L "$BIN_DIR/$bin" || -f "$BIN_DIR/$bin" ]]; then
      rm -f "$BIN_DIR/$bin"
      echo "removed: $BIN_DIR/$bin"
    fi
  done
  echo "Idiom Studio uninstalled."
  exit 0
fi

# Node is required by the generator, but the skill still works as instructions without it.
if command -v node >/dev/null 2>&1; then
  NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
  if [[ "$NODE_MAJOR" -lt 20 ]]; then
    echo "warning: Node $(node -v) found; Idiom Studio targets Node 20+." >&2
  fi
else
  echo "warning: Node.js not found. The skill's instructions still work; the generator will not." >&2
fi

install_one() {
  local root="$1"
  local dest="$root/$NAME"
  mkdir -p "$root"

  if [[ -L "$dest" ]]; then
    if [[ "$(resolve "$dest")" == "$(resolve "$ROOT")" ]]; then
      echo "already installed: $dest"
      return
    fi
  fi

  if [[ -e "$dest" || -L "$dest" ]]; then
    if [[ "$FORCE" -ne 1 ]]; then
      echo "exists, skipped: $dest (use --force to replace)"
      return
    fi
    rm -rf "$dest"
  fi

  if [[ "$MODE" == "copy" ]]; then
    mkdir -p "$dest"
    cp -R "$ROOT/." "$dest/"
    rm -rf "$dest/.git" "$dest/node_modules" "$dest/examples" "$dest/studio-out"
    echo "installed (copy): $dest"
  else
    ln -s "$ROOT" "$dest"
    echo "installed (link): $dest"
  fi
}

for root in "${TARGETS[@]}"; do
  install_one "$root"
done

mkdir -p "$BIN_DIR"
chmod +x "$ROOT/bin/studio.mjs" "$ROOT/bin/idiom.mjs" 2>/dev/null || true
ln -sf "$ROOT/bin/studio.mjs" "$BIN_DIR/idiom-studio"
ln -sf "$ROOT/bin/idiom.mjs" "$BIN_DIR/idiom-gate"
echo "CLI: $BIN_DIR/idiom-studio"
echo "Gate: $BIN_DIR/idiom-gate"

case ":$PATH:" in
  *":$BIN_DIR:"*) ;;
  *) echo "Add the CLI to your PATH: export PATH=\"$BIN_DIR:\$PATH\"" ;;
esac

if command -v node >/dev/null 2>&1; then
  if node "$ROOT/bin/studio.mjs" validate >/dev/null 2>&1; then
    echo "Generator check: 10 families validated."
  else
    echo "warning: generator validation failed. Run: node \"$ROOT/bin/studio.mjs\" validate" >&2
  fi
fi

cat <<EOF

Installed. Try it in an agent:

  Claude Code   claude
                > Use Idiom Studio to design and build a native iOS app for <brief>.

  Codex         codex
                > \$idiom-studio Build a native Android app for <brief>.

  OpenCode      opencode
                > @idiom-studio Build a native iOS app for <brief>.

  Other agents  Point the agent at this folder, or install into its skills directory:
                ./install.sh --target ~/.hermes/skills

CLI test:
  idiom-studio families
  idiom-studio design "a calm app for sleep and a bedtime ritual" --name "Dusk" --out /tmp/dusk --shot

Uninstall:
  ./install.sh --uninstall
EOF
