import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 2,
      name: "John Doe",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "Director of Research and Data",
      image: "https://placeimg.com/150/150/people",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description:
        "Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Sit amet consectetur adipiscing elit duis.",
    },
  ];

  return (
    <section id="reviews" className="py-20  lg:py-20 px-10 bg-gray-300">
      <div className="container mx-auto">
        <p className="uppercase tracking-wider mb-8 text-gray-900 text-center text-[30px] font-bold">
          What customers are saying
        </p>
        <div className="flex flex-col md:flex-row md:-mx-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-1 px-3 p-4">
              <div
                className="p-12 rounded-lg border border-solid border-gray-200 mb-8 text-gray-900"
                style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
              >
                <p className="text-xl font-semibold">{testimonial.title}</p>
                <p className="mt-6">{testimonial.description}</p>
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
    </section>
  );
};

export default Testimonials;
