const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-400 py-6 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Informações pessoais */}
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p className="text-sm">
            Desenvolvido por{' '}
            <span className="text-green-400 font-semibold">Erik Borges da Silva</span>
          </p>
        </div>

        {/* Tecnologias */}
        <div className="text-center sm:text-right">
          <p className="text-sm">
            Tecnologias usadas:
            <span className="text-green-400 font-medium"> React, TypeScript, TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
