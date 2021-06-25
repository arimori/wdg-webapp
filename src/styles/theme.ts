import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#222",
      "800": "#333",
      "700": "#444",
      "600": "#555",
      "500": "#666",
      "400": "#858585",
      "300": "#E0E0E0",
      "250": "#F2F2F2",
      "200": "#F5F5F5",
      "100": "#FFF",
    },
    blue: {
      "100":"#2EA3F2"
    }
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.200',
        color: 'gray.600'
      }
    }
  }
});