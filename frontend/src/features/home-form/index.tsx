import Link from "next/link";
function HomeForm() {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center space-y-4 w-full mx-4">
        <div className="space-y-1">
          <p className="font-['Rosarivo',serif] text-3xl text-black leading-tight">
            Nail
          </p>
          <p className="font-['Rosarivo',serif] text-3xl text-black leading-tight">
            Reservation.
          </p>
        </div>

        <p className="font-['Inter','Noto_Sans_JP',sans-serif] font-light text-base text-black opacity-72 leading-snug">
          自分に合うデザインが見つかる
        </p>
        <Link href="/menu" className="btn btn-outline btn-neutral-content">
          メニューを選ぶ
        </Link>
      </div>
    </>
  );
}

export default HomeForm;
