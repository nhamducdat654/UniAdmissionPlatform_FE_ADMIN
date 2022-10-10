import { Button, Col, Form, Image, Input, Row, Select, Tooltip } from 'antd';
import { InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import Label from '../../../components/commons/Label/Label.component';
import MarkdownEditorComponent from '../../../components/commons/MarkdownEditor/MarkdownEditor.component';
import React, { useEffect, useState } from 'react';
import SingleUploadWithPreviewContainer from '../../../components/commons/UploadImage/SingleUploadWithPreview.container';

const CreateProfileUniversityComponent = (props) => {
  const {
    onChangeProvince,
    provinces,
    onChangeDistricts,
    isDisableDistrict,
    districts,
    onFinish,
    setImageUrl,
    setThumbnail,
    value,
    setValue
  } = props;
  const { Option } = Select;

  return (
    <>
      <Form className='grid md:grid-cols-2 gap-6' onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={5}>
            <Label>Tên *</Label>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên trường !'
                }
              ]}>
              <Input
                type='text'
                className='mt-1'
                suffix={
                  <Tooltip title='Bắt buộc nhập tên'>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Label>Địa chỉ</Label>
            <Form.Item
              name='address'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ !'
                }
              ]}>
              <Input placeholder='Tỉnh/Thành Phố, Phường/Xã, Quận/Huyện,...' type='text' className='mt-1' />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Label>Số điện thoại</Label>
            <Form.Item
              name='phoneNumber'
              rules={[
                {
                  pattern: new RegExp(/^(0|\+84)(\s|\.)?\d{8,11}$/),
                  message: 'Số điện thoại không hợp lệ !'
                }
              ]}>
              <Input
                placeholder='039...'
                type='text'
                className='mt-1'
                prefix={<PhoneOutlined className='site-form-item-icon' />}
                suffix={
                  <Tooltip title='Số điện thoại bao gồm 10-11 số và không có dấu cách'>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>

          <Col span={5}>
            <div className='block'>
              <div>
                <Label>Ảnh đại diện</Label>
              </div>
              <div>
                <SingleUploadWithPreviewContainer setImageUrl={setImageUrl} />
              </div>
            </div>
          </Col>

          <Col span={5}>
            <div className='block'>
              <div>
                <Label>Ảnh bìa</Label>
              </div>
              <SingleUploadWithPreviewContainer setImageUrl={setThumbnail} />
            </div>
          </Col>

          <Col span={5}>
            <label className='block'>
              <Label>Mô tả ngắn</Label>
              <Form.Item
                name='shortDescription'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mô tả !'
                  }
                ]}>
                <Input type='text' className='mt-1' />
              </Form.Item>
            </label>
          </Col>
          <Col span={5}>
            <div className='grid md:grid-cols-1 gap-6 block md:col-span-2 '>
              <div className='mt-1'>
                <label className='block'>
                  <Label>Link Website của trường</Label>
                  <Form.Item
                    name='websiteUrl'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập link website !'
                      }
                    ]}>
                    <Input placeholder='c3chuvanan.edu.vn' type='text' className='mt-1' />
                  </Form.Item>
                </label>
              </div>
            </div>
          </Col>

          <Col span={5}>
            <Label>Email liên hệ</Label>
            <Form.Item
              name='email'
              rules={[
                {
                  pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                  message: 'email phải có cấu trúc đầy đủ ( abc@gmail.com )'
                }
              ]}>
              <Input
                type='text'
                className='mt-1'
                placeholder='abc@gmail.com'
                suffix={
                  <Tooltip title='Email phải đúng cú pháp. Ví dụ : abc@gmail.com'>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Label>Code quản lí</Label>
            <Form.Item
              name='universityCode'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã trường !'
                }
              ]}>
              <Input
                type='text'
                className='mt-1'
                placeholder='abc@gmail.com'
                suffix={
                  <Tooltip title='Mã code để quản lí trường cấp 3 nhập'>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Label>Tỉnh/Thành phố</Label>
            <Form.Item>
              <Select
                showSearch
                placeholder='Tỉnh/thành phố'
                optionFilterProp='children'
                onChange={onChangeProvince}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {provinces?.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Label>Quận/huyện</Label>
            <Form.Item name='districtId'>
              <Select
                showSearch
                placeholder='Quận/huyện..'
                optionFilterProp='children'
                onChange={onChangeDistricts}
                disabled={isDisableDistrict}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {districts?.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <label className='block'>
              <Label>Nội dung</Label>
              {/* <Form.Item name='description'> */}
              <MarkdownEditorComponent value={value} setValue={setValue} />
              {/* </Form.Item> */}
            </label>
          </Col>
          <Col span={10}>
            <br />
            <Button className='md:col-span-2' htmlType='submit' type='primary' style={{ borderRadius: 10 }}>
              Tạo mới
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CreateProfileUniversityComponent;
