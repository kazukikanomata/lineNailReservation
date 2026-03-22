type Props = { date?: string };

function ReservationForm({ date }: Props) {
  return (
    <>
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
        <p>選択日：{date ?? "選択"}</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">お名前を入力してください</legend>
        <input type="text" className="input" placeholder="Type here" />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          メールアドレスを入力してください
        </legend>
        <input type="text" className="input" placeholder="Type here" />
      </fieldset>
      {/* TODO: */}
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-accent">
        このコースで予約する
      </button>
    </>
  );
}

export default ReservationForm;
