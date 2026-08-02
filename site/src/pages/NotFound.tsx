import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', width: '100vw', minHeight: '100vh', backgroundColor: '#000', color: '#fff', overflowX: 'hidden' }}
    >
      {/* Background Shader Gradient */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}>
        <ShaderGradientCanvas
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606ff&color2=%23fe8989&color3=%23000000&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '40px 20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <AlertTriangle size={64} color="#ff4444" style={{ marginBottom: '24px' }} />
        
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '4rem', marginBottom: '16px' }}>404</h1>
        
        <p style={{ color: '#ccc', marginBottom: '48px', fontSize: '1.2rem', lineHeight: '1.6' }}>
          Oups ! La page que vous recherchez semble introuvable ou n'existe plus.
        </p>

        <Link to="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: '#fff', 
          color: '#000', 
          padding: '16px 32px', 
          borderRadius: '50px', 
          textDecoration: 'none', 
          fontWeight: 'bold', 
          fontSize: '1.2rem',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)'
        }}>
          <ArrowLeft size={24} /> Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  );
}
