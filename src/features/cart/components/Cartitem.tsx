"use client";
import {
  faCheck,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { cartItem } from "../types/cart.types";
import Swal from "sweetalert2";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../server/cart.actions";
import { toast } from "react-toastify";
import { removeProduct, setCartInfo } from "../store/cart.slice";
import { useAppDispatch } from "@/store/store";

export default function Cartitem({ info }: { info: cartItem }) {
  const { price, count, _id, product } = info;
  const { brand, category, imageCover, quantity, title, id } = product;
  const dispatch = useAppDispatch();

  const handelRemove = async () => {
    const result = await Swal.fire({
      html: `
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Remove Product</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to remove "${title}" from your cart?</p>
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
      dispatch(removeProduct({ id }));
      const response = await removeProductFromCart({ productId: id });
      toast.success("Product removed successfully");
    }
  };

  const handelUpdate = async (newCount: number) => {
    if (newCount < 1) return;

    try {
      const response = await updateProductQuantity({
        productId: id,
        count: newCount,
      });
      dispatch(setCartInfo(response));
    } catch (error) {}
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300`}
      >
        <div className=" p-4 sm:p-5">
          <div className=" flex gap-4 sm:gap-6">
            {/* product image */}
            <Link href={``} className=" relative shrink-0 group">
              <div className=" w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 ">
                <img
                  src={imageCover}
                  alt={title}
                  className=" w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* in stock badge */}
              <div className=" absolute -bottom-1 -right-1 bg-green-500 text-[10px] px-2 py-0.5 rounded-lg text-white font-bold shadow-md flex items-center gap-1 border border-white ">
                <FontAwesomeIcon icon={faCheck} className=" text-[8px]" />
                <span>In Stock</span>
              </div>
            </Link>

            {/* product info */}
            <div className=" flex-1 min-w-0 flex flex-col">
              {/* top section */}
              <div className=" mb-3">
                <Link href={``} className=" group/title">
                  <h3 className=" font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed line-clamp-2">
                    {title}
                  </h3>
                </Link>
                <div className=" flex items-center gap-2 mt-2">
                  <span className=" inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-600 text-sm font-semibold rounded-lg border border-primary-100 shadow-sm ">
                    {category.name}
                  </span>
                  <span className=" text-xs text-gray-400">•</span>
                  <span className=" text-xs text-gray-500">
                    SKU :{_id.slice(-6).toUpperCase()}
                  </span>
                </div>
              </div>
              {/* price section */}

              <div className=" mb-4">
                <div className=" flex items-baseline gap-2">
                  <span className=" text-primary-600 font-bold text-lg">
                    {price} EGP
                  </span>
                  <span className=" text-xs text-gray-400">per unit</span>
                </div>
              </div>

              {/* bottom section */}
              <div className=" mt-auto flex flex-wrap items-center justify-between gap-4">
                {/* quantity section */}
                <div className=" flex items-center">
                  <div className=" flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200 ">
                    <button
                      className=" h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
                      aria-label="Decrease quantity"
                      onClick={() => handelUpdate(count - 1)}
                      disabled={count === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} className=" text-xs" />
                    </button>
                    <span className=" w-12 text-center font-bold text-gray-900">
                      {count}
                    </span>
                    <button
                      className=" h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 transition-colors cursor-pointer "
                      aria-label="Increase quantity"
                      onClick={() => handelUpdate(count + 1)}
                      disabled={count === quantity}
                    >
                      <FontAwesomeIcon icon={faPlus} className=" text-xs" />
                    </button>
                  </div>
                </div>
                {/* line total */}
                <div className=" flex items-center gap-4">
                  <div className=" text-right">
                    <p className=" text-xs text-gray-400 mb-0.5">Total</p>
                    <p className=" font-bold text-gray-900 text-xl">
                      {price * count}{" "}
                      <span className="text-sm font-medium text-gray-400">
                        EGP
                      </span>
                    </p>
                  </div>

                  {/* remove button */}
                  <button
                    className=" h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer "
                    title="Remove item"
                    aria-label="Remove from cart"
                    onClick={handelRemove}
                  >
                    <FontAwesomeIcon icon={faTrash} className=" text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
