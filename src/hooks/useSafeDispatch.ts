import { useRef, useLayoutEffect, useCallback } from 'react';

function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args) => mounted.current && dispatch(...args),
    [dispatch]
  );
}

export default useSafeDispatch;
