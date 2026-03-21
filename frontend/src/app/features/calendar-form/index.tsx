"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CalendarForm() {
  const router = useRouter();
  useEffect(() => {
    import("cally");
  }, []);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLElement & { value?: string };
    const selectedDate = target.value;
    if (!selectedDate) return;
    router.push(`/reservation?date=${encodeURIComponent(selectedDate)}`);
  };

  return (
    <>
      <h1>Calendar</h1>
      {/* https://wicky.nillia.ms/cally/ */}
      <calendar-date onchange={handleChange}>
        <calendar-month />
      </calendar-date>
    </>
  );
}

export default CalendarForm;
