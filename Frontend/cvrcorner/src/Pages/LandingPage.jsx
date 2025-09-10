import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube , } from "react-icons/fa";
import logoD from '../assets/logoDark.png'
import img1 from '../assets/8741.jpg'
import img2 from '../assets/19762.jpg'
import img3 from '../assets/2467944.jpg'
const images = [
    img1,
    img2,
    img3
];

const LandingPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-8">
            {/* Header Section */}
            <header className="flex  items-center justify-between w-full max-w-5xl">
                <div className="flex items-center">
                <img src={logoD} alt="CVR Corner Logo" className="w-32 h-32 rounded-lg" />
                <div className="text-4xl font-bold text-blue-800 italic font-serif">CVR Corner</div>
                </div>
                <div>
                    <a href="#" className="text-white hover:text-black">
                        About
                    </a>
                </div>
            </header>

            {/* Main Section with Text and Image */}
            <main className="flex items-center space-x-20 justify-between w-full max-w-5xl mt-10">
                {/* Text Section */}
                <div className="text-left w-1/2 mr-8">

                    <h1 className="text-5xl font-bold text-blue-700 mb-4">
                    Meet the Minds of CVR
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Share your ideas, articles, and suggestions with your fellow students and faculty members.
                        
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                    Join the CVR Corner community.
                        
                    </p>
                    <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Link to="/signup">Join now</Link>
                    </button>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                        <Link to="/login">Login</Link>
                    </button>
                </div>
                </div>
                

                {/* Image Carousel Section with Background Blocks */}
                <div className="ml-8 relative w-1/2 h-80 flex justify-center items-center overflow-hidden">
                    {/* Background Blocks 
                    <div className="absolute bg-yellow-400 w-40 h-50 -right-10 -top-0 z-20"></div>
                    <div className="absolute bg-orange-500 w-32 h-32 -right-20 -bottom-10 z-0"></div>

                    {/* Image Carousel */}
                    <div className="relative w-full h-full flex">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={`absolute w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out ${
                                    index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                
            </main>

            {/* Footer Section */}
            <footer className="w-full max-w-5xl text-center mt-20 mb-0 text-gray-600">
                {/* Social Icons */}
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="text-blue-800 hover:text-blue-600">
                        <FaTwitter />
                    </a>
                    <a href="#" className="text-blue-800 hover:text-blue-600">
                        <FaInstagram />
                    </a>
                    <a href="#" className="text-blue-800 hover:text-blue-600">
                        <FaFacebook />
                    </a>
                    <a href="#" className="text-blue-800 hover:text-blue-600">
                        <FaYoutube />
                    </a>
                </div>
                <p>&copy; 2024 CVR Corner. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
