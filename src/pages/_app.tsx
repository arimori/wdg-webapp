import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </AuthProvider >
  );
}
export default MyApp
