"use client";
import {
  BookingInput,
  bookingSchema,
} from "@/features/booking/actions/booking-action-schema";
import { createBooking } from "@/features/booking/actions/booking-create";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { Toast } from "../ui/toast";
import { Button } from "../ui/button";
import BackButton from "../backButton";

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
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="mb-3">
          <BackButton fallbackHref="/calendar" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title my-2">予約ページ</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">選択したコース</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                {...register("course")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">選択した日付</legend>
              {/* TODO: ISO日付の特定のフォームの日付にする */}
              {/* 12:34みたいな表示にする */}
              {/* 現在の表示： date=2026-03-20 */}
              <p>{date ?? "選択"}</p>
              <input type="hidden" {...register("date")} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                時間を入力してください
              </legend>
              <input
                type="time"
                className="input"
                placeholder="Type here"
                {...register("time")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                お名前を入力してください
              </legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                {...register("name")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">備考欄</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                {...register("memo")}
              />
            </fieldset>
            {/* TODO:料金をここで表示したい。 */}
            <Button variant="accent" outline type="submit">
              このコースで予約する
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BookingForm;
