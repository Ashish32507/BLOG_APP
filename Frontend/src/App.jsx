import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if the user is not authenticated and not on login or signup page
    if (!user && !["/login", "/signup"].includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  // Determine if Navbar and Footer should be hidden based on the route
  const hideNavbarFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar based on the route */}
      {!hideNavbarFooter && <Navbar />}
      <div className="flex flex-col items-center justify-center flex-grow">
        <Outlet />
      </div>
      {/* Conditionally render Footer based on the route */}
      {!hideNavbarFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
