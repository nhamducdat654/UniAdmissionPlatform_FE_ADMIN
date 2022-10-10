import { notification } from 'antd';

export const handleGetListNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `Lấy danh sách tài khoản thành công`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`
    });
  }
};

export const handleChangeStatusNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `${input}`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`
    });
  }
};
