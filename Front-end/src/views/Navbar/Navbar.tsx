import { FiCloud, FiHardDrive, FiFolder, FiLock } from "react-icons/fi";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <aside className="sidebar" aria-label="Mi nube">
      <div className="sidebar-brand">
        <span className="sidebar-logo">
          <FiCloud aria-hidden="true" />
        </span>
        <div>
          <span className="sidebar-brand-name">
            Mi nube<span>.</span>
          </span>
          <span className="sidebar-brand-caption">Tu espacio personal</span>
        </div>
      </div>
      <div className="sidebar-library">
        <p className="sidebar-label">BIBLIOTECA</p>
        <div className="sidebar-current">
          <FiFolder aria-hidden="true" />
          <span>Mis archivos</span>
          <span className="sidebar-current-dot" />
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span className="sidebar-note-icon">
            <FiHardDrive aria-hidden="true" />
          </span>
          <p>Tu nube, en casa</p>
          <span>Un espacio para todo lo que quieres guardar.</span>
          <div className="sidebar-note-footer">
            <FiLock aria-hidden="true" /> Almacenamiento local
          </div>
        </div>
        <div className="sidebar-profile">
          <span className="sidebar-avatar">MN</span>
          <div>
            <strong>Mi espacio</strong>
            <span>Google Drive Casero</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
