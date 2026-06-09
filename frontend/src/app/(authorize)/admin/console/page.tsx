import { Typography } from "@/components/ui/typography";
import { fetchGoAsAdmin } from "@/lib/api/go-server-client";
import Link from "next/link";

export default async function AdminConsolePage() {
  let email: string | null = null;
  try {
    const res = await fetchGoAsAdmin("api/v1/admin/me");
    if (res.ok) {
      const me = (await res.json()) as { email?: string };
      email = me.email ?? null;
    }
  } catch {
    email = null;
  }

  return (
    <>
      <Typography>管理コンソール</Typography>
      <p className="mt-2 text-sm text-slate-600">
        {email
          ? `ログイン中: ${email}`
          : "ユーザー情報を取得できませんでした（トークンの検証のみ通過している可能性があります）。"}
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-sm text-[#9e9590] underline"
      >
        トップへ
      </Link>
    </>
  );
}
