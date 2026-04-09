import Link from "next/link";
function HomeForm() {
  return (
    <>
      <div>
        <p className="font-['Rosarivo',serif] text-3xl text-white leading-tight">
          Nail
        </p>
        <p className="font-['Rosarivo',serif] text-3xl text-white leading-tight">
          Reservation.
        </p>
      </div>
      <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-light text-base text-white opacity-72 leading-snug">
        自分に合うデザインが見つかる
      </p>
      <Link
        href="/menu"
        className="btn btn-outline btn-neutral-content hover:bg-primary"
      >
        メニューを選ぶ
      </Link>
    </>
  );
}

export default HomeForm;
