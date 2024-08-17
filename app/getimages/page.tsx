"use client";

import React from "react";
import { fetchImages } from "@/utils/fetchImages";

interface Image {
  fileName: string;
  url: string;
}

export default function Page() {
  const [secretcode, setSecretCode] = React.useState("");
  const [images, setImages] = React.useState<Image[]>([]);

  async function getimages() {
    setImages([]);
    const imageurls = await fetchImages(secretcode);
    setImages(imageurls.map(([fileName, url]) => ({ fileName, url })));
  }

  async function downloadImage(url: string) {  
    window.open(url);
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
            disabled= {secretcode.length < 7}
          >
            Get
          </button>
        </div>
      </div>

      <div className="my-10">
        <div className="flex gap-6 justify-center flex-wrap">
          {images.length === 0 && (
            <h3 className="text-gray-600 dark:text-white text-2xl font-semibold py-2 px-3">
              No images found
              </h3>
              )}

          {images.map((image, index) => (
            <div key={index}>
              <div
                className="flex flex-col border border-[#b47517] select-none relative" 
              >
                <img
                  src={image.url}
                  alt="preview image"
                  draggable={false}
                  className="hover:brightness-75 transition  flex justify-center items-center object-cover w-64 h-64"
                />
                <div className="absolute dark:bg-gray-800 bg-gray-200 right-1 top-1 rounded-sm cursor-pointer p-1"
                  onClick={()=>downloadImage(image.url)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>
                </div>
                <div className="flex justify-between dark:bg-[#333] bg-gray-800 text-gray-300">
                  <p className="text-gray-300 dark:text-white text-xs py-2 px-3">
                    {image.fileName && image.fileName.length > 30
                      ? image.fileName.slice(0, 45) + "..."
                      : image.fileName}
                  </p>
                </div>
              </div>
              {/* <button
                onClick={() => downloadImage(image.url, image.fileName)}
                className="mt-2 p-2 dark:bg-gray-700 dark:text-gray-300 bg-gray-800 text-gray-300 rounded-md w-full"
              >
                Download
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
