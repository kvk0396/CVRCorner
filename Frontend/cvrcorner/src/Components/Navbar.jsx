// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate since we're not handling actual navigation
import { BsSearch } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import Menu from './Menu';

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu(!menu);
  };

  // Mock search handler
  const handleSearch = () => {
    // Instead of navigating, we'll just log the prompt for demonstration
    console.log("Search triggered for:", prompt);
    setPrompt(""); // Clear the input after "searching"
  };

  return (
    <div className="flex items-center justify-between px-5 md:px-[200px] py-2.5 bg-gray-100 shadow-md">
      <h1 className="text-lg md:text-xl font-extrabold text-black-600 hover:text-gray-800 transition duration-300">
        <Link to="/">CVR Corner</Link>
      </h1>
      <div className='flex-1 flex items-center justify-center space-x-2 md:space-x-4'>
        <div className='flex items-center border-2 border-gray-300 rounded-lg px-3 py-1 transition duration-300 hover:border-gray-500'>
          <BsSearch className='text-gray-500 cursor-pointer' onClick={handleSearch}/>
          <input 
            className='outline-none px-2 py-1 bg-gray-100 w-48 md:w-64' 
            placeholder='Search' 
            type='text'
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt} // Added value prop to control the input
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-gray-500 hover:text-black transition duration-300">
          <AiOutlineEdit className='text-xl' />
          <h2><Link to="/write">Write</Link></h2>
        </div>
        <div className='md:hidden' onClick={showMenu}>
          <p className='cursor-pointer flex text-xl'>
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
        <div className='hidden md:flex' onClick={showMenu}>
          <p className='cursor-pointer flex text-xl'>
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

