import { httpClient } from "@/lib/client";

export type CreateBookingBody = {
  user_name: string;
  menu_id: number;
  scheduled_at: string;
  start_at: string;
  remark: string;
};

type ReservationResponse = {
  userName: string;
  menuId: number;
  scheduledAt: Date;
  startAt: Date;
  remark: string;
};
export async function postBooking(params: CreateBookingBody) {
  const response = await httpClient.request("bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(
      `予約の作成に失敗しました(${response.status}: ${body || response.statusText})`,
    );
  }
  return response.json() as Promise<ReservationResponse>;
}
