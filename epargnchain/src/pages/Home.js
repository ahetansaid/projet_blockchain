import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">EpargnChain</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Gérez votre épargne</span>
                  <span className="block text-blue-600">en toute sécurité</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  EpargnChain vous permet de gérer votre épargne de manière sécurisée grâce à la technologie blockchain. 
                  Suivez vos transactions, fixez des objectifs et atteignez vos buts financiers.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Commencer
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Une meilleure façon d'épargner
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icône */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Sécurité maximale</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Vos transactions sont sécurisées par la blockchain.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icône */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Suivi en temps réel</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Visualisez vos progrès d'épargne en temps réel.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  {/* Icône */}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Objectifs personnalisés</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Définissez et suivez vos objectifs d'épargne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 