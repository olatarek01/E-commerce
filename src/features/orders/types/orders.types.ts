// Shipping Address
export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;

}

// user in order
export interface OrderUser {
    _Id: string;
    name: string;
    email: string;
    phone: string;
}

// subcategory
export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

// category
export interface OrderCategory {
    _id: string;
    name: string;
    slug: string;
}

// order item
export interface OrderBrand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

// product in order
export interface OrderProduct {
    Subcategory: Subcategory[];
    retingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: OrderCategory;
    brand: OrderBrand;
    ratingsAverage: number;
    id: string;

}

// order
export interface OrderCardItem {
    count: number;
    _id: string;
    product: OrderProduct;
    price: number;
}


export type PaymentMethodData = "cash" | "card" | "wallet";

// order
export interface Order {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: PaymentMethodData;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: OrderUser;
    cartItems: OrderCardItem[];
    createdAt: string;
    updatedAt: string;
    id: string;
    __v: number;
    paidAt: string;
}


export type OrderResponse = Order[];


