import React from 'react';
import type { HistoryEntry } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface HistoryListProps {
  history: HistoryEntry[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h2 className="h5 mb-0">
          <i className="fa-solid fa-clock-rotate-left me-2 text-secondary"></i>
          Historial de Alimentación
        </h2>
      </div>
      <div className="card-body">
        {history.length > 0 ? (
          <ul className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {history.map(entry => {
              const timeAgoOptions = { addSuffix: true, locale: es };
              const icon = entry.type === 'Scheduled' 
                ? 'fa-solid fa-calendar-check text-success' 
                : 'fa-solid fa-hand text-primary';
              
              return (
                <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i className={`${icon} fs-4 me-3`}></i>
                    <div>
                      <p className="fw-semibold mb-0">
                        Dispensación {entry.type === 'Scheduled' ? 'Programada' : 'Manual'}
                      </p>
                      <p className="text-muted small mb-0">
                        {formatDistanceToNow(entry.time, timeAgoOptions)}
                      </p>
                    </div>
                  </div>
                  <span className="badge bg-secondary rounded-pill">
                    {entry.amount}g
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted text-center py-5">Aún no hay historial de alimentación.</p>
        )}
      </div>
    </div>
  );
};
