"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Patric S.",
      position: "Auto Deliver",
      image: "/review/review6.jpg",
      title: "Reliable and Stress-Free",
      description:
        "The move was smooth from start to finish. Great communication, timely delivery, and my car arrived in perfect condition. Highly reliable service!",
      rating: 5,
    },
    {
      id: 2,
      name: "Shwan R.",
      position: "Business Owner",
      image: "/review/review7.jpg",
      title: "Great Experience with Open Transport",
      description:
        "Smooth experience with open transport. The driver was punctual, followed all instructions, and my car arrived safely. Excellent service!",
      rating: 5,
    },
    {
      id: 3,
      name: "John P.",
      position: "Classic Car Enthusiast",
      image: "/review/review5.png",
      title: "Outstanding Enclosed Transport",
      description:
        "Enclosed transport was top-tier. No delays, no hidden fees, and everything went as promised. Definitely worth the extra cost!",
      rating: 5,
    },
    {
      id: 4,
      name: "Mohamed A.",
      position: "Satisfied Customer",
      image: "/review/review8.png",
      title: "Professional Enclosed Transport",
      description:
        "Excellent enclosed transport service. My car was handled with care, and I received regular updates. I’ll use them again!",
      rating: 5,
    },
    {
      id: 5,
      name: "Dj S.",
      position: "Satisfied Customer",
      image: "/review/review4.png",
      title: "Seamless Open Transport Service",
      description:
        "Everything was smooth—great communication, transparent pricing, and my car was handled carefully. Highly recommend this service!",
      rating: 5,
    },
    {
      id: 6,
      name: "Michael B.",
      position: "Car Collector",
      image: "/review/review9.jpg",
      title: "Excellent Communication and Service",
      description:
        "As a first-time user, I was impressed by the service. Fast, responsive team and early delivery. Would use again!",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  ); // For handling interval
  // const [isAutoplay, setIsAutoPlay] = useState<boolean>(false);
  const swiperRef = useRef<any>(null); // Store Swiper instance4

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

  const handleUserInteraction = () => {
    // setIsAutoPlay(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  const [isAutoplay, setIsAutoplay] = useState(true); // Track autoplay state

  // Stop autoplay when user swipes or clicks pagination
  const stopAutoplay = () => {
    console.log("onclick");
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.stop(); // Stop autoplay
      setIsAutoplay(false); // Prevent restart
    }
  };

  // Resume autoplay when user interacts outside testimonials
  const resumeAutoplay = () => {
    if (!isAutoplay && swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start(); // Restart autoplay
      setIsAutoplay(true);
    }
  };

  // Stop autoplay when pagination is clicked
  useEffect(() => {
    const paginationBullets = document.querySelectorAll(
      ".swiper-pagination-bullet"
    );
    paginationBullets.forEach((bullet) => {
      bullet.addEventListener("click", stopAutoplay);
    });

    return () => {
      paginationBullets.forEach((bullet) => {
        bullet.removeEventListener("click", stopAutoplay);
      });
    };
  }, []);

  // Listen for clicks anywhere on the page
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const testimonialsSection = document.getElementById("reviews");
      if (
        testimonialsSection &&
        !testimonialsSection.contains(event.target as Node)
      ) {
        resumeAutoplay(); // Restart autoplay if clicked outside testimonials
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isAutoplay]);

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
          ref={swiperRef}
          slidesPerView={1} // Mobile: 1 slide
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 3, // Desktop: 3 slides
              spaceBetween: 30,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
          // onSlideChange={stopAutoplay} // Stop autoplay on slide change
          onTouchStart={stopAutoplay} // Stop autoplay on swipe
          onClick={stopAutoplay} // Stop autoplay on pagination click
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative ">
                <div className="overflow-hidden px-2">
                  <div key={testimonial.id} className={`flex-none px-2 py-4`}>
                    <div
                      className="p-6 xl:p-12 mb-8 rounded-lg bg-[#2D2D2D] text-white flex flex-col justify-between min-h-[400px] max-w-lg mx-auto"
                      style={{
                        boxShadow: "0 5px 15px 5px rgba(32, 152, 238, 0.5)",
                      }}
                    >
                      {/* Title */}
                      <p className="text-xl font-semibold line-clamp-2 h-[56px]">
                        {testimonial.title}
                      </p>

                      {/* Description */}
                      <p className="mt-4 p-2 text-base text-gray-200 line-clamp-4 h-[96px]">
                        {testimonial.description}
                      </p>

                      {/* Bottom */}
                      <div className="mt-auto pt-4">
                        <div className="flex items-center mb-2">
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-gray-300">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
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
      </div>
    </section>
  );
};

export default Testimonials;
