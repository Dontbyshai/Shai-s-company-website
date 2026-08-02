import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import Countdown from '../components/Countdown'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  // Prevent scrolling for an immersive experience
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', width: '100vw', height: '100vh', top: 0, left: 0, overflow: 'hidden' }}
    >
      
      {/* Background Shader Gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ShaderGradientCanvas
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%235606ff&color2=%23fe8989&color3=%23000000&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </div>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ textAlign: 'center', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '5rem', fontWeight: 600, letterSpacing: '1px', textShadow: '0 4px 12px rgba(0,0,0,0.4)', marginBottom: '16px', color: '#fff' }}>Shai's Company</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '48px', textShadow: '0 2px 4px rgba(0,0,0,0.5)', opacity: 0.8 }}>Le site est en pleine refonte. Nous préparons la suite.</p>
          
          <Countdown />

        </motion.div>
      </div>

      {/* Footer Liquid Glass */}
      <div style={{ position: 'absolute', bottom: '40px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 3, pointerEvents: 'none' }}>
        <div className="liquid-btn" style={{ pointerEvents: 'auto', display: 'flex', gap: '32px', padding: '20px 48px', cursor: 'default' }}>
          <div className="inner-liquid"></div>
          <span className="btn-text" style={{ display: 'flex', gap: '32px' }}>
            <Link to="/left-to-live/privacy" style={{ color: '#fff', fontSize: '1rem', textDecoration: 'none' }}>Confidentialité</Link>
            <Link to="/left-to-live/cgu" style={{ color: '#fff', fontSize: '1rem', textDecoration: 'none' }}>CGU</Link>
            <Link to="/contact" style={{ color: '#fff', fontSize: '1rem', textDecoration: 'none' }}>Contact SAV</Link>
          </span>
        </div>
      </div>
    </motion.div>
  )
}
