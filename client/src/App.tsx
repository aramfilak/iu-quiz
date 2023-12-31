import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components';
import { theme, toastOptions } from './ui/';
import { routes } from './utils/routes';

const { EmailVerification, Authentication, NotFound404, Dashboard } = routes;

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: toastOptions }}>
      <BrowserRouter>
        <Routes>
          {/*------------public-------------------*/}
          <Route element={Authentication.element}>
            {/*------------Authentication Sub Pages-------------------*/}
            {Object.values(routes.Authentication.children).map(
              ({ name, path, element }) => {
                return <Route key={name} path={path} element={element} />;
              }
            )}
          </Route>
          <Route path={EmailVerification.path} element={EmailVerification.element} />
          <Route path={NotFound404.path} element={NotFound404.element} />
          {/*------------protected-------------------*/}
          <Route element={<ProtectedRoutes />}>
            <Route element={Dashboard.element}>
              {/*------------Dashboard Sub Pages-------------------*/}
              {Object.values(routes.Dashboard.children).map(({ name, path, element }) => {
                return <Route key={name} path={path} element={element} />;
              })}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export { App };
