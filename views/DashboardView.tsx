import React from 'react';
import { StatusCard } from '../components/StatusCard';
import { ControlPanel } from '../components/ControlPanel';
import { ScheduleList } from '../components/ScheduleList';
import { HistoryList } from '../components/HistoryList';
import type { Schedule, HistoryEntry } from '../types';

interface DashboardViewProps {
  waterLevel: number;
  boxStatus: string;
  onDispenseWater: (amount: number) => void;
  isDispensing: boolean;
  schedules: Schedule[];
  onToggleSchedule: (id: number) => void;
  history: HistoryEntry[];
}

const DashboardView: React.FC<DashboardViewProps> = (props) => {
    return (
        <div className="container-fluid px-0 px-md-2">
            <h1 className="h2 mb-4 d-none d-lg-block">Dashboard</h1>
            
            <div className="row g-3 g-lg-4">
                <div className="col-6 col-lg-6">
                    <StatusCard
                        icon="fa-solid fa-droplet"
                        title="Nivel de Agua (D0/L4)"
                        value={props.waterLevel === 0 && props.boxStatus === 'Cargando...' ? 'Cargando...' : `${Math.round(props.waterLevel)}%`}
                        progress={props.waterLevel}
                    />
                </div>
                 <div className="col-6 col-lg-6">
                    <StatusCard
                        icon="fa-solid fa-box"
                        title="Estado de Caja (D0/L3)"
                        value={props.boxStatus}
                    />
                </div>
            </div>

            <div className="mt-4">
                <ControlPanel 
                    onDispenseWater={props.onDispenseWater}
                    isDispensing={props.isDispensing} 
                    waterDisabled={props.waterLevel === 0}
                />
            </div>
            
            <div className="row g-4 mt-1">
                <div className="col-12 col-lg-6">
                    <ScheduleList schedules={props.schedules} onToggle={props.onToggleSchedule} />
                </div>
                <div className="col-12 col-lg-6">
                    <HistoryList history={props.history} />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
