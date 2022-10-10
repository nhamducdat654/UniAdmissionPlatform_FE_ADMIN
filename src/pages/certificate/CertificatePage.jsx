import CertificateContainer from '../../features/Certificate/Certificate.container';
import React from 'react';
import TitlePageComponent from '../../components/Title.component';

const CerttificatePage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý chứng chỉ'}
      subTitle={'Bạn có thể tạo, sửa, xóa các chứng chỉ trong bảng này'}
    />

    <CertificateContainer />
  </>
);
export default CerttificatePage;
