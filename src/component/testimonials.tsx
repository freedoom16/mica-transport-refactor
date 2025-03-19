"use client";
import React, { useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 2,
      name: "John Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 4,
      name: "Jane Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 5,
      name: "John Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 6,
      name: "Jane Smith",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="reviews" className="py-20 lg:py-20 px-10 bg-[#ECECEC]">
      <div className="container mx-auto">
        <p className="uppercase tracking-wider mb-8 text-gray-900 text-center text-[30px] font-bold">
          What customers are saying
        </p>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-full md:w-1/3 px-3 p-4 "
                >
                  <div
                    className=" p-6 md:p-12 rounded-lg border bg-white border-solid border-gray-200 mb-8 text-gray-900"
                    style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
                  >
                    <p className="text-xl font-semibold">{testimonial.title}</p>
                    <p className="mt-6 flex">{testimonial.description}</p>
                    <div className="flex items-center mt-8">
                      <img
                        className="w-12 h-12 mr-4 rounded-full"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <p>{testimonial.name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black bg-white shadow-xl p-3 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black bg-white p-3 shadow-xl rounded-full"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
