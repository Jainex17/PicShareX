import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Popup } from "./Popup/Index";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

function FileUploadComponent() {
  const [images, setImages] = useState<File[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [PopupVal, setPopupVal] = useState<boolean>(false);
  const [secretcodeval, setsecretcodeval] = React.useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      
      if (images.length + acceptedFiles.length > 10) {
        toast.error("You can't upload more than 10 images");
        return;
      }

      for (let i = 0; i < acceptedFiles.length; i++) {
        
        if(acceptedFiles[i].type !== "image/jpeg" && acceptedFiles[i].type !== "image/png" && acceptedFiles[i].type !== "image/jpg"){
          toast.error("Only jpeg, jpg and png files are allowed");
          return;
        }

        if(acceptedFiles[i].size > 3000000){
          toast.error("File size should be less than 3MB");
          return;
        }

        if (images.some((image) => image.name === acceptedFiles[i].name)) {
          toast.error("Image already exists");
          return;
        }
      }
      
      setImages([...images, ...acceptedFiles]);

    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function uploadbtn() {
    setIsUpload(true);
    try {
      toast("Uploading...");

      for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, `${secretcodeval}/${images[i].name}`);
        uploadBytesResumable(storageRef, images[i]);
      }
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Error while uploading images");
    }

    setIsUpload(false);
    setImages([]);
    setPopupVal(false);
  }

  function deleteFromUpload(name: string) {
    setImages(images.filter((image) => image.name !== name));
  }

  return (
    <>
      {PopupVal && (
        <Popup
          uploadbtn={uploadbtn}
          setPopupVal={setPopupVal}
          secretcodeval={secretcodeval}
          setsecretcodeval={setsecretcodeval}
        />
      )}
      <section className="fileupload container mx-auto pt-8 px-8 bg-white dark:bg-[#2a2a2f]">
        <div
          {...getRootProps({
            className: `border-dashed border-4 ${
              images.length > 0 ? "border-blue-500" : "border-gray-500"
            } flex flex-col justify-center items-center cursor-pointer`,
          })}
        >
          {images.length > 0 ? (
            <img
              src={URL.createObjectURL(images[0])}
              className="w-full h-72 object-cover"
              alt="preview"
              draggable={false}
            />
          ) : (
            <div className="md:p-20 p-10 flex flex-col  items-center">
              <input {...getInputProps()} accept="image/*" />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={"#005563"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                >
                  <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                  <path d="M16 16l-4-4-4 4" />
                </svg>
              </span>
              <p className="text-gray-600 dark:text-white">
                Drag / Click here to select images
              </p>
            </div>
          )}
        </div>
        {images.length > 0 && (
          <>
            <div className="flex items-center mt-3 justify-end mx-2">
              <div className="flex justify-end gap-4 mt-3">
                <button
                  className="dark:hover:bg-[#E6A23c] dark:hover:text-white dark:bg-[#292218] border border-gray-900 dark:border-[#b47517] dark:text-[#e6a23c] px-8 py-2 rounded-md transition ease-in-out"
                  onClick={() => setImages([])}
                >
                  Clear All
                </button>
                <button
                  className="dark:hover:bg-[#409eff] dark:hover:text-white dark:bg-[#18222c] dark:text-[#409eff] border dark:border-[#409eff] border-gray-900 px-8 py-2 rounded-md  transition ease-in-out"
                  onClick={() => setPopupVal(true)}
                  disabled={isUpload}
                >
                  {isUpload ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            <div className="mb-10">
              {/* images preview */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Images Preview
              </h1>

              <div className="flex gap-6 justify-center flex-wrap">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col border border-[#b47517] rounded-md select-none relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview image"
                      draggable={false}
                      className="hover:brightness-75 transition  flex justify-center items-center object-cover w-64 h-64"
                    />
                      <div className="absolute right-2 top-1 rounded-sm cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={()=> deleteFromUpload(image.name)} className="w-5 dark:bg-gray-800 bg-gray-200 p-1 mt-1"><path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path></svg>
                </div>
                    <div className="flex justify-between bg-white dark:bg-[#333]">
                      <p className="text-gray-600 dark:text-white text-xs py-2 px-3">
                        {image.name && image.name.length > 22
                          ? image.name.slice(0, 22) + "..."
                          : image.name}
                      </p>
                      <p className="text-gray-600 dark:text-white text-xs py-2 px-3">
                        {(image.size / 1000).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default FileUploadComponent;
