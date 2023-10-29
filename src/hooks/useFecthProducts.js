import { useState, useEffect, useRef } from 'react';
import useApi from './useApi';

export default function useFetchProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter , setFilter] = useState('');

  const isFirstRender = useRef(true);
  
  const { listProducts } = useApi();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchData();
    }
  }, []);

  async function fetchData() {
    setLoading(true);
    
    try {
      const response = await listProducts(filter);
      setProducts(response.data);
    } catch (err) {
      setError(err);
    }
    
    setLoading(false);
  }
 

  return {
    loading,
    error,
    products,
    filter,
    setFilter,
    fetchData,
    setLoading
  };
}