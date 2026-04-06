"use server";

import { redirect } from "next/navigation";

export async function createReservation(formData: FormData) {
  const rawData = {
    // TODO: ここも修正が必要かも
    course: formData.get("course") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    name: formData.get("name") as string,
    memo: formData.get("memo") as string,
  };

  console.log(rawData);

  //   仮置き
  redirect("/reservation/success");
}
