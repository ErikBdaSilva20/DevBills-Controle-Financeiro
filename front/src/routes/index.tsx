import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/login';
import PageNotFound from '../pages/PageNotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
