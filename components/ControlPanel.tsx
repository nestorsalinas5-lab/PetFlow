import React, { useState } from 'react';

interface ControlPanelProps {
  onDispense: (amount: number) => void;
  isDispensing: boolean;
  disabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onDispense, isDispensing, disabled }) => {
  const [portion, setPortion] = useState(60);

  const handleDispenseClick = () => {
    if (!isDispensing && !disabled) {
      onDispense(portion);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="w-100 flex-grow-1">
            <label htmlFor="portion-slider" className="form-label">
              Tamaño de la Porción: <span className="fw-bold text-primary">{portion}g</span>
            </label>
            <input
              id="portion-slider"
              type="range"
              min="10"
              max="100"
              step="5"
              value={portion}
              onChange={(e) => setPortion(Number(e.target.value))}
              disabled={isDispensing || disabled}
              className="form-range"
            />
          </div>
          <button
            onClick={handleDispenseClick}
            disabled={isDispensing || disabled}
            className="btn btn-primary btn-lg w-100 w-md-auto"
          >
            {isDispensing ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Dispensando...
              </>
            ) : (
              <>
                <i className="fa-solid fa-arrow-down-to-line me-2"></i>
                Dispensar Ahora
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
