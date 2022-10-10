import MajorGroupContainer from '../features/MajorGroup/MajorGroup.container';
import React from 'react';
import TitlePageComponent from '../components/Title.component';

const MajorGroupPage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý nhóm ngành'}
      subTitle={'Bạn có thể tạo, sửa, xóa các nhóm ngành trong bảng này'}
    />
    <MajorGroupContainer />
  </>
);

export default MajorGroupPage;
