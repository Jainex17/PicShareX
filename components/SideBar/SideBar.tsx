import React from "react";

export const SideBar = () => {
  return (
  <>
    <div className="w-24 h-auto flex bg-white dark:bg-[#2a2a2f]">
      <div className="flex flex-col w-64 h-screen py-4 ">
        
        <div className="my-2 cursor-pointer">
          <p className="flex flex-col items-center justify-center text-gray-900 dark:text-white my-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={"#005563"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>          
            <span className="text-xs pt-2">Upload Image</span>
          </p>
        </div>
        
        <div className="my-2 cursor-pointer">
          <p className="flex flex-col items-center justify-center text-gray-900 dark:text-white my-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={"#005563"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/><path d="M15 7h6v6"/></svg>
          <span className="text-xs pt-2">Trending</span>
          </p>
        </div>
      </div>
    </div>
  </>
  )
};
