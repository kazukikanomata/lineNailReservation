import { httpClient } from "@/lib/client";

type PingResponse = {
  message: string;
  db_status: string;
};

export async function getPing(): Promise<PingResponse> {
  const response = await httpClient.request("ping", { method: "GET" });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(
      `Ping に失敗しました(${response.status}: ${body || response.statusText})`,
    );
  }
  return response.json() as Promise<PingResponse>;
}
