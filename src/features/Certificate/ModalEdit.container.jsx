import { editCertificate, getDetailCertificate } from '../../service/CertificateService';
import { handleEditNotification } from '../../notification/CertificateNotification';
import ModalEditCertificteConponent from './Conponents/Modal/ModalEdit.component';
import React, { useEffect, useState } from 'react';

const ModalEditCertificateContainer = (props) => {
  const { certificateID, visibleEdit, setVisibleEdit } = props;

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    loadData(certificateID);
  }, [certificateID]);

  const handleCancel = () => {
    setVisibleEdit(false);
  };

  const loadData = (id) => {
    getDetailCertificate(id).then((result) => {
      setCertificate(result.data.data);
      setImageUrl(result.data.data.thumbnailUrl);
      setLoading(false);
    });
  };

  const edit = (data) => {
    editCertificate(data)
      .then((result) => {
        handleEditNotification('success', result.data.msg);
        setTimeout(reload, 2000);
      })
      .catch((err) => {
        handleEditNotification('error', err.response.data.msg);
      });
  };

  const reload = () => {
    setVisibleEdit(false);
    window.location.reload();
  };

  const onFinish = (values) => {
    values.id = certificateID;
    values.thumbnailUrl = imageUrl;
    setLoading(true);
    edit(values);
  };

  return (
    <>
      <ModalEditCertificteConponent
        visibleEdit={visibleEdit}
        handleCancel={handleCancel}
        onFinish={onFinish}
        certificate={certificate}
        imgeUrl={imageUrl}
        setImageUrl={setImageUrl}
        loading={loading}
      />
    </>
  );
};
export default ModalEditCertificateContainer;
