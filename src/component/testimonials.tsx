"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mekuriya Worku",
      position: "Frequent Mover",
      image: "/review/review6.jpg",
      title: "Reliable and Stress-Free",
      description:
        "I used their services for an interstate move, and it was stress-free from start to finish. The team kept me informed throughout, and the driver was very professional. My car arrived on time and in great condition. It’s hard to find such reliable service these days!",
      rating: 5,
    },
    {
      id: 2,
      name: "Gabriela Fasil",
      position: "Business Owner",
      image: "/review/review7.jpg",
      title: "Great Experience with Open Transport",
      description:
        "I had my fleet vehicle transported using their open transport service, and it was a great experience. The driver was punctual and followed all my instructions. The entire process was smooth, and my car arrived safely. Excellent service overall!",
      rating: 5,
    },
    {
      id: 3,
      name: "John Paul",
      position: "Classic Car Enthusiast",
      image: "/review/review5.png",
      title: "Outstanding Enclosed Transport",
      description:
        "Their enclosed transport services are fantastic! After dealing with multiple companies that failed to meet my expectations or caused unnecessary delays, this one stood out. The cost was slightly higher than some quotes, but it was completely worth it—no hidden fees or surprises",
      rating: 5,
    },
    {
      id: 4,
      name: "Lali Kalab",
      position: "First-Time User",
      image: "/review/review8.png",
      title: "Professional Enclosed Transport",
      description:
        "Their enclosed transport is top-notch! My car was handled with care, and the team provided regular updates. The driver was courteous and made sure everything was secure. I’ll definitely use their services again for my luxury cars!",
      rating: 5,
    },
    {
      id: 5,
      name: "Netsanet moss",
      position: "Satisfied Customer",
      image: "/review/review4.png",
      title: "Seamless Open Transport Service",
      description:
        "This company delivered on its promises with open transport! The price was transparent and reasonable. Communication was amazing—I received updates via text and email, and the driver handled my car with care. Highly recommend!",
      rating: 5,
    },
    {
      id: 6,
      name: "Milikiyas M",
      position: "Car Enthusiast",
      image: "/review/review9.jpg",
      title: "Excellent Communication and Service",
      description:
        "As a first-time user, I was nervous about transporting my car, but they made it easy. The team was responsive, and I appreciated the updates during transit. My vehicle arrived earlier than expected, in perfect condition. Highly recommend!",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  ); // For handling interval

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = isDesktop
    ? Math.ceil(testimonials.length / 3)
    : testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Start the interval when component mounts
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    setIntervalId(interval); // Save the interval ID
    return () => clearInterval(interval); // Clean up on component unmount
  }, [isDesktop]);

  const handlePointClick = (index: number) => {
    setCurrentIndex(index);
    handleMouseEnter();
  };

  // Stop the interval on hover
  const handleMouseEnter = () => {
    if (intervalId) {
      clearInterval(intervalId); // Stop the interval
    }
  };

  // Restart the interval when hover ends
  const handleMouseLeave = () => {
    const interval = setInterval(nextSlide, 5000); // Start the interval again
    setIntervalId(interval);
  };

  const renderStars = (rating: number) => {
    // Define colors for each star index
    const starColors = [
      "rgb(30, 64, 175)", // Tailwind blue-800
      "rgb(29, 78, 216)", // Tailwind blue-800
      // "rgb(29, 78, 216)", // Tailwind blue-700
      "rgb(37, 99, 235)", // Tailwind blue-600
      "rgb(59, 130, 246)", // Tailwind blue-500
      "rgb(96, 165, 250)",
    ];

    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-300"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill={i < rating ? starColors[i] : "gray"}
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      id="reviews"
      className="py-20 px-6 bg-[#2D2D2D]"
      onMouseEnter={handleMouseEnter} // Stop sliding on hover
      onMouseLeave={handleMouseLeave} // Resume sliding after hover
    >
      <div className="container mx-auto">
        <p className="uppercase tracking-wider mb-8 text-white text-center text-[30px] font-bold">
          What customers are saying
        </p>

        <Swiper
          slidesPerView={1} // Mobile: 1 slide
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 3, // Desktop: 3 slides
              spaceBetween: 30,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative ">
                <div className="overflow-hidden px-2">
                  <div key={testimonial.id} className={`flex-none  px-2 py-4`}>
                    <div
                      className="p-6 md:p-12 mb-8 rounded-lg bg-[#2D2D2D] text-white flex flex-col h-[400px] max-w-lg mx-auto"
                      style={{
                        boxShadow: "0 5px 15px 5px rgba(32, 152, 238, 0.5)", // Blue glow effect
                      }}
                    >
                      <p className="text-xl font-semibold">
                        {testimonial.title}
                      </p>
                      <p className="mt-4 p-2 flex-grow">
                        {testimonial.description}
                      </p>
                      <div className="flex items-center mt-2 lg:mt-6">
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-gray-300">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Styled Pagination Dots */}
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
        {/* Points Below */}
        {/* <div className="flex justify-center mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePointClick(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
