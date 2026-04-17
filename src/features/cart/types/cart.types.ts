export interface CartSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CartCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartProductDetails {
  subcategory: CartSubcategory[];
  _id: string;
  title: string;
  brand: CartBrand;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  id: string;
  category: CartCategory;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: cartItem[];
  totalCartPrice: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CartProduct {
  _id: string;
  quantity: number;
  product: CartProductDetails;
}

export interface cartItem {
  _id: string;
  quantity: number;
  product: CartProductDetails;
  count: number;
  price: number;
  priceAfterDiscount: number;
}

export interface CartRespose {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
