import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login.jsx";
import Signup from "./component/Singup.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import { Provider } from "react-redux";
import store from "../src/redux/Store.jsx";
import Posts from "./component/Posts.jsx";
import AllCreators from "./component/AllCreators.jsx";
import ViewSinglePost from "./component/ViewSinglePost.jsx";
import About from "./component/About.jsx";
import Dashboard from "./AdminPanel/Dashboard.jsx";
import AdminPost from "./AdminPanel/AdminPost.jsx";
import AdminProfile from "./AdminPanel/AdminProfile.jsx";
import AddPost from "./AdminPanel/AddPost.jsx";
import ContactForm from "./component/ContactForm.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <BlogPost />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/alladmin",
        element: <AllCreators />,
      },
      {
        path: "/viewpost/:id",
        element: <ViewSinglePost />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/admin",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <AdminPost />,
          },
          {
            path: "/admin/posts",
            element: <AdminPost />,
          },
          {
            path: "/admin/profile",
            element: <AdminProfile />,
          },
          {
            path: "/admin/createpost",
            element: <AddPost />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
