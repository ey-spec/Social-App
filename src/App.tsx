import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import RegisterForm from "./Pages/Register";
import ErrorPage from "./Pages/Error";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./Pages/Login";
import AuthContextProvider from "./context/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { GuestRoute } from "./Components/GuestRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const query = new QueryClient()

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterForm />
          </GuestRoute>
        ),
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginForm />
          </GuestRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <RouterProvider router={routes} />
          <ToastContainer
            position="bottom-right"
            theme="colored"
            transition={Slide}
            limit={3}
          />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
