"use client";

import { Typography } from "../ui/typography";
import { useForm } from "react-hook-form";
import {
  LoginInput,
  LoginSchema,
} from "@/features/login/actions/login-action-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { loginAction } from "@/features/login/actions/login-action";
import { useState } from "react";
import { Toast } from "../ui/toast";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    status: "info" | "error";
  } | null>(null);

  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await loginAction(data);
    if (result.ok) {
      setToast({ message: "ログインしました", status: "info" });
      router.push("/admin/console");
    } else {
      setToast({ message: result.error, status: "error" });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} alert={toast.status} />}
      <Typography>ログイン</Typography>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-black">email</legend>
          <input
            type="email"
            className="input input-ghost bg-transparent text-slate-700"
            placeholder="emailを入力してください"
            {...register("email")}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-black">password</legend>
          <input
            type="password"
            className="input input-ghost bg-transparent text-slate-700"
            placeholder="passwordを入力してください"
            {...register("password")}
          />
        </fieldset>
        <Button type="submit">ログインする</Button>
      </form>
    </>
  );
}

export default LoginForm;
