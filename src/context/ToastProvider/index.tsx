import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider as TProvider } from 'react-native-toast-notifications';

const ToastProvider: React.FC = ({ children }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <TProvider
      duration={3000}
      animationType='slide-in'
      offsetBottom={bottom}
      type='normal'
    >
      {children}
    </TProvider>
  );
};

export default ToastProvider;
