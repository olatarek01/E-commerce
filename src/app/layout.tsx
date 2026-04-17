import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";
import ProviderStore from "@/components/providers/ProviderStore";
import { verifyToken } from "@/features/auth/server/auth.actions";
import "@fortawesome/fontawesome-svg-core/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Exo } from "next/font/google";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import { CartState } from "@/features/cart/store/cart.slice";
import { getLoggedUserWishlist } from "@/features/wishlist/server/wishlist.actions";
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});
let defaultCartState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};
export const metadata = {
  title: "FreshCart",
  description: "Fresh Cart",
  icons: {
    icon: "/mini-logo.png",
  },
};
export default async function Layout({ children }: { children: ReactNode }) {
  let cartState = defaultCartState;
  const authValues = await verifyToken();

  let wishlistState = {
    wishlistIds: [] as string[],
    products: [] as any[],
    isLoading: false,
    error: null as string | null,
  };
  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();
      cartState = {
        numOfCartItems: cartResponse.numOfCartItems,
        cartId: cartResponse.cartId,
        products: cartResponse.data.products,
        totalCartPrice: cartResponse.data.totalCartPrice,
        isLoading: false,
        error: null,
      };
      try {
        const wishlistResponse = await getLoggedUserWishlist();
        wishlistState = {
          wishlistIds: wishlistResponse.data.map((item: any) => item.id),
          products: wishlistResponse.data,
          isLoading: false,
          error: null,
        };
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    } catch (error) {
      cartState = defaultCartState;
    }
  }
  const preloadedState = {
    auth: authValues ?? {
      isAuthenticated: false,
      userInfo: null,
    },
    cart: cartState,
    wishlist: wishlistState,
  };
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${exo.className} font-medium`}
    >
      <body>
        <ProviderStore preloadedState={preloadedState}>
          <Navbar />
          {children}
          <Footer />
        </ProviderStore>
      </body>
    </html>
  );
}
