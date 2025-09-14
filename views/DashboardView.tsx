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
  lastFed?: Date;
  nextFeeding: string;
  onDispense: (amount: number) => void;
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
        <div className="container-fluid">
            <h1 className="h2 mb-4">Dashboard</h1>
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-lg-4">
                    <StatusCard
                        icon="fa-solid fa-bowl-food"
                        title="Nivel de Comida"
                        value={`${Math.round(props.foodLevel)}%`}
                        progress={props.foodLevel}
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                    <StatusCard
                        icon="fa-solid fa-clock"
                        title="Última Vez Alimentado"
                        value={formatLastFed(props.lastFed)}
                    />
                </div>
                <div className="col-12 col-sm-12 col-lg-4">
                     <StatusCard
                        icon="fa-solid fa-angles-right"
                        title="Próxima Comida"
                        value={props.nextFeeding}
                    />
                </div>
            </div>

            <div className="mt-4">
                <ControlPanel onDispense={props.onDispense} isDispensing={props.isDispensing} disabled={props.foodLevel === 0} />
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
