import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home.tsx';
import PageNotFound from '../pages/PageNotFound.tsx';

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default appRoutes;
