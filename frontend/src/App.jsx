import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster } from "react-hot-toast";

// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "./lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";
// import { getAuthUser } from "./lib/api.js";
import useAuthHook from "./hooks/useAuthHook.js";

import Layout from "./components/Layout.jsx";
import useThemeSelector from "./store/useThemeSelector.js";
import FriendsPage from "./pages/FriendsPage.jsx";
import DevHelpDesk from "./pages/DevHelpDesk.jsx";

const App = () => {
  //"error" is there
  //another thing that every single time when we want to retrieve data from backend
  //we have to use this
  //we can clean our code by simply wrapping this thing inside a custom hook

  // const {data:authData,isLoading} = useQuery({
  //   queryKey:["authUser"],
  //   queryFn: getAuthUser,
  //   retry:false
  // })
  // console.log({data})
  // console.log({isLoading})
  // console.log({error})

  //to protect the routes
  // const authUser = authData?.user

  //more optimise approach
  //whenever we want authUser, we can you this custom hook
  const { authUser, isLoading } = useAuthHook();

  // console.log(authUser)

  //our aim when the user successfully signs up, then the user navigate to "onboard" page
  //for that we have to modify our routes
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnBoarded;

  // theme selector implementation
  const { theme } = useThemeSelector();

  //now we want during loading we add some spinning animation
  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      {/* <button onClick={()=>toast.success("Hello react")}>craete a toast</button> */}

      <Routes>
        {/* update the home page route */}
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              // <HomePage/>
              // wrap the HomePage inside a layout
              <Layout showSideBar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/signup" : "/onboarding"} />
            )
          }
        />

        {/* updating signup route */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* updating login route */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* updating notifications page */}
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* update onboard route */}
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* updating call route */}
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* updating chat route */}
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* friends route */}
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={true}>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* feedback */}
        <Route
          path="/dev-helpdesk"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={true}>
                <DevHelpDesk/>
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
