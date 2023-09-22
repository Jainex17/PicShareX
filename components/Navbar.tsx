import React from "react";

export const Navbar = () => {
    
  return <>
    <nav className="bg-white dark:bg-[#2a2a2f] border-b-2 border-gray-300 dark:border-gray-700">
        <div className="flex justify-between py-3 px-5">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                ShareX
            </h1>
        </div>
        <div>
        <button 
        className="dark:bg-gray-900 dark:text-gray-300 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg shadow-md"
        onClick={ ()=> document.body.classList.toggle('dark')}
      >
        Change Theme
      </button>
        </div>
        </div> 
    </nav>
  </>;
};
