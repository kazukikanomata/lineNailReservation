import CalendarForm from "@/components/calendar";
import { Suspense } from "react";

export default function Calendar() {
  return (
    <Suspense fallback={null}>
      <CalendarForm />
    </Suspense>
  );
}
