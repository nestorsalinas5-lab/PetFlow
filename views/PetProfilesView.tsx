import React, { useState } from 'react';
import type { PetProfile } from '../types';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';

// Declare Swal to satisfy TypeScript since it's loaded from a CDN
declare const Swal: any;

interface PetProfilesViewProps {
  profiles: PetProfile[];
  onAddPet: (pet: Omit<PetProfile, 'id'>) => void;
  onUpdatePet: (pet: PetProfile) => void;
  onDeletePet: (id: number) => void;
}

const PetProfilesView: React.FC<PetProfilesViewProps> = ({ profiles, onAddPet, onUpdatePet, onDeletePet }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);
  const initialFormState: Omit<PetProfile, 'id'> = {
    name: '',
    type: 'Perro',
    weight: 5,
    breed: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleShowModal = (pet: PetProfile | null = null) => {
    if (pet) {
      setEditingPet(pet);
      setFormData(pet);
    } else {
      setEditingPet(null);
      setFormData(initialFormState);
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPet(null);
    setFormData(initialFormState); // Reset form on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' ? Number(value) : value
    }));
  };

  const handleSavePet = () => {
    if (!formData.name.trim() || !formData.breed.trim() || formData.weight <= 0) {
      Swal.fire({
        title: 'Campos Incompletos',
        text: 'Por favor, completa todos los campos para guardar la mascota.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    if (editingPet) {
        onUpdatePet({ ...formData, id: editingPet.id });
    } else {
        onAddPet(formData);
    }
    handleCloseModal();
  };
  
  const handleDeleteClick = (pet: PetProfile) => {
    Swal.fire({
        title: `¿Eliminar a ${pet.name}?`,
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result: any) => {
        if (result.isConfirmed) {
            onDeletePet(pet.id);
        }
    });
  };


  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Perfiles de Mascotas</h1>
        <button className="btn btn-primary" onClick={() => handleShowModal()}>
          <i className="fa-solid fa-plus me-2"></i>
          Añadir Mascota
        </button>
      </div>
      <div className="list-group">
        {profiles.map(profile => (
          <div key={profile.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
              <div className="me-4" style={{ width: '48px', height: '48px' }}>
                <img 
                  src={profile.type === 'Gato' ? catImage : dogImage}
                  alt={`Imagen de un ${profile.type}`}
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 className="h5 mb-0">{profile.name}</h3>
                <p className="text-muted small mb-0">
                  {profile.type} - {profile.weight}KG | Raza: {profile.breed}
                </p>
              </div>
            </div>
            <div className="btn-group">
                <button className="btn btn-outline-secondary" onClick={() => handleShowModal(profile)}>
                  Editar
                </button>
                <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(profile)}>
                  Eliminar
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Pet Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} style={{ backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingPet ? 'Editar Mascota' : 'Añadir Nueva Mascota'}</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Ej: Rex"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Tipo</label>
                  <select className="form-select" id="type" name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">Peso (KG)</label>
                  <input type="number" className="form-control" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required min="0.1" step="0.1" />
                </div>
                <div className="mb-3">
                  <label htmlFor="breed" className="form-label">Raza</label>
                  <input type="text" className="form-control" id="breed" name="breed" value={formData.breed} onChange={handleInputChange} required placeholder="Ej: Pastor Alemán"/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleSavePet}>
                {editingPet ? 'Guardar Cambios' : 'Guardar Mascota'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default PetProfilesView;