import { Col, Form, Input, Row, Select, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState } from 'react';

const SearchBarComponent = (props) => {
  const { Title } = Typography;

  const { setDataSearch, setLoading, highschool, dataSearch } = props;

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
        ...dataSearch,
        firstName,
        email,
        phone
      });
    },
    // delay in ms
    2000
  );
  return (
    <>
      <Title level={2}>Tìm kiếm</Title>
      <div className='flex grid grid-rows-3 grid-flow-col gap-4'>
        <Form>
          <Row gutter={16}>
            <Col span={5}>
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
            <Col span={5}>
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
            <Col span={5}>
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
          </Row>
        </Form>
      </div>
    </>
  );
};
export default SearchBarComponent;
