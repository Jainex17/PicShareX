"use client";

import React from "react";
import { fetchImages } from "@/utils/fetchImages";
const FileSaver = require('file-saver');

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

  function downloadImage(url: string, fileName: string) {
    FileSaver.saveAs(url, fileName);
    // const link = document.createElement("a");
    // link.href = url;
    
    // link.download = url.split("/").pop() || "image";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
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
            className="mr-2 w-full border border-gray-300 dark:border-gray-700 dark:bg-[#333] rounded-sm p-2 text-gray-400"
          />
          <button
            className="w-20 px-3 font-semibold dark:bg-[#292218] border border-gray-900 dark:border-[#b47517] dark:hover:bg-[#492218] rounded-sm"
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
                className="flex flex-col border border-[#b47517] rounded-md select-none"
              >
                <img
                  src={image.url}
                  alt="preview image"
                  draggable={false}
                  className="hover:brightness-75 transition  flex justify-center items-center object-cover w-64 h-64"
                />
                <div className="flex justify-between bg-white dark:bg-[#333]">
                  <p className="text-gray-600 dark:text-white text-xs py-2 px-3">
                    {image.fileName && image.fileName.length > 30
                      ? image.fileName.slice(0, 30) + "..."
                      : image.fileName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadImage(image.url, image.fileName)}
                className="mt-2 p-2 dark:bg-gray-700 dark:text-gray-300 bg-gray-100 text-gray-900 rounded-md w-full"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
