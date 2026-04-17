"use client";
import '../../../styles/globals.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import sliderImg_1 from "@/assets/images/home-slider-1.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <>
      <section className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-[400px] md:h-[500px] flex items-center justify-center"
            >
              <div className="overlay py-12 md:py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-600/90 to-green-500/40">
                <div className="container mx-auto h-full flex flex-col justify-center">
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 max-w-lg leading-tight">
                    Fresh Products Delivered to Your Door
                  </h2>
                  <p className="text-lg md:text-xl font-medium opacity-90">Get 20% off on your first order</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/products`}
                      className="bg-white px-8 py-3 rounded-full font-bold text-green-600 hover:bg-green-50 transition-colors shadow-lg"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="bg-transparent border-2 border-white/50 px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-[400px] md:h-[500px] flex items-center justify-center"
            >
              <div className="overlay py-12 md:py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-600/90 to-green-500/40">
                <div className="container mx-auto h-full flex flex-col justify-center">
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 max-w-lg leading-tight">
                    Fresh Products Delivered to Your Door
                  </h2>
                  <p className="text-lg md:text-xl font-medium opacity-90">Get 20% off on your first order</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/products`}
                      className="bg-white px-8 py-3 rounded-full font-bold text-green-600 hover:bg-green-50 transition-colors shadow-lg"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="bg-transparent border-2 border-white/50 px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${sliderImg_1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-[400px] md:h-[500px] flex items-center justify-center"
            >
              <div className="overlay py-12 md:py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-600/90 to-green-500/40">
                <div className="container mx-auto h-full flex flex-col justify-center">
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 max-w-lg leading-tight">
                    Fresh Products Delivered to Your Door
                  </h2>
                  <p className="text-lg md:text-xl font-medium opacity-90">Get 20% off on your first order</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/products`}
                      className="bg-white px-8 py-3 rounded-full font-bold text-green-600 hover:bg-green-50 transition-colors shadow-lg"
                    >
                      Shop Now
                    </Link>
                    <Link
                      href={`/deals`}
                      className="bg-transparent border-2 border-white/50 px-8 py-3 rounded-full font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:text-green-500">
          <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
        </button>

        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:text-green-500">
          <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
        </button>
      </section>
    </>
  );
}
