import "server-only";

import { env } from "@/env";

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginApiResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  email: string;
  admin_id: number;
};

function apiBase(): string {
  const fromServer = process.env.SERVER_API_BASE_URL;
  if (fromServer) {
    return fromServer.replace(/\/$/, "");
  }
  return env.API_BASE_URL.replace(/\/$/, "");
}

export async function requestAdminLogin(
  body: LoginBody,
): Promise<LoginApiResponse> {
  const response = await fetch(`${apiBase()}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = "ログインに失敗しました";
    try {
      const errBody = (await response.json()) as { error?: string };
      if (errBody.error === "invalid_credentials") {
        message = "メールアドレスまたはパスワードが正しくありません";
      } else if (errBody.error === "invalid_request") {
        message = "入力内容を確認してください";
      }
    } catch {
      message = `ログインに失敗しました (${response.status})`;
    }
    throw new Error(message);
  }

  return (await response.json()) as LoginApiResponse;
}
