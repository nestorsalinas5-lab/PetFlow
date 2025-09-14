import React from 'react';
import type { View } from '../types';
import logoImage from '../assets/logo.png';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

const navItems: { view: View; label: string; icon: string }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-table-columns' },
  { view: 'schedules', label: 'Horarios', icon: 'fa-solid fa-calendar-days' },
  { view: 'pet-profiles', label: 'Perfiles', icon: 'fa-solid fa-paw' },
  { view: 'manual-dispense', label: 'Dispensar', icon: 'fa-solid fa-cube' },
  { view: 'consumption', label: 'Consumo', icon: 'fa-solid fa-chart-line' },
  { view: 'meal-planner', label: 'Planificador IA', icon: 'fa-solid fa-wand-magic-sparkles' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, theme, toggleTheme }) => {
  return (
    <aside className="sidebar d-flex flex-column shadow-sm">
      <div className="p-3 text-center mb-2">
        <img src={logoImage} alt="PetFlow Logo" className="w-auto" style={{ height: '120px' }} />
      </div>

      <nav className="nav nav-pills flex-column p-2 flex-grow-1">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`nav-link text-start d-flex align-items-center ${activeView === item.view ? 'active' : ''}`}
          >
            <i className={`${item.icon} me-3 fa-fw`} style={{width: '20px'}}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-3 border-top" style={{borderColor: 'var(--pf-border-color)'}}>
         <div className="d-flex align-items-center mb-3">
             <div className="rounded-circle d-flex align-items-center justify-content-center text-white me-2" style={{ width: '40px', height: '40px', backgroundColor: 'var(--pf-text-secondary)' }}>
                <i className="fa-solid fa-user"></i>
            </div>
            <div>
                <p className="fw-semibold mb-0">Hola, User</p>
            </div>
        </div>
        
        <div className="d-flex align-items-center justify-content-between">
            <button
                onClick={onLogout}
                className="btn btn-outline-secondary w-100 me-2"
                >
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Logout
            </button>
             <button onClick={toggleTheme} className="btn btn-outline-secondary" style={{minWidth: '42px'}}>
                <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
        </div>
      </div>
    </aside>
  );
};