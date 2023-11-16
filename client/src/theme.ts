import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
};

const theme = extendTheme({
  config,

  styles: {
    global: (props: Dict) => ({
      html: {
        fontSize: { base: '90%', md: '100%' }
      },
      body: {
        backgroundColor: mode('gray.100', 'gray.800')(props)
      }
    })
  }
});

export { theme };
