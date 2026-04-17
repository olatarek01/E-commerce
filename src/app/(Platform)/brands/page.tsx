import BrandsScreen from "@/features/brands/screens/brand.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands | FreshCart",
  description: "Browse our top brands and their products.",
};

export default function BrandsPage() {
  return <BrandsScreen />;
}
