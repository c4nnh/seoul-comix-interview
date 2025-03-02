"use client";

import { useAppStore } from "@/app/_stores/app";
import { LoginSchema } from "@/schemas/auth";
import { ErrorCode } from "@/types/error";
import { NotificationType } from "@/types/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../_components/form-items/input";
import { FormPasswordInput } from "../_components/form-items/password-input";
import { Button } from "../_components/ui/button";
import { useTranslator } from "../_hooks/use-translator";
import { cn } from "../_libs/classnames";

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const t = useTranslations();
  const { data: session, status: loginStatus } = useSession();
  const { translate } = useTranslator();
  const { setNotifications } = useAppStore();
  const formMethods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleSubmit } = formMethods;

  async function handleLogin(data: LoginFormData) {
    try {
      const response = await signIn("username-password-credentials", {
        callbackUrl: "/",
        redirect: false,
        ...data,
      });

      if (response?.error) {
        setNotifications([
          {
            type: NotificationType.ERROR,
            message: translate(ErrorCode.INVALID_CREDENTIALS),
          },
        ]);
      }
    } catch {
      setNotifications([
        {
          type: NotificationType.ERROR,
          message: translate(ErrorCode.INTERNAL_SEVERAL_ERROR),
        },
      ]);
    }
  }

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div
      className={cn(
        "flex h-full bg-primary",
        "flex-col justify-end",
        "sm:flex-row sm:items-center sm:justify-center",
      )}
    >
      <div className={cn("flex-1 bg-red-200", "hidden sm:flex")} />
      <div
        className={cn("flex", "sm:flex-1 sm:items-center sm:justify-center")}
      >
        <FormProvider {...formMethods}>
          <div
            className={cn(
              "flex h-fit w-full flex-col gap-2 rounded-t-3xl bg-white p-8 pb-16",
              "sm:max-w-[400px] sm:rounded-3xl",
            )}
          >
            <span className="text-center text-3xl font-bold text-primary">
              {t("login.login")}
            </span>
            <div className="mt-4" />
            <FormInput<LoginFormData>
              name="username"
              label={t("login.username")}
            />
            <FormPasswordInput<LoginFormData>
              name="password"
              label={t("login.password")}
            />
            <Button
              disabled={loginStatus === "loading"}
              onClick={handleSubmit(handleLogin)}
            >
              {t("login.login")}
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
