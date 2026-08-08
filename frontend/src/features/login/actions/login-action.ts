"use server";

import { cookies } from "next/headers";
import {
  LoginInput,
  LoginSchema,
} from "@/features/login/actions/login-action-schema";
import { requestAdminLogin } from "@/features/login/api/post-login";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";

export async function loginAction(data: LoginInput) {
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false as const,
      error: "入力内容を確認してください",
    };
  }

  const d = parsed.data;
  try {
    const loginResult = await requestAdminLogin({
      email: d.email,
      password: d.password,
    });

    const jar = await cookies();
    jar.set(ADMIN_ACCESS_COOKIE, loginResult.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: loginResult.expires_in,
    });

    return { ok: true as const };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "ログインに失敗しました",
    };
  }
}
