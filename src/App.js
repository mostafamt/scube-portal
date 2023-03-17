import React, { lazy } from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";

// const Login = lazy(() => import("./components/Auth/Login"));
const PageNotFound = lazy(() =>
  import("./components/PageNotFound/PageNotFound")
);
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));
const SetNewPassword = lazy(() => import("./components/Auth/SetNewPassword"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Courses = lazy(() => import("./components/Pages/Courses"));
const CoursesList = lazy(() => import("./components/Admin/Courses"));
const EBooks = lazy(() => import("./components/Pages/EBooks"));
const LOS = lazy(() => import("./components/Pages/LOS"));
const IOS = lazy(() => "./components/Pages/IOS");
const Lessons = lazy(() => "./components/Pages/Lessons");
const STCourses = lazy(() => "./components/Pages/STCourses");
const STBooks = lazy(() => "./components/Pages/STBooks");
const STLessons = lazy(() => "./components/Pages/STLessons");
const Tenants = lazy(() => "./components/Admin/Tenants");
const Users = lazy(() => "./components/Admin/Users");
const Shop = lazy(() => "./components/Pages/Shop");
const Groups = lazy(() => "components/Admin/Groups/Groups");
const Layout = lazy(() => "src/components/Layout/Layout");
const Group = lazy(() => "components/Admin/Groups/Group");
const Signup = lazy(() => "./components/Auth/Signup");
const VerifyEmail = lazy(() => "./components/Auth/VerifyEmail");

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
