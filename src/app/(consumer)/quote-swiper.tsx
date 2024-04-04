"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const quotes = [
  {
    quote:
      "“For the things we have to learn before we can do them, we learn by doing them.”",
    author: "Aristotle",
  },
  {
    quote: "“An investment in knowledge pays the best interest.”",
    author: "Benjamin Franklin",
  },
  {
    quote: "“Learning never exhausts the mind.”",
    author: "Leonardo da Vinci",
  },
];

export default function QuoteSwiper() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: true,
        enabled: false,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
    >
      {quotes.map((q, i) => {
        return (
          <SwiperSlide key={i} className="py-7">
            <figure className="text-center">
              <blockquote className="text-lg">
                <p>{q.quote}</p>
              </blockquote>
              <figcaption className="text-sliver">
                <cite>~ {q.author}</cite>
              </figcaption>
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
