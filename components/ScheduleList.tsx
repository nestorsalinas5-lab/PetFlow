import React from 'react';
import type { Schedule } from '../types';

interface ScheduleListProps {
  schedules: Schedule[];
  onToggle: (id: number) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ schedules, onToggle }) => {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h2 className="h5 mb-0">
          <i className="fa-regular fa-calendar-days me-2 text-secondary"></i>
          Próximos Horarios
        </h2>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {schedules.slice(0, 4).map(schedule => (
            <li key={schedule.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p className={`fw-bold fs-5 mb-0 ${schedule.enabled ? '' : 'text-muted'}`}>
                   <i className={`me-2 ${schedule.substance === 'Food' ? 'fa-solid fa-bowl-food' : 'fa-solid fa-tint'}`}></i>
                  {schedule.time}
                </p>
                <p className={`small mb-0 ${schedule.enabled ? 'text-body-secondary' : 'text-muted'}`}>
                  {schedule.amount}{schedule.substance === 'Food' ? 'g' : 'ml'} - {schedule.pet}
                </p>
              </div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id={`toggle-list-${schedule.id}`}
                  className="form-check-input"
                  role="switch"
                  checked={schedule.enabled}
                  onChange={() => onToggle(schedule.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
