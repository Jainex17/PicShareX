import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

function FileUploadComponent() {
    const [images, setImages] = useState<File[]>([]);
    const [theme, setTheme] = useState<string>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages([...images, ...acceptedFiles]);
        
        
    }, [images]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 5 });

    function uploadbtn() {
        console.log("uploading");
        toast("Uploading...")
    }
    
    return (
        <section className="fileupload container mx-auto pt-8 px-8 bg-white dark:bg-[#2a2a2f]">
            <div {...getRootProps({ className: `border-dashed border-4 ${images.length > 0 ? "border-blue-500" :'border-gray-500'} flex flex-col justify-center items-center cursor-pointer` })}>
                {
                    images.length > 0 ? <img src={URL.createObjectURL(images[0])} className='w-full h-72 object-cover' alt="preview" />
                :
                <div className='p-20 flex flex-col  items-center'>
                <input {...getInputProps()} accept='.jpg' />
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none"
                        stroke={"#005563"}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel"><path
                        d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" /><path
                        d="M16 16l-4-4-4 4" /></svg>
                </span>
                <p className="text-gray-600 dark:text-white">
                    Drag / Click here to select images
                </p>
                        </div>
                }
            </div>
            {
                images.length > 0 &&
                <>
                    <div className='flex items-center mt-3 justify-end mx-2'>
                    
                        <div className='flex justify-end gap-4 mt-3'>
                            <button className='bg-[#292218] border border-[#b47517] text-[#e6a23c] px-8 py-2 rounded-md' onClick={()=>setImages([])}>Cancel</button>
                            <button className="bg-[#18222c] text-[#409eff] border border-[#409eff] px-8 py-2 rounded-md" onClick={uploadbtn}>Upload</button>
                        </div>
                    </div>


                    <div className='mb-10'>
                        {/* images preview */}
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-5'>Images Preview</h1>

                        <div className='flex gap-6'>
                            {images.map((image, index) => (
                                <div key={index} className="flex flex-col border border-[#b47517] rounded-md">
                                    <img src={URL.createObjectURL(image)} alt="preview image" className="flex justify-center items-center object-cover w-64 h-64" />

                                    <div className='flex justify-between bg-white dark:bg-[#333]'>
                                        
                                    <p className="text-gray-600 dark:text-white text-xs py-2 px-3">
                                        {image.name && image.name.length > 25 ? (image.name.slice(0, 25) + "...") : image.name}
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
            }

        </section>
    );
}

export default FileUploadComponent;
