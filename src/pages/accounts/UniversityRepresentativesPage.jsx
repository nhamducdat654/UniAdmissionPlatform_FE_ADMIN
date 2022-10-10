import React from 'react';
import TitlePageComponent from '../../components/Title.component';
import UniversityRepresentativesContainer from '../../features/account/universityRepresentatives/UniversityRepresentatives.container';

const AccountRepresentativesPage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý tài khoản trường Đại học'}
      subTitle={'Bạn có thể tạo, sửa, xóa các tài khoản trường đại học trong bảng này'}
    />
    <UniversityRepresentativesContainer />
  </>
);
export default AccountRepresentativesPage;
