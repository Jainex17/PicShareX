import Link from "next/link";
import React from "react";

export const SideBar = () => {
  return (
    <>
      <div className="flex w-screen justify-center md:flex md:w-24 h-auto bg-white dark:bg-[#2a2a2f]">
        <div className="flex md:flex-col md:w-64 gap-10 md:gap-0 md:h-screen md:py-4 ">
          <div className="py-2 cursor-pointer">
            <Link href={"/"}>
              <p className="flex flex-col items-center justify-center text-gray-900 dark:text-white my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={"#005563"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                </svg>
                <span className="text-xs pt-2">Upload Images</span>
              </p>
            </Link>
          </div>

          <div className="py-2 cursor-pointer">
            <Link href={"/getimages"}>
              <p className="flex flex-col items-center justify-center text-gray-900 dark:text-white my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={"#005563"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
                <span className="text-xs pt-2">Get Images</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
