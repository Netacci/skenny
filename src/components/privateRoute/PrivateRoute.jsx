/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const info = localStorage.getItem('realtorInfo');

  if (!info) {
    // navigate to home page
    return <Navigate to={'/'} />;
  }
  return children;
};

export default PrivateRoute;
