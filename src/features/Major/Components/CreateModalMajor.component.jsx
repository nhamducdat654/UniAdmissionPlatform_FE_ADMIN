import { Form, Input, Modal, Select, Spin } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';

const CreateModalMajorConponent = (props) => {
  const { visibleCreate, loading, handleCancel, onFinish, handleChange, majorGroup } = props;

  const style = {
    paddingTop: '15px'
  };

  return (
    <>
      <Modal
        title='Tạo ngành học'
        visible={visibleCreate}
        onCancel={handleCancel}
        okButtonProps={{
          form: 'create-form',
          key: 'submit',
          htmlType: 'submit'
        }}
        okText='Tạo'
        cancelText='Đóng'>
        <Spin tip='Đang tải dữ liệu...' spinning={loading}>
          <Form name='create' id='create-form' onFinish={onFinish}>
            <lable>Tên ngành học</lable>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Tên ngành học đang trống'
                }
              ]}>
              <Input />
            </Form.Item>
            <lable>Mã ngành học</lable>
            <Form.Item
              name='code'
              rules={[
                {
                  required: true,
                  message: 'Mã ngành học đang trống'
                }
              ]}>
              <Input />
            </Form.Item>
            <lable>Nhóm ngành</lable> <br />
            <div style={style}>
              <Select
                defaultValue={1}
                style={{
                  width: 250
                }}
                onChange={handleChange}>
                {majorGroup ? majorGroup?.map((item) => <Option value={item.id}>{item.name}</Option>) : null}
              </Select>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
export default CreateModalMajorConponent;
