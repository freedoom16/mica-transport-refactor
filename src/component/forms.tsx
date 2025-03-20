import * as React from "react";
import QouetForm from "./quoetForm";

export interface IFormsProps {}

const Forms = () => {
  return (
    <section id="quote-form">
      <div className="w-full bg-[#ECECEC] pt-24 p-6">
        <div className="container mx-auto relative mt-16">
          <p className="text-[20px] md:hidden text-gray-900 font-bold mb-2 text-center p-5">
            Shipping Quote Calculator
          </p>
          <div className=" max-w-md w-full block md:hidden">
            <QouetForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forms;
