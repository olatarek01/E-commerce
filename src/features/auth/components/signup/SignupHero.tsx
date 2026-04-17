import React from "react";
import reviweAuther from "../../../../assets/images/review-author.png";
import Image from "next/image";
import {
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function signupHero() {
  return (
    <>
      <div className="space-y-10">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Welcome to <span className="text-primary-600">FreshCart</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Join our community of over 5 million shoppers and get fresh
            groceries delivered to your doorstep.
          </p>
        </div>

        <ul className="space-y-8 my-10">
          <li className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <FontAwesomeIcon icon={faStar} className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                Premium Quality
              </h4>
              <p className="text-gray-500">
                We source our products from trusted local farmers and suppliers.
              </p>
            </div>
          </li>
          <li className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <FontAwesomeIcon icon={faTruckFast} className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                Fast and reliable delivery
              </h4>
              <p className="text-gray-500">
                Get your groceries in as little as 2 hours.
              </p>
            </div>
          </li>
          <li className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                Safe and Secure payment
              </h4>
              <p className="text-gray-500">
                100% secure payment processing with top-tier encryption.
              </p>
            </div>
          </li>
        </ul>
        <div className="review bg-primary-50 p-8 rounded-3xl border border-primary-100 relative shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <FontAwesomeIcon
              icon={faStar}
              className="text-6xl text-primary-600"
            />
          </div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={reviweAuther}
                alt="reviweAuther"
                width={64}
                height={64}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xl">
                Amr Tarek
              </h3>
              <div className="rate flex gap-1 text-yellow-500 mt-1">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
          <blockquote className="relative z-10">
            <p className="text-gray-700 italic text-lg leading-relaxed">
              FreshCart has completely transformed my grocery shopping
              experience. The quality of the produce is outstanding, and the
              delivery is always prompt and reliable. I couldn t be happier with
              my purchases!
            </p>
          </blockquote>
        </div>
      </div>
    </>
  );
}