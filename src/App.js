import React from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/Auth/ForgotPassword";
import SetNewPassword from "./components/Auth/SetNewPassword";
import Profile from "./components/Profile/Profile";
import HomePage from "./components/Home/HomePage";
import Courses from "./components/Pages/Courses";
import CoursesList from "./components/Admin/Courses";
import EBooks from "./components/Pages/EBooks";
import LOS from "./components/Pages/LOS";
import IOS from "./components/Pages/IOS";
import Lessons from "./components/Pages/Lessons";
import STCourses from "./components/Pages/STCourses";
import STBooks from "./components/Pages/STBooks";
import STLessons from "./components/Pages/STLessons";
import Tenants from "./components/Admin/Tenants";
import Users from "./components/Admin/Users";
import Shop from "./components/Pages/Shop";
import Groups from "./components/Admin/Groups/Groups";
import Layout from "../src/components/Layout/Layout";
import Group from "./components/Admin/Groups/Group";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/VerifyEmail";

function App() {
  let theme = createTheme({
    palette: {
      primary: { main: "#0594a9" },
      secondary: { main: "#d2b96f" },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="set-password" element={<SetNewPassword />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/ebooks"
          element={
            <Layout>
              <EBooks />
            </Layout>
          }
        />
        <Route
          path="/los"
          element={
            <Layout>
              <LOS />
            </Layout>
          }
        />
        <Route
          path="/ios"
          element={
            <Layout>
              <IOS />
            </Layout>
          }
        />
        <Route
          path="/lessons"
          element={
            <Layout>
              <Lessons />
            </Layout>
          }
        />
        <Route
          path="/st-courses"
          element={
            <Layout>
              <STCourses />
            </Layout>
          }
        />
        <Route
          path="/st-ebooks"
          element={
            <Layout>
              <STBooks />
            </Layout>
          }
        />
        <Route
          path="/st-lessons"
          element={
            <Layout>
              <STLessons />
            </Layout>
          }
        />
        <Route
          path="/tenants"
          element={
            <Layout>
              <Tenants />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/groups"
          element={
            <Layout>
              <Groups />
            </Layout>
          }
        />
        <Route
          path="/group"
          element={
            <Layout>
              <Group />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />
        <Route
          path="/courses-list"
          element={
            <Layout>
              <CoursesList />
            </Layout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
