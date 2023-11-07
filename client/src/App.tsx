import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { routes } from './utils';

const theme = extendTheme({
  fonts: { body: `'Open Sans', sans-serif` }
});

const { Authentication, NotFound404, Dashboard } = routes;

function App() {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'top', duration: 5000, isClosable: true } }}
    >
      <BrowserRouter>
        <Routes>
          {/*------------public-------------------*/}
          <Route path={Authentication.path} element={Authentication.element} />
          <Route path={NotFound404.path} element={NotFound404.element} />

          {/*------------protected-------------------*/}
          <Route path={Dashboard.path} element={Dashboard.element} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
