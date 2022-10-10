import { Button, notification } from 'antd';
import React from 'react';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

export const CreateSuccessNotification = (input) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type='primary' size='small' onClick={() => notification.close(key)}>
      Xác minh
    </Button>
  );
  notification.success({
    message: 'Tạo profile thành công',
    description: `Bạn đã tạo thành công profile trường với mã người đại diện là: ${input.highSchoolManagerCode} và mã học sinh: ${input.highSchoolCode}`,
    placement: 'top',
    btn,
    key,
    duration: 0,
    onClose: close
  });
};
export const handleCreateFailNotification = (msg) => {
  notification.error({
    message: 'Tạo profile thất bại ',
    description: `${msg}`
  });
};
