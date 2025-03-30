"use client";
import React, { useState, useEffect } from "react";

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
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < rating ? "#FFD700" : "gray"}
          viewBox="0 0 24 24"
          className="font-bold"
          width="20"
          height="20"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
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

        <div className="relative ">
          <div className="overflow-hidden px-2">
            <div
              className="flex transition-all duration-500 ease-in-out lg:space-x-4"
              style={{
                transform: `translateX(-${
                  currentIndex * (isDesktop ? 100 : 100)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`flex-none ${
                    isDesktop ? "w-1/3" : "w-full"
                  } px-2 py-4`}
                >
                  <div
                    className="p-6 md:p-12 rounded-lg bg-[#2D2D2D] mb-8 text-white flex flex-col h-full"
                    style={{
                      boxShadow: "0 5px 15px 5px rgba(32, 152, 238, 0.5)", // Blue glow effect
                    }}
                  >
                    <p className="text-xl font-semibold">{testimonial.title}</p>
                    <p className="mt-4 p-2 flex-grow">
                      {testimonial.description}
                    </p>
                    <div className="flex items-center mt-2 lg:mt-6">
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 font-bold transform -translate-y-1/2 -translate-x-1/2 text-white text-[25px] bg-[#2098ee] shadow-xl p-4 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 font-bold top-1/2 transform -translate-y-1/2 translate-x-1/2 text-white text-[25px]  bg-[#2098ee] p-4 shadow-xl rounded-full"
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* Points Below */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePointClick(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
