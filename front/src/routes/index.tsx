import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from '../hooks/AuthContext';
import AppLayout from '../layout/App.Layout';
import Transactions from '../pages/AllTransactions';
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
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas privadas */}
          <Route element={<PrivateRoutes />}>
            {/* Layout com Header e Footer */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Route>

          {/* Página não encontrada */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
