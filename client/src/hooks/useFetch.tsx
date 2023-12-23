import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  const refetchData = async () => {
    setIsLoading(true);

    try {
      const data = await fetchFunction();
      setData(data);
    } catch (error) {
      toast({ status: 'error', description: 'Datenabruf fehlgeschlagen' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  return { data, isLoading, refetchData };
}

export { useFetch };
