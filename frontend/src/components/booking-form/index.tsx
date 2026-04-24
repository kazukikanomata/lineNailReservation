"use client";
import {
  BookingInput,
  bookingSchema,
} from "@/features/booking/actions/booking-action-schema";
import { createBooking } from "@/features/booking/actions/booking-create";
import { findCourseById } from "@/lib/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Toast } from "../ui/toast";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

type BookingProps = { courseId?: string; date?: string; time?: string };

function BookingForm({ courseId, date, time }: BookingProps) {
  const router = useRouter();
  const course = courseId ? findCourseById(courseId) : undefined;
  const [toast, setToast] = useState<{
    message: string;
    status: "info" | "error";
  } | null>(null);

  const { register, handleSubmit } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      course: courseId ?? "",
      date: date ?? "",
      time: time ?? "",
      name: "",
      memo: "",
    },
  });

  const onSubmit = async (data: BookingInput) => {
    const result = await createBooking(data);
    if (result.ok) {
      setToast({ message: "予約しました", status: "info" });
      router.push("/");
    } else {
      setToast({ message: "予約に失敗しました", status: "error" });
    }
  };
  return (
    <>
      {toast && <Toast message={toast.message} alert={toast.status} />}
      <div className="flex flex-col gap-8 p-4 mx-auto">
        <Typography size="lg" align="center">
          RESERVATION
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">
              選択したコース
            </legend>
            <p className="text-slate-700">{course?.name ?? "未選択"}</p>
            <input type="hidden" {...register("course")} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">選択した日付</legend>
            <p className="text-slate-700">{date ?? "未選択"}</p>
            <input type="hidden" {...register("date")} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">選択した時間</legend>
            <p className="text-slate-700">{time ?? "未選択"}</p>
            <input type="hidden" {...register("time")} />
          </fieldset>
          {course && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-black">料金</legend>
              <p className="text-slate-700">
                ¥{course.price.toLocaleString()} / {course.durationMinutes}分
              </p>
            </fieldset>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">お名前</legend>
            <input
              type="text"
              className="input input-ghost bg-transparent text-slate-700"
              placeholder="お名前を入力してください"
              {...register("name")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">備考欄</legend>
            <input
              type="text"
              className="input input-ghost bg-transparent text-slate-500"
              placeholder="任意"
              {...register("memo")}
            />
          </fieldset>
          <Button type="submit">このコースで予約する</Button>
        </form>
        <Button isBack fallbackHref={`/calendar?courseId=${courseId ?? ""}`}>
          戻る
        </Button>
      </div>
    </>
  );
}

export default BookingForm;
