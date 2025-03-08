import Footer from "@/component/footer";
import NavBar from "@/component/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />

      <div className=" w-full   bg-gray-900 overflow-y-auto md:px-8 md:py-12 ">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
