import { onAuthStateChanged, signInWithPopup, signOut as signOutFirebase } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  const [state, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  // Um único useEffect para gerenciar a autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          setAuthState({
            user: {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            },
            error: null,
            loading: false,
          });
        } else {
          setAuthState({
            user: null,
            error: null,
            loading: false,
          });
        }
        setInitialized(true); // sinaliza que o Firebase já checou a sessão
      },
      (error) => {
        setAuthState({
          user: null,
          error: error.message,
          loading: false,
        });
        setInitialized(true);
      }
    );

    return () => unsubscribe();
  }, []);

  const signWithGoogle = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
      // o onAuthStateChanged vai atualizar o estado automaticamente
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao logar com Google';
      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signOutFirebase(firebaseAuth);
      setAuthState({ user: null, error: null, loading: false });
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState: state, signWithGoogle, signOut, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
};
