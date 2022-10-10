import { notification } from 'antd';

export const handleCreateNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `${input}`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `Tạo chứng chỉ thất bại`
    });
  }
};

export const handleEditNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `${input}`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `Cập nhật chứng chỉ thất bại`
    });
  }
};
export const handleDeleteNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `${input}`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `Xóa chứng chỉ thất bại`
    });
  }
};

export const handleGetListNotification = (status) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `Lấy danh sách chứng chỉ thành công`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `Lấy danh sách chúng chỉ thất bại`
    });
  }
};
