import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faTruck,
    faShoppingBag,
    faBox,
    faMapMarkerAlt,
    faCreditCard,
    faClock,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Order } from "../types/orders.types";
import { useState } from "react";


export function OrdersHeader({ count }: { count: number }) {
    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">My Orders</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-sm">
                        <FontAwesomeIcon icon={faBox} className="text-xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                        <p className="text-gray-500 text-sm mt-0.5">Track and manage your {count} orders</p>
                    </div>
                </div>

                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}


export function OrderCard({ orderInfo }: { orderInfo: Order }) {

    const [isExpanded, setIsExpanded] = useState(true);

    function getStatus() {
        if (orderInfo.isDelivered) {
            return {
                label: 'Delivered',
                icon: faTruck,
                color: 'bg-blue-50 text-blue-700 border border-blue-100',
            };
        }
        else if (orderInfo.isPaid) {
            return {
                label: 'Paid',
                icon: faCreditCard,
                color: 'bg-green-50 text-green-700 border border-green-100',
            };
        }
        else {
            return {
                label: 'Processing',
                icon: faClock,
                color: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
            };
        }
    }

    const status = getStatus();
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* ─── Top Section (Always Visible) ─── */}
            <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left: Image & Main Info */}
                <div className="flex items-start gap-4">
                    {/* Product Image with Badge */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden">
                            {
                                orderInfo.cartItems[0] && (
                                    <img
                                        src={orderInfo.cartItems[0].product.imageCover}
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                )
                            }
                        </div>
                        {orderInfo.cartItems.length > 1 && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                +{orderInfo.cartItems.length - 1}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-2">
                        {/* Status Badge */}
                        <div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                <FontAwesomeIcon icon={status.icon} className="text-[10px]" />
                                {status.label}
                            </span>
                        </div>

                        {/* Order ID */}
                        <h3 className="text-gray-900 font-bold text-lg"># {orderInfo._id.substring(0, 8)}...</h3>

                        {/* Meta Icons */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={orderInfo.paymentMethodType === "card" ? faCreditCard : faMoneyBill} className={
                                    orderInfo.paymentMethodType === "card" ? "text-green-600" : "text-blue-600"
                                } />
                                <span>{new Date(orderInfo.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400" />
                                <span>{orderInfo.cartItems.length} Items</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                <span>{orderInfo.shippingAddress?.city}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Price, Payment, Actions */}
                <div className="flex items-center gap-12 self-start lg:self-center ml-auto lg:ml-0">
                    <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold text-gray-900">
                            {orderInfo.totalOrderPrice.toLocaleString()} <span className="text-sm font-medium text-gray-500">EGP</span>
                        </span>
                        <div className="text-sm text-gray-500 mt-1">Total Order Price</div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <FontAwesomeIcon icon={faCreditCard} />
                    </div>

                    {/* Expand Button */}
                    <button
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                        }}
                        className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>

            {/* ─── Expanded Section ─── */}
            {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Delivery Address */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                                <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                                Delivery Address
                            </h4>
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{orderInfo.shippingAddress?.city}</p>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{orderInfo.shippingAddress?.details}</p>
                                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                                            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                            {orderInfo.shippingAddress?.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                                Order Summary
                            </h4>
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">{orderInfo.totalOrderPrice.toLocaleString()} EGP</span>
                                </div>
                                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">{orderInfo.shippingPrice.toLocaleString()} EGP</span>
                                </div>
                                <div className="h-px bg-blue-200 my-3"></div>
                                <div className="flex justify-between items-center text-base font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>{orderInfo.totalOrderPrice.toLocaleString()} EGP</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

