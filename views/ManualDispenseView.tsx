import React, { useState } from 'react';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';

interface ManualDispenseViewProps {
    onDispense: (amount: number, pet: string) => void;
    onDispenseWater: (amount: number, pet: string) => void;
    isDispensing: boolean;
}

const ManualDispenseView: React.FC<ManualDispenseViewProps> = ({ onDispense, onDispenseWater, isDispensing }) => {
    const [foodPortion, setFoodPortion] = useState(60);
    const [waterPortion, setWaterPortion] = useState(150);
    const [selectedPet, setSelectedPet] = useState<'Todos' | 'Perro' | 'Gato'>('Todos');

    return (
        <div className="d-flex justify-content-center align-items-start align-items-md-center h-100">
            <div className="card shadow-sm w-100" style={{ maxWidth: '450px'}}>
                <div className="card-header text-center">
                    <h2 className="h4 mb-0">
                        <i className="fa-solid fa-hand-point-up me-2"></i>
                        Dispensación Manual
                    </h2>
                </div>
                <div className="card-body p-4">
                    <div className="mb-4">
                        <label htmlFor="pet-select-button" className="form-label">Dispensar Para</label>
                        <div className="dropdown">
                            <button
                                id="pet-select-button"
                                className="btn btn-outline-secondary dropdown-toggle w-100 d-flex align-items-center justify-content-between text-start"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                disabled={isDispensing}
                                style={{ 
                                    backgroundColor: 'var(--pf-bg-primary)', 
                                    borderColor: 'var(--pf-border-color)', 
                                    color: 'var(--pf-text-primary)' 
                                }}
                            >
                                <span className="d-flex align-items-center">
                                     {selectedPet === 'Perro' && (
                                        <img 
                                            src={dogImage} 
                                            alt="Perro" 
                                            style={{ height: '24px', marginRight: '10px', objectFit: 'contain' }}
                                        />
                                    )}
                                     {selectedPet === 'Gato' && (
                                        <img 
                                            src={catImage} 
                                            alt="Gato" 
                                            style={{ height: '24px', marginRight: '10px', objectFit: 'contain' }}
                                        />
                                    )}
                                    {selectedPet}
                                </span>
                            </button>
                            <ul className="dropdown-menu w-100">
                                <li>
                                    <button className="dropdown-item" onClick={() => setSelectedPet('Todos')}>
                                        Todos
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => setSelectedPet('Perro')}>
                                        <img 
                                            src={dogImage} 
                                            alt="Perro" 
                                            style={{ height: '24px', marginRight: '10px', objectFit: 'contain' }}
                                        />
                                        Perro
                                    </button>
                                </li>
                                 <li>
                                    <button className="dropdown-item d-flex align-items-center" onClick={() => setSelectedPet('Gato')}>
                                        <img 
                                            src={catImage} 
                                            alt="Gato" 
                                            style={{ height: '24px', marginRight: '10px', objectFit: 'contain' }}
                                        />
                                        Gato
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Food Dispenser */}
                    <div className="p-3 border rounded mb-4">
                        <label htmlFor="food-portion-slider" className="form-label">
                          Porción de Comida: <span className="fw-bold text-primary">{foodPortion}g</span>
                        </label>
                        <input
                          id="food-portion-slider"
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={foodPortion}
                          onChange={(e) => setFoodPortion(Number(e.target.value))}
                          disabled={isDispensing}
                          className="form-range mb-3"
                        />
                        <div className="d-grid">
                            <button
                                onClick={() => onDispense(foodPortion, selectedPet)}
                                disabled={isDispensing}
                                className="btn btn-primary"
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
                        </div>
                    </div>

                    {/* Water Dispenser */}
                    <div className="p-3 border rounded">
                        <label htmlFor="water-portion-slider" className="form-label">
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
                          disabled={isDispensing}
                          className="form-range mb-3"
                        />
                        <div className="d-grid">
                            <button
                                onClick={() => onDispenseWater(waterPortion, selectedPet)}
                                disabled={isDispensing}
                                className="btn btn-info text-white"
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

export default ManualDispenseView;
