import React, {
  createContext,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { useAsync } from '../../hooks';
import * as auth from '../../auth';
import { FullPageErrorFallback, FullPageSpinner } from '../../components';

export interface AuthContextProps {
  user: auth.User | null;
  login: (form: auth.AuthProps) => Promise<any>;
  register: (form: auth.AuthProps) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);
AuthContext.displayName = 'AuthContext';

const AuthProvider: React.FC = props => {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  useEffect(() => {
    const appDataPromise = auth.getCurrentUser();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form: auth.AuthProps) =>
      auth.login(form).then(({ user }) => setData(user)),
    [setData]
  );

  const register = useCallback(
    (form: auth.AuthProps) =>
      auth.register(form).then(({ user }) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    setData(null);
    return auth.logout();
  }, [setData]);

  const value = useMemo<AuthContextProps>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
};

function useAuth() {
  const context = useContext(AuthContext);
  if (Object.keys(context).length === 0) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
