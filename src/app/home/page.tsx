import AboutPage from "@/component/aboutPage2";
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

      {/* Section 1 */}
      <Home />

      <Forms />

      {/* Section 2 */}
      <SectionOne />

      {/* <Forms /> */}

      {/* <AboutPage /> */}

      {/* Section 3 */}
      <ServicesSection />

      {/* Section 4 */}
      <Testimonials />

      {/* Section 5 */}
      <CustomContentSection />

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default BlockComponent;
