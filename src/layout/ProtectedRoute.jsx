import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);


  if (isLoading) {
    return <div>Loading...</div>; 
  }


  if (isAuthenticated) {
    return children;
  }

 
  return null;
};

export default ProtectedRoute;
