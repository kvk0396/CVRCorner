
/* eslint-disable no-unused-vars */
import React from 'react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-8 md:px-[300px] mt-8 flex md:flex-row flex-col-reverse">
        <div className="flex flex-col md:w-[70%] w-full">
          <h1 className="text-xl font-bold mb-4">Your Posts</h1>
          {/* ProfilePosts should render posts here */}
          {/* If there are no posts, render a message or keep it empty */}
        </div>
        <div className="flex flex-col space-y-4 md:w-[30%] w-full mb-4 md:mb-0">
          <h1 className="text-xl font-bold mb-4">Profile</h1>
          <input className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text" />
          <input className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email" />
          <div className="flex items-center space-x-4 mt-8">
            <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
            <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
