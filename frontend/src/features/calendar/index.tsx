"use client";
import BackButton from "@/components/backButton";
import { Modal } from "@/components/modals";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CalendarForm() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    import("cally");
  }, []);

  const handleDateChange = (event: Event) => {
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
      <div className="mb-3">
        <BackButton fallbackHref="/menu" />
      </div>
      <h1>Calendar</h1>
      <calendar-date
        className="cally bg-base-100 border border-base-300 shadow-lg rounded-box"
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
