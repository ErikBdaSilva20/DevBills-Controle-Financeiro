import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/AuthContext';
const PrivateRoutes = () => {
 const { authState, initialized } = useAuth();

 if (!initialized) return <div>Carregando...</div>;

 if (!authState.user) return <Navigate to="/login" replace />;

 return <Outlet />;

};

export default PrivateRoutes;
