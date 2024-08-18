"use client";

import { deleteImageWithUrl, fetchImages } from "@/utils/fetchImages";
import React, { useEffect } from "react";

interface Image {
    fileName: string;
    url: string;
  }

  
export const GetImages = ({ unique_code }: { unique_code: string }) => {

    const [images, setImages] = React.useState<Image[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    async function getimages() {
      setImages([]);
      const imageurls = await fetchImages(unique_code);
      setImages(imageurls.map(([fileName, url]) => ({ fileName, url })));

        setLoading(false);
    }
  
    async function downloadImage(url: string) {
      window.open(url);
    }
  
    async function deleteImage(url: string, filename: string) {
      const res = await deleteImageWithUrl(url, filename);
      if (res) {
        setImages(images.filter((image) => image.fileName !== filename));
      }
    }
  
    async function deleteAllImages() {
      const promises = images.map((image) =>
        deleteImageWithUrl(image.url, image.fileName)
      );
      const res = await Promise.all(promises);
      if (res.every((r) => r)) {
        setImages([]);
      }
    }

    useEffect(() => {
        if (unique_code) {
          getimages();
        }
      }, [unique_code]);

  return <>
    <div className="my-10">
          <div className="flex gap-6 justify-center flex-wrap">
            {loading == false && images.length == 0 && (
              <h3 className="text-gray-600 dark:text-white text-2xl font-semibold py-2 px-3">
                No images found
              </h3>
            )}

            {images.map((image, index) => (
              <div key={index}>
                <div className="flex flex-col border border-[#b47517] select-none relative">
                  <img
                    src={image.url}
                    alt="preview image"
                    draggable={false}
                    className="hover:brightness-75 transition  flex justify-center items-center object-cover w-64 h-64"
                  />
                  <div className="absolute right-1 top-1 rounded-sm cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      onClick={() => downloadImage(image.url)}
                      className="w-7 dark:bg-gray-800 bg-gray-200 p-1"
                    >
                      <path
                        fill="currentColor"
                        d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      onClick={() => deleteImage(image.url, image.fileName)}
                      className="w-7 dark:bg-gray-800 bg-gray-200 p-1 mt-1"
                    >
                      <path
                        fill="currentColor"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex justify-between dark:bg-[#333] bg-gray-800 text-gray-300">
                    <p className="text-gray-300 dark:text-white text-xs py-2 px-3">
                      {image.fileName && image.fileName.length > 30
                        ? image.fileName.slice(0, 45) + "..."
                        : image.fileName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {images.length > 0 && (
          <div className="flex justify-center">
            <button
              className="px-5 py-2 font-semibold dark:bg-red-700 border border-gray-900 dark:border-[#b47517] dark:hover:bg-[#492218] transition"
              onClick={() => deleteAllImages()}
            >
              Delete All Images
            </button>
          </div>
        )}
  </>;
};
