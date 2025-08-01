import React from "react";

function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="loading loading-spinner loading-lg text-primary"></div>
      
    </div>
  );
}

export default GlobalLoader