
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate login for now - will integrate with Supabase or other auth system later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would validate credentials and handle authentication
      localStorage.setItem("isAuthenticated", "true");
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema de gestión de cotizaciones",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error en el inicio de sesión",
        description: "Credenciales inválidas. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
          <CardDescription className="text-center">
            Ingrese sus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-indigo-600 px-0"
                  onClick={() => navigate("/forgot-password")}
                  type="button"
                >
                  ¿Olvidó su contraseña?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            ¿No tiene una cuenta?{" "}
            <Button
              variant="link"
              className="p-0 text-indigo-600"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
