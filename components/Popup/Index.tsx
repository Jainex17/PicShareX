import React, { useEffect } from "react";
import { OverLay } from "./OverLay";
import { toast } from "react-toastify";

interface PopupProps {
  setPopupVal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadbtn: () => void;
  setsecretcodeval: React.Dispatch<React.SetStateAction<string>>;
  secretcodeval: string;
}

export const Popup = ({ setPopupVal, uploadbtn, setsecretcodeval, secretcodeval }: PopupProps) => {
  
  useEffect(() => {
    function generateUniqueCode() {
      const array = new Uint8Array(30);
      window.crypto.getRandomValues(array);
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < array.length; i++) {
          code += charset[array[i] % charset.length];
      }
      return code;
  }
    setsecretcodeval(generateUniqueCode());
  }, []);

  function copytext() {
    navigator.clipboard.writeText(secretcodeval);
    toast.success("Copied to clipboard");
  }

  function copylink() {
    const code = window.location.origin + "/getimages/" + secretcodeval;
    navigator.clipboard.writeText(code);
    toast.success("Copied " + code);
  }

  return (
    <>
      <OverLay setPopupVal={setPopupVal} />
      <div className="px-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2a2a2f] rounded-lg z-50 shadow-2xl">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Upload Images</h1>
          <button
            onClick={() => setPopupVal(false)}
            className="text-2xl font-semibold"
          >
            &times;
          </button>
        </div>
        <div className="p-4 px-5 flex justify-center flex-col border-t border-gray-300 dark:border-gray-700">
          <label
            htmlFor="SecretCode"
            className="mb-2 text-gray-600 dark:text-gray-100"
          >
            Secret Code
          </label>
          <div className="flex mb-2">
            <input
              disabled
              type="text"
              value={secretcodeval}
              className="mr-2 w-full border border-gray-300 dark:border-gray-700 dark:bg-[#333] rounded-md p-2 text-gray-400"
            />
            <button
              onClick={copytext}
              className="px-3 dark:bg-[#292218] border border-gray-900 dark:border-[#b47517] rounded-md transition ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e6a23c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>
          </div>
          <span className="text-xs text-red-300">*You can only get images with this code, so make sure you copy it.</span>
        </div>
        <div className="flex justify-end items-center pb-4 pt-1">
          <button
            className="dark:hover:bg-[#E6A23c] dark:hover:text-white dark:bg-[#292218] border border-gray-900 dark:border-[#b47517] dark:text-[#e6a23c] md:px-8 md:py-2 px-2 py-1 rounded-md transition ease-in-out"
            onClick={copylink}
          >
            Copy Share Link
          </button>
          <button className=" dark:hover:bg-[#409eff] dark:hover:text-white dark:bg-[#18222c] dark:text-[#409eff] border dark:border-[#409eff] border-gray-900 px-8 py-2 mx-5 rounded-md  transition ease-in-out"
            onClick={uploadbtn}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};
