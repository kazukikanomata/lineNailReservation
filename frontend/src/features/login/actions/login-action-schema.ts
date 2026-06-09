import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("正しいメールアドレス形式で入力してください。")
    .regex(/^[ -~]+$/, "メールアドレスは半角で入力してください"),
  password: z
    .string()
    .min(1, "パスワードは必須です")
    .regex(/^[ -~]+$/, "パスワードは半角で入力してください"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
