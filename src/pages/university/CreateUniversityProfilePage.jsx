import CreateProfileUniversityContainer from '../../features/university/CreateProfileUniversity.contianer';
import React from 'react';
import TitlePageComponent from '../../components/Title.component';

const CreateUniversityProfilePage = () => (
  <>
    <TitlePageComponent
      title={'Quản lý thông tin trường đại học'}
      subTitle={'Bạn có thể thay đổi thông tin trường đại học trong bảng này'}
    />
    <CreateProfileUniversityContainer />
  </>
);
export default CreateUniversityProfilePage;
