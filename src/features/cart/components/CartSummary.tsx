import {
  faArrowRight,
  faInfoCircle,
  faShieldAlt,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CartSummary({
  totalCartPrice,
  numOfCartItems,
}: {
  totalCartPrice: number;
  numOfCartItems: number;
}) {
  const supTotal = totalCartPrice;
  const shippingThreshold = 500;
  const shippingCost =
    numOfCartItems === 0 ? 0 : supTotal > shippingThreshold ? 0 : 50;

  const total = Math.round(supTotal + shippingCost);

  const progress = Math.min((supTotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - supTotal, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <div className="mb-6 space-y-3">
        {/* Shipping Indicators */}
        {supTotal < shippingThreshold ? (
          /* Case 1: Progress towards free shipping */
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700">
                <FontAwesomeIcon icon={faInfoCircle} className="text-[10px]" />
                <span className="text-xs">Free Shipping Progress</span>
              </div>
              <span className="text-xs font-bold text-amber-700">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-amber-100">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-amber-600 mt-2 font-medium">
              Add{" "}
              <span className="font-bold underline decoration-amber-200 decoration-2 underline-offset-2">
                {remainingForFreeShipping} EGP
              </span>{" "}
              for free shipping
            </p>
          </div>
        ) : (
          /* Case 2: Free shipping achieved */
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
              <FontAwesomeIcon icon={faTruck} className="text-sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-700">
                Congratulations!
              </p>
              <p className="text-[10px] text-emerald-600 font-medium">
                You've earned free shipping
              </p>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
        Order Summary
        <span className="text-sm font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">
          {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
        </span>
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>
            Subtotal ({numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
            )
          </span>
          <span className="font-semibold text-gray-900">{supTotal} EGP</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <span>Estimated Shipping</span>
            <div className="group relative">
              <span className="cursor-help text-xs bg-gray-100 px-1.5 rounded-full text-gray-400 font-sans">
                ?
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Calculated based on your location and items.
              </div>
            </div>
          </div>
          {shippingCost === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="font-semibold text-gray-900">
              {shippingCost} EGP
            </span>
          )}
        </div>
        <div className="flex justify-between text-gray-600 border-b border-gray-50 pb-4">
          <span>Tax</span>
          <span className="font-semibold text-gray-900">0.00 EGP</span>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="mb-6">
        <label
          htmlFor="promo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          HAVE A PROMO CODE?
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faTag}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="text"
              id="promo"
              placeholder="Enter code"
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>

      <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 mb-6">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-gray-900 font-bold text-lg">Total</span>
          <div className="text-right">
            <p className="text-2xl font-black text-primary-600">{total} EGP</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Including VAT
            </p>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 mb-4 group active:scale-95">
        Proceed to Checkout
        <FontAwesomeIcon
          icon={faArrowRight}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>

      <Link
        href="/"
        className="w-full block text-center py-3 text-gray-600 font-medium hover:text-primary-600 transition-colors border border-dashed border-gray-200 rounded-xl hover:border-primary-200"
      >
        Continue Shopping
      </Link>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 text-gray-400">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="text-xl text-primary-600/50"
          />
          <div className="text-[11px] leading-tight">
            <p className="font-semibold text-gray-600 uppercase mb-0.5">
              Secure Checkout
            </p>
            <p>Your data is protected by industry standard encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
