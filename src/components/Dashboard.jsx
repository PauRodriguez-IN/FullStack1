import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>¡Bienvenido, {user?.nombre_usu || user?.nombre_completo || 'Usuario'}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Información del Usuario</h2>
          <div className="user-details">
            <div className="detail-item">
              <strong>Email:</strong> {user?.email}
            </div>
            <div className="detail-item">
              <strong>Nombre de Usuario:</strong> {user?.nombre_usu}
            </div>
            {user?.nombre_completo && (
              <div className="detail-item">
                <strong>Nombre Completo:</strong> {user?.nombre_completo}
              </div>
            )}
            <div className="detail-item">
              <strong>Fecha de Registro:</strong> {user?.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : 'N/A'}
            </div>
            <div className="detail-item">
              <strong>Última Conexión:</strong> {user?.ultima_conexion ? new Date(user.ultima_conexion).toLocaleString() : 'N/A'}
            </div>
          </div>
        </div>

        <div className="dashboard-features">
          <h2>Funcionalidades Disponibles</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Perfil</h3>
              <p>Gestiona tu información personal</p>
              <button className="feature-button">Editar Perfil</button>
            </div>
            
            <div className="feature-card">
              <h3>Configuración</h3>
              <p>Personaliza tu experiencia</p>
              <button className="feature-button">Configurar</button>
            </div>
            
            <div className="feature-card">
              <h3>Seguridad</h3>
              <p>Gestiona tu contraseña y seguridad</p>
              <button className="feature-button">Seguridad</button>
            </div>
            
            <div className="feature-card">
              <h3>Actividad</h3>
              <p>Revisa tu actividad reciente</p>
              <button className="feature-button">Ver Actividad</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
