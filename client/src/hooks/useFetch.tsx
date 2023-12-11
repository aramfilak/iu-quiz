import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);

    fetchFunction()
      .then((data) => setData(data))
      .catch(() => toast({ status: 'error', description: 'Datenabruf fehlgeschlagen' }))
      .finally(() => {
        setIsLoading(false);
      });
  }, [shouldFetch]);

  const refetchData = () => setShouldFetch(!shouldFetch);

  return { data, isLoading, refetchData };
}

export { useFetch };
