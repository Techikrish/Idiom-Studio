#!/usr/bin/env bash
set -euo pipefail

PACKAGE="${1:-}"
ACTIVITY="${2:-}"
OUT="${3:-captures/android}"
SERIAL="${4:-}"

if [[ -z "$PACKAGE" || -z "$ACTIVITY" ]]; then
  echo "Usage: $0 <package> <activity> [outdir] [serial]" >&2
  echo "Example: $0 com.example.app .MainActivity captures/android" >&2
  exit 2
fi

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found in PATH" >&2
  exit 2
fi

if [[ -n "$SERIAL" ]]; then
  ADB=(adb -s "$SERIAL")
else
  ADB=(adb)
fi

mkdir -p "$OUT"
"${ADB[@]}" wait-for-device

if ! "${ADB[@]}" shell pm list packages 2>/dev/null | tr -d '\r' | grep -x "package:$PACKAGE" >/dev/null; then
  echo "Package $PACKAGE is not installed on the selected device." >&2
  echo "Install the debug APK first: adb install -r app/build/outputs/apk/debug/app-debug.apk" >&2
  exit 2
fi

ORIG_FONT="$("${ADB[@]}" shell settings get system font_scale | tr -d '\r')"
ORIG_NIGHT_RAW="$("${ADB[@]}" shell cmd uimode night | tr -d '\r')"
ORIG_RTL="$("${ADB[@]}" shell settings get global debug.force_rtl | tr -d '\r')"

if [[ "$ORIG_NIGHT_RAW" == *"yes"* ]]; then
  ORIG_NIGHT=yes
else
  ORIG_NIGHT=no
fi
if [[ -z "$ORIG_FONT" || "$ORIG_FONT" == "null" ]]; then
  ORIG_FONT=1.0
fi
if [[ -z "$ORIG_RTL" || "$ORIG_RTL" == "null" ]]; then
  ORIG_RTL=0
fi

restore() {
  set +e
  "${ADB[@]}" shell settings put system font_scale "$ORIG_FONT" >/dev/null 2>&1
  "${ADB[@]}" shell cmd uimode night "$ORIG_NIGHT" >/dev/null 2>&1
  "${ADB[@]}" shell settings put global debug.force_rtl "$ORIG_RTL" >/dev/null 2>&1
  set -e
}
trap restore EXIT

capture() {
  local name="$1"
  "${ADB[@]}" exec-out screencap -p > "$OUT/$name.png"

  local dumped=0
  for _ in 1 2 3 4 5; do
    if "${ADB[@]}" shell uiautomator dump /sdcard/idiom-window.xml >/dev/null 2>&1; then
      dumped=1
      break
    fi
    sleep 1
  done
  if [[ "$dumped" == "1" ]]; then
    "${ADB[@]}" pull /sdcard/idiom-window.xml "$OUT/$name.xml" >/dev/null 2>&1 || true
  else
    echo "warning: UI tree unavailable for $name" >&2
  fi
}

wait_for_app() {
  local resumed=""
  for _ in $(seq 1 20); do
    resumed="$("${ADB[@]}" shell dumpsys activity activities 2>/dev/null \
      | grep -E 'mResumedActivity|topResumedActivity' || true)"
    if [[ "$resumed" == *"$PACKAGE"* ]]; then
      return 0
    fi
    sleep 1
  done
  echo "warning: $PACKAGE did not become the resumed activity" >&2
  return 1
}

start_app() {
  "${ADB[@]}" shell am force-stop "$PACKAGE" >/dev/null 2>&1 || true
  "${ADB[@]}" shell am start -W -n "$PACKAGE/$ACTIVITY" >/dev/null
  wait_for_app
  sleep 2
}

start_app
capture light

"${ADB[@]}" shell cmd uimode night yes >/dev/null
sleep 2
capture dark
"${ADB[@]}" shell cmd uimode night no >/dev/null
sleep 2

"${ADB[@]}" shell settings put system font_scale 1.3 >/dev/null
sleep 2
capture font-1.3
"${ADB[@]}" shell settings put system font_scale 2.0 >/dev/null
sleep 2
capture font-2.0
"${ADB[@]}" shell settings put system font_scale 1.0 >/dev/null
sleep 2

"${ADB[@]}" shell settings put global debug.force_rtl 1 >/dev/null
start_app
capture rtl
"${ADB[@]}" shell settings put global debug.force_rtl 0 >/dev/null

if command -v montage >/dev/null 2>&1; then
  montage "$OUT"/*.png -tile 2x -geometry +8+8 "$OUT/contact-sheet.png" 2>/dev/null || true
fi

echo "Captured $OUT"
ls -1 "$OUT"
