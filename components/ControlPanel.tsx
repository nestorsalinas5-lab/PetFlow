import React, { useState } from 'react';

interface ControlPanelProps {
  onDispenseWater: (amount: number) => void;
  isDispensing: boolean;
  waterDisabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onDispenseWater, isDispensing, waterDisabled }) => {
  const [waterPortion, setWaterPortion] = useState(150);

  const handleDispenseWaterClick = () => {
    if (!isDispensing && !waterDisabled) {
        onDispenseWater(waterPortion);
    }
  };


  return (
    <div className="card">
      <div className="card-body">
        <div className="row g-3 align-items-lg-end">
          {/* Slider */}
          <div className="col-12 col-lg">
            <label htmlFor="water-portion-slider" className="form-label mb-1">
                Porción de Agua: <span className="fw-bold text-info">{waterPortion}ml</span>
            </label>
            <input
                id="water-portion-slider"
                type="range"
                min="50"
                max="300"
                step="10"
                value={waterPortion}
                onChange={(e) => setWaterPortion(Number(e.target.value))}
                disabled={isDispensing || waterDisabled}
                className="form-range"
            />
          </div>
          {/* Button */}
          <div className="col-12 col-lg-auto">
            <div className="d-grid">
                <button
                    onClick={handleDispenseWaterClick}
                    disabled={isDispensing || waterDisabled}
                    className="btn btn-info btn-lg text-white"
                >
                {isDispensing ? (
                    <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Dispensando...
                    </>
                ) : (
                    <>
                    <i className="fa-solid fa-tint me-2"></i>
                    Dispensar Agua
                    </>
                )}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};