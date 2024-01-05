import React from "react";

interface OverLayProps {
  setPopupVal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OverLay = ({setPopupVal}: OverLayProps) => {
  return <>
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 overflow-hidden" onClick={()=>setPopupVal(false)}></div>
  </>;
};
