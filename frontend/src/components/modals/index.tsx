import { useEffect, useRef, useState } from "react";

export type TimePickModal = {
  open: boolean;
  selectedDate: string | null;
  onClose: () => void;
  onConfirm: (time: string) => void;
};

export function Modal({
  open,
  selectedDate,
  onClose,
  onConfirm,
}: TimePickModal) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [time, setTime] = useState("00:00");

  //   このあたりの解説欲しいかも
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) el.showModal();
    else el.close();
  }, [open]);

  const handleConfirm = () => {
    if (!time) return;
    onConfirm(time);
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">予約時間を選択</h3>
        {/* これも解説したいかも */}
        {/* trueならselectedDateでそれ以外はnullって書き方かな？ */}
        {selectedDate ? <p className="py-4">日付: {selectedDate}</p> : null}
        <label className="label flex flex-col gap-2">
          <span className="label-text">時間</span>
          <input
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <div className="modal-action">
          <button
            type="button"
            className="btn"
            onClick={() => dialogRef.current?.close()}
          >
            キャンセル
          </button>
          <button type="button" className="btn" onClick={handleConfirm}>
            この日時で決める
          </button>
        </div>
      </div>
    </dialog>
  );
}
