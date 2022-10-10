import { Button, Form, Input, Layout, Modal, Pagination, Space, Table } from 'antd';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { handleUpdateFailNotificationBlank } from '../../../notification/UpdateTagNotification';
import Highlighter from 'react-highlight-words';
import React, { useRef, useState } from 'react';

const SubjectComponent = (props) => {
  const {
    listSubject,
    showModal,
    handleOk,
    handleCancel,
    isModalVisible,
    form,
    handleCreate,
    handleDelete,
    handleEdit,
    onChange
  } = props;
  const [searchText, setSearchText] = useState('');

  const [searchedColumn, setSearchedColumn] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const searchInput = useRef(null);
  const { Content } = Layout;

  const stylePaging = {
    paddingTop: 20,
    paddingBottom: 20
  };
  const handleOnPressEnter = (e, editingRow) => {
    const request = {
      id: editingRow ? editingRow : '',
      data: e.target.value ? e.target.value : ''
    };
    if (request.data === '') handleUpdateFailNotificationBlank('error');
    else handleEdit(request);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const confirm = (value) => {
    Modal.confirm({
      title: 'Xác thực',
      icon: <ExclamationCircleOutlined />,
      content: `Xóa môn ${value.name} ?`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        handleDelete(value);
      },
      onCancel() {}
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8
        }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'index',
      width: '30%'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên khối thi'
                }
              ]}>
              <Input onPressEnter={(e) => handleOnPressEnter(e, editingRow)} />
            </Form.Item>
          );
        } else return <p>{text}</p>;
      }
    },
    {
      title: 'Thao tác',
      render: (record) => (
        <Space>
          <Button
            type='danger'
            onClick={() => {
              confirm(record);
            }}>
            Xóa
          </Button>
          <Button
            type='primary'
            onClick={() => {
              setEditingRow(record.id);
              form.setFieldsValue({
                name: record.name
              });
            }}>
            Chỉnh Sửa
          </Button>
        </Space>
      )
    }
  ];
  return (
    <>
      <Helmet>
        <title>Quản lý môn học</title>
      </Helmet>
      <Layout className='layout'>
        <Content
          style={{
            padding: '0 50px'
          }}>
          <div>
            <Button type='primary' onClick={showModal} style={{ backgroundColor: 'green' }}>
              Tạo một môn học mới
            </Button>
            <Modal
              okButtonProps={{
                form: 'add-subject-form',
                key: 'submit',
                htmlType: 'submit'
              }}
              title='Tạo một môn học mới'
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText='Thêm'
              cancelText='Đóng'>
              <Form
                initialValues={{
                  remember: false
                }}
                onFinish={handleCreate}
                id='add-subject-form'
                name='basic'
                autoComplete='off'
                layout='vertical'>
                <Form.Item
                  label='Tên'
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Tên đang trống'
                    }
                  ]}>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <Form form={form}>
            <>
              <Table
                columns={columns}
                dataSource={listSubject?.list}
                pagination={false}
                bordered
                style={{ width: '100vw' }}
                scroll={{ x: 600, y: 544 }}
              />
              <div style={stylePaging}>
                <Pagination total={listSubject.total} onChange={onChange} showSizeChanger={false} pageSize={5} />
              </div>
            </>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default SubjectComponent;
