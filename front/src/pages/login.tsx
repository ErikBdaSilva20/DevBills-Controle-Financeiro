import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  return (
    <body className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">DevBills</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gerencie suas financas de uma maneira simples
          </p>
        </header>
        <main>
          <section>
            <h2>realize seu login para continuar</h2>
            <p>Acesse sua conta e comece a gerenciar suas finaças</p>
          </section>

          <GoogleLoginButton isLoading={false} onClick={() => {}} />
          <footer>
            <p>Ao continuar, você aceita nossos termos de uso e política de privacidade</p>
          </footer>
        </main>
      </div>
    </body>
  );
};

export default Login;
