import "server-only";

import { cookies } from "next/headers";
import { env } from "@/env";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";

function apiBase(): string {
  const fromServer = process.env.SERVER_API_BASE_URL;
  if (fromServer) {
    return fromServer.replace(/\/$/, "");
  }
  return env.API_BASE_URL.replace(/\/$/, "");
}

/**
 * BFF（Server Components / Actions）から Go API を叩くとき、HttpOnly Cookie の JWT を Bearer に載せる。
 */
export async function fetchGoAsAdmin(path: string, init?: RequestInit) {
  const token = (await cookies()).get(ADMIN_ACCESS_COOKIE)?.value;
  if (!token) {
    throw new Error("unauthorized");
  }

  const rel = path.replace(/^\//, "");
  const url = `${apiBase()}/${rel}`;

  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });
}
