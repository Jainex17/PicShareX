"use client";

import React from "react";
import { storage } from "@/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export default function page() {
  const [secretcode, setSecretCode] = React.useState("");
  const [images, setImages] = React.useState<[string, string][]>([]);

  function getimages() {
    console.log(secretcode);
    const storageRef = ref(storage, "images");

    listAll(storageRef).then((res) => {
      res.items.forEach((itemRef) => {
        const fileName = itemRef.fullPath.split("/")[1];

        getDownloadURL(itemRef).then((url) => {
          setImages((prevImages) => [...prevImages, [fileName, url]]);
        });
      });
    });
  }

  function downloadImage(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          >
            Get
          </button>
        </div>
      </div>

      <div className="my-10">
        <div className="flex gap-6 justify-center flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex flex-col border border-[#b47517] rounded-md select-none"
            >
              <img
                src={image[1]}
                alt="preview image"
                draggable={false}
                className="hover:brightness-75 transition  flex justify-center items-center object-cover w-64 h-64"
              />
              <div className="flex justify-between bg-white dark:bg-[#333]">
                <p className="text-gray-600 dark:text-white text-xs py-2 px-3">
                  {image[0] && image[0].length > 30
                    ? image[0].slice(0, 30) + "..."
                    : image[0]}
                </p>
              </div>
              <button
                onClick={() => downloadImage(image[1])}
                className="mt-2 p-2 bg-blue-500 text-white rounded-md"
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
