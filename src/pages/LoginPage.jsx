import { Col, Row, Typography, notification } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { PATH } from '../constants/Paths/Path';
import { ROLE_ADMIN } from '../constants/AppConst';
import { SigninHandler } from '../redux-flow/authentication/authentication-action';
import { auth } from '../firebase/firebaseConfig';
import { loginByFirebase } from '../service/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import google from '../assests/Google.png';
import img from '../assests/image.svg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const handleLoginServer = (token, email) => {
    loginByFirebase({ firebaseToken: token })
      .then((result) => {
        const user = result.data.data;
        if (user?.roles !== ROLE_ADMIN) {
          notification.error({
            message: 'Đăng nhập thất bại!',
            description: `Bạn không có quyền đăng nhập với tài khoản ${email}`
          });
        } else {
          dispatch(SigninHandler(user));
          navigate(PATH.TAG);
          notification.success({
            message: 'Đăng nhập thành công!',
            description: `Bạn đã đăng nhập vào website thành công với tên ${email}`
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: 'Đăng nhập thất bại!',
          description: `${email}`
        });
      });
  };
  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential?.user;
        const token = userCredential?.user.accessToken;
        handleLoginServer(token, user.displayName);
      })
      .catch((err) => {
        notification.error({
          message: 'Đăng nhập thất bại!',
          description: `${err}`
        });
      });
  };
  return (
    <>
      <Row gutter={20}>
        <Col xs={24} md={24} lg={12} xl={12} style={{ textAlign: 'center' }}>
          <img src={img} alt='loginImg' width={600} />
        </Col>
        <Col xs={24} md={24} lg={12} xl={12} style={{ textAlign: 'center' }}>
          <Title level={1} style={{ color: '#F9A826' }}>
            UNIFLATFORM ADMIN-PAGE
          </Title>
          <Title level={5}>Nền tảng kết nối tuyển sinh</Title>
          <div onClick={() => handleLogin()} style={{ cursor: 'pointer', color: 'red' }}>
            <Text type={'secondary'}>Đăng nhập</Text>
            {''}
            <img src={google} alt='google' width={50} />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default LoginPage;
