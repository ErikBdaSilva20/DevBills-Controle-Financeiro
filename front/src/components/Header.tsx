import { signOut as signOutFirebase } from 'firebase/auth';
import { LogOutIcon, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { firebaseAuth } from '../config/firebase';

const Header = () => {
  const handleSignOut = async () => {
    try {
      await signOutFirebase(firebaseAuth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState(firebaseAuth.currentUser);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();
  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Esquerda: Icon + Título */}
        <div className="flex items-center gap-2">
          <Zap size={28} className="text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">DevBills</h1>
        </div>

        {/* Centro: Navegação */}
        <nav className="flex gap-4">
          <button
            className="px-5 py-3 rounded-md hover:bg-gray-800 transition-colors bg-green-900/35 text-green-500 font-bold hover:cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="px-5 py-3 rounded-md hover:bg-gray-800 transition-colors bg-green-900/35 text-green-500 font-bold hover:cursor-pointer"
            onClick={() => navigate('/transactions')}
          >
            Transações
          </button>
        </nav>

        {/* Direita: Avatar + Logout */}
        <div className="flex items-center gap-4">
          {/* Avatar e nome */}
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || '/assets/user.jpg'}
              alt="Avatar"
              className="w-8 h-8 rounded-full bg-gray-700"
            />
            <p className="text-sm font-medium">{user?.displayName || 'Usuário'}</p>
          </div>

          {/* Botão de logout */}
          <button
            className="p-2 rounded-md hover:bg-red-600 transition-colors hover:cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOutIcon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
