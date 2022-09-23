import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();

  return Object.fromEntries(useMemo(() => new URLSearchParams(search), [search]).entries());
}
