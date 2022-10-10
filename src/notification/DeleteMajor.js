import { notification } from 'antd';

export const handleDeleteSuccessNotification = (msg) => {
  notification.success({
    message: msg,
    description: `Xóa thành công !`
  });
};
export const handleDeleteFailNotification = (msg) => {
  notification.error({
    message: msg,
    description: `Xóa thất bại.`
  });
};
