const LoginErrorScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Login Error</h1>
        <p className="text-lg">There was an error logging in. Please try again.</p>
      </div>
    </div>
  );
};

export default LoginErrorScreen;
