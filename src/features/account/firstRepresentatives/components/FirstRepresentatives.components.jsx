import { Button, Layout, Modal, Pagination, Skeleton, Table, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import SearchBar from './SearchBar.component';

const FirstRepresentativesComponent = (props) => {
  const { Header, Content, Footer } = Layout;
  const { data, setDataSearch, loading, setLoading, highschool, onChangePage, handleOk, dataSearch } = props;

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
      render: (_, { status }) => <>{status === 1 ? <Tag color='geekblue'>Đang chờ xét duyệt</Tag> : ''}</>
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type='primary'
            onClick={() => {
              confirm(record);
            }}>
            Xét duyệt
          </Button>
        </>
      )
    }
  ];

  const confirm = (value) => {
    Modal.confirm({
      title: 'Xác thực',
      icon: <ExclamationCircleOutlined />,
      content: `Duyệt tài khoản cho ${value.lastName} ${value.middleName} ${value.firstName} ?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        handleOk(value);
      },
      onCancel() {}
    });
  };
  return (
    <>
      <Layout className='layout'>
        <Content>
          <SearchBar
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            highschool={highschool}
            setLoading={setLoading}
          />
          <Skeleton active loading={loading}>
            <div className='site-layout-content'>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
            <Pagination total={data?.total} onChange={onChangePage} showSizeChanger />
          </Skeleton>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
};
export default FirstRepresentativesComponent;
