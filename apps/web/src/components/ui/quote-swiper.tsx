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
        enabled: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className="!py-8"
    >
      {quotes.map((q, i) => {
        return (
          <SwiperSlide key={i} className="my-auto">
            <figure className="text-center">
              <blockquote className="text-xl font-medium mb-1 text-foreground">
                <p>{q.quote}</p>
              </blockquote>
              <figcaption className="text-muted-foreground">
                <cite className="">~ {q.author}</cite>
              </figcaption>
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
