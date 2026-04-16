"use server";

import { BookingInput, bookingSchema } from "./booking-action-schema";
import { postBooking } from "../api/post-booking";

export async function createBooking(data: BookingInput) {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: "入力内容を確認してください",
    };
  }
  const d = parsed.data;
  try {
    await postBooking({
      user_name: d.name,
      menu_id: Number(d.course),
      scheduled_at: d.date,
      start_at: d.time,
      remark: d.memo ?? "",
    });
    return { ok: true as const };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "予約に失敗しました",
    };
  }
}
