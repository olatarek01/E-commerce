import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItem, CartRespose } from "../types/cart.types";

export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: cartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: function (state, action: PayloadAction<CartRespose>) {
      state.cartId = action.payload.cartId;
      state.numOfCartItems = action.payload.numOfCartItems;
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    },
    removeProduct: function (state, action: PayloadAction<{ id: string }>) {
      const productId = action.payload.id;
      const removedProduct = state.products.find((item) => item.product.id === productId);
      if (removedProduct) {
        state.products = state.products.filter((product) => product.product.id !== productId);
        state.numOfCartItems = state.products.length;
        state.totalCartPrice -= removedProduct.price * removedProduct.count;
      }

    },
    clearCart: function (state) {
      state.cartId = null;
      state.numOfCartItems = 0;
      state.products = [];
      state.totalCartPrice = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartInfo, removeProduct, clearCart } = cartSlice.actions