import React from 'react';
import SubjectContainer from '../features/subject/Subject.container';
import TitlePageComponent from '../components/Title.component';

const SubjectPage = () => (
  <>
    <TitlePageComponent title={'Quản lý môn học'} subTitle={'Bạn có thể tạo, sửa, xóa các môn học trong bảng này'} />
    <SubjectContainer />
  </>
);

export default SubjectPage;
