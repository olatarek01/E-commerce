"use client";

import { getUserOrders } from "../server/orders.actions";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { OrderResponse } from "../types/orders.types";
import { OrdersHeader, OrderCard } from "../componants/mainOrdersBody";


export default function OrdersScreen() {
    const { userInfo } = useAppSelector((state) => state.auth)
    const [orders, setOrders] = useState<null | OrderResponse>(null);
    if (!userInfo) {
        return null;
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const ordersData = await getUserOrders({ id: String(userInfo?.id) });
            setOrders(ordersData);
        }
        fetchOrders();
    }, [])
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <main className="">
                    <OrdersHeader count={orders?.length || 0} />
                    <div className="space-y-4">
                        {orders?.map((order) => (
                            <OrderCard key={order.id} orderInfo={order} />
                        ))}
                    </div>
                    {orders?.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No orders found</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
