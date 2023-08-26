import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white',
        bg: '#FFF'
      },
    },
  },
});

export default theme;