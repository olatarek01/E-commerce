"use client";

import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DealsBanner() {
  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deal of the Day Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-emerald-600 to-teal-700 p-8 md:p-12 text-white shadow-xl shadow-emerald-500/20 group">
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-white/20">
                  <FontAwesomeIcon icon={faClock} className="text-xs animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">Deal of the Day</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                  Fresh Organic <br className="hidden sm:block" /> Fruits
                </h3>
                <p className="text-white/80 text-lg mb-10 max-w-sm leading-relaxed font-medium">
                  Get up to 40% off on selected organic fruits from our local farms.
                </p>

                <div className="flex gap-3 sm:gap-6 mb-10">
                  {[
                    { value: "12", label: "Hours" },
                    { value: "45", label: "Mins" },
                    { value: "30", label: "Secs" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-4 min-w-[70px] sm:min-w-[90px] text-center border border-white/10 shadow-lg"
                    >
                      <div className="text-2xl sm:text-3xl font-black">{item.value}</div>
                      <div className="text-[10px] text-white/60 uppercase tracking-widest font-black mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/deals"
                  className="inline-flex items-center gap-3 bg-white text-emerald-700 px-10 py-4 rounded-full font-black hover:bg-emerald-50 transition-all shadow-2xl shadow-emerald-950/20 active:scale-95 text-sm uppercase tracking-wider"
                >
                  Shop Now
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* New Arrivals Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-orange-400 to-orange-500 p-8 md:p-12 text-white shadow-xl shadow-orange-500/20 group">
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 border border-white/20">
                  <span className="text-xs">✨</span>
                  <span className="text-xs font-black uppercase tracking-widest">New Arrivals</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                  Exotic <br className="hidden sm:block" /> Vegetables
                </h3>
                <p className="text-white/80 text-lg mb-10 max-w-sm leading-relaxed font-medium">
                  Discover the freshest selection of organic vegetables harvested daily.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                  <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
                    <div className="text-3xl sm:text-4xl font-black italic">25% OFF</div>
                  </div>
                  <div className="text-white/80 font-bold uppercase tracking-widest text-xs">
                    Use code:{" "}
                    <span className="bg-white text-orange-600 px-3 py-1.5 rounded-lg font-black ml-2 shadow-inner">
                      FRESH25
                    </span>
                  </div>
                </div>

                <Link
                  href="/product?sort=newest"
                  className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-4 rounded-full font-black hover:bg-orange-50 transition-all shadow-2xl shadow-orange-950/20 active:scale-95 text-sm uppercase tracking-wider"
                >
                  Explore Now
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
