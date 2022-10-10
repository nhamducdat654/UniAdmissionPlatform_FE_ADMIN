import { CreateMajor } from '../../service/MajorService';
import { ListMajorGroup } from '../../service/MajorGroupService';
import { handleCreateFailNotification, handleCreateSuccessNotification } from '../../notification/CreateMajor';
import CreateModalMajorConponent from './Components/CreateModalMajor.component';
import React, { useEffect, useState } from 'react';

const CreateModalContainer = (props) => {
  const { visibleCreate, setVisibleCreate } = props;
  const [loading, setLoading] = useState(false);
  const [majorGroupId, setMajorGroupId] = useState(1);
  const [majorGroup, setMajorGroup] = useState();

  const handleCancel = () => {
    setVisibleCreate(false);
  };

  const handleChange = (value) => {
    setMajorGroupId(value);
  };

  const create = (data) => {
    CreateMajor(data)
      .then((result) => {
        handleCreateSuccessNotification('success');
        setVisibleCreate(false);
      })
      .catch((error) => {
        handleCreateFailNotification('error');
      });
  };

  const onFinish = (values) => {
    values.majorGroupId = majorGroupId;
    setLoading(true);
    create(values);
  };

  //GET LIST MAJOR GROUP

  useEffect(() => {
    getMajorGroup();
  }, []);

  const getMajorGroup = () => {
    ListMajorGroup().then((result) => {
      setMajorGroup(result.data.data.list);
    });
  };

  return (
    <>
      <CreateModalMajorConponent
        visibleCreate={visibleCreate}
        handleCancel={handleCancel}
        loading={loading}
        onFinish={onFinish}
        handleChange={handleChange}
        majorGroup={majorGroup}
      />
    </>
  );
};
export default CreateModalContainer;
