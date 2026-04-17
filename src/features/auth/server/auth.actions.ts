"use server";
import { cookies } from "next/headers";
import { AuthState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookiesStore = await cookies();
  cookiesStore.set("token", token);
  if (rememberMe) {
    cookiesStore.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
    });
  } else {
    cookiesStore.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
  }
}

export async function getToken(): Promise<string | null> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  return token || null;
}
export async function removeToken(): Promise<void> {
  const cookiesStore = await cookies();
  cookiesStore.delete("token");
}
export async function verifyToken(): Promise<AuthState> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || null;
  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    if (data.message === "verified") {
      const { name, email, role, id } = data.decoded;
      return {
        isAuthenticated: true,
        userInfo: {
          name,
          email,
          role,
          id,
        },
      };
    } else {
      return {
        isAuthenticated: false,
        userInfo: null,
      };
    }
  } catch {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}
