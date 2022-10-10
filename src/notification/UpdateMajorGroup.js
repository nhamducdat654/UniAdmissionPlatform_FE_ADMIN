import { notification } from 'antd';

export const handleUpdateSuccessNotification = (msg) => {
  notification.success({
    message: msg,
    description: `Cập nhật thành công nhóm ngành !`
  });
};
export const handleUpdateFailNotification = (msg) => {
  notification.error({
    message: msg,
    description: `Cập nhật thất bại !`
  });
};
