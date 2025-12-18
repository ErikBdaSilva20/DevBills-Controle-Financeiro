import { signOut as signOutFirebase } from 'firebase/auth';
import { LogOutIcon, Menu, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { firebaseAuth } from '../config/firebase';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFirebase(firebaseAuth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Zap size={26} className="text-green-400" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight">DevBills</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4">
            <button
              className="px-4 py-2 rounded-md bg-green-900/35 text-green-500 font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button
              className="px-4 py-2 rounded-md bg-green-900/35 text-green-500 font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => navigate('/transactions')}
            >
              Transações
            </button>
          </nav>

          {/* Right side (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL || '/assets/user.jpg'}
                alt="Avatar"
                className="w-8 h-8 rounded-full bg-gray-700"
              />
              <p className="text-sm font-medium whitespace-nowrap">
                {user?.displayName || 'Usuário'}
              </p>
            </div>

            <button
              className="p-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={handleSignOut}
            >
              <LogOutIcon size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-800 pt-4 space-y-4">
            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || '/assets/user.jpg'}
                alt="Avatar"
                className="w-9 h-9 rounded-full bg-gray-700"
              />
              <p className="text-sm font-medium">{user?.displayName || 'Usuário'}</p>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
              <button
                className="w-full text-left px-4 py-2 rounded-md bg-green-900/35 text-green-500 font-semibold hover:bg-gray-800 transition-colors"
                onClick={() => {
                  navigate('/dashboard');
                  setMenuOpen(false);
                }}
              >
                Dashboard
              </button>
              <button
                className="w-full text-left px-4 py-2 rounded-md bg-green-900/35 text-green-500 font-semibold hover:bg-gray-800 transition-colors"
                onClick={() => {
                  navigate('/transactions');
                  setMenuOpen(false);
                }}
              >
                Transações
              </button>
            </nav>

            {/* Logout */}
            <button
              className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors"
              onClick={handleSignOut}
            >
              <LogOutIcon size={18} />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
