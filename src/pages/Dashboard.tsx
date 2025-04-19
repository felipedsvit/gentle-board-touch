
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Calendar, Folder, MessageSquare, Settings, User, List } from "lucide-react";
import KanbanBoard from "@/components/KanbanBoard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kanban");

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200">
            <div className="flex items-center px-4 py-2">
              <div className="font-semibold text-lg">CotiManager</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "kanban"} 
                    onClick={() => setActiveTab("kanban")}
                  >
                    <List className="h-4 w-4" />
                    <span>Kanban</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "documents"} 
                    onClick={() => setActiveTab("documents")}
                  >
                    <Folder className="h-4 w-4" />
                    <span>Documentos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "calendar"} 
                    onClick={() => setActiveTab("calendar")}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Calendario</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "chat"} 
                    onClick={() => setActiveTab("chat")}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Configuración</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "profile"} 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeTab === "settings"} 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Ajustes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <div className="text-sm text-gray-500">
                Usuario: admin@empresa.com
              </div>
              <button 
                className="mt-2 text-sm text-red-500 hover:text-red-600"
                onClick={() => {
                  localStorage.removeItem("isAuthenticated");
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <SidebarTrigger className="lg:hidden mr-2" />
              <h1 className="text-2xl font-semibold inline-block">
                {activeTab === "kanban" && "Gestión de Cotizaciones"}
                {activeTab === "documents" && "Documentos"}
                {activeTab === "calendar" && "Calendario"}
                {activeTab === "chat" && "Chat Interno"}
                {activeTab === "profile" && "Mi Perfil"}
                {activeTab === "settings" && "Configuración"}
              </h1>
            </div>
          </div>
          
          {activeTab === "kanban" && <KanbanBoard />}
          {activeTab === "documents" && <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200"><p className="text-gray-500">Módulo de documentos en desarrollo</p></div>}
          {activeTab === "calendar" && <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200"><p className="text-gray-500">Módulo de calendario en desarrollo</p></div>}
          {activeTab === "chat" && <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200"><p className="text-gray-500">Módulo de chat en desarrollo</p></div>}
          {activeTab === "profile" && <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200"><p className="text-gray-500">Módulo de perfil en desarrollo</p></div>}
          {activeTab === "settings" && <div className="h-96 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200"><p className="text-gray-500">Módulo de configuración en desarrollo</p></div>}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
