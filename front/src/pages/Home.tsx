import { CreditCard, List, TrendingUp, Wallet } from 'lucide-react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';
import { flashAndNavigate } from '../utils/loginFlashBang';

interface Feature {
  icon: JSX.Element;
  title: string;
  desccription: string;
}

function Home() {
  const navigate = useNavigate();

  const features: ReadonlyArray<Feature> = [
    {
      icon: <Wallet className="w-8 h-8 text-primary-700" />,
      title: 'Controle Financeiro',
      desccription:
        'Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-700" />,
      title: 'Relatórios',
      desccription:
        'Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.',
    },
    {
      icon: <List className="w-8 h-8 text-primary-700" />,
      title: 'Categorias Personalizadas',
      desccription: 'Organize suas transações em categorias para melhor análise.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary-700" />,
      title: 'Transações Ilimitadas',
      desccription:
        'Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.',
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen py-8 flex flex-col justify-center">
      <div className="container-app">
        {/* First section */}
        <section className="py-12 md:-m-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Gerencie suas finanças com o <span className="text-primary-500">DevBills</span>
              </h1>
              <p className="text-lg text-white mb-8">
                Uma plataforma simples e eficiente pra controlar suas despesas e receitas. Organize
                suas finanças de forma prática e intuitiva.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() => {
                    flashAndNavigate(() => navigate('/login'));
                  }}
                >
                  Começar agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Second section */}
        <section className="py-12 md:py-20 bg-gray-900 rounded-lg md:mt-22">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Recursos da Plataforma</h2>
              <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                Nesta plataforma, você terá tudo que precisa para manter suas finanças organizadas e
                em dia!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl hover:shadow-lg">
                  <div className="mb-4 bg-primary-500/10 rounded-full p-3 inline-block">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>

                  <p className="text-gray-400">{feature.desccription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Third section */}
        <section className="py-12 md:py-20">
          <div className="bg-gray-900 p-8 rounded-xl text-center border border-gray-700">
            <Button
              onClick={() => {
                flashAndNavigate(() => navigate('/login'));
              }}
            >
              Criar Conta Agora
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
