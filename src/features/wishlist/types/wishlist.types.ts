import { Product } from "../../products/types/products.types";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistActionResponse {
  status: string;
  message: string;
  data: string[]; // Array of product IDs
}
