"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  ProductResponse,
  SingleProductResponse,
} from "../types/products.types";

export async function getFeaturedProducts(): Promise<ProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      timeout: 60000, // 60 seconds timeout (safer for slow remote)
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error [getFeaturedProducts]:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    } else {
      console.error("API Error [getFeaturedProducts]:", error);
    }

    return {
      results: 0,
      metadata: {
        currentPage: 1,
        numberOfPages: 1,
        limit: 0,
      },
      data: [],
    };
  }
}

export async function getProductById({
  id,
}: {
  id: string;
}): Promise<SingleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      timeout: 60000, // 60 seconds timeout
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error [getProductById]:", {
        id,
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      });
    } else {
      console.error("API Error [getProductById]:", error);
    }

    return {
      data: {
        _id: "",
        title: "Unknown Product",
        slug: "",
        images: [],
        description: "",
        price: 0,
        priceAfterDiscount: 0,
        ratingsAverage: 0,
        ratingsQuantity: 0,
        quantity: 0,
        imageCover: "",
        sold: null,
        category: {
          _id: "",
          name: "",
          slug: "",
          image: "",
        },
        brand: {
          _id: "",
          name: "",
          slug: "",
          image: "",
        },
        createdAt: "",
        updatedAt: "",
        id: "",
        subcategory: [],
      },
    };
  }
}
export async function getProductsByCategory(
  categoryId: string,
): Promise<ProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      timeout: 60000,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error [getProductsByCategory] for ID "${categoryId}": ${error.message} (Status: ${error.response?.status})`,
        {
          data: error.response?.data,
          url: error.config?.url,
        },
      );
    } else {
      console.error(`API Error [getProductsByCategory] for ID "${categoryId}":`, error);
    }

    return {
      results: 0,
      metadata: {
        currentPage: 1,
        numberOfPages: 1,
        limit: 0,
      },
      data: [],
    };
  }
}

export async function getProductsByBrand(
  brandId: string,
): Promise<ProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      timeout: 30000,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error [getProductsByBrand] for ID "${brandId}": ${error.message} (Status: ${error.response?.status})`,
        {
          data: error.response?.data,
          url: error.config?.url,
        },
      );
    }
    throw error;
  }
}