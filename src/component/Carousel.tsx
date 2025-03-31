"use client";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const openModal = (image: string) => {
    setModalImage(image); // Set the clicked image for modal
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
    setModalImage(null); // Reset the image
  };

  return (
    <div
      id="gallery"
      className="relative w-full rounded-[32px]"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div className="relative h-56 z-50 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item={index === activeIndex ? "active" : undefined}
          >
            <img
              src={image}
              className="absolute block z-50 max-w-full h:auto md:h-[500px] lg:h-auto object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 cursor-pointer"
              alt={`Slide ${index + 1}`}
              onClick={() => openModal(image)} // Open modal on image click
            />
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white ">
          <svg
            className="w-4 h-4 text:[#6DB8D1] rtl:rotate-180 font-extrabold"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="#6DB8D1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white ">
          <svg
            className="w-4 h-4 text:[#6DB8D1] "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="#6DB8D1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 z-50 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)} // Clicking a dot should change the active image
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex
                ? "bg-[#6DB8D1]" // Active dot color
                : "bg-white bg-opacity-50" // Inactive dot color
            }`}
          ></button>
        ))}
      </div>

      {/* Modal for viewing image in larger size */}
      {showModal && modalImage && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center"
          onClick={closeModal} // Close modal when clicking outside the image
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the modal content
          >
            <img
              src={modalImage}
              className="max-w-full max-h-[90vh] rounded-lg"
              alt="Modal Image"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-4xl font-extrabold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
