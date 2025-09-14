import React, { useState, useCallback } from 'react';
import type { PetProfile, MealPlan } from '../types';
import { generateMealPlan } from '../services/geminiService';

export const MealPlanner: React.FC = () => {
  const [petProfile, setPetProfile] = useState<Partial<PetProfile>>({
    type: 'Perro',
    weight: 10,
    age: 3,
    activityLevel: 'Moderado',
  });
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetProfile(prev => ({
      ...prev,
      [name]: name === 'weight' || name === 'age' ? Number(value) : value,
    }));
  };

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMealPlan(null);
    try {
      const plan = await generateMealPlan(petProfile as PetProfile);
      setMealPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  }, [petProfile]);
  
  return (
    <div className="card h-100">
      <div className="card-header">
        <h2 className="h5 mb-0">
            <i className="fa-solid fa-wand-magic-sparkles me-2 text-secondary"></i>
            Planificador de Comidas con IA
        </h2>
        <p className="card-text text-muted small">
          Obtén un plan de alimentación personalizado para tu mascota.
        </p>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Tipo de Mascota</label>
            <select name="type" value={petProfile.type} onChange={handleInputChange} className="form-select">
              <option>Perro</option>
              <option>Gato</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Peso (kg)</label>
            <input type="number" name="weight" value={petProfile.weight} onChange={handleInputChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Edad (años)</label>
            <input type="number" name="age" value={petProfile.age} onChange={handleInputChange} className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Nivel de Actividad</label>
            <select name="activityLevel" value={petProfile.activityLevel} onChange={handleInputChange} className="form-select">
              <option>Bajo</option>
              <option>Moderado</option>
              <option>Alto</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleGeneratePlan} disabled={isLoading} className="btn btn-primary w-100">
            {isLoading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : <i className="fa-solid fa-wand-magic-sparkles me-2"></i>}
            <span>{isLoading ? 'Generando Plan...' : 'Generar Plan'}</span>
          </button>
        </div>

        <div className="mt-4 flex-grow-1">
          {error && <div className="alert alert-danger">{error}</div>}
          {mealPlan && (
            <div className="fade-in">
              <h3 className="h6">Plan de Comidas Generado</h3>
              <div className="card bg-light mb-3">
                  <div className="card-body">
                    <p><strong>Calorías Diarias:</strong> {mealPlan.dailyCalories.toFixed(0)} kcal</p>
                  </div>
              </div>
              <div>
                <h4 className="h6">Porciones de Comida:</h4>
                <ul className="list-group mb-3">
                  {mealPlan.mealPortions.map((meal, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                      <span>{meal.meal} ({meal.time})</span>
                      <span className="fw-bold">{meal.grams}g</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="h6">Consejos de Alimentación:</h4>
                <ul className="list-unstyled small text-muted">
                  {mealPlan.feedingTips.map((tip, index) => (
                    <li key={index}><i className="fa-solid fa-paw me-2"></i>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
