import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../../styles';

const ThemeProvider: React.FC = ({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default ThemeProvider;
