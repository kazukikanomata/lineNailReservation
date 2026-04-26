import { requireAuth } from "@/lib/superbase/auth";

export default async function AdminPage() {
  const user = await requireAuth();
  console.log("ユーザー情報:", { user: user?.email });
  // https://zenn.dev/mof_moriko/articles/b23b082d591748

  return (
    <>
      <main>
        <h1>ようこそ、{user.email}さん</h1>
      </main>
    </>
  );
}
