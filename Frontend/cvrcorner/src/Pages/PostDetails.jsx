/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Comment from '../Components/Comment';
import Loader from '../Components/Loader'
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { MdBookmark } from 'react-icons/md';

import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios';
import {URL,IF} from '../url'

import { UserContext } from '../Context/UserContext';
const PostDetails = () => {

  const postId = useParams().id
  const [post,setPost]=useState({});
  const [comments,setComments]=useState([]);
  const [comment,setComment]=useState("")
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {user} = useContext(UserContext)
  const [loader,setLoader] = useState(false);
  const Navigate = useNavigate();
  const fetchPost = async()=>{
    try {
      const response = await api.get(`/posts/post/${postId}`);
      console.log(response.data);
      setPost(response.data);
      setLoader(false)
      
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setLoader(true)
    }
    
  }

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await api.post(`/users/removeBookmark/${postId}`);
      } else {
        await api.post(`/users/addBookmark/${postId}`);
      }
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error('Error in addBookmark:', err);
      //res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
  };

  useEffect(() => {
    fetchPost();
    if (user && Array.isArray(user.bookmarks) && user.bookmarks.includes(postId)) {
      setIsBookmarked(true);
    }
  }, [postId, user]);

  const handleDelete = async()=>{
    try {
      const res = await api.delete(`/posts/${postId}`);
        /* {headers: { Authorization: `Bearer ${user.token}` }
      } */
      console.log(res.data)
      Navigate('/home')
    } 
    catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  useEffect(()=>{
    fetchPost()
  },[postId]);

  const fetchComments = async()=>{
    try {
      const res = await api.get(`/comments/post/${postId}`);
      //console.log(res.data);
      setComments(res.data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  const postComment=async (e)=>{
    e.preventDefault()
    try {
      const res = await api.post(`/comments/create`, {comment:comment,author:user.username,postId:postId,userId:user._id});
      console.log(res.data);
      //fetchComments()
      //setComment("")
      window.location.reload(true);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }

  useEffect(()=>{
    fetchComments()
  },[postId])

  return (
    <div>
      <Navbar />
      {loader?<div className='h-[80vh] flex justify-center items-center w-full'><Loader/></div>:<div className="px-8 md:px-[200px] mt-8">
        {/* Post Title and Actions */}
        <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
        {user?._id === post.userId && (
          <div className="flex items-center space-x-2">
            <button 
              className="cursor-pointer" 
              aria-label="Bookmark post" 
              onClick={handleBookmark}
            >
              <MdBookmark className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
            </button>
            <button className="cursor-pointer" onClick={() => Navigate("/edit/" + postId)} aria-label="Edit post">
              <BiEdit />
            </button>
            <button className="cursor-pointer" onClick={handleDelete} aria-label="Delete post">
              <MdDelete />
            </button>
          </div>
        )}
      </header>

        {/* Post Author and Date */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <span>{new Date(post.updatedAt).toString().slice(0,15)}</span>
            <span>{new Date(post.updatedAt).toString().slice(16,21)}</span>
          </div>
        </div>

        {/* Post Image */}
        <img 
          src={IF+post.photo}
          alt="Post Visual" 
          className="w-full mx-auto mt-8"
        />

        {/* Post Content */}
        <article className="mx-auto mt-8">
          <p>{post.description}</p>
        </article>

        {/* Post Categories */}
        <section className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex space-x-2">
              {post.categories?.map((c,i)=>(
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
              ))}
          </div>
        </section>

        {/* Comments Section */}
        <h3 className="mt-4 py-0 font-semibold mb-4">Comments:</h3>
        {comments?.map((c)=>(
          <Comment key={c._id} comment={c} />
        ))}
        {/* Add Comment */}
        <section className="w-full mt-4 flex flex-col md:flex-row my-2">
          <input 
            onChange={(e)=>setComment(e.target.value)}
            type="text" 
            placeholder="Write a comment" 
            className="md:w-[80%] py-2  px-4 mb-4 md:mb-0 border-slate-200	"
          />
          <button onClick={postComment} className= " rounded-lg bg-black border   text-white text-sm px-4 py-2 md:w-[20%]">Add Comment</button>
        </section>
      </div>}
      <Footer />
    </div>
  );
};

export default PostDetails;
