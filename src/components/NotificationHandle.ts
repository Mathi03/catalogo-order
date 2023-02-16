import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

const NotificationHandle = (
  type: NotificationType,
  message: string,
  description: string = "",
  duration: number = 4.5,
  placement: NotificationPlacement = "topRight",
) => {
  notification[type]({ message, description, duration, placement });
};

export default NotificationHandle;
