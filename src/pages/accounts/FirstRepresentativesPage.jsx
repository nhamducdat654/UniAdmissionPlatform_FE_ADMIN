import FirstRepresentativesContainer from '../../features/account/firstRepresentatives/FirstRepresentatives.container';
import React from 'react';
import TitlePageComponent from '../../components/Title.component';

const FirstRepresentativesPage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý tài khoản đối tác'}
      subTitle={'Bạn có thể tạo, sửa, xóa các tài khoản đối tác trong bảng này'}
    />
    <FirstRepresentativesContainer />
  </>
);
export default FirstRepresentativesPage;
