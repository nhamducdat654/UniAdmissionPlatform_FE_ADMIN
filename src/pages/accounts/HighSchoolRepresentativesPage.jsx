import HighSchoolRepresentativesContainer from '../../features/account/highSchoolRepresentatives/HighSchoolRepresentatives.container';
import React from 'react';
import TitlePageComponent from '../../components/Title.component';

const AccountRepresentativesPage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý tài khoản trường Cấp 3'}
      subTitle={'Bạn có thể tạo, sửa, xóa các tài khoản trường Cấp 3 trong bảng này'}
    />
    <HighSchoolRepresentativesContainer />
  </>
);
export default AccountRepresentativesPage;
