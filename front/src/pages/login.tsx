import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoginErrorScreen from '../components/LoginErrorScreen';
import { useAuth } from '../hooks/AuthContext';

const Login = () => {
  const navigate = useNavigate();
 const { authState, signWithGoogle, initialized } = useAuth();

 const hadleLogin = async () => {
   try {
     await signWithGoogle();
   } catch (error) {
     console.error(error);
   } 
 };

 useEffect(() => {
   if (initialized && authState.user) {
     navigate('/dashboard');
   }
 }, [initialized, authState.user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">DevBills</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gerencie suas financas de uma maneira simples
          </p>
        </header>

        <main className="mt-8 bg-witge py-8 px-4 shadow-md rounded-lg sm:px-10 spacey-y-6">
          <section>
            <h2 className="text-lg font-medium text-gray-900">realize seu login para continuar</h2>
            <p className="mt-1 text-sm text-gray-600 mb-8">
              Acesse sua conta e comece a gerenciar suas finaças
            </p>
          </section>

          <GoogleLoginButton
            isLoading={false}
            onClick={() => {
              hadleLogin();

              {
                authState.error && <LoginErrorScreen />;
              }
            }}
          />
          <footer className="mt-6 text-center text-xs text-gray-500">
            <p className="mt-1 text-sm text-gray-600 text-center">
              Ao continuar, você aceita nossos termos de uso e política de privacidade
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
