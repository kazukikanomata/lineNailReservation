import ReservationForm from "../features/reservation-form";

type Props = {
  searchParams: Promise<{ date?: string }>;
};

export default async function Reserve({ searchParams }: Props) {
  const { date } = await searchParams;
  return (
    <>
      <ReservationForm date={date} />
    </>
  );
}
