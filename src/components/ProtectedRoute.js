import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userType, checkSession } = useUser();
  const [loading, setLoading] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      await checkSession();

      if (!userType) {
        navigate("/", { replace: true });
      } else if (userType !== requiredRole) {
        if (userType === "Admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (userType === "Trainer") {
          navigate("/trainer/dashboard", { replace: true });
        } else if (userType === "Member") {
          navigate("/member/dashboard", { replace: true });
        }
      }

      setLoading(false);

      // try {
      //   const response = await fetch(`${apiUrl}auth/validate`, {
      //     method: "GET",
      //     credentials: "include",
      //   });

      //   if (response.ok) {
      //     const data = await response.json();
      //     setUserType(data.userType);

      //     if (data.userType === requiredRole) {
      //       setIsAuthorized(true);
      //     } else {
      //       if (data.userType === "Admin") {
      //         navigate("/admin/dashboard", { replace: true });
      //       } else if (data.userType === "Trainer") {
      //         navigate("/trainer/dashboard", { replace: true });
      //       } else if (data.userType === "Member") {
      //         navigate("/member/dashboard", { replace: true });
      //       } else {
      //         setIsAuthorized(false);
      //       }
      //     }
      //   } else {
      //     setUserType(null);
      //     setIsAuthorized(false);
      //   }
      // } catch (error) {
      //   console.error("Error validating session:", error);
      //   setUserType(null);
      //   setIsAuthorized(false);
      // } finally {
      //   setLoading(false);
      // }
    };

    validateSession();
  }, [userType, requiredRole, checkSession, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userType === requiredRole ? children : <Navigate to="/" replace />;

  // const { userType } = useUser();
  // if (!userType) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (userType !== requiredRole) {
  //   return <Navigate to="/" replace />;
  // }

  // return children;
};

export default ProtectedRoute;
