export class CustomDate extends Date {
  /**
   * 時刻を "HH:mm" 形式の文字列で取得するロジックのみを持つ
   * 表示（日本語か等）に関わらず、時間データとしてのフォーマット
   */
  toLocaleString(): string {
    const hh = this.getHours().toString().padStart(2, "0");
    const mm = this.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`; // 12:34 形式
  }
}
