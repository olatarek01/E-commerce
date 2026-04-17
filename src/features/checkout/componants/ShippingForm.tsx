import {
  faCity,
  faHome,
  faInfoCircle,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ShippingAddressValues } from "../schemas/checkout.schema";

interface ShippingAddressFormProps {
  register: UseFormRegister<ShippingAddressValues>;
  errors: FieldErrors<ShippingAddressValues>;
}

export default function ShippingForm({
  register,
  errors,
}: ShippingAddressFormProps) {
  return (
    <>
      <div className=" bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm ">
        {/* header */}
        <div className=" bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 className=" text-lg font-bold text-white flex items-center gap-2 ">
            <FontAwesomeIcon icon={faHome} />
            Shipping Address
          </h2>
          <p className=" text-primary-100 text-sm mt-1 ">
            Where should we deliver your order?
          </p>
        </div>
        {/* body */}
        <div className=" p-6 space-y-5">
          <div className=" flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className=" w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-sm ">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className=" text-blue-600 text-sm "
              />
            </div>
            <div>
              <p className=" text-sm font-medium text-blue-800">
                Delivery Information
              </p>
              <p className=" text-xs text-blue-600 mt-0.5">
                {"Please ensure your address is accurate for a smooth delivery"}
              </p>
            </div>
          </div>

          {/*City*/}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City <span className=" text-red-500">*</span>
            </label>
            <div className=" relative">
              <div className=" absolute left-4 top-3 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <FontAwesomeIcon
                  icon={faCity}
                  className="text-gray-500 text-sm"
                />
              </div>
              <input
                type="text"
                id="city"
                className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all ${errors.city ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"}`}
                placeholder="e.g. Cairo,Alexandria, Giza"
                {...register("city")}
              />
            </div>
            {errors.city && (
              <p className=" text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className=" inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.city.message}
              </p>
            )}
          </div>

          {/* address detailes */}
          <div>
            <label
              htmlFor="details"
              className=" block text-sm font-semibold text-gray-700 mb-2"
            >
              Street Address <span className=" text-red-500">*</span>
            </label>
            <div className=" relative">
              <div className=" absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-500 text-sm"
                />
              </div>
              <textarea
                id="details"
                className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none ${errors.details ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"}`}
                placeholder="Street name, building number, floor, apartment..."
                {...register("details")}
              />
            </div>
            {errors.details && (
              <p className=" text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className=" inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.details.message}
              </p>
            )}
          </div>
          {/* phone */}
          <div>
            <label
              htmlFor="phone"
              className=" block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number <span className=" text-red-500">*</span>
            </label>
            <div className=" relative">
              <div className=" absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-gray-500 text-sm"
                />
              </div>
              <input
                type="tel"
                id="phone"
                className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all ${errors.phone ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"}`}
                placeholder="e.g. 01xxxxxxxxx"
                {...register("phone")}
              />
              <span className=" absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                Egyptian Number Only
              </span>
            </div>
            {errors.phone && (
              <p className=" text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className=" inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
