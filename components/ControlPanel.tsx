import React, { useState } from 'react';

interface ControlPanelProps {
  onDispense: (amount: number) => void;
  onDispenseWater: (amount: number) => void;
  isDispensing: boolean;
  disabled: boolean;
  waterDisabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onDispense, onDispenseWater, isDispensing, disabled, waterDisabled }) => {
  const [portion, setPortion] = useState(60);
  const waterPortion = 150; // Fixed water portion

  const handleDispenseClick = () => {
    if (!isDispensing && !disabled) {
      onDispense(portion);
    }
  };

  const handleDispenseWaterClick = () => {
    if (!isDispensing && !waterDisabled) {
        onDispenseWater(waterPortion);
    }
  };


  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
          {/* Food Controls */}
          <div className="w-100 flex-grow-1">
            <label htmlFor="portion-slider" className="form-label">
              Porción de Comida: <span className="fw-bold text-primary">{portion}g</span>
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
          <div className="d-flex gap-2 w-100 w-lg-auto">
            <button
              onClick={handleDispenseClick}
              disabled={isDispensing || disabled}
              className="btn btn-primary btn-lg flex-grow-1"
              style={{ minWidth: '180px' }}
            >
              {isDispensing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Dispensando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bowl-food me-2"></i>
                  Dispensar Comida
                </>
              )}
            </button>
            {/* Water Button */}
            <button
              onClick={handleDispenseWaterClick}
              disabled={isDispensing || waterDisabled}
              className="btn btn-info btn-lg flex-grow-1 text-white"
              style={{ minWidth: '180px' }}
            >
              {isDispensing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-tint me-2"></i>
                  Agua ({waterPortion}ml)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
