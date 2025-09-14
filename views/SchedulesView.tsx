import React, { useState } from 'react';
import type { Schedule } from '../types';

// Declare Swal to satisfy TypeScript since it's loaded from a CDN
declare const Swal: any;

interface SchedulesViewProps {
  schedules: Schedule[];
  onToggle: (id: number) => void;
  onAddSchedule: (schedule: Omit<Schedule, 'id' | 'enabled'>) => void;
}

const SchedulesView: React.FC<SchedulesViewProps> = ({ schedules, onToggle, onAddSchedule }) => {
  const [showModal, setShowModal] = useState(false);
  const initialFormState = {
    time: '08:00',
    amount: 50,
    pet: 'Perro - 70KG'
  };
  const [newSchedule, setNewSchedule] = useState(initialFormState);

  const handleShowModal = () => setShowModal(true);
  
  const handleCloseModal = () => {
    setShowModal(false);
    setNewSchedule(initialFormState); // Reset form on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.time || !newSchedule.pet.trim() || newSchedule.amount <= 0) {
      Swal.fire({
        title: 'Campos Incompletos',
        text: 'Por favor, completa todos los campos para añadir el horario.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    onAddSchedule(newSchedule);
    handleCloseModal();
  };


  return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Horarios de Alimentación</h1>
            <button className="btn btn-primary" onClick={handleShowModal}>
              <i className="fa-solid fa-plus me-2"></i>
              Añadir Horario
            </button>
        </div>
        <div className="row g-4">
            {schedules.map(schedule => (
                <div key={schedule.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start w-100">
                                <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center fw-bold text-primary-emphasis" style={{width: '48px', height: '48px'}}>
                                    {schedule.pet.charAt(0)}
                                </div>
                                <div className="form-check form-switch">
                                     <input
                                        type="checkbox"
                                        id={`toggle-${schedule.id}`}
                                        className="form-check-input"
                                        role="switch"
                                        checked={schedule.enabled}
                                        onChange={() => onToggle(schedule.id)}
                                    />
                                </div>
                            </div>
                            <div className="mt-auto pt-3">
                                <p className={`fw-bold fs-2 mb-0 ${schedule.enabled ? '' : 'text-muted'}`}>
                                {schedule.time}
                                </p>
                                <p className={`small ${schedule.enabled ? 'text-body-secondary' : 'text-muted'}`}>
                                {schedule.pet}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Add Schedule Modal */}
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} style={{ backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Añadir Nuevo Horario</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time" name="time" value={newSchedule.time} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Cantidad (gramos)</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={newSchedule.amount} onChange={handleInputChange} required min="1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pet" className="form-label">Mascota</label>
                        <input type="text" className="form-control" id="pet" name="pet" value={newSchedule.pet} onChange={handleInputChange} required placeholder="Ej: Perro - 70KG"/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveSchedule}>Guardar Horario</button>
                </div>
            </div>
            </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
  );
};

export default SchedulesView;