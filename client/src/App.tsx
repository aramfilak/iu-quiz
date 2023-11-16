import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { routes } from './utils/routes';
import { ProtectedRoutes } from './components';
import { Analytics } from '@vercel/analytics/react';
import { theme } from './theme';
const { EmailVerification, Authentication, NotFound404, Dashboard } = routes;

function App() {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'top', duration: 5000, isClosable: true } }}
    >
      <Analytics />
      <BrowserRouter>
        <Routes>
          {/*------------public-------------------*/}
          <Route path={Authentication.path} element={Authentication.element} />
          <Route path={EmailVerification.path} element={EmailVerification.element} />
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
