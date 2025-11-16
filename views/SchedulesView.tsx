import React, { useState } from 'react';
import type { Schedule } from '../types';

// Declare Swal to satisfy TypeScript since it's loaded from a CDN
declare const Swal: any;

interface SchedulesViewProps {
  schedules: Schedule[];
  onToggle: (id: number) => void;
  onAddSchedule: (schedule: Omit<Schedule, 'id' | 'enabled' | 'substance'>) => void;
  onUpdateSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (id: number) => void;
}

const SchedulesView: React.FC<SchedulesViewProps> = ({ schedules, onToggle, onAddSchedule, onUpdateSchedule, onDeleteSchedule }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const initialFormState = {
    time: '08:00',
    amount: 150,
    pet: 'Todos'
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleShowModal = (schedule: Schedule | null = null) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData({
        time: schedule.time,
        amount: schedule.amount,
        pet: schedule.pet
      });
    } else {
      setEditingSchedule(null);
      setFormData(initialFormState);
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSchedule(null);
    setFormData(initialFormState); // Reset form on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSaveSchedule = () => {
    if (!formData.time || !formData.pet.trim() || formData.amount <= 0) {
      Swal.fire({
        title: 'Campos Incompletos',
        text: 'Por favor, completa todos los campos para añadir el horario.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    if (editingSchedule) {
        onUpdateSchedule({ ...editingSchedule, ...formData });
    } else {
        onAddSchedule(formData);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (schedule: Schedule) => {
    Swal.fire({
        title: `¿Eliminar horario de las ${schedule.time}?`,
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result: any) => {
        if (result.isConfirmed) {
            onDeleteSchedule(schedule.id);
        }
    });
  };


  return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Horarios de Dispensación</h1>
            <button className="btn btn-primary" onClick={() => handleShowModal()}>
              <i className="fa-solid fa-plus me-2"></i>
              Añadir Horario
            </button>
        </div>
        <div className="row g-4">
            {schedules.map(schedule => (
                <div key={schedule.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 d-flex flex-column">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className={`fw-bold fs-2 mb-0 ${schedule.enabled ? '' : 'text-muted'}`}>
                                        {schedule.time}
                                    </p>
                                    <p className={`mb-2 ${schedule.enabled ? 'text-body-secondary' : 'text-muted'}`}>
                                        <i className="fa-solid fa-tint me-2"></i>
                                        {schedule.amount}ml de agua
                                    </p>
                                    <p className={`small mb-0 ${schedule.enabled ? 'text-body-secondary' : 'text-muted'}`}>
                                        <i className="fa-solid fa-user me-2"></i>
                                        {schedule.pet}
                                    </p>
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
                        </div>
                        <div className="card-footer bg-transparent border-top-0 pt-0">
                             <div className="btn-group w-100">
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleShowModal(schedule)}>
                                    <i className="fa-solid fa-pencil me-1"></i> Editar
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(schedule)}>
                                    <i className="fa-solid fa-trash me-1"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Add/Edit Schedule Modal */}
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} style={{ backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}>
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">{editingSchedule ? 'Editar Horario' : 'Añadir Nuevo Horario'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Cantidad (ml)</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleInputChange} required min="1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pet" className="form-label">Para</label>
                        <input type="text" className="form-control" id="pet" name="pet" value={formData.pet} onChange={handleInputChange} required placeholder="Ej: Perro / Todos"/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveSchedule}>
                    {editingSchedule ? 'Guardar Cambios' : 'Guardar Horario'}
                </button>
                </div>
            </div>
            </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
  );
};

export default SchedulesView;