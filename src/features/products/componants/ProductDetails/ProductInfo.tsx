"use client";

import Link from "next/link";
import { Product } from "../../types/products.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faBolt,
  faBoxOpen,
  faCartShopping,
  faCheckCircle,
  faCircleInfo,
  faCreditCard,
  faHeart,
  faMinus,
  faMoneyBill,
  faPlus,
  faShareNodes,
  faShieldHalved,
  faStar,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "@/components/ui/Rating";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import addProductToCart, {
  getLoggedUserCart,
  removeProductFromCart,
} from "@/features/cart/server/cart.actions";
import { setCartInfo, removeProduct } from "@/features/cart/store/cart.slice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/store/wishlist.slice";

export default function ProductInfo({ product }: { product: Product }) {
  const {
    id,
    title,
    description,
    priceAfterDiscount,
    images,
    price,
    ratingsAverage,
    ratingsQuantity,
    quantity,
    subcategory,
    category,
    brand,
  } = product;

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const isLowStock = quantity > 0 && quantity < 10;
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.products);
  const wishlistIds = useAppSelector((state) => state.wishlist.wishlistIds);

  const isInCart = cartProducts.some((item) => item.product.id === id);
  const isInWishlist = wishlistIds.includes(id);

  const tabs = [
    { id: "details", label: "Product Details", icon: faCircleInfo },
    { id: "reviews", label: `Reviews (${ratingsQuantity})`, icon: faStar },
    { id: "shipping", label: "Shipping & Returns", icon: faTruck },
  ];

  return (
    <>
      <section id="Product-detail" className=" py-6">
        <div className=" container mx-auto px-4">
          <div className=" flex flex-col lg:flex-row gap-8">
            <div id="product-images" className="lg:w-1/4">
              <ImageGallery
                items={images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
                showIndex={true}
              />
            </div>

            <div id="product-info" className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    href={""}
                    className=" bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition duration-200 "
                  >
                    {category.name}
                  </Link>
                  <span className=" bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {brand.name}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {title}
                </h1>

                <div className=" flex items-center gap-3 mb-4">
                  <Rating rating={ratingsAverage} />
                  <span className="text-sm text-gray-600">
                    {ratingsAverage}({ratingsQuantity} reviews)
                  </span>
                </div>

                <div className=" flex items-center flex-wrap gap-3 mb-6">
                  <span className=" text-3xl font-bold text-gray-900">
                    {priceAfterDiscount || price} EGP
                  </span>
                  {onSale && (
                    <>
                      <span className=" text-lg text-gray-400 line-through">
                        {price}
                      </span>
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                        Save {discountPercentage}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className=" flex items-center gap-2 mb-6">
                  {quantity > 0 ? (
                    <span
                      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${isLowStock ? "bg-yellow-600" : "bg-green-500"}`}
                      ></span>
                      {isLowStock
                        ? `Only ${quantity} left : Order soon!`
                        : "in stock"}
                    </span>
                  ) : (
                    <span className=" flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700 ">
                      <span className=" w-2 h-2 rounded-full bg-red-500"></span>
                      Out of stock
                    </span>
                  )}
                </div>

                <div className=" border-t border-gray-100 pt-5 mb-6">
                  <p className=" text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className=" mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className=" flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button
                        id="decrease-qty"
                        disabled={count === 0}
                        onClick={() => {
                          setCount(count - 1);
                        }}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={count}
                        onChange={(e) => {
                          setCount(+e.target.value);
                        }}
                        className=" w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                        id="quantity"
                      />
                      <button
                        id="increase-qty"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <span className=" text-sm text-gray-500">
                      {" "}
                      {quantity} available{" "}
                    </span>
                  </div>
                </div>

                <div className=" bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center ">
                    <span className=" text-gray-600 "> Total price </span>
                    <span className=" text-2xl font-bold text-primary-600">
                      {count * (priceAfterDiscount || price)} EGP
                    </span>
                  </div>
                </div>

                <div className=" flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    id="add-to-cart"
                    onClick={async () => {
                      setIsAddingToCart(true);
                      try {
                        if (isInCart) {
                          // Remove from cart
                          const response = await removeProductFromCart({
                            productId: id,
                          });
                          if (response.status === "success") {
                            toast.success("Removed from cart");
                            const cartInfo = await getLoggedUserCart();
                            dispatch(setCartInfo(cartInfo));
                          }
                        } else {
                          // Add to cart
                          const response = await addProductToCart({
                            productId: id,
                          });
                          if (response.status === "success") {
                            toast.success(response.message);
                            const cartInfo = await getLoggedUserCart();
                            dispatch(setCartInfo(cartInfo));
                          }
                        }
                      } catch (error: any) {
                        toast.error(error.message || "Something went wrong");
                        console.error("Error updating cart:", error);
                      } finally {
                        setIsAddingToCart(false);
                      }
                    }}
                    disabled={isAddingToCart}
                    className={`flex-1 text-white py-3.5 px-6 rounded-xl font-medium active:scale-[0.98] transition duration-200 ${isInCart
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-primary-600 hover:bg-primary-700"
                      } ${isAddingToCart ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <>
                      <FontAwesomeIcon
                        icon={isInCart ? faTrash : faCartShopping}
                      />
                      {isAddingToCart
                        ? "Processing..."
                        : isInCart
                          ? "Remove from Cart"
                          : "Add to Cart"}
                    </>
                  </button>

                  <button
                    id="buy-now"
                    className={`flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition duration-200 bg-gray-900`}
                  >
                    <FontAwesomeIcon icon={faBolt} />
                    Buy Now
                  </button>
                </div>

                {/* wishlist & share */}
                <div className=" flex gap-3 mb-6">
                  <button
                    id="wishlist-button"
                    onClick={async () => {
                      setIsWishlisting(true);
                      try {
                        if (isInWishlist) {
                          const response = await removeProductFromWishlist({
                            productId: id,
                          });
                          if (response.status === "success") {
                            dispatch(removeFromWishlist(id));
                            toast.success("Removed from wishlist");
                          }
                        } else {
                          const response = await addProductToWishlist({
                            productId: id,
                          });
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
                    }}
                    disabled={isWishlisting}
                    className={`flex-1 border-2 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${isInWishlist
                        ? "bg-red-50 border-red-200 text-red-500 shadow-sm"
                        : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-500"
                      } ${isWishlisting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isWishlisting ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FontAwesomeIcon icon={faHeart} />
                    )}
                    <span className="hidden sm:inline">
                      {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                    </span>
                  </button>
                  <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-500 transition duration-200 cursor-pointer">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className=" h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 hover:text-white transition duration-200">
                        <FontAwesomeIcon icon={faTruckFast} />
                      </div>
                      <div>
                        <p className=" text-md block font-medium text-gray-600">
                          Free Delivery
                        </p>
                        <p className=" text-sm block text-gray-600">
                          Get your order in 2-3 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className=" h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 hover:text-white transition duration-200">
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </div>
                      <div>
                        <p className=" text-md font-medium text-gray-600">
                          30 Days Return
                        </p>
                        <p className=" text-sm text-gray-600"> Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className=" h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 hover:text-white transition duration-200">
                        <FontAwesomeIcon icon={faShieldHalved} />
                      </div>
                      <div>
                        <p className=" text-md font-medium text-gray-600">
                          Secure Payment
                        </p>
                        <p className=" text-sm text-gray-600">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-5 text-sm font-semibold transition duration-200 whitespace-nowrap ${activeTab === tab.id
                      ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary-600 rounded-full"></span>
                      About this Product
                    </h3>
                    <div className="space-y-2">
                      <div className="flex py-2 border-b border-gray-50 text-sm">
                        <span className="w-32 text-gray-500 font-medium">
                          Sole Material
                        </span>
                        <span className="text-gray-900">Rubber</span>
                      </div>
                      <div className="flex py-2 border-b border-gray-50 text-sm">
                        <span className="w-32 text-gray-500 font-medium">
                          Colour Name
                        </span>
                        <span className="text-gray-900">RED</span>
                      </div>
                      <div className="flex py-2 border-b border-gray-50 text-sm">
                        <span className="w-32 text-gray-500 font-medium">
                          Department
                        </span>
                        <span className="text-gray-900">Men</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary-600 rounded-full"></span>
                      Product Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                          Category
                        </p>
                        <p className="text-gray-900 font-semibold text-sm">
                          {category.name}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                          Subcategory
                        </p>
                        <p className="text-gray-900 font-semibold text-sm">
                          {category.name}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                          Brand
                        </p>
                        <p className="text-gray-900 font-semibold text-sm">
                          {brand.name}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                          Items Sold
                        </p>
                        <p className="text-gray-900 font-semibold text-sm">
                          4442+ sold
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary-600 rounded-full"></span>
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          icon: faShieldHalved,
                          title: "Premium Quality Product",
                          desc: "Top-tier materials",
                        },
                        {
                          icon: faCheckCircle,
                          title: "100% Authentic Guarantee",
                          desc: "Original from source",
                        },
                        {
                          icon: faBoxOpen,
                          title: "Fast & Secure Packaging",
                          desc: "Safety first delivery",
                        },
                        {
                          icon: faCreditCard,
                          title: "Quality Tested",
                          desc: "Checked for durability",
                        },
                      ].map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition duration-200"
                        >
                          <div className="w-9 h-9 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0 text-sm">
                            <FontAwesomeIcon icon={feature.icon} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-xs">
                              {feature.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1">
                    <div className="p-8 bg-gray-50 rounded-2xl text-center">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
                        Average Rating
                      </p>
                      <h4 className="text-6xl font-black text-gray-900 mb-2">
                        {ratingsAverage}
                      </h4>
                      <div className="flex justify-center mb-2">
                        <Rating rating={ratingsAverage} />
                      </div>
                      <p className="text-gray-600 font-medium">
                        Based on {ratingsQuantity} reviews
                      </p>
                    </div>

                    <button className="w-full mt-6 py-4 px-6 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition transform active:scale-95">
                      Write a Review
                    </button>
                  </div>

                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                      Review Distribution
                    </h3>
                    <div className="space-y-5">
                      {[
                        { star: 5, pct: 5 },
                        { star: 4, pct: 25 },
                        { star: 3, pct: 60 },
                        { star: 2, pct: 25 },
                        { star: 1, pct: 5 },
                      ].map((item) => (
                        <div
                          key={item.star}
                          className="flex items-center gap-4"
                        >
                          <span className="w-12 text-sm font-bold text-gray-700">
                            {item.star} star
                          </span>
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${item.pct}%` }}
                            ></div>
                          </div>
                          <span className="w-12 text-sm font-bold text-gray-500 text-right">
                            {item.pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 p-10 border-2 border-dashed border-gray-100 rounded-2xl text-center">
                      <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FontAwesomeIcon icon={faStar} size="lg" />
                      </div>
                      <p className="text-gray-400 font-medium">
                        Customer reviews will be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faTruck} />
                        </div>
                        Shipping Information
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Free shipping on orders over $50",
                          "Standard delivery: 3-5 business days",
                          "Express delivery available (1-2 business days)",
                          "Track your order in real-time",
                        ].map((text, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-gray-600"
                          >
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-green-500"
                            />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faBoxOpen} />
                        </div>
                        Returns & Refunds
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "30-day hassle-free returns",
                          "Full refund or exchange available",
                          "Free return shipping on defective items",
                          "Easy online return process",
                        ].map((text, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-gray-600"
                          >
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-green-500"
                            />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-linear-to-r from-primary-600 to-primary-700 rounded-2xl text-white">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={faShieldHalved} size="lg" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">
                          Buyer Protection Guarantee
                        </h4>
                        <p className="text-primary-50 text-sm leading-relaxed">
                          Get a full refund if your order doesn't arrive or
                          isn't as described. We ensure your shopping experience
                          is safe and secure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
