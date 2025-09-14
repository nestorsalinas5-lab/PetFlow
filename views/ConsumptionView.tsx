import React from 'react';

const ConsumptionView: React.FC = () => {
  return (
    <div className="container-fluid">
        <div className="card">
            <div className="card-header">
                <h2 className="h5 mb-0">
                    <i className="fa-solid fa-chart-line me-2 text-secondary"></i>
                    Estadísticas de Consumo
                </h2>
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '200px' }}>
                    <p className="text-muted">
                    Gráficos y estadísticas de consumo se mostrarán aquí próximamente.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ConsumptionView;
