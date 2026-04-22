import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

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

  // このあたりの解説欲しいかも
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
      <div className="modal-box bg-gray-50">
        <Typography variant="primary">予約時間を選択</Typography>
        {/* これも解説したいかも */}
        {/* trueならselectedDateでそれ以外はnullって書き方かな？ */}
        {selectedDate ? (
          <Typography size="sm" as="div">
            日付:{selectedDate}
          </Typography>
        ) : null}
        <Typography size="sm" as="div">
          時間
        </Typography>
        <input
          type="time"
          className="input input-ghost bg-transparent text-slate-700"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="modal-action">
          <Button variant="accent" onClick={() => dialogRef.current?.close()}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            この日時で決める
          </Button>
        </div>
      </div>
    </dialog>
  );
}
