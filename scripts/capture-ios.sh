#!/usr/bin/env bash
set -euo pipefail

BUNDLE="${1:-}"
OUT="${2:-captures/ios}"
DEVICE="${3:-booted}"

if [[ -z "$BUNDLE" ]]; then
  echo "Usage: $0 <bundle-id> [outdir] [device]" >&2
  echo "Example: $0 com.example.app captures/ios 'iPhone 17 Pro'" >&2
  exit 2
fi

if ! command -v xcrun >/dev/null 2>&1; then
  echo "xcrun not found. iOS rendered capture requires macOS with Xcode." >&2
  exit 2
fi

mkdir -p "$OUT"

if [[ "$DEVICE" == "booted" ]]; then
  xcrun simctl bootstatus booted -b >/dev/null 2>&1 || true
else
  xcrun simctl boot "$DEVICE" >/dev/null 2>&1 || true
  xcrun simctl bootstatus "$DEVICE" -b >/dev/null
fi

ORIG_APPEARANCE="$(xcrun simctl ui "$DEVICE" appearance 2>/dev/null | tr -d '\r' || true)"
case "$ORIG_APPEARANCE" in
  light|dark) ;;
  *) ORIG_APPEARANCE=light ;;
esac

ORIG_CONTENT_SIZE="$(xcrun simctl ui "$DEVICE" content_size 2>/dev/null | tr -d '\r' || true)"
case "$ORIG_CONTENT_SIZE" in
  extra-small|small|medium|large|extra-large|extra-extra-large|extra-extra-extra-large|\
  accessibility-medium|accessibility-large|accessibility-extra-large|\
  accessibility-extra-extra-large|accessibility-extra-extra-extra-large) ;;
  *) ORIG_CONTENT_SIZE=medium ;;
esac

restore() {
  set +e
  xcrun simctl ui "$DEVICE" appearance "$ORIG_APPEARANCE" >/dev/null 2>&1
  xcrun simctl ui "$DEVICE" content_size "$ORIG_CONTENT_SIZE" >/dev/null 2>&1
  set -e
}
trap restore EXIT

shot() {
  xcrun simctl io "$DEVICE" screenshot "$OUT/$1.png" >/dev/null
}

xcrun simctl launch --terminate-running-process "$DEVICE" "$BUNDLE" >/dev/null
sleep 2
shot light

xcrun simctl ui "$DEVICE" appearance dark >/dev/null
sleep 1
shot dark
xcrun simctl ui "$DEVICE" appearance light >/dev/null

xcrun simctl ui "$DEVICE" content_size accessibility-extra-extra-extra-large >/dev/null
sleep 1
shot large-type
xcrun simctl ui "$DEVICE" content_size medium >/dev/null

echo "Captured $OUT"
ls -1 "$OUT"
echo
echo "Accessibility audit: add scripts/ios/IdiomAccessibilityTests.swift to a UI test target and run:"
echo "  xcodebuild test -scheme <YourScheme> -destination 'platform=iOS Simulator,name=$DEVICE'"
