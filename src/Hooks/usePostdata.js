import { useState } from "react";

export const usePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (path, body) => {
    console.log(path,body)
    setIsLoading(true);

    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await response;
    console.log(json)

    if (!response.ok) {
      setError(json.error);
      console.log(json.error)
    }
    if (response.ok) {
      setResponse(json);
    }
  };

  return { postData, response, isLoading, error };
};