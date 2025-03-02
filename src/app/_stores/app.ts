import { Notification } from "@/types/notification";
import { create } from "zustand";

type AppState = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  notifications: [],
  setNotifications: (notifications: Notification[]) => {
    set({
      notifications,
    });
  },
}));
