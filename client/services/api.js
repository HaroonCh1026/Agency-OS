import { getToken, removeToken } from "@/utils/storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, options = {}) {
  try {
    const token = getToken();

    const isFormData = options.body instanceof FormData;

    const headers = {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    };
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    let data = null;

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (response.status === 401) {
      removeToken();
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("API request failed:", error);

    return {
      ok: false,
      status: 0,
      data: null,
      error: "NETWORK_ERROR",
    };
  }
}
