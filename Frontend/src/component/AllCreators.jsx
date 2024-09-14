import React from "react";
import { useSelector } from "react-redux";
import Creators from "./Creators";
import useGetAllAdmins from "../hooks/userGetAllAdmin";

function AllCreators() {
  useGetAllAdmins();
  const { admins } = useSelector((store) => store.user);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-8 p-6 bg-gray-50">
        {/* Section Title */}
        <h2 className="w-full text-4xl font-bold text-left mb-8 text-gray-800">
          All Creators
        </h2>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {admins && admins.length > 0 ? (
            admins.map((admin, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300"
              >
                <Creators admin={admin} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No Admins Found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCreators;
