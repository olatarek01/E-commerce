import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  wishlistIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlistIds: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistIds: (state, action: PayloadAction<string[]>) => {
      state.wishlistIds = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.wishlistIds.includes(action.payload)) {
        state.wishlistIds.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistIds = state.wishlistIds.filter(
        (id) => id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const {
  setWishlistIds,
  addToWishlist,
  removeFromWishlist,
  setLoading,
  setError,
} = wishlistSlice.actions;
