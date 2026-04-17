"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  CategoryResponse,
  SingleCategoryResponse,
} from "../types/category.types";

export async function getAllCategories(): Promise<CategoryResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/categories`,
      timeout: 60000,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error [getAllCategories]: ${error.message} (Status: ${error.response?.status})`,
        {
          data: error.response?.data,
          url: error.config?.url,
        },
      );
    } else {
      console.error("API Error [getAllCategories]:", error);
    }

    // If backend is down or returning 500, return empty payload so UI does not crash.
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

export async function getCategoryById(
  id: string,
): Promise<SingleCategoryResponse> {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Error [getCategoryById] for ID "${id}": ${error.message} (Status: ${error.response?.status})`,
        {
          data: error.response?.data,
          url: error.config?.url,
        },
      );
    }
    throw error;
  }
}
