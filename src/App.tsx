import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import RegisterForm from "./Pages/Register";
import ErrorPage from "./Pages/Error";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="bottom-right"
        theme="colored"
        transition={Slide}
        limit={3}
      />
    </>
  );
}

export default App;
