import React from 'react';
import SubjectGroupContainer from '../features/subjectGroup/SubjectGroup.container';
import TitlePageComponent from '../components/Title.component';

const SubjectGroupPage = () => (
  <>
    <TitlePageComponent title={'Quản lý khối thi'} subTitle={'Bạn có thể tạo, sửa, xóa các khối thi trong bảng này'} />
    <SubjectGroupContainer />
  </>
);

export default SubjectGroupPage;
