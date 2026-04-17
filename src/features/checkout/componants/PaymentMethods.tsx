"use client";

import {
  faCheck,
  faCreditCard,
  faMoneyBill,
  faShieldAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaymentMethodsProps {
  selectedMethode: "cash" | "card";
  changeMethode: (methode: "cash" | "card") => void;
}

export default function PaymentMethods({
  selectedMethode,
  changeMethode,
}: PaymentMethodsProps) {
  return (
    <>
      <div className=" bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* header */}
        <div className=" bg-linear-to-br from-primary-600 to-primary-700 px-6 py-4">
          <h2 className=" text-lg font-bold text-white flex items-center gap-2 ">
            <FontAwesomeIcon icon={faWallet} />
            Payment Methods
          </h2>
          <p className=" text-primary-100 text-sm mt-1 ">
            Choose how you'd like to pay
          </p>
        </div>
        {/* body */}
        <div className=" p-6 space-y-4">
          {/* cash on delivery */}
          <button
            type="button"
            className={`w-full p-5 flex items-center gap-4 group rounded-xl border-2 transition-all ${selectedMethode === "cash" ? "border-primary-500 bg-linear-to-r from-primary-50 to-blue-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => {
              changeMethode("cash");
            }}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${selectedMethode === "cash" ? "bg-linear-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
            >
              <FontAwesomeIcon icon={faMoneyBill} className=" text-xl" />
            </div>
            <div className=" flex-1 text-left">
              <h3 className=" font-bold text-gray-900">Cash on Delivery</h3>
              <p className=" text-gray-500 mt-0.5 text-sm">
                Pay when your order arrives at your doorstep
              </p>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${selectedMethode === "cash" ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
            >
              {selectedMethode === "cash" && (
                <FontAwesomeIcon icon={faCheck} className=" text-xs" />
              )}
            </div>
          </button>

          {/* online payment */}
          <button
            type="button"
            className={`w-full p-5 flex items-center gap-4 group rounded-xl border-2 transition-all ${selectedMethode === "card" ? "border-primary-500 bg-linear-to-r from-primary-50 to-blue-50 shadow-sm" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"}`}
            onClick={() => {
              changeMethode("card");
            }}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${selectedMethode === "card" ? "bg-linear-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
            >
              <FontAwesomeIcon icon={faCreditCard} className=" text-xl" />
            </div>
            <div className=" flex-1 text-left">
              <h3 className=" font-bold text-gray-900">Online Payment</h3>
              <p className=" text-gray-500 mt-0.5 text-sm">
                Secure payment with Credit/Debit Card via Stripe
              </p>
              <div className=" flex items-center gap-2 mt-2">
                <img
                  src="https://img.icons8.com/color/48/visa.png"
                  alt="visa"
                  className="h-5 w-5"
                />
                <img
                  src="https://img.icons8.com/color/48/mastercard.png"
                  alt="mastercard"
                  className="h-5 w-5"
                />
                <img
                  src="https://img.icons8.com/color/48/maestro.png"
                  alt="maestro"
                  className="h-5 w-5"
                />
              </div>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${selectedMethode === "card" ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
            >
              {selectedMethode === "card" && (
                <FontAwesomeIcon icon={faCheck} className=" text-xs" />
              )}
            </div>
          </button>

          {/* security notice */}
          <div className=" flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border  border-green-100">
            <div className=" w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faShieldAlt} className=" text-green-600" />
            </div>
            <div>
              <p className=" text-sm font-medium to-green-800">
                Secure & Encrypted
              </p>
              <p className=" text-xs text-gray-500 mt-0.5">
                Your payment is protected with 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
