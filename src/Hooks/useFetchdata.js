import { useEffect, useState } from "react";

export const useFetchData = (key,url) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  });
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
          localStorage.setItem(key, JSON.stringify(result));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [url, data, key]);

  return { data, isLoading, error };
};