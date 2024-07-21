import React from "react";
import { Link } from "react-router-dom";
const Navbar = ()=>{
    return(
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
            <h1 className="text-xl font-extrabold"><Link to="/"></Link>CVR Corner</h1>
            <div className="flext items-center justify-center space-x-2 md:space-x-4">
                
            </div>
        </div>
    )
}

export default Navbar;