import { Route, Routes } from 'react-router-dom';
import PageNotFound404 from './pages/404';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
