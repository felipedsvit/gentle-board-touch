
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Definir los tipos para las tarjetas y columnas
interface KanbanCard {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  company?: string;
  assignee?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

// Datos de ejemplo para el tablero Kanban
const initialColumns: KanbanColumn[] = [
  {
    id: "col-1",
    title: "Por Cotizar",
    cards: [
      {
        id: "card-1",
        title: "Licitación Municipalidad",
        description: "Cotización de equipos informáticos",
        dueDate: "2024-07-15",
        company: "Municipalidad de Santiago",
        assignee: "Juan Pérez",
      },
      {
        id: "card-2",
        title: "Ministerio de Salud",
        description: "Insumos médicos para hospitales regionales",
        dueDate: "2024-07-20",
        company: "Minsal",
        assignee: "María García",
      },
    ],
  },
  {
    id: "col-2",
    title: "En Proceso",
    cards: [
      {
        id: "card-3",
        title: "Equipos de laboratorio",
        description: "Cotización para universidad estatal",
        dueDate: "2024-07-10",
        company: "Universidad de Chile",
        assignee: "Carlos Rodríguez",
      },
    ],
  },
  {
    id: "col-3",
    title: "Revisión",
    cards: [
      {
        id: "card-4",
        title: "Mobiliario de oficina",
        description: "Licitación para nueva sede gubernamental",
        dueDate: "2024-07-05",
        company: "Ministerio de Hacienda",
        assignee: "Ana Martínez",
      },
    ],
  },
  {
    id: "col-4",
    title: "Completado",
    cards: [
      {
        id: "card-5",
        title: "Servicios de catering",
        description: "Evento anual del Ministerio de Educación",
        dueDate: "2024-06-30",
        company: "Mineduc",
        assignee: "Roberto Sánchez",
      },
    ],
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [openNewCard, setOpenNewCard] = useState(false);
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [newCard, setNewCard] = useState<Omit<KanbanCard, "id">>({
    title: "",
    description: "",
    dueDate: "",
    company: "",
    assignee: "",
  });
  
  const { toast } = useToast();

  // Función para manejar el arrastre de tarjetas (simulado por ahora)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cardId: string, sourceColumnId: string) => {
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    
    if (sourceColumnId === targetColumnId) return;
    
    // Encontrar la tarjeta en la columna de origen
    const sourceColumn = columns.find(col => col.id === sourceColumnId);
    const card = sourceColumn?.cards.find(c => c.id === cardId);
    
    if (!sourceColumn || !card) return;
    
    // Crear nuevo array de columnas con la tarjeta movida
    const newColumns = columns.map(col => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          cards: col.cards.filter(c => c.id !== cardId)
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          cards: [...col.cards, card]
        };
      }
      return col;
    });
    
    setColumns(newColumns);
    
    toast({
      title: "Tarjeta movida",
      description: `"${card.title}" movida a "${columns.find(col => col.id === targetColumnId)?.title}"`,
    });
  };

  // Función para crear una nueva tarjeta
  const handleCreateCard = () => {
    if (!newCard.title || !selectedColumn) return;
    
    const newCardWithId = {
      id: `card-${Date.now()}`,
      ...newCard
    };
    
    const updatedColumns = columns.map(col => {
      if (col.id === selectedColumn) {
        return {
          ...col,
          cards: [...col.cards, newCardWithId]
        };
      }
      return col;
    });
    
    setColumns(updatedColumns);
    setNewCard({
      title: "",
      description: "",
      dueDate: "",
      company: "",
      assignee: "",
    });
    setOpenNewCard(false);
    
    toast({
      title: "Tarjeta creada",
      description: `"${newCardWithId.title}" añadida a "${columns.find(col => col.id === selectedColumn)?.title}"`,
    });
  };

  // Función para actualizar una tarjeta
  const handleUpdateCard = () => {
    if (!editingCard) return;
    
    const updatedColumns = columns.map(col => {
      return {
        ...col,
        cards: col.cards.map(card => {
          if (card.id === editingCard.id) {
            return editingCard;
          }
          return card;
        })
      };
    });
    
    setColumns(updatedColumns);
    setEditingCard(null);
    
    toast({
      title: "Tarjeta actualizada",
      description: `"${editingCard.title}" ha sido actualizada`,
    });
  };

  // Función para eliminar una tarjeta
  const handleDeleteCard = (cardId: string, columnId: string) => {
    const updatedColumns = columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== cardId)
        };
      }
      return col;
    });
    
    setColumns(updatedColumns);
    
    toast({
      title: "Tarjeta eliminada",
      description: "La tarjeta ha sido eliminada correctamente",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tablero de Cotizaciones</h2>
        <Button onClick={() => setOpenNewCard(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nueva tarjeta
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {column.cards.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {column.cards.map(card => (
                <div 
                  key={card.id} 
                  className="bg-white p-3 rounded-md shadow-sm border border-gray-100 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">{card.title}</h4>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => setEditingCard(card)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteCard(card.id, column.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{card.description}</p>
                  
                  {card.company && (
                    <div className="mt-2 text-xs text-gray-500">
                      Cliente: {card.company}
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-between items-center">
                    {card.dueDate && (
                      <span className="text-xs text-gray-500">
                        Vence: {new Date(card.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    
                    {card.assignee && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                        {card.assignee}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Diálogo para crear nueva tarjeta */}
      <Dialog open={openNewCard} onOpenChange={setOpenNewCard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva tarjeta</DialogTitle>
            <DialogDescription>
              Complete la información para crear una nueva tarjeta de cotización.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="column">Columna</Label>
              <select 
                id="column"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                required
              >
                <option value="">Seleccionar columna</option>
                {columns.map(col => (
                  <option key={col.id} value={col.id}>{col.title}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title"
                value={newCard.title}
                onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description"
                value={newCard.description}
                onChange={(e) => setNewCard({...newCard, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Cliente/Empresa</Label>
                <Input 
                  id="company"
                  value={newCard.company}
                  onChange={(e) => setNewCard({...newCard, company: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Fecha de vencimiento</Label>
                <Input 
                  id="dueDate"
                  type="date"
                  value={newCard.dueDate}
                  onChange={(e) => setNewCard({...newCard, dueDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignee">Responsable</Label>
              <Input 
                id="assignee"
                value={newCard.assignee}
                onChange={(e) => setNewCard({...newCard, assignee: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewCard(false)}>Cancelar</Button>
            <Button onClick={handleCreateCard}>Crear tarjeta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para editar tarjeta */}
      <Dialog open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarjeta</DialogTitle>
            <DialogDescription>
              Actualice la información de la tarjeta.
            </DialogDescription>
          </DialogHeader>
          
          {editingCard && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input 
                  id="edit-title"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({...editingCard, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea 
                  id="edit-description"
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({...editingCard, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Cliente/Empresa</Label>
                  <Input 
                    id="edit-company"
                    value={editingCard.company || ""}
                    onChange={(e) => setEditingCard({...editingCard, company: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-dueDate">Fecha de vencimiento</Label>
                  <Input 
                    id="edit-dueDate"
                    type="date"
                    value={editingCard.dueDate || ""}
                    onChange={(e) => setEditingCard({...editingCard, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-assignee">Responsable</Label>
                <Input 
                  id="edit-assignee"
                  value={editingCard.assignee || ""}
                  onChange={(e) => setEditingCard({...editingCard, assignee: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCard(null)}>Cancelar</Button>
            <Button onClick={handleUpdateCard}>Actualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
