"use client";
import {
  BookingInput,
  bookingSchema,
} from "@/features/booking/actions/booking-action-schema";
import { createBooking } from "@/features/booking/actions/booking-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { Toast } from "../ui/toast";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

type Props = { date?: string };

function BookingForm({ date }: Props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: date || "",
      course: "",
      time: "",
      name: "",
      memo: "",
    },
  });

  const onSubmit = async (data: BookingInput) => {
    const result = await createBooking(data);
    if (result.ok) {
      <Toast message="予約しました" status="info" />;
      router.push("/");
    } else {
      <Toast message="予約に失敗しました" status="error" />;
    }
  };
  return (
    <>
      <div className="flex flex-col gap-8 p-4 mx-auto">
        <Typography size="lg" align="center">
          RESERVATION
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">
              選択したコース
            </legend>
            <input
              type="text"
              className="input input-ghost bg-transparent text-slate-700"
              placeholder="Type here"
              {...register("course")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">選択した日付</legend>
            {/* TODO: ISO日付の特定のフォームの日付にする */}
            {/* 12:34みたいな表示にする */}
            {/* 現在の表示： date=2026-03-20 */}
            <p>{date ?? "選択"}</p>
            <input type="hidden" {...register("date")} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">
              時間を入力してください
            </legend>
            <input
              type="time"
              className="input input-ghost bg-transparent text-slate-700"
              placeholder="Type here"
              {...register("time")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">
              お名前を入力してください
            </legend>
            <input
              type="text"
              className="input input-ghost bg-transparent text-slate-700"
              placeholder="Type here"
              {...register("name")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">備考欄</legend>
            <input
              type="text"
              className="input input-ghost bg-transparent text-slate-500"
              placeholder="Type here"
              {...register("memo")}
            />
          </fieldset>
          {/* TODO:料金をここで表示したい。 */}
          <Button type="submit">このコースで予約する</Button>
        </form>
        <Button isBack fallbackHref="/calendar">
          戻る
        </Button>
      </div>
    </>
  );
}

export default BookingForm;
