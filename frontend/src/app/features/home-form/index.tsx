import Link from "next/link";
function HomeForm() {
  return (
    <>
      <h1>Nail</h1>
      <h2>Reservation.</h2>
      <p>自分に合うデザインが見つかる</p>
      <Link href="/menu">メニューを選ぶ</Link>
    </>
  );
}

export default HomeForm;
