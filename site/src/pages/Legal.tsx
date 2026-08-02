import { motion } from 'framer-motion';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'cgu';
}

export default function Legal({ type }: LegalProps) {
  const isPrivacy = type === 'privacy';

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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

      <div style={{ position: 'relative', zIndex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#aaa', textDecoration: 'none', marginBottom: '40px', fontSize: '1.1rem' }}>
          <ArrowLeft size={20} /> Retour à l'accueil
        </Link>
        
        <div style={{ 
          padding: '40px'
        }}>
          {isPrivacy ? (
            <>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '8px' }}>Politique de Confidentialité</h1>
              <p style={{ color: '#aaa', marginBottom: '32px' }}>Dernière mise à jour : Août 2026</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
                <p>L'application "Left To Live" (ci-après "l'Application") prend votre vie privée très au sérieux. Cette politique de confidentialité explique quelles données nous collectons, comment elles sont utilisées, et comment elles sont protégées.</p>
                
                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>1. COLLECTE DES DONNÉES DE SANTÉ (HEALTHKIT)</h3>
                  <p style={{ color: '#ddd' }}>L'Application utilise l'API HealthKit d'Apple pour lire certaines de vos données de santé (telles que la fréquence cardiaque au repos, le poids, la taille, l'âge, etc.). Ces données sont indispensables au fonctionnement principal de l'Application : l'estimation algorithmique de votre espérance de vie.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>2. UTILISATION ET NON-VENTE DES DONNÉES DE SANTÉ</h3>
                  <ul style={{ color: '#ddd', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>Vos données de santé lues depuis HealthKit sont utilisées UNIQUEMENT dans le but de calculer les statistiques au sein de l'Application.</li>
                    <li style={{ marginBottom: '8px' }}><strong>VOS DONNÉES DE SANTÉ NE SONT JAMAIS VENDUES, LOUÉES, OU PARTAGÉES À DES TIERS.</strong></li>
                    <li>Vos données de santé ne sont en aucun cas utilisées à des fins publicitaires ou de marketing.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>3. STOCKAGE CLOUD ET COMPTE UTILISATEUR</h3>
                  <p style={{ color: '#ddd' }}>Pour vous permettre de synchroniser votre profil (notamment pour le mode "Couple" et le "Testament Numérique"), l'Application utilise les services sécurisés de Google Firebase. Les informations liées à votre compte (adresse email, identifiant) et vos données d'application sont stockées de manière chiffrée sur nos serveurs. Seules les personnes que vous autorisez explicitement (ex: votre partenaire) peuvent y avoir accès.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>4. SÉCURITÉ DE VOTRE TESTAMENT NUMÉRIQUE</h3>
                  <p style={{ color: '#ddd' }}>L'accès à votre "Testament Numérique" dans l'Application est protégé par la biométrie de votre appareil (Face ID ou Touch ID). Les données de ce testament ne sont déverrouillées que par vous-même, ou transmises à vos contacts d'urgence selon la logique interne de l'Application.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>5. DROIT À L'OUBLI ET SUPPRESSION DES DONNÉES</h3>
                  <p style={{ color: '#ddd' }}>Vous possédez un contrôle total sur vos données. À tout moment, vous pouvez demander la suppression intégrale de votre compte et de toutes les données associées depuis les paramètres de l'Application, ou en nous contactant directement. Une fois supprimées, vos données sont effacées définitivement de nos serveurs Firebase.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>6. CONTACT</h3>
                  <p style={{ color: '#ddd' }}>Pour toute question concernant cette politique de confidentialité ou vos données personnelles, veuillez nous contacter à l'adresse suivante : <strong>contact@shaiscompany.com</strong></p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '32px' }}>Conditions Générales d'Utilisation (CGU)</h1>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.6' }}>
                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>1. Avertissement Médical Important</h3>
                  <p style={{ color: '#ddd' }}>L'application "Left To Live" est conçue à des fins de divertissement, de réflexion personnelle (memento mori) et de motivation. L'Application n'est pas un dispositif médical. Les estimations fournies (battements restants, espérance de vie algorithmique) sont basées sur des moyennes statistiques générales et ne constituent en aucun cas un diagnostic, un pronostic ou un avis médical. Consultez toujours un professionnel de santé pour toute question relative à votre santé.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>2. Utilisation de l'Application</h3>
                  <p style={{ color: '#ddd' }}>En utilisant Left To Live, vous acceptez de le faire à vos propres risques. L'Application et ses développeurs ne sauraient être tenus responsables d'une quelconque détresse psychologique, mauvaise interprétation des données ou de tout dommage direct ou indirect lié à l'utilisation du compte à rebours ou du testament numérique.</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>3. Compte et Sécurité</h3>
                  <p style={{ color: '#ddd' }}>Vous êtes responsable du maintien de la confidentialité de vos informations de connexion et de la sécurité de votre appareil (notamment pour l'accès au Testament Numérique via biométrie).</p>
                </div>

                <div>
                  <h3 style={{ color: '#fff', marginBottom: '8px' }}>4. Modifications</h3>
                  <p style={{ color: '#ddd' }}>Nous nous réservons le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des changements significatifs via l'Application ou ce site web.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
