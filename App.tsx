import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import type { Schedule, HistoryEntry, PetProfile, View, Substance, AIWaterPlanEntry } from './types';
import * as api from './services/deviceService';
import { generateWaterPlan } from './services/geminiService';

// Import Views
import DashboardView from './views/DashboardView';
import SchedulesView from './views/SchedulesView';
import PetProfilesView from './views/PetProfilesView';
import ManualDispenseView from './views/ManualDispenseView';
import ConsumptionView from './views/ConsumptionView';
import LoginView from './views/LoginView';
import CameraView from './views/CameraView';
import AIPlannerView from './views/AIPlannerView';
import { Header } from './components/Header';

// Declare Swal to satisfy TypeScript since it's loaded from a CDN
declare const Swal: any;

const App: React.FC = () => {
  // State Management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [theme, setTheme] = useState(localStorage.getItem('petflow-theme') || 'light');
  
  // Device Status
  const [waterLevel, setWaterLevel] = useState(0); 
  const [boxStatus, setBoxStatus] = useState('Cargando...');
  
  // Data Lists (Now initialized empty, fetched from API/Mock Service)
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([]);
  
  const [isDispensing, setIsDispensing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [aiWaterPlan, setAiWaterPlan] = useState<AIWaterPlanEntry[] | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  
  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('petflow-theme', theme);
  }, [theme]);

  // Initial Data Fetch (When authenticated)
  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
        const [fetchedSchedules, fetchedPets, fetchedHistory] = await Promise.all([
            api.getSchedules(),
            api.getPets(),
            api.getHistory()
        ]);
        setSchedules(fetchedSchedules);
        setPetProfiles(fetchedPets);
        setHistory(fetchedHistory);
    } catch (error) {
        console.error("Error loading initial data:", error);
        showToast('Error cargando datos', false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Poll Device Status
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStatus = async () => {
        try {
            const status = await api.getDeviceStatus();
            setWaterLevel(status.waterLevel);
            setBoxStatus(status.boxStatus);
        } catch (error) {
            console.error("Error fetching device status:", error);
            setBoxStatus('Error');
        }
    };

    fetchStatus(); 
    const intervalId = setInterval(fetchStatus, 5000); 

    return () => clearInterval(intervalId); 
  }, [isAuthenticated]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Functions
  const handleLogin = async () => {
      // In a real app, you would handle the login form data here
      try {
        await api.login('user@petflow.com', 'password');
        setIsAuthenticated(true);
      } catch (e) {
         showToast("Error al iniciar sesión", false);
      }
  };
  
  const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('petflow_token');
  };

  const showToast = (message: string, success: boolean = false) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: success ? 'success' : 'info',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };
  
  const handleDispenseWater = useCallback(async (amount: number, pet: string) => {
    if (waterLevel > 0 && !isDispensing) {
        setIsDispensing(true);
        showToast(`Dispensando agua para ${pet}...`);
        
        try {
            const result = await api.dispenseWater(amount, pet);
            // Optimistic update or use result
            setWaterLevel(result.waterLevel); 
            
            // Refresh history
            const updatedHistory = await api.getHistory();
            setHistory(updatedHistory);

            showToast(`¡Se dispensaron ${amount}ml de agua para ${pet}!`, true);
        } catch (error) {
            showToast('Error al dispensar agua', false);
        } finally {
            setIsDispensing(false);
        }
    }
  }, [waterLevel, isDispensing]);

  const toggleSchedule = useCallback(async (id: number) => {
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) return;
    
    const updatedSchedule = { ...schedule, enabled: !schedule.enabled };
    try {
        // Optimistic update for UI responsiveness
        setSchedules(prev => prev.map(s => s.id === id ? updatedSchedule : s));
        
        await api.updateSchedule(updatedSchedule);
        showToast(updatedSchedule.enabled ? 'Horario activado' : 'Horario desactivado', true);
    } catch (error) {
        // Revert on error
        setSchedules(prev => prev.map(s => s.id === id ? schedule : s));
        showToast('Error al actualizar horario', false);
    }
  }, [schedules]);

  const handleAddPet = async (petData: Omit<PetProfile, 'id'>) => {
    try {
        const newPet = await api.createPet(petData);
        setPetProfiles(prev => [...prev, newPet]);
        showToast('¡Nueva mascota añadida!', true);
    } catch (error) {
        showToast('Error al crear mascota', false);
    }
  };

  const handleUpdatePet = async (updatedPet: PetProfile) => {
    try {
        const savedPet = await api.updatePet(updatedPet);
        setPetProfiles(prev => prev.map(p => p.id === savedPet.id ? savedPet : p));
        showToast('¡Perfil de mascota actualizado!', true);
    } catch (error) {
        showToast('Error al actualizar mascota', false);
    }
  };
  
  const handleDeletePet = async (petId: number) => {
    try {
        await api.deletePet(petId);
        setPetProfiles(prev => prev.filter(p => p.id !== petId));
        showToast('Mascota eliminada.', true);
    } catch (error) {
        showToast('Error al eliminar mascota', false);
    }
  };

  const handleAddSchedule = async (scheduleData: Omit<Schedule, 'id' | 'enabled' | 'substance'>) => {
    try {
        const newSchedule = await api.createSchedule(scheduleData);
        setSchedules(prev => [...prev, newSchedule].sort((a,b) => a.time.localeCompare(b.time)));
        showToast('¡Nuevo horario añadido!', true);
    } catch (error) {
        showToast('Error al crear horario', false);
    }
  };

  const handleUpdateSchedule = async (updatedSchedule: Schedule) => {
    try {
        const savedSchedule = await api.updateSchedule(updatedSchedule);
        setSchedules(prev => 
          prev
            .map(s => (s.id === savedSchedule.id ? savedSchedule : s))
            .sort((a,b) => a.time.localeCompare(b.time))
        );
        showToast('¡Horario actualizado!', true);
    } catch (error) {
        showToast('Error al actualizar horario', false);
    }
  };
  
  const handleDeleteSchedule = async (scheduleId: number) => {
    try {
        await api.deleteSchedule(scheduleId);
        setSchedules(prev => prev.filter(s => s.id !== scheduleId));
        showToast('Horario eliminado.', true);
    } catch (error) {
        showToast('Error al eliminar horario', false);
    }
  };

  const handleGenerateWaterPlan = useCallback(async () => {
    setIsGeneratingPlan(true);
    setAiWaterPlan(null);
    try {
      const plan = await generateWaterPlan(petProfiles);
      setAiWaterPlan(plan);
    } catch (error) {
      console.error("Error generating water plan:", error);
      Swal.fire({
        title: 'Error de IA',
        text: 'No se pudo generar el plan de hidratación. Por favor, inténtalo de nuevo.',
        icon: 'error',
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  }, [petProfiles]);
  
  const handleApplyWaterPlan = useCallback(async (plan: AIWaterPlanEntry[]) => {
    // This is a complex operation: Delete all old schedules and create new ones
    // For simplicity in this demo, we'll just add them locally or call API sequentially
    // In a real real app, you'd want a bulk update endpoint.
    
    try {
        // Optional: Clear existing schedules first if desired
        // for (const s of schedules) await api.deleteSchedule(s.id);

        const newSchedules: Schedule[] = [];
        for (const p of plan) {
             // Sequential creation for demo purposes to match API
             const created = await api.createSchedule({
                 time: p.time,
                 amount: p.amount,
                 pet: 'Todos' // Default for AI plan for now
             });
             newSchedules.push(created);
        }
        
        // Refresh all schedules
        const allSchedules = await api.getSchedules();
        setSchedules(allSchedules);
        
        showToast('¡Plan de hidratación aplicado!', true);
        setActiveView('schedules');
    } catch (error) {
        showToast('Error aplicando el plan', false);
    }
  }, [schedules]);

  const changeView = (view: View) => {
    setActiveView(view);
    setIsSidebarOpen(false); 
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView 
                  waterLevel={waterLevel}
                  boxStatus={boxStatus}
                  onDispenseWater={(amount) => handleDispenseWater(amount, 'Todos')}
                  isDispensing={isDispensing}
                  schedules={schedules}
                  onToggleSchedule={toggleSchedule}
                  history={history}
                />;
      case 'schedules':
        return <SchedulesView 
                  schedules={schedules} 
                  onToggle={toggleSchedule} 
                  onAddSchedule={handleAddSchedule}
                  onUpdateSchedule={handleUpdateSchedule}
                  onDeleteSchedule={handleDeleteSchedule}
               />;
      case 'pet-profiles':
        return <PetProfilesView 
                  profiles={petProfiles} 
                  onAddPet={handleAddPet}
                  onUpdatePet={handleUpdatePet}
                  onDeletePet={handleDeletePet}
               />;
      case 'manual-dispense':
        return <ManualDispenseView 
                onDispenseWater={handleDispenseWater} 
                isDispensing={isDispensing}
                />;
      case 'consumption':
          return <ConsumptionView />;
      case 'camera':
        return <CameraView />;
      case 'ai-planner':
        return <AIPlannerView
                  profiles={petProfiles}
                  onGeneratePlan={handleGenerateWaterPlan}
                  isGenerating={isGeneratingPlan}
                  plan={aiWaterPlan}
                  onApplyPlan={handleApplyWaterPlan}
               />;
      default:
        return <DashboardView 
                  waterLevel={waterLevel}
                  boxStatus={boxStatus}
                  onDispenseWater={(amount) => handleDispenseWater(amount, 'Todos')}
                  isDispensing={isDispensing}
                  schedules={schedules}
                  onToggleSchedule={toggleSchedule}
                  history={history}
                />;
    }
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
       <Sidebar 
        activeView={activeView} 
        setActiveView={changeView} 
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`main-content-wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Header 
            activeView={activeView}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="main-content p-3 p-md-4">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
