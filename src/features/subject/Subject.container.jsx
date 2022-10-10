import { Form, Skeleton } from 'antd';
import { getListSubject, createSubject, updateSubject, deleteSubject } from '../../service/SubjectService';
import {
  handleCreateNotification,
  handleDeleteNotification,
  handleUpdateNotification
} from '../../notification/SubjectGroupNotification';
import React, { useEffect, useState } from 'react';
import SubjectComponent from './components/Subject.component';

const SubjectContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [dataSearch, setDataSearch] = useState({
    name: '',
    page: 1,
    limit: 5
  });
  const [listSubject, setListSubject] = useState();

  const onChange = (page) => {
    setDataSearch({
      ...dataSearch,
      page,
      limit: 5
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //UPDATE TAG
  const handleEdit = (request) => {
    const requestUpdate = {
      id: request.id,
      data: {
        name: request.data
      }
    };
    updateSubject(requestUpdate)
      .then((result) => {
        handleUpdateNotification('success');
        window.location.reload();
        loadData({
          name: dataSearch.name ? dataSearch.name : '',
          limit: dataSearch.limit,
          page: dataSearch.page
        });
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleUpdateNotification('error');
      });
  };

  //DELETE TAG
  const handleDelete = (value) => {
    deleteSubject(value.id)
      .then((result) => {
        handleDeleteNotification('success');
        loadData({
          name: dataSearch.name ? dataSearch.name : '',
          limit: dataSearch.limit,
          page: dataSearch.page
        });
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleDeleteNotification('error');
      });
  };

  //CREATE TAG
  const handleCreate = (values) => {
    form.resetFields();

    createSubject(values)
      .then((result) => {
        handleCreateNotification('success');
        loadData({
          name: dataSearch.name ? dataSearch.name : '',
          limit: dataSearch.limit,
          page: dataSearch.page
        });
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleCreateNotification('error');
      });
  };

  //GET LIST TAGS

  useEffect(() => {
    loadData({
      name: dataSearch.name ? dataSearch.name : '',
      limit: dataSearch.limit,
      page: dataSearch.page
    });
  }, [dataSearch]);

  const loadData = (value) => {
    getListSubject(value).then((result) => {
      setListSubject(result.data.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <SubjectComponent
          listSubject={listSubject}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          isModalVisible={isModalVisible}
          form={form}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default SubjectContainer;
