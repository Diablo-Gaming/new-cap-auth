import { useState, useEffect } from "react";
import axiosInstance from "../../lib/axios.instance"; // Update the import to use your axios instance

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(endpoint);

        const responseData = response.data?.data || response.data || [];
        setData(Array.isArray(responseData) ? responseData : []);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return [data, loading, error];
};

export default useFetch;
