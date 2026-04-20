"use client";
import { Modal } from "@/components/modal";
import { Typography } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function CalendarForm() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    import("cally");
  }, []);

  const handleDateChange = (event: CallyChangeEvent) => {
    const target = event.target as HTMLElement & { value?: string };
    const date = target.value;
    if (!date) return;
    setSelectedDate(date);
    setModalOpen(true);
  };

  // 引用元：https://wicky.nillia.ms/cally/
  const handleConfirmChange = (time: string) => {
    if (!selectedDate) return;
    const qs = new URLSearchParams({ date: selectedDate, time });
    setModalOpen(false);
    router.push(`/reservation?${qs.toString()}`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-4 mx-auto">
        <Typography size="lg" color="primary" align="center">
          CALENDAR
        </Typography>
        <Typography size="sm" variant="muted" align="left">
          タップして日程を選択
        </Typography>
        <calendar-date
          className="cally border border-base-300 shadow-lg rounded-box"
          onchange={handleDateChange}
        >
          <svg
            aria-label="Previous"
            className="fill-current size-4"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next"
            className="fill-current size-4"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          <calendar-month></calendar-month>
        </calendar-date>
        <Button isBack fallbackHref="/menu">
          戻る
        </Button>
      </div>

      <Modal
        open={modalOpen}
        selectedDate={selectedDate}
        onClose={handleModalClose}
        onConfirm={handleConfirmChange}
      />
    </>
  );
}

export default CalendarForm;
