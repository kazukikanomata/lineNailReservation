type Props = { date?: string };

function ReservationForm({ date }: Props) {
  return (
    <>
      <h1>Reservation Pages</h1>
      <p>選択日：{date ?? "選択"}</p>
      <br />
      <fieldset className="fieldset">
        <legend className="fieldset-legend">選択したコース</legend>
        <input type="text" className="input" placeholder="Type here" />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">選択した日付</legend>
        <input type="text" className="input" placeholder="Type here" />
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
      <button className="btn btn-şs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-accent">
        このコースで予約する
      </button>
    </>
  );
}

export default ReservationForm;
