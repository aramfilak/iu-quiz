import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { routes } from './utils/routes';
import { ProtectedRoutes } from './components';

const { Authentication, NotFound404, Dashboard } = routes;

function App() {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top', duration: 5000, isClosable: true } }}
    >
      <BrowserRouter>
        <Routes>
          {/*------------public-------------------*/}
          <Route path={Authentication.path} element={Authentication.element} />
          <Route path={NotFound404.path} element={NotFound404.element} />

          {/*------------protected-------------------*/}
          <Route element={<ProtectedRoutes />}>
            <Route path={Dashboard.path} element={Dashboard.element} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export { App };
