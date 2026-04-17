"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faCartPlus,
  faCheck,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/store";
import addProductToCart, {
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "../server/wishlist.actions";
import { Product } from "../../products/types/products.types";
import { setWishlistIds } from "../store/wishlist.slice";

export default function WishlistView() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingCart, setIsProcessingCart] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const fetchWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await getLoggedUserWishlist();
      if (response.status === "success") {
        setWishlistItems(response.data);
        dispatch(setWishlistIds(response.data.map((item) => item.id)));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string, title: string) => {
    const result = await Swal.fire({
      html: `
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Remove from Wishlist</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to remove "${title}" from your wishlist?</p>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: `rounded-2xl shadow-2xl border-0 p-0`,
        htmlContainer: `p-6 m-0`,
        actions: `px-6 pb-6 pt-0 gap-3 flex-row-reverse`,
        confirmButton: ` bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200`,
        cancelButton: ` bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200`,
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await removeProductFromWishlist({ productId });
        if (response.status === "success") {
          toast.success("Removed from wishlist");
          setWishlistItems((prev) =>
            prev.filter((item) => item.id !== productId),
          );
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to remove item");
      }
    }
  };

  const handleAddToCart = async (productId: string) => {
    setIsProcessingCart(productId);
    try {
      const response = await addProductToCart({ productId });
      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setIsProcessingCart(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1.5 bg-linear-to-b from-primary-500 to-primary-700 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                My <span className="text-primary-600">Wishlist</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You have {wishlistItems.length} items in your wishlist
              </p>
            </div>
          </div>
          {wishlistItems.length > 0 && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Continue Shopping
              <FontAwesomeIcon icon={faBasketShopping} className="text-sm" />
            </Link>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-4xl text-primary-200"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Add items that you like to your wishlist. They will be saved here
              for you to easily find and buy them later.
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-primary-600 text-white font-bold py-4 px-10 mb-6 rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {wishlistItems.map((product) => {
              const {
                id,
                title,
                imageCover,
                price,
                priceAfterDiscount,
                category,
                ratingsAverage,
              } = product;
              const onSale = priceAfterDiscount
                ? priceAfterDiscount < price
                : false;

              return (
                <div
                  key={id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
                    {/* Image Container - Square on the Left */}
                    <div className="relative w-full sm:w-32 sm:h-32 shrink-0 aspect-square overflow-hidden bg-white p-2 rounded-xl border border-gray-100 group-hover:bg-gray-50/50 transition-colors flex items-center justify-center">
                      <img
                        src={imageCover}
                        alt={title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      {onSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Content Details on the Right */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider px-2 py-0.5 bg-primary-50 rounded-md">
                            {category.name}
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg">
                            <span className="text-xs font-bold text-amber-700">
                              {ratingsAverage}
                            </span>
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="text-amber-400 text-[10px]"
                            />
                          </div>
                        </div>

                        <Link href={`/Product/${id}`}>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {title}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-[8px]"
                            />
                            <span>In Stock</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between gap-4 mt-auto">
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-400 mb-1 font-medium italic">
                            Price
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-gray-900 leading-none">
                              {priceAfterDiscount || price}
                              <span className="text-xs font-medium text-gray-400 ml-1 uppercase">
                                EGP
                              </span>
                            </span>
                            {onSale && (
                              <span className="text-sm text-gray-400 line-through">
                                {price} EGP
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleRemove(id, title)}
                            className="h-12 w-12 bg-red-50 text-red-500 rounded-xl border border-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>

                          <button
                            onClick={() => handleAddToCart(id)}
                            disabled={isProcessingCart === id}
                            className="h-12 px-6 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 hover:bg-primary-700 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold"
                            title="Add to Cart"
                          >
                            {isProcessingCart === id ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span className="hidden sm:inline">
                                  Add to Cart
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
