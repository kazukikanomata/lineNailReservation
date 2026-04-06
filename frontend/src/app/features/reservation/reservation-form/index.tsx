import Link from "next/link";
import { createReservation } from "../actions/reservation-action-schema";

type Props = { date?: string };

function ReservationForm({ date }: Props) {
  return (
    <>
      <Link href="/calendar" className="btn btn-ghost btn-sm gap-1 mb-3">
        <span>戻る</span>
      </Link>
      <form action={createReservation}>
        <h1>Reservation Pages</h1>
        <br />
        <fieldset className="fieldset">
          <legend className="fieldset-legend">選択したコース</legend>
          <input type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">選択した日付</legend>
          {/* TODO: ISO日付の特定のフォームの日付にする */}
          {/* 12:34みたいな表示にする */}
          {/* 現在の表示： date=2026-03-20 */}
          <p>{date ?? "選択"}</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">時間を入力してください</legend>
          <input type="time" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">お名前を入力してください</legend>
          <input type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">備考欄</legend>
          <input type="text" className="input" placeholder="Type here" />
        </fieldset>
        {/* TODO:料金をここで表示したい。 */}
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-accent"
          type="submit"
        >
          このコースで予約する
        </button>
      </form>
    </>
  );
}

export default ReservationForm;
