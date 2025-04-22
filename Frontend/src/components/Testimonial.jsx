import React from "react";
import t1 from "../../public/assets/testimony/t1.jpg"
import t2 from "../../public/assets/testimony/t2.jpg"
import t3 from "../../public/assets/testimony/t3.jpg"
import t4 from "../../public/assets/testimony/t4.jpg"
import t5 from "../../public/assets/testimony/t5.jpg"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";  // Import Swiper and SwiperSlide
import "swiper/css";  // Correct import for Swiper styles

const Testimonial = () => {
  const testimonials = [
    {
      name: "Aarav Sharma",
      reviewEnglish:
        "Veer Dairy’s milk and butter are used daily at my home. The milk is so rich that it completely enhances the taste of tea and coffee.",
      role: "Health-Conscious Consumer",
      rating: 5,
      image: t1,
    },
    {
      name: "Rohan Desai",
      reviewEnglish:
        "I’ve tried many brands of ghee, but Veer Dairy’s ghee is pure and aromatic. Whether on hot rotis or in halwa – it takes the taste to the next level!",
      role: "Café Owner",
      rating: 4.7,
      image: t2,
    },
    {
      name: "Priya Malhotra",
      reviewEnglish:
        "The quality of Veer Dairy products is hard to find these days. Paneer, milk, butter, and ghee – everything is trustworthy and full of flavor.",
      role: "Homemaker",
      rating: 5,
      image: t3,
    },
    {
      name: "Aarti Kumari",
      reviewEnglish:
        "My kids love Veer Dairy’s butter so much they ask for it on plain rotis. And the milk is so fresh that you get a natural cream layer every time.",
      role: "Mother & Working Professional",
      rating: 5,
      image: t4,
    },
    {
      name: "Sunita Rao",
      reviewEnglish:
        "I recently bought Veer Dairy’s ghee – what an aroma! It reminded me of the homemade ghee we used to make years ago. I won’t switch to any other now.",
      role: "Housewife",
      rating: 4.8,
      image: t5,
    },
  ];
  

  // Function to render star ratings using react-icons
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-110" />
        ))}
        {halfStar && (
          <FaStarHalfAlt className="text-yellow-400 w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-110" />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-gray-300 w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-110" />
        ))}
      </div>
    );
  };

  return (
    <div>
      <section className="text-gray-600 body-font bg-gradient-to-b from-gray-50 to-gray-200 py-12">
        {/* Main Section */}
        <div className="container px-5 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-4xl font-bold text-gray-900 mb-4">
            Testimonials
          </h1>
          <p className="text-center text-xl font-medium text-gray-700 mb-12">
            What our{" "}
            <span className="text-[#00B86C] font-bold">customers</span> are
            saying
          </p>

          {/* Swiper Carousel */}
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
              <div className="h-full bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer">
                {/* Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#00B86C]"
                />
                {/* Review */}
                <p className="leading-relaxed text-gray-700 mb-6">
                  {testimonial.reviewEnglish}
                </p>
                {/* Divider */}
                <span className="inline-block h-1 w-12 rounded bg-[#00B86C] mt-6 mb-4" />
                {/* Name and Role */}
                <h2 className="text-gray-900 font-semibold text-lg">
                  {testimonial.name}
                </h2>
                <p className="text-gray-500 text-sm uppercase">
                  {testimonial.role}
                </p>
                {/* Rating */}
                {renderStars(testimonial.rating)}
              </div>
            </SwiperSlide>
            
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
