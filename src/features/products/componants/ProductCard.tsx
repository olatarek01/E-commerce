"use client";

import {
  faArrowsRotate,
  faCartPlus,
  faEye,
  faHeart,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../types/products.types";
import Rating from "@/components/ui/Rating";
import addProductToCart, {
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/store/wishlist.slice";
import { useState } from "react";

export default function ProductCard({ info }: { info: Product }) {
  const {
    title,
    category,
    imageCover,
    price,
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
    id,
  } = info;
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector((state) => state.wishlist.wishlistIds);
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInWishlist = wishlistIds.includes(id);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round((price - priceAfterDiscount) / price) * 100
    : 0;

  const handleWishlistToggle = async () => {
    setIsWishlisting(true);
    try {
      if (isInWishlist) {
        const response = await removeProductFromWishlist({ productId: id });
        if (response.status === "success") {
          dispatch(removeFromWishlist(id));
          toast.success("Removed from wishlist");
        }
      } else {
        const response = await addProductToWishlist({ productId: id });
        if (response.status === "success") {
          dispatch(addToWishlist(id));
          toast.success(response.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsWishlisting(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const response = await addProductToCart({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <div
        id="product-card"
        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            src={imageCover}
            alt={title}
          />

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            {onSale && (
              <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/20 uppercase tracking-wider">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <button
              onClick={handleWishlistToggle}
              disabled={isWishlisting}
              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md ${isInWishlist
                ? "bg-red-500 text-white shadow-red-500/30"
                : "bg-white/90 text-gray-700 hover:text-red-500 hover:bg-white"
                } ${isWishlisting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isWishlisting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FontAwesomeIcon icon={faHeart} className="text-sm" />
              )}
            </button>

            <button className="bg-white/90 backdrop-blur-md h-10 w-10 rounded-full flex items-center justify-center text-gray-700 hover:text-emerald-500 hover:bg-white transition-all shadow-xl">
              <FontAwesomeIcon icon={faArrowsRotate} className="text-sm" />
            </button>

            <Link
              href={`/Product/${id}`}
              className="bg-white/90 backdrop-blur-md h-10 w-10 rounded-full flex items-center justify-center text-gray-700 hover:text-emerald-500 hover:bg-white transition-all shadow-xl"
            >
              <FontAwesomeIcon icon={faEye} className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 opacity-80">{category.name} </div>

          <h3 className="font-bold text-gray-900 mb-3 text-sm md:text-base leading-snug flex-1 group-hover:text-emerald-600 transition-colors">
            <Link className="line-clamp-2" href={`/Product/${id}`}>
              {title}
            </Link>
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400 text-[10px]">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-[10px] font-bold text-gray-400">
              {ratingsAverage} ({ratingsQuantity})
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <div className="flex flex-col">
              {onSale && (
                <span className="text-xs text-gray-400 line-through font-medium mb-0.5">
                  {price} EGP
                </span>
              )}
              <span className="text-lg font-black text-gray-900 leading-none">
                {priceAfterDiscount || price} <span className="text-[10px] font-bold text-emerald-600 ml-1">EGP</span>
              </span>
            </div>

            <button
              className="bg-emerald-600 text-white h-11 w-11 rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-50 group/cart"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-sm" />
              ) : (
                <FontAwesomeIcon icon={faCartPlus} className="text-lg group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
