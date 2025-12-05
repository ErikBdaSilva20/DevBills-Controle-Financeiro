import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from '../hooks/AuthContext';
import AppLayout from '../layout/App.Layout';
import DashBoard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/login';
import PageNotFound from '../pages/PageNotFound';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<AppLayout />} />

            <Route path="/dashboard" element={<DashBoard />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
