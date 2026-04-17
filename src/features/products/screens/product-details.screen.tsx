import React from "react";
import { getProductById } from "../server/product.actions";
import ProductInfo from "../componants/ProductDetails/ProductInfo";

export default async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const response = await getProductById({ id: productId });
  console.log(response);
  return (
    <>
      <ProductInfo product={response.data} />
    </>
  );
}
