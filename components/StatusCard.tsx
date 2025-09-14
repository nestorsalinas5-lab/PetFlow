import React from 'react';

interface StatusCardProps {
  icon: string; // Expects Font Awesome class string e.g., "fa-solid fa-bowl-food"
  title: string;
  value: string;
  progress?: number;
}

export const StatusCard: React.FC<StatusCardProps> = ({ icon, title, value, progress }) => {
  const progressColor = progress !== undefined && progress < 20 ? 'bg-danger' : 'bg-success';
  
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <div className="fs-2 text-primary">
              <i className={icon} />
          </div>
          <div>
            <p className="text-muted mb-0">{title}</p>
            <p className="h5 fw-bold mb-0">{value}</p>
          </div>
        </div>
        {progress !== undefined && (
          <div className="progress mt-3" role="progressbar" aria-label="Food level" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ height: '8px' }}>
            <div
              className={`progress-bar ${progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
