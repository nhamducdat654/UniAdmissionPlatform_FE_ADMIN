import { notification } from 'antd';

export const handleCreateSuccessNotification = (msg) => {
  notification.success({
    message: msg,
    description: `Tạo thành công nhóm ngành mới !`
  });
};
export const handleCreateFailNotification = (msg) => {
  notification.error({
    message: msg,
    description: `Tạo thất bại ( bắt buộc phải upload hình ) !`
  });
};
