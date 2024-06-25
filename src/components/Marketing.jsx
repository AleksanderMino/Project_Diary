import React from "react";
import HeaderLayout from "./HeaderLayout"; // Adjust the import path as needed

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeaderLayout />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
    </div>
  );
}

export default MainLayout;
