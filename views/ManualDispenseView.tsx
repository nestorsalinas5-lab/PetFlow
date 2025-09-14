import React, { useState } from 'react';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';

interface ManualDispenseViewProps {
    showToast: (message: string) => void;
}

const ManualDispenseView: React.FC<ManualDispenseViewProps> = ({ showToast }) => {
    const [selectedPet, setSelectedPet] = useState<'Gato' | 'Perro'>('Gato');

    const handleOpenFood = () => {
        showToast(`Abriendo compuerta para ${selectedPet}...`);
    };

    const handleCloseFood = () => {
        showToast('Compuerta de comida cerrada.');
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="card text-center shadow-sm" style={{ maxWidth: '400px', width: '100%', border: 'none' }}>
                <div className="card-body p-5">
                    <div className="mb-4" style={{ height: '120px' }}>
                       <img 
                         src={selectedPet === 'Gato' ? catImage : dogImage}
                         alt={`Imagen de un ${selectedPet}`}
                         style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                       />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="pet-select" className="form-label text-muted">Seleccionar Mascota</label>
                        <select
                            id="pet-select"
                            value={selectedPet}
                            onChange={(e) => setSelectedPet(e.target.value as 'Gato' | 'Perro')}
                            className="form-select"
                        >
                            <option value="Gato">Gato</option>
                            <option value="Perro">Perro</option>
                        </select>
                    </div>

                    <div className="d-grid gap-2">
                        <button
                            onClick={handleOpenFood}
                            className="btn btn-dark"
                        >
                            <i className="fa-solid fa-door-open me-2"></i>
                            Abrir Comida
                        </button>
                        <button
                            onClick={handleCloseFood}
                            className="btn btn-secondary"
                        >
                            <i className="fa-solid fa-door-closed me-2"></i>
                            Cerrar Comida
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualDispenseView;