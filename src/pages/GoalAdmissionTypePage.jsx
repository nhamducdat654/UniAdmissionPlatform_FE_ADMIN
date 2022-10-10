import GoalAdmissionTypeContainer from '../features/goalAdmissionType/GoalAdmisisonType.container';
import React from 'react';
import TitlePageComponent from '../components/Title.component';

const GoalAdmissionTypePage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý loại tiêu chí tuyển sinh'}
      subTitle={'Bạn có thể tạo, sửa, xóa các tiêu chí tuyển sinh trong bảng này'}
    />
    <GoalAdmissionTypeContainer />
  </>
);

export default GoalAdmissionTypePage;
