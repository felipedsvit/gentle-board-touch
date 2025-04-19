
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-violet-50 to-indigo-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Optimice sus cotizaciones para licitaciones públicas
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Plataforma integral para PYMES que automatiza la gestión de licitaciones con IA, 
              ahorrando tiempo y maximizando oportunidades de negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-indigo-600 text-indigo-600"
                onClick={() => navigate("/register")}
              >
                Crear cuenta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Funcionalidades principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Análisis de documentos con IA" 
              description="Lectura y análisis automático de PDF, DOC y Excel para generar informes de riesgos y sugerencias de proveedores."
              icon="📄"
            />
            <FeatureCard 
              title="Gestión Kanban" 
              description="Sistema visual para actualizar cotizaciones y gestionar cuentas conjuntas de forma eficiente."
              icon="📋"
            />
            <FeatureCard 
              title="Exportación automatizada" 
              description="Creación de hojas de cálculo XLSX optimizadas para presentación en licitaciones."
              icon="📊"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Cómo funciona
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-semibold mb-2">1. Cargue sus documentos</h3>
                <p className="text-gray-600">
                  Simplemente cargue archivos ZIP, PDF, DOC o Excel con información de licitaciones.
                </p>
              </div>
              <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md h-48 flex items-center justify-center">
                <div className="text-4xl">📁</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
                <h3 className="text-xl font-semibold mb-2">2. Análisis automatizado</h3>
                <p className="text-gray-600">
                  Nuestra IA analiza los documentos, detecta riesgos y sugiere los mejores proveedores para cada ítem.
                </p>
              </div>
              <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md h-48 flex items-center justify-center">
                <div className="text-4xl">🤖</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-semibold mb-2">3. Gestione con Kanban</h3>
                <p className="text-gray-600">
                  Organice sus cotizaciones con un sistema visual intuitivo y colabore con su equipo en tiempo real.
                </p>
              </div>
              <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md h-48 flex items-center justify-center">
                <div className="text-4xl">📊</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/register")}
            >
              Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">CotiManager</h3>
              <p className="text-gray-400">
                Optimizando el proceso de cotizaciones para PYMES en licitaciones públicas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Inicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Características</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Precios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contacto</h4>
              <p className="text-gray-400">
                info@cotimanager.com<br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CotiManager. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
