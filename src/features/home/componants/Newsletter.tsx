"use client";

import {
  faPaperPlane,
  faStar,
  faEnvelopeOpenText,
  faGift,
  faUtensils,
  faShieldHalved,
  faRocket,
  faClock,
  faMobileScreenButton,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Newsletter() {
  return (
    <section className="py-20 bg-emerald-900 overflow-hidden relative">
      {/* Background Subtle Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white rounded-full"></div>
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] border-[60px] border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left: Newsletter Subscription */}
          <div className="flex-[5] w-full text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 backdrop-blur-md px-5 py-2 rounded-full mb-8 border border-white/10 shadow-xl">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-emerald-400" />
              <span className="text-xs font-black text-emerald-100 uppercase tracking-[0.2em]">Weekly Newsletter</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Get <span className="text-emerald-400">Exclusive</span> <br className="hidden sm:block" /> Deals Every Week
            </h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Subscribe to our newsletter and stay updated with the latest trends and fresh organic releases!
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              {[
                { icon: faGift, text: "Special Offers" },
                { icon: faUtensils, text: "Free Recipes" },
                { icon: faShieldHalved, text: "Privacy First" }
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-2 bg-emerald-800/30 px-4 py-2 rounded-xl border border-emerald-700/50">
                  <FontAwesomeIcon icon={pill.icon} className="text-emerald-400 text-sm" />
                  <span className="text-white text-sm font-bold">{pill.text}</span>
                </div>
              ))}
            </div>

            <form className="relative max-w-xl mx-auto lg:mx-0 group">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full bg-emerald-800/40 border-2 border-emerald-700/50 rounded-2xl md:rounded-full py-5 md:py-6 px-8 md:px-10 text-white placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 transition-all duration-300 text-lg shadow-2xl"
              />
              <button
                type="submit"
                className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2 bg-emerald-500 hover:bg-white text-emerald-950 font-black px-10 py-4 rounded-xl md:rounded-full transition-all shadow-xl shadow-emerald-950/40 active:scale-95 text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              </button>
            </form>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-emerald-900 bg-emerald-800 flex items-center justify-center text-xs font-bold text-white shadow-inner">👤</div>
                ))}
              </div>
              <p className="text-emerald-100/40 text-sm font-bold">
                Joined by <span className="text-emerald-400">10,000+</span> happy customers
              </p>
            </div>
          </div>

          {/* Right: App Promotion */}
          <div className="flex-[4] w-full">
            <div className="relative bg-linear-to-br from-emerald-800/40 to-emerald-950/60 rounded-[3rem] p-8 md:p-12 border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-3xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all duration-700"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-white text-emerald-900 px-4 py-1 rounded-full mb-8 shadow-lg shadow-white/5">
                  <span className="text-sm">✨</span>
                  <span className="text-xs font-black uppercase tracking-widest leading-none mt-0.5">Mobile App</span>
                </div>

                <div className="relative mb-12">
                  {/* Mock Phone Visual */}
                  <div className="w-48 h-64 md:w-56 md:h-80 bg-emerald-900 rounded-[2.5rem] border-8 border-emerald-800/80 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute top-0 inset-x-0 h-6 bg-emerald-800/80 z-20 flex items-center justify-center">
                      <div className="w-12 md:w-16 h-4 bg-emerald-900 rounded-full"></div>
                    </div>
                    <div className="p-4 md:p-6 pt-12">
                      <div className="w-full h-24 md:h-32 bg-emerald-800/30 rounded-2xl mb-4"></div>
                      <div className="w-2/3 h-4 bg-emerald-800/50 rounded-full mb-3"></div>
                      <div className="w-full h-4 bg-emerald-800/50 rounded-full"></div>
                      <div className="flex gap-4 mt-8">
                        <div className="w-1/2 h-16 bg-emerald-800/20 rounded-xl"></div>
                        <div className="w-1/2 h-16 bg-emerald-800/20 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -right-8 top-10 bg-emerald-400 text-emerald-950 px-4 py-2 rounded-2xl font-black text-sm shadow-2xl animate-bounce shadow-emerald-400/20">
                    Faster!
                  </div>
                  <div className="absolute -left-4 bottom-10 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-black text-xs border border-white/5 shadow-2xl">
                    15% OFF
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-4 tracking-tight">
                  Shop Anywhere, Anytime
                </h3>
                <p className="text-emerald-100/60 text-center mb-10 font-bold text-sm md:text-base leading-relaxed max-w-xs">
                  Download our app for the seamless experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Link href="#" className="flex-1">
                    <div className="bg-emerald-950/50 hover:bg-emerald-900 border border-white/5 rounded-2xl p-4 transition-all group/btn flex items-center gap-4 hover:border-white/20">
                      <FontAwesomeIcon icon={faApple} className="text-3xl text-white" />
                      <div className="text-left">
                        <div className="text-[10px] text-emerald-100/40 uppercase font-black tracking-widest leading-none mb-1">Download</div>
                        <div className="text-sm font-black text-white leading-none">App Store</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="#" className="flex-1">
                    <div className="bg-emerald-950/50 hover:bg-emerald-900 border border-white/5 rounded-2xl p-4 transition-all group/btn flex items-center gap-4 hover:border-white/20">
                      <FontAwesomeIcon icon={faGooglePlay} className="text-2xl text-emerald-400" />
                      <div className="text-left">
                        <div className="text-[10px] text-emerald-100/40 uppercase font-black tracking-widest leading-none mb-1">Get it on</div>
                        <div className="text-sm font-black text-white leading-none">Play Store</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
