const TIME_ZONE_JST_OFFSET = "+09:00";

/**
 * `HH:mm` または `HH:mm:ss` を `HH:mm:ss` に揃える。
 */
function normalizeTimeSegment(time: string): string | null {
  const trimmed = time.trim();
  const parts = trimmed.split(":").map((p) => p.trim());
  if (parts.length === 2) {
    const [h, m] = parts;
    if (!/^\d{1,2}$/.test(h) || !/^\d{1,2}$/.test(m)) return null;
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts;
    if (!/^\d{1,2}$/.test(h) || !/^\d{1,2}$/.test(m) || !/^\d{1,2}$/.test(s)) return null;
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
  }
  return null;
}

/**
 * `YYYY-MM-DD` 形式か簡易チェックする。
 */
function isValidDateString(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date.trim());
}

/**
 * 日付文字列と時刻文字列を JST の壁時計として解釈し、単一の Date（UTC インスタント）に変換する。
 *
 * @param date - `YYYY-MM-DD`
 * @param time - `HH:mm` または `HH:mm:ss`
 */
export function combineDateAndTime(date: string, time: string): Date | null {
  if (!isValidDateString(date)) return null;
  const normalizedTime = normalizeTimeSegment(time);
  if (!normalizedTime) return null;

  const isoLocal = `${date.trim()}T${normalizedTime}${TIME_ZONE_JST_OFFSET}`;
  const d = new Date(isoLocal);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/**
 * Date を JST における ISO 8601 風文字列（オフセット付き）にする。
 * API 送信用の「日本時間での一点」を表す用途を想定。
 */
export function toIsoLocal(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  const y = get("year");
  const mo = get("month");
  const da = get("day");
  const h = get("hour");
  const mi = get("minute");
  const s = get("second");

  return `${y}-${mo}-${da}T${h}:${mi}:${s}${TIME_ZONE_JST_OFFSET}`;
}

/**
 * 指定した日時が現在時刻より前かどうか（インスタントの比較）。
 * 予約枠が「もう過ぎたか」の判定に使える。
 */
export function isPastInJst(date: Date): boolean {
  return date.getTime() < Date.now();
}
