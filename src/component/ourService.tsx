import React from "react";

const ServicesSection = () => {
  return (
    <section
      id="our-service"
      className="relative bg-gray-900 text-white py-16 "
    >
      {/* Section Container */}
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-[40px] font-bold font-spectral leading-[58px] mb-4">
          Our Services
        </h2>
        {/* Subtitle */}
        <p className="text-base font-montserrat leading-[29px] mb-12 max-w-2xl mx-auto p-8 text-left">
          Every customer receives premium service. Have a special request? Call,
          email, or text with us—we’re here to meet all your transport needs.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-16 p-8">
          {/* Enclosed Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/a7599d6b-enclosed.svg"
              alt="Enclosed Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Enclosed <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Open Car Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/4a370e3a-open.svg"
              alt="Open Car Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Open <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Canada Shipping */}
          <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            {/* <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/27da8f32-canada.svg"
              alt="Canada Shipping"
              className="w-16 h-16 mb-2"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#D9A682"
              height="1000px"
              width="1000px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 512.01 512.01"
              // xml:space="preserve"
              className="w-16 h-16 mb-2 py-8"
            >
              <g transform="translate(0 -1)">
                <g>
                  <g>
                    <path d="M388.89,314.055c-11.435-2.773-22.955,4.373-25.664,15.829c-2.731,11.456,4.373,22.955,15.829,25.664     c66.261,15.723,90.283,38.976,90.283,50.795c0,25.493-85.077,64-213.333,64c-128.235,0-213.333-38.507-213.333-64     c0-11.819,24.043-35.072,90.261-50.795c11.477-2.709,18.56-14.208,15.829-25.664c-2.709-11.456-14.229-18.603-25.664-15.829     C43.717,332.871,0.005,365.639,0.005,406.343c0,70.016,128.811,106.667,256,106.667c127.211,0,256-36.651,256-106.667     C512.005,365.639,468.293,332.871,388.89,314.055z" />
                    <path d="M256.015,171.681c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333     S244.239,171.681,256.015,171.681z" />
                    <path d="M228.239,398.518l8.683,17.365c3.627,7.232,11.008,11.797,19.093,11.797s15.467-4.565,19.093-11.797l18.389-36.779     c22.379-44.779,49.984-88.149,76.672-130.091l12.16-19.136c15.061-23.808,23.019-51.307,23.019-79.531     c0-42.496-18.197-83.115-49.92-111.445C323.727,10.592,281.082-2.975,238.565,2.017C172.175,9.569,117.349,63.03,108.154,129.121     c-5.44,39.168,4.352,78.059,27.541,109.547C171.877,287.691,200.122,342.241,228.239,398.518z M256.015,86.347     c35.285,0,64,28.715,64,64c0,35.285-28.715,64-64,64s-64-28.715-64-64C192.015,115.062,220.73,86.347,256.015,86.347z" />
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-sm font-bold font-montserrat leading-6">
              USA
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div>

          {/* Hawaii Shipping */}
          {/* <div className="flex flex-col items-center bg-gray-800 rounded-2xl p-4">
            <img
              src="https://d9hhrg4mnvzow.cloudfront.net/enclosedcarshipping.shiplux.com/5c62caf4-hawaii.svg"
              alt="Hawaii Shipping"
              className="w-16 h-16 mb-2"
            />
            <p className="text-sm font-bold font-montserrat leading-6">
              Hawaii
              <br />
              <span className="font-normal">Car Shipping</span>
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
