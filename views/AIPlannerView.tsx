import React from 'react';
import type { PetProfile, AIWaterPlanEntry } from '../types';
import catImage from '../assets/cat.png';
import dogImage from '../assets/dog.png';

interface AIPlannerViewProps {
  profiles: PetProfile[];
  onGeneratePlan: () => void;
  isGenerating: boolean;
  plan: AIWaterPlanEntry[] | null;
  onApplyPlan: (plan: AIWaterPlanEntry[]) => void;
}

const AIPlannerView: React.FC<AIPlannerViewProps> = ({ profiles, onGeneratePlan, isGenerating, plan, onApplyPlan }) => {
  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-body text-center">
            <i className="fa-solid fa-wand-magic-sparkles fa-3x text-primary mb-3"></i>
            <h1 className="h2 mb-2">Plan de Hidratación Inteligente</h1>
            <p className="text-muted">
                Usa la IA para generar un horario de dispensación de agua optimizado para tus mascotas basado en sus perfiles.
            </p>
            <button 
                className="btn btn-primary btn-lg" 
                onClick={onGeneratePlan}
                disabled={isGenerating}
            >
            {isGenerating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generando Plan...
              </>
            ) : (
              <>
                <i className="fa-solid fa-brain me-2"></i>
                Generar Plan de Hidratación
              </>
            )}
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
            <div className="card h-100">
                <div className="card-header">
                    <h2 className="h5 mb-0">
                        <i className="fa-solid fa-paw me-2 text-secondary"></i>
                        Perfiles de Mascotas
                    </h2>
                </div>
                <div className="card-body">
                    <p className="text-muted small">El plan se basará en estas mascotas:</p>
                    <ul className="list-group list-group-flush">
                        {profiles.map(profile => (
                            <li key={profile.id} className="list-group-item d-flex align-items-center">
                                <img 
                                    src={profile.type === 'Gato' ? catImage : dogImage}
                                    alt={profile.type}
                                    className="me-3"
                                    style={{ height: '32px', objectFit: 'contain' }}
                                />
                                <div>
                                    <p className="fw-semibold mb-0">{profile.name}</p>
                                    <p className="text-muted small mb-0">{profile.type} - {profile.weight}kg</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-12 col-lg-7">
            <div className="card h-100">
                <div className="card-header">
                     <h2 className="h5 mb-0">
                        <i className="fa-solid fa-receipt me-2 text-secondary"></i>
                        Plan Sugerido
                    </h2>
                </div>
                <div className="card-body">
                    {isGenerating && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted">La IA está pensando...</p>
                        </div>
                    )}
                    {!isGenerating && !plan && (
                        <div className="text-center text-muted py-5">
                            <i className="fa-solid fa-lightbulb fa-3x mb-3"></i>
                            <p>Tu plan de hidratación aparecerá aquí.</p>
                        </div>
                    )}
                     {!isGenerating && plan && (
                        <div>
                            <p className="alert alert-info">
                                <i className="fa-solid fa-circle-info me-2"></i>
                                La IA ha generado el siguiente plan. Puedes aplicarlo para reemplazar tus horarios actuales.
                            </p>
                             <table className="table">
                                <thead>
                                    <tr>
                                        <th>Hora</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plan.map((p, index) => (
                                        <tr key={index}>
                                            <td className="fw-bold fs-5">{p.time}</td>
                                            <td>{p.amount} ml</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-grid mt-4">
                                <button className="btn btn-success" onClick={() => onApplyPlan(plan)}>
                                    <i className="fa-solid fa-check me-2"></i>
                                    Aplicar Plan
                                </button>
                            </div>
                        </div>
                     )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlannerView;