"use client";

import { useToast } from "@/app/_hooks/use-toast";
import { useAppStore } from "@/app/_stores/app";
import { NotificationType } from "@/types/notification";
import { useEffect } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";

export function Toaster() {
  const { toasts, toast } = useToast();
  const { notifications, setNotifications } = useAppStore();

  useEffect(() => {
    if (!notifications.length) {
      return;
    }

    const notification = notifications[0];

    toast({
      description: notification.message,
      variant:
        notification.type === NotificationType.ERROR
          ? "destructive"
          : "success",
      duration: 2000,
    });
  }, [notifications, toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            onOpenChange={(open) => {
              if (!open) {
                setNotifications([]);
              }
              props.onOpenChange?.(open);
            }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
