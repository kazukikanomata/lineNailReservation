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
        <BackButton fallbackHref="/" />
      </div>
      <h1>Calendar</h1>
      <calendar-date onchange={handleDateChange}>
        <calendar-month />
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
