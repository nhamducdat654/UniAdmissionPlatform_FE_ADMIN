import { Form, Input, Modal, Select, Spin } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
// import FormEditComponent from "./FormEdit.component";

const EditModalMajorConponent = (props) => {
  const { visibleEdit, handleCancel, onFinish, handleChange, loading, majorGroup, majorDetail } = props;

  const style = {
    paddingTop: '15px'
  };

  const field = [
    {
      name: ['majorGroupId'],
      value: majorDetail?.majorGroupId
    },
    {
      name: ['code'],
      value: majorDetail?.code
    },
    {
      name: ['name'],
      value: majorDetail?.name
    }
  ];

  return (
    <>
      <Modal
        title='Chỉnh sửa'
        visible={visibleEdit}
        onCancel={handleCancel}
        okButtonProps={{ form: 'edit-form', key: 'submit', htmlType: 'submit' }}
        okText='Lưu'
        cancelText='Đóng'>
        <Spin tip='Đang tải dữ liệu...' spinning={loading}>
          {/* <>
            <FormEditComponent field={field}/>
          </> */}
          <Form name='edit' id='edit-form' onFinish={onFinish} fields={field}>
            <lable>Tên chứng chỉ</lable>
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
            <lable>Mô tả</lable>
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
            <lable>Nhóm ngành</lable>
            {majorDetail?.majorGroupId !== undefined && majorDetail?.majorGroupId !== null ? (
              //   <Form.Item>
              <div style={style}>
                <Select
                  defaultValue={majorDetail.majorGroupId}
                  style={{
                    width: 250
                  }}
                  onChange={handleChange}>
                  {majorGroup ? majorGroup?.map((item) => <Option value={item.id}>{item.name}</Option>) : null}
                </Select>
              </div>
            ) : //   </Form.Item>
            null}
            ;
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
export default EditModalMajorConponent;
