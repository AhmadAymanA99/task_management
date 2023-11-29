import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./helpers";

const PrivateRoute = ({ element }) => {
    const isAuth = isAuthenticated();
    return isAuth ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
