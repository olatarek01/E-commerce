"use client";
import {
  faArrowLeft,
  faBox,
  faCartShopping,
  faReceipt,
  faShieldAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  shippingAddressSchema,
  ShippingAddressValues,
} from "../schemas/checkout.schema";
import ShippingForm from "../componants/ShippingForm";
import PaymentMethods from "../componants/PaymentMethods";
import { useState } from "react";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/store/cart.slice";

export default function CheckoutScreen() {
  const [paymentMethode, setPaymentMethode] = useState<"cash" | "card">("cash");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { cartId, products, totalCartPrice, numOfCartItems } = useAppSelector(
    (state) => state.cart,
  );

  // Calculate shipping cost: free if total >= 1000 EGP, otherwise 50 EGP
  const shippingCost = totalCartPrice >= 1000 ? 0 : 50;
  const finalTotal = totalCartPrice + shippingCost;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(shippingAddressSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ShippingAddressValues> = async (values) => {
    try {
      if (!cartId) {
        return;
      }
      if (paymentMethode === "cash") {
        const response = await createCashOrder({
          cartId,
          shippingAddress: values,
        });
        if (response.status === "success") {
          dispatch(clearCart());
          toast.success("order created successfully");
          reset();
          setTimeout(() => {
            router.push("/orders");
          }, 3000);
        }
      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: values,
          url: location.origin,
        });
        if (response.status === "success") {
          dispatch(clearCart());
          toast.loading("redirecting to payment gateway");
          reset();
          setTimeout(() => {
            location.href = response.session.url;
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-linear-to-br  from-gray-50 to-white min-h-screen py-8">
        <div className=" container mx-auto px-4">
          {/* check out progress */}
          <div className=" mb-8">
            {/* breadcrumb */}
            <nav className=" flex items-center gap-2 text-sm text-gray-500 mb-6 ">
              <Link href="/" className=" hover:text-primary-600 transition">
                Home
              </Link>
              <span className=" text-gray-300">/</span>
              <Link href="/cart" className=" hover:text-primary-600 transition">
                Cart
              </Link>
              <span className=" text-gray-300">/</span>
              <span className=" text-gray-900 font-medium">Checkout</span>
            </nav>

            {/* page header */}
            <div className=" flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className=" text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className=" bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faReceipt} />
                  </span>
                  Complete Your Order
                </h1>
                <p className=" text-gray-600 mt-2">
                  Review your items and complete your purchase
                </p>
              </div>
              <Link
                href="/cart"
                className=" text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Cart
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* left column - forms */}
              <div className=" lg:col-span-2 space-y-6">
                {/* shippingForm */}

                <ShippingForm register={register} errors={errors} />
                <PaymentMethods
                  selectedMethode={paymentMethode}
                  changeMethode={setPaymentMethode}
                />

                {/* paymentForm */}
              </div>
              {/* right column - order summary */}
              <div className=" lg:col-span-1 ">
                <div className=" bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm sticky top-4 p-4">
                  {/* header */}
                  <div className=" bg-linear-to-br from-primary-600 to-primary-700 px-6 py-4 rounded-2xl">
                    <h2 className=" text-lg font-bold text-white flex items-center gap-2 p-2 ">
                      <FontAwesomeIcon icon={faCartShopping} />
                      Order Summary
                    </h2>
                    <p className=" text-primary-100 text-sm mt-1 ">
                      {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}{" "}
                      in your cart
                    </p>
                  </div>

                  <div className=" p-5">
                    {/* cart item preview */}
                    <div className=" space-y-3 max-h-56 overflow-y-auto pr-1 mb-5 ">
                      {products.map((item) => (
                        <div
                          key={item._id}
                          className=" flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className=" w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className=" w-full h-full object-contain"
                            />
                          </div>
                          <div className=" flex-1 min-w-0">
                            <p className=" text-sm font-medium text-gray-900 truncate">
                              {item.product.title}
                            </p>
                            <p className=" text-xs text-gray-500 mt-0.5">
                              {item.count} x {item.price} EGP
                            </p>
                          </div>
                          <p className=" text-sm font-bold text-gray-900 shrink-0">
                            {item.price * item.count} EGP
                          </p>
                        </div>
                      ))}
                    </div>
                    <hr className=" border-gray-100 my-4" />

                    {/* price breakdown */}
                    <div className=" space-y-3">
                      <div className=" flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className=" font-medium">
                          {totalCartPrice} EGP
                        </span>
                      </div>
                      <div className=" flex justify-between text-gray-600">
                        <span className=" flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faTruck}
                            className=" text-gray-400"
                          />
                          Shipping
                        </span>
                        {shippingCost === 0 ? (
                          <span className=" text-green-600 font-semibold">
                            Free
                          </span>
                        ) : (
                          <span className=" font-medium">
                            {shippingCost} EGP
                          </span>
                        )}
                      </div>
                      <hr className=" border-gray-100" />
                      <div className=" flex justify-between items-center ">
                        <span className=" text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <div className=" text-right">
                          <span className=" text-2xl font-bold text-primary-600">
                            {finalTotal}
                          </span>
                          <span className=" text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <button
                      type="submit"
                      className=" w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] "
                    >
                      <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                      Proceed to Payment
                    </button>

                    {/* trust badges */}
                    <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100 ">
                      <div className=" flex items-center gap-1.5 text-xs text-gray-500">
                        <FontAwesomeIcon
                          icon={faShieldAlt}
                          className=" text-green-500"
                        />
                        <span>Secure</span>
                      </div>
                      <div className=" w-px h-4 bg-gray-200 "></div>
                      <div className=" flex items-center gap-1.5 text-xs text-gray-500">
                        <FontAwesomeIcon
                          icon={faTruck}
                          className=" text-blue-500"
                        />
                        <span>Fast Delivery</span>
                      </div>
                      <div className=" w-px h-4 bg-gray-200 "></div>
                      <div className=" flex items-center gap-1.5 text-xs text-gray-500">
                        <FontAwesomeIcon
                          icon={faBox}
                          className=" text-orange-500"
                        />
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
