import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '40px 0',
      marginTop: '80px',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.9rem'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>Shai's Company</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/left-to-live/privacy" style={{ opacity: 0.7 }}>Politique de Confidentialité</Link>
          <Link to="/left-to-live/cgu" style={{ opacity: 0.7 }}>CGU</Link>
          <Link to="/contact" style={{ opacity: 0.7 }}>Contact</Link>
        </div>
        <div style={{ opacity: 0.5, marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Shai's Company. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
