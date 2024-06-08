import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoute = ({ isAdmin, adminOnly }) => {
  if (adminOnly && !isAdmin) {
    return <Navigate to="/Dashboard/AddPet" />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
