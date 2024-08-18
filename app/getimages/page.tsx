"use client";

import React from "react";
import { GetImages } from "@/components/GetImages";

export default function Page() {
  const [secretcode, setSecretCode] = React.useState("");
  const [uniqueCode, setUniqueCode] = React.useState("");
  const [isSubmit, setIsSubmit] = React.useState(false);

  function getimages() {
    setUniqueCode(secretcode);
    setIsSubmit(true);
  }

  return (
    <section className="p-5 w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Get Images</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Secret Code"
            value={secretcode}
            onChange={(e) => setSecretCode(e.target.value)}
            className="mr-2 w-full border border-gray-300 dark:border-gray-700 dark:bg-[#333] p-2 text-gray-400"
          />
          <button
            className="w-20 px-3 font-semibold dark:bg-[#292218] border border-gray-900 dark:border-[#b47517] dark:hover:bg-[#492218]"
            onClick={getimages}
            disabled={secretcode.length < 7}
          >
            Get
          </button>
        </div>
      </div>
       { isSubmit && <GetImages unique_code={uniqueCode} /> } 
    </section>
  );
}
