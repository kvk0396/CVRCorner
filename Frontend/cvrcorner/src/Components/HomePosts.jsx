/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

// Mock data for demonstration purposes
const post = {
  photo: "https://via.placeholder.com/300", // Placeholder image URL
  title: "Sample Post Title",
  username: "exampleUser",
  updatedAt: "2024-07-31T10:00:00Z",
  description: "This is a sample description of the post. This content is static and serves as a placeholder for the real content."
};

const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={post.photo} alt="Post Image" className="h-full w-full object-cover" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{post.description.slice(0, 200) + " ...Read more"}</p>
      </div>
    </div>
  );
};

export default HomePosts;

