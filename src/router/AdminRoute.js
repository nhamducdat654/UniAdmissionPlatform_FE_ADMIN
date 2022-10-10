import { ROLE_ADMIN } from '../constants/AppConst';
import { useSelector } from 'react-redux';
import ErrorPage from '../pages/ErrorPage';
import React from 'react';

const AdminRoute = ({ children }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const listRole = user ? Array.of(user.roles) : [];
  if (!isAuthUser) return <ErrorPage code={403} />;
  if (isAuthUser && listRole.includes(ROLE_ADMIN)) return children;
  if (isAuthUser && !listRole.includes(ROLE_ADMIN)) return <ErrorPage code={403} />;
};
export default AdminRoute;
