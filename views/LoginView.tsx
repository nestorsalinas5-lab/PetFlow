import React from 'react';
import logoImage from '../assets/logo.png';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{backgroundColor: 'var(--pf-bg-primary)'}}>
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px', border: 'none' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <img 
              src={logoImage} 
              alt="PetFlow Logo" 
              className="w-auto" 
              style={{ height: '150px' }} 
            />
          </div>
          <h3 className="card-title text-center mb-1 fw-bold" style={{color: 'var(--pf-text-primary)'}}>Bienvenido de Nuevo</h3>
          <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>
          
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="user@petflow.com"
                defaultValue="user@petflow.com"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label small">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="••••••••"
                defaultValue="password"
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;