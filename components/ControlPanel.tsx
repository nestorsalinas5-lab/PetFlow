import React, { useState } from 'react';

interface ControlPanelProps {
  onDispense: (amount: number) => void;
  onDispenseWater: (amount: number) => void;
  isDispensing: boolean;
  disabled: boolean;
  waterDisabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onDispense, onDispenseWater, isDispensing, disabled, waterDisabled }) => {
  const [foodPortion, setFoodPortion] = useState(60);
  const [waterPortion, setWaterPortion] = useState(150);

  const handleDispenseFoodClick = () => {
    if (!isDispensing && !disabled) {
      onDispense(foodPortion);
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
        <div className="row g-3 align-items-lg-end">
          {/* Sliders */}
          <div className="col-12 col-lg">
            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <label htmlFor="portion-slider" className="form-label mb-1">
                        Porción de Comida: <span className="fw-bold text-primary">{foodPortion}g</span>
                    </label>
                    <input
                        id="portion-slider"
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={foodPortion}
                        onChange={(e) => setFoodPortion(Number(e.target.value))}
                        disabled={isDispensing || disabled}
                        className="form-range"
                    />
                </div>
                <div className="col-12 col-md-6">
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
            </div>
          </div>
          {/* Buttons */}
          <div className="col-12 col-lg-auto">
            <div className="d-grid d-sm-flex gap-2">
                <button
                    onClick={handleDispenseFoodClick}
                    disabled={isDispensing || disabled}
                    className="btn btn-primary btn-lg flex-grow-1"
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
                <button
                    onClick={handleDispenseWaterClick}
                    disabled={isDispensing || waterDisabled}
                    className="btn btn-info btn-lg flex-grow-1 text-white"
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
