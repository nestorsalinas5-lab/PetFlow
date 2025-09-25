import React from 'react';
import { StatusCard } from '../components/StatusCard';
import { ControlPanel } from '../components/ControlPanel';
import { ScheduleList } from '../components/ScheduleList';
import { HistoryList } from '../components/HistoryList';
import type { Schedule, HistoryEntry } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface DashboardViewProps {
  foodLevel: number;
  waterLevel: number;
  lastFed?: Date;
  nextFeeding: string;
  onDispense: (amount: number) => void;
  onDispenseWater: (amount: number) => void;
  isDispensing: boolean;
  schedules: Schedule[];
  onToggleSchedule: (id: number) => void;
  history: HistoryEntry[];
}

const DashboardView: React.FC<DashboardViewProps> = (props) => {
    const formatLastFed = (date?: Date) => {
        if (!date) return 'N/D';
        const options = { addSuffix: true, locale: es };
        return formatDistanceToNow(date, options);
    };

    return (
        <div className="container-fluid px-0 px-md-2">
            <h1 className="h2 mb-4 d-none d-lg-block">Dashboard</h1>
            
            <div className="row g-3 g-lg-4">
                <div className="col-6 col-lg-3">
                    <StatusCard
                        icon="fa-solid fa-bowl-food"
                        title="Nivel de Comida"
                        value={`${Math.round(props.foodLevel)}%`}
                        progress={props.foodLevel}
                    />
                </div>
                <div className="col-6 col-lg-3">
                    <StatusCard
                        icon="fa-solid fa-droplet"
                        title="Nivel de Agua"
                        value={`${Math.round(props.waterLevel)}%`}
                        progress={props.waterLevel}
                    />
                </div>
                <div className="col-6 col-lg-3">
                    <StatusCard
                        icon="fa-solid fa-clock"
                        title="Última Vez"
                        value={formatLastFed(props.lastFed)}
                    />
                </div>
                <div className="col-6 col-lg-3">
                     <StatusCard
                        icon="fa-solid fa-angles-right"
                        title="Próxima Comida"
                        value={props.nextFeeding}
                    />
                </div>
            </div>

            <div className="mt-4">
                <ControlPanel 
                    onDispense={props.onDispense} 
                    onDispenseWater={props.onDispenseWater}
                    isDispensing={props.isDispensing} 
                    disabled={props.foodLevel === 0} 
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
