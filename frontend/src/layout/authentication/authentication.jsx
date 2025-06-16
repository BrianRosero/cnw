// Autenticación (authentication.jsx)
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { logout } from '../../actions/auth.jsx';
import { clearMessage } from '../../actions/message.jsx';
import EventBus from '../../common/EventBus.jsx';

const Auth = () => {
  const currentUser = useSelector((state) => state.auth.user) || {};
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    setShowModeratorBoard(currentUser.roles?.includes('ROLE_MODERATOR') || false);
    setShowAdminBoard(currentUser.roles?.includes('ROLE_ADMIN') || false);

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, [currentUser.roles, logOut]);

  if (!currentUser && !['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/login" />;
  }
  return { showModeratorBoard, showAdminBoard, currentUser, logOut };
};

export default Auth;
