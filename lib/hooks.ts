import { useEffect, useState } from 'react';
import { useAppStore } from './store';

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

export const useAppStoreHydrated = () => {
  const store = useAppStore();
  const isHydrated = useHydration();

  // Возвращаем store напрямую, но с флагом гидратации
  // Setter-функции будут работать даже до гидратации
  return {
    ...store,
    isHydrated,
  };
};
