
import { useState } from 'react';

export const useGetdata =()=> {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState([]);
  
  
    const getData = async (path) => {
      setIsLoading(true);
  
      const response = await fetch(path, {
        method: "GET",
      });
  
      const json = await response.json();
  
      console.log(json)
  
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setData(json);
      }
  
      setIsLoading(false)
    };
  
    return { getData, data, isLoading, error };
}
