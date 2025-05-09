import * as React from "react";
import QouetForm from "./quoetForm";

export interface IFormsProps {}

const Forms = () => {
  return (
    <section id="quote-form">
      {/* <div className="w-full bg-gradient-to-r from-[#425059] to-[#9e9fa0] bg-opacity-70 pt-24 p-6"> */}
      <div className="w-full bg-[#2c2c2c] pt-24 p-6">
        <div className="w-full container mx-auto  w relative mt-16">
          {/* <p className="text-[20px] md:hidden  text-gray-900 font-bold mb-2 text-center p-5">
            Shipping Quote Calculator
          </p> */}
          <div className="w-full  md:w-full  block xl:hidden">
            <QouetForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forms;
