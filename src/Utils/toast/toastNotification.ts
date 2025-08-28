import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { AntdNotificationType, GlobalConfigPropsWithStack } from "../../Types";

export const AntdNotification = (notificationApi: NotificationInstance, type: AntdNotificationType, message: string, description?: string): void => {
  notification.config({
    placement: "topRight",
    stack: {
      threshold: 2,
    },
  } as GlobalConfigPropsWithStack);

  notificationApi[type]({
    message,
    description,
  });
};
