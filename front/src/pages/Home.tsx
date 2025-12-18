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
    <div className="bg-gray-950 min-h-screen flex flex-col justify-center">
      {/* CONTAINER GLOBAL */}
      <div className="max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-12">
        {/* ================= HERO ================= */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1
                className="
                text-3xl sm:text-4xl md:text-5xl xl:text-6xl
                font-bold text-white mb-6
              "
              >
                Gerencie suas finanças com o <span className="text-primary-500">DevBills</span>
              </h1>

              <p
                className="
                text-base sm:text-lg md:text-xl
                text-gray-300 mb-8
                max-w-xl mx-auto md:mx-0
              "
              >
                Uma plataforma simples e eficiente pra controlar suas despesas e receitas. Organize
                suas finanças de forma prática e intuitiva.
              </p>

              <div className="flex justify-center md:justify-start">
                <Button onClick={() => flashAndNavigate(() => navigate('/login'))}>
                  Começar agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section
          className="
          py-16 md:py-20
          bg-gray-900 rounded-2xl
        "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Recursos da Plataforma
              </h2>
              <p
                className="
                text-base sm:text-lg
                text-gray-300
                max-w-2xl mx-auto
              "
              >
                Nesta plataforma, você terá tudo que precisa para manter suas finanças organizadas e
                em dia!
              </p>
            </div>

            <div
              className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6 lg:gap-8
            "
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="
                    bg-gray-800 p-6 rounded-xl
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                  "
                >
                  <div
                    className="
                    mb-4 bg-primary-500/10
                    rounded-full p-3 inline-flex
                  "
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.desccription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 md:py-28">
          <div
            className="
            bg-gray-900 p-8 sm:p-10 md:p-14
            rounded-2xl text-center
            border border-gray-800
            max-w-4xl mx-auto
          "
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
              Pronto para organizar todas suas finanças?
            </h2>

            <p
              className="
              text-base sm:text-lg
              text-gray-300
              max-w-2xl mx-auto mb-6
            "
            >
              Comece a usar esta plataforma e tenha um controle absoluto sobre seu dinheiro. É fácil
              de utilizar.
            </p>

            <Button onClick={() => flashAndNavigate(() => navigate('/login'))}>
              Criar Conta Agora
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
