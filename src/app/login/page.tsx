"use client";

import { useAppStore } from "@/app/_stores/app";
import { LoginSchema } from "@/schemas/auth";
import { ErrorCode } from "@/types/error";
import { NotificationType } from "@/types/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../_components/form-items/input";
import { FormPasswordInput } from "../_components/form-items/password-input";
import { Button } from "../_components/ui/button";
import { useTranslator } from "../_hooks/use-translator";
import { cn } from "../_libs/classnames";

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
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
    router.replace("/");
    return <></>;
  }

  return (
    <div
      className={cn(
        "flex h-full bg-primary",
        "flex-col justify-end",
        "md:flex-row md:items-center md:justify-center",
      )}
    >
      <div className={cn("flex-1 bg-red-200", "hidden md:flex")} />
      <div
        className={cn("flex", "md:flex-1 md:items-center md:justify-center")}
      >
        <FormProvider {...formMethods}>
          <div
            className={cn(
              "flex h-fit w-full flex-col gap-2 rounded-t-3xl bg-white p-8 pb-16",
              "md:max-w-[400px] md:rounded-3xl",
            )}
          >
            <span className="text-center text-3xl font-bold text-primary">
              Login
            </span>
            <div className="mt-4" />
            <FormInput<LoginFormData> name="username" label="Username" />
            <FormPasswordInput<LoginFormData>
              name="password"
              label="Password"
            />
            <Button
              disabled={loginStatus === "loading"}
              onClick={handleSubmit(handleLogin)}
            >
              Login
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
