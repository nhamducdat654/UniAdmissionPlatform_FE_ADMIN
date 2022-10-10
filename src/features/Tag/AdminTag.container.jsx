import { CreateTag } from '../../service/CreateTagService';
import { DeleteTag } from '../../service/DeleteTagService';
import { Form, Skeleton } from 'antd';
import { ListTags } from '../../service/GetTagService';
import { UpdateTag } from '../../service/UpdateTagService';
import {
  handleCreateFailNotification,
  handleCreateSuccessNotification
} from '../../notification/CreateTagNotification';
import {
  handleDeleteFailNotification,
  handleDeleteSuccessNotification
} from '../../notification/DeleteTagNotifification';
import {
  handleUpdateFailNotification,
  handleUpdateSuccessNotification
} from '../../notification/UpdateTagNotification';
import AdminTagComponent from './Components/AdminTag.component';
import React, { useEffect, useState } from 'react';

const AdminTagContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [dataSearch, setDataSearch] = useState({
    page: 1,
    limit: 10
  });
  const [tags, setTags] = useState();

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

  //UPDATE TAG
  const handleEdit = (request) => {
    const requestUpdate = {
      id: request.id,
      data: {
        name: request.data
      }
    };
    UpdateTag(requestUpdate)
      .then((result) => {
        window.location.reload();
        handleUpdateSuccessNotification('success');
        getListTags();
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleUpdateFailNotification('error');
      });
  };

  //DELETE TAG
  const handleDelete = (value) => {
    DeleteTag(value)
      .then((result) => {
        handleDeleteSuccessNotification('success');
        getListTags();
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleDeleteFailNotification('error');
      });
  };

  //CREATE TAG
  const handleCreate = (values) => {
    form.resetFields();

    CreateTag(values)
      .then((result) => {
        handleCreateSuccessNotification('success');
        getListTags();
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleCreateFailNotification('error');
      });
  };

  //GET LIST TAGS

  useEffect(() => {
    getListTags();
  }, [dataSearch]);

  const getListTags = () => {
    ListTags(dataSearch).then((result) => {
      setTags(result.data.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <AdminTagComponent
          tags={tags}
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

export default AdminTagContainer;
