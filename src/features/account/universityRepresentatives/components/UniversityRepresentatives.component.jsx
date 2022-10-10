import {
  Button,
  Divider,
  Image,
  Input,
  Layout,
  Modal,
  Pagination,
  Skeleton,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import SearchBar from './SearchBar.component';

const HighSchoolRepresentativesComponent = (props) => {
  const { Header, Content, Footer } = Layout;
  const { data, setDataSearch, loading, setLoading, university, onChangePage, handleOk } = props;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Họ và tên',
      render: (record) => (
        <>
          <a>
            {record.lastName} {record.middleName} {record.firstName}
          </a>
        </>
      )
    },
    {
      title: 'Trường đại học',
      dataIndex: 'universityName',
      key: 'universityName'
    },
    {
      title: 'Email',
      dataIndex: 'emailContact',
      key: 'emailContact'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status === 0 ? <Tag color='gold'>Chưa xác thực</Tag> : ''}
          {status === 1 ? <Tag color='geekblue'>Đang chờ xét duyệt</Tag> : ''}
          {status === 2 ? <Tag color='green'>Đang hoạt động</Tag> : ''}
          {status === 3 ? <Tag color='red'>Đang khóa</Tag> : ''}
        </>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          {record.status !== 0 && record.status !== 1 && (
            <Tooltip title={record.status === 2 ? 'Khóa' : 'Mở khóa'}>
              <Switch
                defaultChecked={record.status === 2 ? true : false}
                onChange={() => {
                  confirm(record);
                }}
              />
            </Tooltip>
          )}
        </>
      )
    }
  ];

  const confirm = (value) => {
    let context;

    if (value.status === 2) context = `Khóa ${value.lastName} ${value.middleName} ${value.firstName} ?`;
    if (value.status === 3) context = `Mở khóa cho ${value.lastName} ${value.middleName} ${value.firstName} ?`;
    Modal.confirm({
      title: 'Xác thực',
      icon: <ExclamationCircleOutlined />,
      content: context,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        handleOk(value);
      },
      onCancel() {
        window.location.reload();
      }
    });
  };
  return (
    <>
      <Layout className='layout'>
        <Content>
          <SearchBar setDataSearch={setDataSearch} university={university} setLoading={setLoading} />
          <Skeleton active loading={loading}>
            <div className='site-layout-content'>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                style={{ width: '100vw' }}
                scroll={{ x: 700, y: 544 }}
              />
            </div>
            <Pagination total={data?.total} onChange={onChangePage} showSizeChanger />
          </Skeleton>
        </Content>
      </Layout>
    </>
  );
};
export default HighSchoolRepresentativesComponent;
