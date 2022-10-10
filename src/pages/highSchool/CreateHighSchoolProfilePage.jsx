import CreateHighSchoolProfileContainer from '../../features/highSchool/CreateHighSchoolProfile.container';
import React from 'react';
import TitlePageComponent from '../../components/Title.component';

const CreateHighSchoolProfilePage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý thông tin trường cấp 3'}
      subTitle={'Bạn có thể thay đổi thông tin trường cấp 3 trong bảng này'}
    />
    <CreateHighSchoolProfileContainer />
  </>
);
export default CreateHighSchoolProfilePage;
