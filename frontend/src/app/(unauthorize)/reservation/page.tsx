import BookingForm from "@/components/booking-form";

type ReserveProps = {
  searchParams: Promise<{ courseId?: string; date?: string; time?: string }>;
};

export default async function Reserve({ searchParams }: ReserveProps) {
  const { courseId, date, time } = await searchParams;
  return <BookingForm courseId={courseId} date={date} time={time} />;
}
