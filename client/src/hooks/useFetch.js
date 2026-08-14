import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

/**
 * Generic data-fetching hook shared by every public page.
 * Keeps loading/error handling consistent without repeating boilerplate.
 */
export default function useFetch(endpoint, { deps = [], enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!enabled || !endpoint) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(endpoint);
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, enabled, ...deps]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
