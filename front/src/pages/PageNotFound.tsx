import { useNavigate } from 'react-router';
import NotFoundGif from '../assets/404-not-found.gif';
import Button from '../components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-6xl text-white w-screen text-center ">
          Esta página está <span className="text-primary-500">indisponível</span>
        </p>

        <div className="mt-36 mb-36">
          <img className="w-140 rounded-2xl" src={NotFoundGif} alt="404 Not Found" />
        </div>

        <div className="text-center text-white mb-15">
          <h1 className="text-4xl   text-white font-light">Parece que você se perdeu 😥</h1>
          <h4 className="text-2xl text-cyan-200 mt-2">
            Mas calma querido Jubileu. Vem cá que o tio ajuda você a voltar a home...
          </h4>
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => navigate('/')}
            type="button"
            variant="outline"
            className="border-b-blue-500"
          >
            Te puxo pela mão, só clicar aqui... Vai, CLICA LOGO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
