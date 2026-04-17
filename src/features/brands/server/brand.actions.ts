"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
    BrandResponse,
    SingleBrandResponse,
} from "../types/brand.types";

export async function getAllBrands(): Promise<BrandResponse> {
    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: `https://ecommerce.routemisr.com/api/v1/brands`,
            timeout: 60000,
        };
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                `API Error [getAllBrands]: ${error.message} (Status: ${error.response?.status})`,
                {
                    data: error.response?.data,
                    url: error.config?.url,
                },
            );
        } else {
            console.error("API Error [getAllBrands]:", error);
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

export async function getBrandById(
    id: string,
): Promise<SingleBrandResponse> {
    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
        };
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                `API Error [getBrandById] for ID "${id}": ${error.message} (Status: ${error.response?.status})`,
                {
                    data: error.response?.data,
                    url: error.config?.url,
                },
            );
        }
        throw error;
    }
}
