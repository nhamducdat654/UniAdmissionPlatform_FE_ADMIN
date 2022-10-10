import { createCertificate } from '../../service/CertificateService';
import { handleCreateNotification } from '../../notification/CertificateNotification';
import { useNavigate } from 'react-router-dom';
import ModalCreateCertificteConponent from './Conponents/Modal/ModalCreate.component';
import React, { useEffect, useState } from 'react';

const ModalEditCertificateContainer = (props) => {
  const { visibleCreate, setVisibleCreate } = props;

  const [imgeUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setVisibleCreate(false);
  };

  const create = (data) => {
    createCertificate(data)
      .then((result) => {
        handleCreateNotification('success', result.data.msg);
        setTimeout(reload, 2000);
      })
      .catch((error) => {
        handleCreateNotification('error');
      });
  };

  const reload = () => {
    setVisibleCreate(false);
    window.location.reload();
  };

  const onFinish = (values) => {
    values.thumbnailUrl = imgeUrl;
    setLoading(true);
    create(values);
  };

  return (
    <>
      <ModalCreateCertificteConponent
        visibleCreate={visibleCreate}
        handleCancel={handleCancel}
        loading={loading}
        onFinish={onFinish}
        setImageUrl={setImageUrl}
      />
    </>
  );
};
export default ModalEditCertificateContainer;
