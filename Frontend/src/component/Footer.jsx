import React from "react";

function Footer() {
  return (
    <>
      <hr />
      <footer className="w-full bg-white shadow-md py-6 lg:px-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Footer Logo and Info */}
          <div className="text-center md:text-left">
            <h1 className="font-bold text-2xl">
              Your<span className="text-blue-500">Blog</span>
            </h1>
            <p className="mt-2 text-gray-600">
              Inspiring readers with insightful blogs every day.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 font-semibold text-lg">
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Support
            </a>
            <a href="#" className="hover:text-blue-500">
              Advertise
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t mt-6 pt-4 text-center text-gray-600">
          <p>&copy; 2024 YourBlog. Crafted with care. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
