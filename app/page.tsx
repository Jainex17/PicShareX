"use client";
import React, { useEffect } from "react";
import FileUploadComponent from "../components/FileUploadComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const[theme, setTheme] = React.useState<string>();

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "dark";
    if(theme == "dark"){
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark");
    }
    setTheme(theme);
    
  });

  return (
    <>
      <FileUploadComponent />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </>
  )
}
