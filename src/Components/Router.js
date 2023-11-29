import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import { isAuthenticated } from "./helpers";

const Router = () => {
    const isAuth = isAuthenticated();
    return (
        <Routes>
            <Route path="/" element={isAuth ? <Tasks /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
