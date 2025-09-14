import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import type { Schedule, HistoryEntry, PetProfile, View } from './types';

// Import Views
import DashboardView from './views/DashboardView';
import SchedulesView from './views/SchedulesView';
import PetProfilesView from './views/PetProfilesView';
import ManualDispenseView from './views/ManualDispenseView';
import MealPlannerView from './views/MealPlannerView';
import ConsumptionView from './views/ConsumptionView';
import LoginView from './views/LoginView';

// Declare Swal to satisfy TypeScript since it's loaded from a CDN
declare const Swal: any;

const App: React.FC = () => {
  // State Management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [theme, setTheme] = useState(localStorage.getItem('petflow-theme') || 'light');
  const [foodLevel, setFoodLevel] = useState(73); // Percentage
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, time: '07:00', amount: 70, pet: 'Perro - 70KG', enabled: true },
    { id: 2, time: '19:00', amount: 70, pet: 'Perro - 70KG', enabled: true },
    { id: 3, time: '12:00', amount: 30, pet: 'Gato - 4KG', enabled: false },
  ]);
  const [history, setHistory] = useState<HistoryEntry[]>([
     { id: 1, time: new Date(), amount: 50, type: 'Manual' },
    { id: 2, time: new Date(Date.now() - 3 * 60 * 60 * 1000), amount: 70, type: 'Scheduled' },
    { id: 3, time: new Date(Date.now() - 15 * 60 * 60 * 1000), amount: 70, type: 'Scheduled' },
  ]);
   const [petProfiles, setPetProfiles] = useState<PetProfile[]>([
    { id: 1, name: 'Rex', type: 'Perro', weight: 3, breed: 'Chihuahua' },
    { id: 2, name: 'Faraon', type: 'Gato', weight: 4, breed: 'Sphynx' },
    { id: 3, name: 'Furer', type: 'Perro', weight: 24, breed: 'Pastor Alemán' },
  ]);
  const [isDispensing, setIsDispensing] = useState(false);
  
  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('petflow-theme', theme);
  }, [theme]);

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

  const addHistoryEntry = useCallback((amount: number, type: 'Manual' | 'Scheduled') => {
    setHistory(prev => [{ id: Date.now(), time: new Date(), amount, type }, ...prev].slice(0, 20));
  }, []);

  const handleDispense = useCallback((amount: number) => {
    if (foodLevel > 0 && !isDispensing) {
      setIsDispensing(true);
      showToast('Dispensando comida...');
      setTimeout(() => {
        const foodToDispense = Math.min(foodLevel, (amount / 100) * 5); // Dispense a small portion
        setFoodLevel(prev => Math.max(0, prev - foodToDispense));
        addHistoryEntry(amount, 'Manual');
        setIsDispensing(false);
        showToast(`¡Se dispensaron ${amount}g de comida!`, true);
      }, 1500);
    }
  }, [foodLevel, isDispensing, addHistoryEntry]);

  const toggleSchedule = useCallback((id: number) => {
    setSchedules(prev =>
      // Fix: Correctly toggles the 'enabled' property by using '!s.enabled' and removing the duplicate 'enabled' key.
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

  const handleAddSchedule = (scheduleData: Omit<Schedule, 'id' | 'enabled'>) => {
    const newSchedule: Schedule = {
      id: Date.now(),
      ...scheduleData,
      enabled: true, // New schedules are enabled by default
    };
    setSchedules(prev => [...prev, newSchedule].sort((a,b) => a.time.localeCompare(b.time)));
    showToast('¡Nuevo horario añadido!', true);
  };


  const getNextFeeding = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const upcoming = schedules
      .filter(s => s.enabled)
      .map(s => {
        const [hours, minutes] = s.time.split(':').map(Number);
        return { ...s, totalMinutes: hours * 60 + minutes };
      })
      .sort((a, b) => a.totalMinutes - b.totalMinutes);

    const nextToday = upcoming.find(s => s.totalMinutes > currentTime);
    return nextToday ? nextToday.time : upcoming[0]?.time || 'Ninguna';
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView 
                  foodLevel={foodLevel} 
                  lastFed={history[0]?.time}
                  nextFeeding={getNextFeeding()}
                  onDispense={handleDispense}
                  isDispensing={isDispensing}
                  schedules={schedules}
                  onToggleSchedule={toggleSchedule}
                  history={history}
                />;
      case 'schedules':
        return <SchedulesView schedules={schedules} onToggle={toggleSchedule} onAddSchedule={handleAddSchedule} />;
      case 'pet-profiles':
        return <PetProfilesView profiles={petProfiles} onAddPet={handleAddPet} />;
      case 'manual-dispense':
        return <ManualDispenseView showToast={showToast} />;
      case 'consumption':
          return <ConsumptionView />;
      case 'meal-planner':
        return <MealPlannerView />;
      default:
        return <DashboardView 
                  foodLevel={foodLevel} 
                  lastFed={history[0]?.time}
                  nextFeeding={getNextFeeding()}
                  onDispense={handleDispense}
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
    <div className="d-flex vh-100">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="main-content p-4">
        {renderView()}
      </main>
    </div>
  );
};

export default App;