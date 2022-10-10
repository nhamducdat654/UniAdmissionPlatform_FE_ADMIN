import AdminTagContainer from '../features/Tag/AdminTag.container';
import React from 'react';
import TitlePageComponent from '../components/Title.component';

const TagPage = () => (
  <>
    <TitlePageComponent title={'Quản lý thẻ'} subTitle={'Bạn có thể tạo, sửa, xóa các thẻ trong bảng này'} />
    <AdminTagContainer />
  </>
);

export default TagPage;
