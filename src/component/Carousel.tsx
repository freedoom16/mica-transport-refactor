"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className="relative w-full rounded-[32px] z-50">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="relative h-56 md:h-96 rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="w-full h-auto md:h-[500px] lg:h-auto object-cover cursor-pointer"
              alt={`Slide ${index + 1}`}
              onClick={() => openModal(image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-pagination {
          margin-top: 20px;
          padding-top: 10px;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: rgb(209, 213, 219); /* gray-300 */
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #2098ee;
          width: 18px;
          height: 18px;
        }
      `}</style>
      {/* Modal for full-screen image */}
      {showModal && modalImage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalImage}
              className="max-w-full max-h-[90vh] rounded-lg"
              alt="Modal"
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
