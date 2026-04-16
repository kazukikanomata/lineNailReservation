import BookingForm from "@/components/booking-form";

type Props = {
  searchParams: Promise<{ date?: string }>;
};

export default async function Reserve({ searchParams }: Props) {
  const { date } = await searchParams;
  return <BookingForm date={date} />;
}
