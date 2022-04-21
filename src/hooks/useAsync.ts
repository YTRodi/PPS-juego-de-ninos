import { useReducer, useCallback, useRef } from 'react';
import useSafeDispatch from './useSafeDispatch';

interface AsyncState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data: any | null;
  error: any | null;
}

type AsyncAction =
  | { type: 'pending' }
  | { type: 'resolved'; data: AsyncState['data'] }
  | { type: 'rejected'; error: AsyncState['error'] };

function asyncReducer(state: AsyncState, action: AsyncAction): AsyncState {
  switch (action.type) {
    case 'pending':
      return { ...state, status: 'pending', data: null, error: null };

    case 'resolved':
      return { ...state, status: 'resolved', data: action.data, error: null };

    case 'rejected':
      return { ...state, status: 'rejected', data: null, error: action.error };

    default:
      return state;
  }
}

const defaultInitialState: AsyncState = {
  status: 'idle',
  data: null,
  error: null,
};

function useAsync(initialState?: any) {
  const initialStateRef = useRef<AsyncState>({
    ...defaultInitialState,
    ...initialState,
  });

  // ? Este unsafeDispatch va a hacer un re-render incluso si el componente no está montado.
  const [{ status, data, error }, unsafeDispatch] = useReducer(
    asyncReducer,
    initialStateRef.current
  );

  const dispatch = useSafeDispatch(unsafeDispatch);

  const setData = useCallback(
    data => dispatch({ type: 'resolved', data }),
    [dispatch]
  );

  const setError = useCallback(
    (error: AsyncState['error']) => dispatch({ type: 'rejected', error }),
    [dispatch]
  );

  const reset = useCallback(
    () => dispatch(initialStateRef.current),
    [dispatch]
  );

  // Never change
  const run = useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      dispatch({ type: 'pending' });

      promise.then(setData, setError);
    },
    [dispatch, setData, setError]
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    status,
    data,
    error,
    setData,
    setError,
    reset,
    run,
  };
}

export default useAsync;

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
