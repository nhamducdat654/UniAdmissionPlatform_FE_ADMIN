import MajorContainer from '../features/Major/Major.container';
import React from 'react';
import TitlePageComponent from '../components/Title.component';

const MajorPage = () => (
  <>
    <TitlePageComponent title={'Quản lý ngành'} subTitle={'Bạn có thể tạo, sửa, xóa các ngành trong bảng này'} />
    <MajorContainer />
  </>
);

export default MajorPage;
