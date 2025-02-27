export enum NotificationType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type Notification = {
  message: string;
  type: NotificationType;
};
