import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component, ...props }) => {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login"); // Redirect to login page if not logged in
    return null;
  }

  return <Component {...props} />;
};

export default ProtectedRoute;
