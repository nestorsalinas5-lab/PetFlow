import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import type { Schedule, HistoryEntry, PetProfile, View, Substance, AIWaterPlanEntry } from './types';
import { getDeviceStatus } from './services/deviceService';
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
  const [waterLevel, setWaterLevel] = useState(0); // Percentage
  const [boxStatus, setBoxStatus] = useState('Cargando...');
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, time: '10:00', amount: 150, substance: 'Water', pet: 'Todos', enabled: true },
    { id: 2, time: '14:00', amount: 100, substance: 'Water', pet: 'Perro', enabled: true },
    { id: 3, time: '18:00', amount: 200, substance: 'Water', pet: 'Todos', enabled: false },
  ]);
  const [history, setHistory] = useState<HistoryEntry[]>([
     { id: 1, time: new Date(), amount: 150, substance: 'Water', type: 'Manual', pet: 'Perro' },
    { id: 2, time: new Date(Date.now() - 3 * 60 * 60 * 1000), amount: 100, substance: 'Water', type: 'Scheduled', pet: 'Todos' },
  ]);
   const [petProfiles, setPetProfiles] = useState<PetProfile[]>([
    { id: 1, name: 'Rex', type: 'Perro', weight: 3, breed: 'Chihuahua' },
    { id: 2, name: 'Faraon', type: 'Gato', weight: 4, breed: 'Sphynx' },
    { id: 3, name: 'Furer', type: 'Perro', weight: 24, breed: 'Pastor Alemán' },
     { id: 4, name: 'Pupi', type: 'Perro', weight: 5, breed: 'pastor aleman' },
  ]);
  const [isDispensing, setIsDispensing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [aiWaterPlan, setAiWaterPlan] = useState<AIWaterPlanEntry[] | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  
  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('petflow-theme', theme);
  }, [theme]);

  // Fetch device status periodically
  useEffect(() => {
    const fetchStatus = async () => {
        try {
            const status = await getDeviceStatus();
            setWaterLevel(status.waterLevel);
            setBoxStatus(status.boxStatus);
        } catch (error) {
            console.error("Error fetching device status:", error);
            setBoxStatus('Error');
        }
    };

    fetchStatus(); // Fetch immediately on mount
    const intervalId = setInterval(fetchStatus, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Functions
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

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

  const addHistoryEntry = useCallback((amount: number, type: 'Manual' | 'Scheduled', substance: Substance, pet: string) => {
    setHistory(prev => [{ id: Date.now(), time: new Date(), amount, type, substance, pet }, ...prev].slice(0, 20));
  }, []);
  
  const handleDispenseWater = useCallback((amount: number, pet: string) => {
    if (waterLevel > 0 && !isDispensing) {
        setIsDispensing(true);
        showToast(`Dispensando agua para ${pet}...`);
        setTimeout(() => {
            // This logic will be handled by the backend. The frontend will update based on the next status poll.
            // For now, we simulate a small decrease for immediate feedback.
            setWaterLevel(prev => Math.max(0, prev - 5));
            addHistoryEntry(amount, 'Manual', 'Water', pet);
            setIsDispensing(false);
            showToast(`¡Se dispensaron ${amount}ml de agua para ${pet}!`, true);
        }, 1500);
    }
  }, [waterLevel, isDispensing, addHistoryEntry]);

  const toggleSchedule = useCallback((id: number) => {
    setSchedules(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  }, []);

  const handleAddPet = (petData: Omit<PetProfile, 'id'>) => {
    const newPet: PetProfile = {
      id: Date.now(),
      ...petData,
    };
    setPetProfiles(prev => [...prev, newPet]);
    showToast('¡Nueva mascota añadida!', true);
  };

  const handleUpdatePet = (updatedPet: PetProfile) => {
    setPetProfiles(prev => prev.map(p => p.id === updatedPet.id ? updatedPet : p));
    showToast('¡Perfil de mascota actualizado!', true);
  };
  
  const handleDeletePet = (petId: number) => {
    setPetProfiles(prev => prev.filter(p => p.id !== petId));
    showToast('Mascota eliminada.', true);
  };

  const handleAddSchedule = (scheduleData: Omit<Schedule, 'id' | 'enabled' | 'substance'>) => {
    const newSchedule: Schedule = {
      id: Date.now(),
      ...scheduleData,
      substance: 'Water',
      enabled: true,
    };
    setSchedules(prev => [...prev, newSchedule].sort((a,b) => a.time.localeCompare(b.time)));
    showToast('¡Nuevo horario añadido!', true);
  };

  const handleUpdateSchedule = (updatedSchedule: Schedule) => {
    setSchedules(prev => 
      prev
        .map(s => (s.id === updatedSchedule.id ? updatedSchedule : s))
        .sort((a,b) => a.time.localeCompare(b.time))
    );
    showToast('¡Horario actualizado!', true);
  };
  
  const handleDeleteSchedule = (scheduleId: number) => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
    showToast('Horario eliminado.', true);
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
  
  const handleApplyWaterPlan = useCallback((plan: AIWaterPlanEntry[]) => {
    const newSchedules: Schedule[] = plan.map((p, index) => ({
      id: Date.now() + index,
      time: p.time,
      amount: p.amount,
      substance: 'Water',
      pet: 'Todos',
      enabled: true,
    }));
    setSchedules(newSchedules.sort((a,b) => a.time.localeCompare(b.time)));
    showToast('¡Plan de hidratación aplicado!', true);
    setActiveView('schedules');
  }, []);

  const changeView = (view: View) => {
    setActiveView(view);
    setIsSidebarOpen(false); // Close sidebar on view change
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