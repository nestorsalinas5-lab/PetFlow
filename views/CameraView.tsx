import React from 'react';

const CameraView: React.FC = () => {
  return (
    <div className="container-fluid">
        <div className="card">
            <div className="card-header">
                <h2 className="h5 mb-0">
                    <i className="fa-solid fa-video me-2 text-secondary"></i>
                    Visualización de Cámara
                </h2>
            </div>
            <div className="card-body">
                <div 
                    className="d-flex align-items-center justify-content-center rounded" 
                    style={{ 
                        height: '400px', 
                        backgroundColor: 'var(--pf-border-color)' 
                    }}
                >
                    <div className="text-center text-muted">
                        <i className="fa-solid fa-video fa-4x mb-3"></i>
                        <p>La transmisión de la cámara aparecerá aquí.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CameraView;
