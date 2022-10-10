import './Layout.module.css';
import {
  ApartmentOutlined,
  ContainerOutlined,
  SafetyCertificateOutlined,
  StarFilled,
  StarOutlined,
  TagsFilled,
  TeamOutlined,
  UserAddOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Typography, notification } from 'antd';
import { PATH } from '../constants/Paths/Path';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { logoutHandler } from '../redux-flow/authentication/authentication-action';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import AdminRoute from './AdminRoute';
import CertificatePage from '../pages/certificate/CertificatePage';
import CreateHighSchoolProfilePage from '../pages/highSchool/CreateHighSchoolProfilePage';
import CreateUniversityProfilePage from '../pages/university/CreateUniversityProfilePage';
import ErrorPage from '../pages/ErrorPage';
import FirstRepresentativesPage from '../pages/accounts/FirstRepresentativesPage';
import GoalAdmissionTypePage from '../pages/GoalAdmissionTypePage';
import HighSchoolRepresentativesPage from '../pages/accounts/HighSchoolRepresentativesPage';
import LoginPage from '../pages/LoginPage';
import MajorGroupPage from '../pages/MajorGroupPage';
import MajorPage from '../pages/MajorPage';
import React, { useState } from 'react';
import SubjectGroupPage from '../pages/SubjectGroupPage';
import TagPage from '../pages/TagPage';
import UniversityRepresentativesPage from '../pages/accounts/UniversityRepresentativesPage';
import SubjectPage from '../pages/SubjectPage';

const AppRouter = () => {
  const { Header, Content, Sider } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }

  const item = [
    getItem('Quản lý các thẻ', '1', <TagsFilled />),
    getItem('Quản lý Nhóm Ngành', '2', <ApartmentOutlined />),
    getItem('Quản lý Ngành', '3', <ApartmentOutlined />),
    getItem('Quản lý Chứng chỉ', '4', <StarOutlined />),
    getItem('Quản lý Tài khoản', '5', <TeamOutlined />, [
      getItem('Tài khoản trường đại học', '6'),
      getItem('Tài khoản trường cấp 3', '7')
    ]),
    getItem('Quản lý thông tin', '8', <ContainerOutlined />, [
      getItem('Thông tin trường đại học', '9'),
      getItem('Thông tin trường cấp 3', '10')
    ]),
    getItem('Quản lý khối thi', '12', <ApartmentOutlined />),
    getItem('Quản lý loại tiêu chí tuyển sinh', '13', <SafetyCertificateOutlined />),
    getItem('Quản lý môn học', '14', <InboxOutlined />)
  ];
  const handleOnChangeRouter = (data) => {
    const { item, key, keyPath, selectedKeys, domEvent } = data;
    switch (key) {
      case '1':
        navigate(PATH.TAG);
        break;
      case '2':
        navigate(PATH.MAJOR_GROUP);
        break;
      case '3':
        navigate(PATH.MAJOR);
        break;
      case '4':
        navigate(PATH.CERTIFICATE);
        break;
      case '6':
        navigate(PATH.ACCOUNT_UNIVERSITY_REPRESENTATIVES);
        break;
      case '7':
        navigate(PATH.ACCOUNT_HIGH_SCHOOL_REPRESENTATIVES);
        break;
      case '9':
        navigate(PATH.CREATE_UNIVERSITY_PROFILE);
        break;
      case '10':
        navigate(PATH.CREATE_HIGH_SCHOOL_PROFILE);
        break;
      case '11':
        navigate(PATH.ACCOUNT_FIRST_REPRESENTATIVES);
        break;
      case '12':
        navigate(PATH.SUBJECT_GROUP);
        break;
      case '13':
        navigate(PATH.GOAL_ADMISSION_TYPE);
        break;
      case '14':
        navigate(PATH.SUBJECT);
        break;
    }
  };
  const { Text, Title } = Typography;
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const handleSighOut = () => {
    signOut(auth)
      .then(() => {
        navigate(PATH.LOGIN);
        notification.success({
          message: 'Đăng xuất thành công!',
          description: `Hẹn gặp lại bạn <3`
        });
        dispatch(logoutHandler());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible width={isAuthUser ? 350 : 0}>
        <div style={{ height: '32px', margin: '16px' }}>
          <Text strong style={{ color: 'white' }}>
            UNI FLAT FORM ADMIN <StarFilled style={{ color: 'white' }} />
          </Text>
          {isAuthUser ? (
            <Text style={{ color: 'white', float: 'right' }}>
              Xin chào{' '}
              <Text strong style={{ color: '#FFBE86' }}>
                {user.roles}
              </Text>{' '}
              <Button type={'primary'} shape={'round'} size={'small'} onClick={() => handleSighOut()}>
                Đăng xuất
              </Button>
            </Text>
          ) : null}
        </div>
        <Menu
          mode='inline'
          defaultSelectedKeys={['3']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0
          }}
          items={item}
          defaultValue={'1'}
          onSelect={handleOnChangeRouter}
        />
      </Sider>
      <Layout>
        <Header className='site-layout-sub-header-background' style={{ padding: 0 }} />
        <Content className='site-layout-background' style={{ margin: '24px 16px 0' }}>
          <div
            className='site-layout-background'
            style={{
              padding: 24,
              minHeight: 800
            }}>
            <Routes>
              <Route
                path={PATH.TAG}
                element={
                  <AdminRoute>
                    <TagPage />
                  </AdminRoute>
                }
              />
              ;
              <Route path={PATH.LOGIN} element={<LoginPage />} exact />
              <Route
                path={PATH.MAJOR_GROUP}
                element={
                  <AdminRoute>
                    <MajorGroupPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.MAJOR}
                element={
                  <AdminRoute>
                    <MajorPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.CERTIFICATE}
                element={
                  <AdminRoute>
                    <CertificatePage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.ACCOUNT_HIGH_SCHOOL_REPRESENTATIVES}
                element={
                  <AdminRoute>
                    <HighSchoolRepresentativesPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.ACCOUNT_UNIVERSITY_REPRESENTATIVES}
                element={
                  <AdminRoute>
                    <UniversityRepresentativesPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.CREATE_HIGH_SCHOOL_PROFILE}
                element={
                  <AdminRoute>
                    <CreateHighSchoolProfilePage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.CREATE_UNIVERSITY_PROFILE}
                element={
                  <AdminRoute>
                    <CreateUniversityProfilePage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.ACCOUNT_FIRST_REPRESENTATIVES}
                element={
                  <AdminRoute>
                    <FirstRepresentativesPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.SUBJECT_GROUP}
                element={
                  <AdminRoute>
                    <SubjectGroupPage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.GOAL_ADMISSION_TYPE}
                element={
                  <AdminRoute>
                    <GoalAdmissionTypePage />
                  </AdminRoute>
                }
              />
              <Route
                path={PATH.SUBJECT}
                element={
                  <AdminRoute>
                    <SubjectPage />
                  </AdminRoute>
                }
              />
              <Route path='*' element={<ErrorPage code={404} />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppRouter;
