import React from 'react';
import type { View } from '../types';

interface HeaderProps {
    toggleSidebar: () => void;
    activeView: View;
}

const viewTitles: Record<View, string> = {
    'dashboard': 'Dashboard',
    'schedules': 'Horarios',
    'pet-profiles': 'Perfiles de Mascotas',
    'manual-dispense': 'Dispensación Manual',
    'consumption': 'Estadísticas de Consumo',
    'meal-planner': 'Planificador IA'
};

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, activeView }) => {
    return (
        <header className="header d-lg-none">
            <button className="btn" onClick={toggleSidebar} aria-label="Abrir menú">
                <i className="fa-solid fa-bars fs-4"></i>
            </button>
            <h1 className="h5 mb-0 fw-bold">{viewTitles[activeView]}</h1>
            <div style={{ width: '40px' }}></div> {/* Spacer */}
        </header>
    );
};
