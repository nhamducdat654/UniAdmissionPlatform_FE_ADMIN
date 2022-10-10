import { Button, Form, Input, Layout, Modal, Pagination, Popconfirm, Space, Table } from 'antd';
import { Helmet } from 'react-helmet';
import { SearchOutlined } from '@ant-design/icons';
import { handleUpdateFailNotificationBlank } from '../../../notification/UpdateTagNotification';
import Highlighter from 'react-highlight-words';
import React, { useRef, useState } from 'react';

const AdminTagComponent = (props) => {
  const {
    tags,
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

  const styleButton = {
    paddingLeft: 80
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
      title: 'Số Thứ Tự',
      dataIndex: 'name',
      key: 'index',
      width: '30%',
      render: (value, record, index) => index + 1
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
                  message: 'Vui lòng nhập tên thẻ'
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
      dataIndex: 'id',
      render: (_, record) =>
        tags?.list.length >= 1 ? (
          <>
            <Popconfirm title='Bạn có chắc muốn xóa thẻ này chứ ?' onConfirm={() => handleDelete(record.id)}>
              <a>Xóa Thẻ</a>
            </Popconfirm>
            <Button
              style={styleButton}
              type='link'
              onClick={() => {
                setEditingRow(record.id);
                form.setFieldsValue({
                  name: record.name
                });
              }}>
              Chỉnh Sửa
            </Button>
          </>
        ) : null
    }
  ];
  return (
    <>
      <Helmet>
        <title>Thẻ</title>
      </Helmet>
      <Layout className='layout'>
        <Content
          style={{
            padding: '0 50px'
          }}>
          <Form form={form}>
            <>
              <Table
                columns={columns}
                dataSource={tags?.list}
                pagination={false}
                bordered
                style={{ width: '100vw' }}
                scroll={{ x: 700, y: 544 }}
              />
              <div style={stylePaging}>
                <Pagination total={tags.total} onChange={onChange} showSizeChanger />
              </div>
            </>
          </Form>
          <div>
            <Button type='primary' onClick={showModal} style={{ backgroundColor: 'green' }}>
              Tạo một thẻ mới
            </Button>
            <Modal
              okButtonProps={{
                form: 'add-certificate-form',
                key: 'submit',
                htmlType: 'submit'
              }}
              title='Thêm một thẻ mới'
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
                id='add-certificate-form'
                name='basic'
                autoComplete='off'
                layout='vertical'>
                <Form.Item
                  label='Tên'
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Tên thẻ đang trống'
                    }
                  ]}>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default AdminTagComponent;
