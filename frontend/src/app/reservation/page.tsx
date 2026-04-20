import BookingForm from "@/components/booking-form";

type ReserveProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function Reserve({ searchParams }: ReserveProps) {
  const { date } = await searchParams;
  return <BookingForm date={date} />;
}
