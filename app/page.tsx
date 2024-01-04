"use client";
import React, { useEffect } from "react";
import { Navbar } from '../components/Navbar'
import FileUploadComponent from "../components/FileUploadComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from "@/components/SideBar/SideBar";

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
      <Navbar />
      <main className="flex gap-5 bg-gray-100 dark:bg-[#26262a] flex-col md:flex-row">
        <SideBar />
        <FileUploadComponent />
      </main>
      
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
