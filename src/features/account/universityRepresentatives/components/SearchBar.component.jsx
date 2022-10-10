import { Col, Form, Input, Row, Select, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState } from 'react';

const SearchBarComponent = (props) => {
  const { Title } = Typography;

  const { setDataSearch, setLoading, university } = props;

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState();
  const [schoolId, setSchoolId] = useState('');

  const { Option } = Select;
  const onChangeStatus = (value) => {
    setStatus(value);
  };
  const onChangeSchool = (value) => {
    setSchoolId(value);
  };

  const debounced = useDebouncedCallback(
    // function
    () => {
      setLoading(true);
      setDataSearch({
        firstName,
        email,
        phone,
        status,
        university: schoolId
      });
    },
    // delay in ms
    2000
  );
  return (
    <>
      <Title level={2}>Tìm kiếm</Title>
      <Form>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item name='firstName'>
              <Input
                placeholder='Tên người đại diện...'
                type='text'
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setLoading(true);
                  debounced();
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='email'>
              <Input
                placeholder='Email...'
                type='text'
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoading(true);
                  debounced();
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='phone_Number'>
              <Input
                placeholder='Số điện thoại...'
                type='text'
                onChange={(e) => {
                  setPhone(e.target.value);
                  setLoading(true);
                  debounced();
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='highschool'>
              <Select
                showSearch
                placeholder='Chọn trường '
                optionFilterProp='children'
                onChange={(e) => {
                  onChangeSchool(e);
                  setLoading(true);
                  debounced();
                }}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                <Option value=''>Tất cả trường</Option>
                {university?.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='status'>
              <Select
                placeholder='Chọn trạng thái '
                onChange={(e) => {
                  onChangeStatus(e);
                  setLoading(true);
                  debounced();
                }}>
                <Option value=''>Tất cả trạng thái</Option>
                <Option value='0'>Chưa xác thực</Option>
                <Option value={1}>Đang chờ xét duyệt</Option>
                <Option value={2}>Đang hoạt động</Option>
                <Option value={3}>Đang khóa</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default SearchBarComponent;
