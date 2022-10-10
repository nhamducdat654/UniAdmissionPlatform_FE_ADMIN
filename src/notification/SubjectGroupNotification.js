import { notification } from 'antd';

export const handleCreateNotification = (status) => {
  if (status === 'success') {
    notification.success({
      message: 'Tạo thành công!'
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Tạo thất bại!'
    });
  }
};

export const handleUpdateNotification = (status) => {
  if (status === 'success') {
    notification.success({
      message: 'Cập nhật thành công!'
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Cập nhật thất bại!'
    });
  }
};

export const handleDeleteNotification = (status) => {
  if (status === 'success') {
    notification.success({
      message: 'Xóa thành công!'
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Xóa thất bại!'
    });
  }
};
