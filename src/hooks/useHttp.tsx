import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type AxiosConfig = AxiosRequestConfig & {
  url: string;
  method: HttpMethod;
};

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async ({ url, method, ...rest }: AxiosConfig) => {
    setIsLoading(true);

    try {
      const response = await axios({
        method,
        url,
        ...rest,
      });

      return response;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
}

export default useHttp;
