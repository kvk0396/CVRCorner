
/* eslint-disable no-unused-vars */
import React from 'react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Comment from '../Components/Comment';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        {/* Post Title and Actions */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Title of the post</h1>
          <div className="flex items-center space-x-2">
            <button aria-label="Edit post"><BiEdit /></button>
            <button aria-label="Delete post"><MdDelete /></button>
          </div>
        </header>

        {/* Post Author and Date */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <p>@Author</p>
          <div className="flex space-x-2">
            <span>Date</span>
            <span>Time</span>
          </div>
        </div>

        {/* Post Image */}
        <img 
          src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Post Visual" 
          className="w-full mx-auto mt-8"
        />

        {/* Post Content */}
        <article className="mx-auto mt-8">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla explicabo dolor, placeat error vel est, corrupti laborum illo reiciendis nemo laudantium sequi magnam beatae ratione aspernatur non quaerat perspiciatis? Quibusdam?</p>
        </article>

        {/* Post Categories */}
        <section className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Nature</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Rain</div>
          </div>
        </section>

        {/* Comments Section */}
        <h3 className="mt-4 py-0 font-semibold mb-4">Comments:</h3>
        <Comment/>
        <Comment/>
        {/* Add Comment */}
        <section className="w-full mt-4 flex flex-col md:flex-row my-2">
          <input 
            type="text" 
            placeholder="Write a comment" 
            className="md:w-[80%] py-2  px-4 mb-4 md:mb-0 border-slate-200	"
          />
          <button className= " rounded-lg bg-black border   text-white text-sm px-4 py-2 md:w-[20%]">Add Comment</button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;

