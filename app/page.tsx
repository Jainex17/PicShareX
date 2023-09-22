"use client";
import React from "react";
import { Navbar } from '../components/Navbar'
import FileUploadComponent from "../components/FileUploadComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from "@/components/SideBar/SideBar";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="flex gap-5 bg-gray-100 dark:bg-[#26262a]">
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
