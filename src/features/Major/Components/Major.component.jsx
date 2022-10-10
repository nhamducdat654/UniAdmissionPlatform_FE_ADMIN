import { Button, Form, Input, Layout, Pagination, Popconfirm, Space, Table } from 'antd';
import { Helmet } from 'react-helmet';
import { SearchOutlined } from '@ant-design/icons';
import CreateModalContainer from '../CreateModal.container';
import EditModalContainer from '../EditModal.container';
import Highlighter from 'react-highlight-words';
import React, { useRef, useState } from 'react';

const MajorComponent = (props) => {
  const { majors, form, handleDelete, onChange } = props;
  const [searchText, setSearchText] = useState('');
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [majorID, setMajorID] = useState('');
  const searchInput = useRef(null);
  const { Content, Footer } = Layout;

  const showModalCreate = (value) => {
    setVisibleCreate(true);
  };

  const showModalEdit = (value) => {
    setMajorID(value);
    setVisibleEdit(true);
  };

  const stylePaging = {
    paddingTop: 20,
    paddingBottom: 20
  };

  const styleButton = {
    paddingLeft: 80
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
      width: '5%',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Mã Ngành',
      dataIndex: 'code',
      key: 'code',
      width: '10%',
      ...getColumnSearchProps('code')
    },
    {
      title: 'Nhóm Ngành',
      width: '10%',
      render: (_, record) => <div>{record.majorGroupNameViewModel.name}</div>
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      width: '10%',
      render: (_, record) =>
        majors?.list.length >= 1 ? (
          <>
            <Popconfirm title='Bạn có chắc muốn xóa thẻ này chứ ?' onConfirm={() => handleDelete(record.id)}>
              <a>Xóa Thẻ</a>
            </Popconfirm>
            <Button type='link' style={styleButton} onClick={() => showModalEdit(record.id)}>
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
                dataSource={majors?.list}
                pagination={false}
                bordered
                style={{ width: '100vw' }}
                scroll={{ x: 700, y: 544 }}
              />
              <div style={stylePaging}>
                <Pagination total={majors.total} onChange={onChange} showSizeChanger />
              </div>
            </>
          </Form>
          <div>
            <Button type='primary' onClick={showModalCreate} style={{ backgroundColor: 'green' }}>
              Tạo mới Ngành học
            </Button>
          </div>
        </Content>
        <Footer></Footer>
        {visibleCreate === true ? (
          <CreateModalContainer visibleCreate={visibleCreate} setVisibleCreate={setVisibleCreate} />
        ) : (
          ''
        )}
        ,
        {visibleEdit === true ? (
          <EditModalContainer majorID={majorID} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} />
        ) : (
          ''
        )}
      </Layout>
    </>
  );
};

export default MajorComponent;
