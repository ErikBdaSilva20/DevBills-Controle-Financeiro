import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
