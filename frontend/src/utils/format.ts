const TIME_ZONE_TOKYO = "Asia/Tokyo";

/**
 * 料金を「¥5,000」のように表示する。
 */
export function formatPriceYen(value: number): string {
  return `¥${value.toLocaleString("ja-JP")}`;
}

/**
 * 日付を日本語ロケール・JST の暦日として表示する（例: 2026/05/01）。
 */
export function formatDateJst(date: Date): string {
  return date.toLocaleDateString("ja-JP", {
    timeZone: TIME_ZONE_TOKYO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * 時刻を JST の 24 時間表記で表示する（例: 09:30）。
 */
export function formatTimeHHmm(date: Date): string {
  return date.toLocaleTimeString("ja-JP", {
    timeZone: TIME_ZONE_TOKYO,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
