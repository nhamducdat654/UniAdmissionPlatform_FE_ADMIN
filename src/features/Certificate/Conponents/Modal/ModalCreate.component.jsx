import { Form, Input, Modal, Spin } from 'antd';
import React from 'react';
import SingleUploadWithPreviewContainer from '../../../../components/commons/UploadImage/SingleUploadWithPreview.container';

const ModalCreateCertificteConponent = (props) => {
  const { visibleCreate, loading, handleCancel, onFinish, setImageUrl } = props;

  return (
    <>
      <Modal
        title='Tạo chứng chỉ'
        visible={visibleCreate}
        onCancel={handleCancel}
        okButtonProps={{ form: 'edit-form', key: 'submit', htmlType: 'submit' }}
        okText='Lưu'
        cancelText='Đóng'>
        <Spin tip='Đang tải dữ liệu...' spinning={loading}>
          <Form name='edit' id='edit-form' onFinish={onFinish}>
            <lable>Tên chứng chỉ</lable>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Tên chứng chỉ đang trống'
                }
              ]}>
              <Input />
            </Form.Item>

            <lable>Mô tả</lable>
            <Form.Item
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Mô tả đang trống'
                }
              ]}>
              <Input />
            </Form.Item>
            <lable>Hình ảnh</lable>
            <Form.Item name='thumbnailUrl'>
              <SingleUploadWithPreviewContainer setImageUrl={setImageUrl} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
export default ModalCreateCertificteConponent;
