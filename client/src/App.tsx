import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound404 from './pages/404';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Authentication from './pages/authentication';

const theme = extendTheme({
  colors: {
    'light-peach': '#fff7f0',
    'dark-gray': '#3f3d56',
    'light-gray': '#7a746e',
    'deep-teal': '#319795'
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
