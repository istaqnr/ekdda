import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import isNil from "lodash/fp/isNil";

// Cache for API base URL
let cachedApiBaseUrl: string | null = null;

const fetchApiBaseUrl = async (): Promise<string> => {
  if (cachedApiBaseUrl) {
    return cachedApiBaseUrl;
  }

  try {
    const response = await fetch("/api/env");
    if (response.ok) {
      const env = await response.json();
      const baseUrl = env.PUBLIC_API_BASE_URL || "";
      cachedApiBaseUrl = baseUrl;
      return baseUrl;
    }
  } catch (error) {
    console.error("Failed to fetch API base URL:", error);
  }

  return "";
};

const mainApi = axios.create({
  baseURL: "http://localhost:3000", // Will be set dynamically in interceptor
});

mainApi.interceptors.request.use(
  async (config) => {
    // Set baseURL dynamically if not explicitly set (undefined means use dynamic URL)
    // Empty string "" means use local Next.js routes, so don't override it
    if (config.baseURL === undefined) {
      config.baseURL = await fetchApiBaseUrl();
    }

    const { auth } = useAuthStore.getState();

    // Get the locale from the URL
    let locale;
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      locale =
        urlParams.get("locale") ||
        document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1] ||
        "en";
    } else {
      locale = "en";
    }

    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
      config.headers["Accept-Language"] = locale.toUpperCase();
    }

    return config;
  },
  (error) => {
    const { logout } = useAuthStore.getState();
    logout();
    return Promise.reject(error);
  }
);

export default mainApi;

export const getData = (responseData: any): any => {
  if (
    responseData &&
    typeof responseData === "object" &&
    !Array.isArray(responseData) &&
    Object.prototype.hasOwnProperty.call(responseData, "data")
  ) {
    return getData(responseData.data);
  }

  return !isNil(responseData) ? responseData : [];
};
