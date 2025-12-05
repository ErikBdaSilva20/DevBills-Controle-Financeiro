import { onAuthStateChanged, signInWithPopup, signOut as signOutFirebase } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [state, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

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
      },
      (error) => {
        setAuthState({
          user: null,
          error: error.message,
          loading: false,
        });
      }
    );
    return () => unsubscribe();
  }, []);

  const signWithGoogle = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error to sign in with Google';

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    } finally {
      /* Realizar um molde para depois uma logica para abrir uma nova tela que indique que o usuario foi logado e ficara ativa por pelo menos 3 segundos*/

      navigate('/');
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signOutFirebase(firebaseAuth);

      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState: state, signWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
