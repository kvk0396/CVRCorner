
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ImCross } from 'react-icons/im';

const EditPost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [error, setError] = useState("");

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const addCategory = () => {
    if (cat.trim() === "") {
      setError("Category cannot be empty.");
      return;
    }
    if (cats.includes(cat.trim())) {
      setError("Category already added.");
      return;
    }
    setCats([...cats, cat.trim()]);
    setCat("");
    setError("");
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 my-2">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Update the Post</h1>
        <form className="flex flex-col space-y-4 md:space-y-6">
          <input 
            type="text" 
            placeholder="Enter post title" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          <input 
            type="file" 
            className="px-4 py-2 border border-gray-300 rounded" 
          />
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <input 
                value={cat} 
                onChange={(e) => setCat(e.target.value)} 
                type="text" 
                placeholder="Enter post category" 
                className="px-4 py-2 border border-gray-300 rounded" 
              />
              <button 
                type="button" 
                onClick={addCategory} 
                className="bg-black text-white px-4 py-2 font-semibold rounded hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex flex-wrap mt-3">
              {cats.map((c, i) => (
                <div key={i} className="flex items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                  <p>{c}</p>
                  <button 
                    type="button" 
                    onClick={() => deleteCategory(i)} 
                    className="text-white bg-red-600 rounded-full p-1 text-xs hover:bg-red-800"
                    aria-label="Remove category"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
            <textarea 
              rows={15} cols={30}
              placeholder="Write your post here..." 
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none" 
            />
            <button 
              type="submit" 
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
