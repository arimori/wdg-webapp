import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';

import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider >
  );
}
export default MyApp
