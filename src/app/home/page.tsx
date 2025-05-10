import SectionOne from "@/component/aboutUs";
import Footer from "@/component/footer";
import Forms from "@/component/forms";
import Home from "@/component/home";
import NavBar from "@/component/navbar";
import ServicesSection from "@/component/ourService";
import CustomContentSection from "@/component/support";
import Testimonials from "@/component/testimonials";
import React from "react";

const BlockComponent: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Home page */}
      <Home />

      {/* Forms */}
      <Forms />

      {/* About page and why us */}
      <SectionOne />

      {/* Service Section */}
      <ServicesSection />

      {/* Testimonals Section */}
      <Testimonials />

      {/* Customer Support section */}
      <CustomContentSection />

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default BlockComponent;
