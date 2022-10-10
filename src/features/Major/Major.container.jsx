import { DeleteMajor, ListMajor } from '../../service/MajorService';
import { Form, Skeleton } from 'antd';
import { ListMajorGroup } from '../../service/MajorGroupService';
import { handleDeleteFailNotification, handleDeleteSuccessNotification } from '../../notification/DeleteMajor';
import MajorComponent from './Components/Major.component';
import React, { useEffect, useState } from 'react';

const MajorContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [majorGroup, setMajorGroup] = useState();
  const [form] = Form.useForm();
  const [majors, setMajors] = useState();
  const [dataSearch, setDataSearch] = useState({
    page: 1,
    limit: 10
  });

  const onChange = (page, limit) => {
    setDataSearch({
      ...dataSearch,
      page,
      limit
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //GET LIST MAJOR GROUP

  useEffect(() => {
    getMajorGroup();
  }, []);

  const getMajorGroup = () => {
    ListMajorGroup().then((result) => {
      setMajorGroup(result.data.data.list);
      // setIsLoading(false);
    });
  };

  //DELETE TAG
  const handleDelete = (value) => {
    DeleteMajor(value)
      .then((result) => {
        handleDeleteSuccessNotification('success');
        getListMajors();
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleDeleteFailNotification('error');
      });
  };

  //GET LIST TAGS

  useEffect(() => {
    getListMajors();
  }, [dataSearch]);

  const getListMajors = () => {
    ListMajor(dataSearch).then((result) => {
      setMajors(result.data.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <MajorComponent
          majors={majors}
          handleDelete={handleDelete}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          form={form}
          majorGroup={majorGroup}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default MajorContainer;
