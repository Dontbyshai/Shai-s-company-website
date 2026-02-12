import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import Lenis from '@studio-freight/lenis';
import {
  Music,
  Bot,
  GraduationCap,
  Wallet,
  LineChart,
  BookOpen,
  TrendingUp,
  ArrowRight,
  MapPin,
  Mail,
  ExternalLink,
  ChevronDown,
  Code,
  Globe,
  Monitor,
  Menu,
  X,
  Box,
  Shield,
  Cpu,
  Zap
} from 'lucide-react';
import './App.css';

// --- 3D Components ---

/**
 * Intelligent particle system that morphs between a nebula state 
 * and specific text targets based on scroll position.
 */
const StaticStarfield = () => {
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 40 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i3] = r * Math.sin(phi) * Math.cos(theta);
      p[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const DynamicStarfield = ({ progressOverride }) => {
  const { scrollYProgress } = useScroll();
  const count = 16384; // Power of 2 for texture mapping
  const meshRef = useRef();

  const generatePointsForShape = (index) => {
    const pts = [];
    const radius = 6;

    // Different geometric/organic shapes for 11 stages
    for (let i = 0; i < count; i++) {
      let x, y, z;
      const t = i / count;

      switch (index) {
        case 0: // AI - Sphere
          const phi = Math.acos(-1 + (2 * i) / count);
          const theta = Math.sqrt(count * Math.PI) * phi;
          x = radius * Math.cos(theta) * Math.sin(phi);
          y = radius * Math.sin(theta) * Math.sin(phi);
          z = radius * Math.cos(phi);
          break;
        case 1: // Education (matches Product Design Cube) - Cube/Grid
          const size = 10;
          const side = Math.pow(count, 1 / 3); // Cube root
          // Distribute points on surface of cube for better definition
          const face = Math.floor(Math.random() * 6);
          const u_c = Math.random() * 2 - 1;
          const v_c = Math.random() * 2 - 1;
          const r_c = 6.0;
          switch (face) {
            case 0: x = r_c; y = u_c * r_c; z = v_c * r_c; break;
            case 1: x = -r_c; y = u_c * r_c; z = v_c * r_c; break;
            case 2: x = u_c * r_c; y = r_c; z = v_c * r_c; break;
            case 3: x = u_c * r_c; y = -r_c; z = v_c * r_c; break;
            case 4: x = u_c * r_c; y = v_c * r_c; z = r_c; break;
            case 5: x = u_c * r_c; y = v_c * r_c; z = -r_c; break;
          }
          break;
        case 2: // Dev/Engineering - Code Brackets < / >
          // Shape: Two angled brackets and a slash
          const part = Math.random();
          const thickness = 1.0; // Thinner for sharper lines
          const height = 7.0;
          const width = 4.0;

          if (part < 0.35) { // Left bracket <
            const t_b = Math.random(); // 0 to 1
            // Refined V shape: top half and bottom half
            if (t_b < 0.5) { // Top half
              // Goes from (-width, height) to (0, 0)
              const p = t_b * 2.0; // 0 to 1
              x = -width * (1.0 - p);
              y = height * (1.0 - p);
            } else { // Bottom half
              // Goes from (0, 0) to (-width, -height)
              const p = (t_b - 0.5) * 2.0; // 0 to 1
              x = -width * p;
              y = -height * p;
            }
            z = (Math.random() - 0.5) * thickness;
            x -= 3.5; // Shift left
          } else if (part < 0.7) { // Right bracket >
            const t_b = Math.random();
            if (t_b < 0.5) { // Top half
              const p = t_b * 2.0;
              x = width * (1.0 - p);
              y = height * (1.0 - p);
            } else { // Bottom half
              const p = (t_b - 0.5) * 2.0;
              x = width * p;
              y = -height * p;
            }
            z = (Math.random() - 0.5) * thickness;
            x += 3.5; // Shift right
          } else { // Slash /
            const t_s = Math.random();
            // Slash goes from (2, 7) to (-2, -7)? No, usually forward slash /
            // (1, 1) to (-1, -1) is backward. / is (1, 1) to (-1, -1)? Wait.
            // / top right to bottom left.
            x = (t_s - 0.5) * 4.0;
            y = (t_s - 0.5) * 16.0; // Tall
            z = (Math.random() - 0.5) * thickness;
            x *= 1.5; // Rotate slightly or spread X
          }
          break;
        case 3: // 3.0 - DNA / Double Helix
          const angle = t * Math.PI * 20;
          const dist = 3;
          const side_dna = i % 2 === 0 ? 1 : -1;
          x = Math.cos(angle) * dist * side_dna;
          y = (t - 0.5) * 15;
          z = Math.sin(angle) * dist * side_dna;
          break;
        case 4: // Music - Waveform Plane
          x = (Math.random() - 0.5) * 20;
          z = (Math.random() - 0.5) * 10;
          y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 3;
          break;
        case 5: // Design - Pyramid/Tetrahedron
          const s = 12;
          const r1 = Math.random(), r2 = Math.random(), r3 = Math.random();
          if (r1 + r2 > 1) { x = 1 - r1; y = 1 - r2; } else { x = r1; y = r2; }
          z = r3;
          x = (x - 0.3) * s; y = (y - 0.3) * s; z = (z - 0.3) * s;
          break;
        case 6: // Cloud - Random Nebula
          const rad = 8 * Math.pow(Math.random(), 0.3);
          const p = Math.acos(2 * Math.random() - 1);
          const th = 2 * Math.PI * Math.random();
          x = rad * Math.sin(p) * Math.cos(th);
          y = rad * Math.sin(p) * Math.sin(th);
          z = rad * Math.cos(p);
          break;
        case 7: // Security - Shield Shape
          const a_s = (Math.random() - 0.5) * 10;
          const b_s = (Math.random() - 0.5) * 15;
          x = a_s;
          y = b_s - (a_s * a_s) * 0.1;
          z = (Math.random() - 0.5) * 2;
          break;
        case 8: // Quantum - Atomic Orbits
          const orbit = i % 3;
          const ang = Math.random() * Math.PI * 2;
          const rad_q = 8;
          if (orbit === 0) { x = rad_q * Math.cos(ang); y = rad_q * Math.sin(ang); z = 0; }
          else if (orbit === 1) { x = 0; y = rad_q * Math.cos(ang); z = rad_q * Math.sin(ang); }
          else { x = rad_q * Math.cos(ang); y = 0; z = rad_q * Math.sin(ang); }
          break;
        case 9: // Trade - Vertical Bars/Grid
          x = Math.floor(i / 500) - 15;
          y = (i % 500) / 30 - 8;
          z = 0;
          break;
        case 10: // Future - Expand/Hyper-sphere
          const r_h = 15;
          const p_h = Math.random() * Math.PI * 2;
          const t_h = Math.random() * Math.PI;
          x = r_h * Math.sin(t_h) * Math.cos(p_h);
          y = r_h * Math.sin(t_h) * Math.sin(p_h);
          z = r_h * Math.cos(t_h);
          break;
        default:
          x = (Math.random() - 0.5) * 20;
          y = (Math.random() - 0.5) * 20;
          z = (Math.random() - 0.5) * 20;
      }
      pts.push(x, y, z);
    }
    return pts;
  };

  const [positionsTexture, textureSize] = useMemo(() => {
    const rows = 11;
    const cols = count;
    const data = new Float32Array(cols * rows * 4);

    for (let r = 0; r < rows; r++) {
      const pts = generatePointsForShape(r);
      for (let c = 0; c < cols; c++) {
        const i4 = (r * cols + c) * 4;
        const i3 = c * 3;
        data[i4] = pts[i3];
        data[i4 + 1] = pts[i3 + 1];
        data[i4 + 2] = pts[i3 + 2];
        data[i4 + 3] = 1.0;
      }
    }

    const tex = new THREE.DataTexture(data, cols, rows, THREE.RGBAFormat, THREE.FloatType);
    tex.needsUpdate = true;
    return [tex, { width: cols, height: rows }];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uPositions: { value: positionsTexture },
    uTextureSize: { value: new THREE.Vector2(textureSize.width, textureSize.height) },
    uColor: { value: new THREE.Color("#00e5ff") },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uDispersion: { value: 0 }
  }), [positionsTexture, textureSize]);

  const lastProgress = useRef(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;

      // Strict Scroll Timeline
      const targetProgress = progressOverride !== undefined ? progressOverride : 0;
      const currentProgress = meshRef.current.material.uniforms.uProgress.value;

      // Interpolate for smoothness but keep it tied to scroll
      meshRef.current.material.uniforms.uProgress.value += (targetProgress - currentProgress) * 0.1;

      // Calculate dispersion/speed of "video scrub"
      const speed = Math.abs(targetProgress - lastProgress.current);
      meshRef.current.material.uniforms.uDispersion.value = speed * 50.0;

      lastProgress.current = targetProgress;
      meshRef.current.material.uniforms.uMouse.value.lerp(new THREE.Vector2(state.mouse.x, state.mouse.y), 0.1);
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uProgress;
    uniform float uDispersion;
    uniform sampler2D uPositions;
    uniform vec2 uTextureSize;
    uniform vec2 uMouse;
    
    attribute float aIndex;
    varying float vOpacity;
    varying float vDepth;

    float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

    void main() {
      float totalStages = uTextureSize.y - 1.0;
      float stageProg = uProgress * totalStages;
      float indexLow = floor(stageProg);
      float indexHigh = min(indexLow + 1.0, totalStages);
      float mixFactor = fract(stageProg);

      // Fetch positions from texture
      vec2 uvLow = vec2((aIndex + 0.5) / uTextureSize.x, (indexLow + 0.5) / uTextureSize.y);
      vec2 uvHigh = vec2((aIndex + 0.5) / uTextureSize.x, (indexHigh + 0.5) / uTextureSize.y);
      
      vec3 posLow = texture2D(uPositions, uvLow).xyz;
      vec3 posHigh = texture2D(uPositions, uvHigh).xyz;
      
      vec3 pos = mix(posLow, posHigh, mixFactor);

      // Scroll speed dispersion
      if (uDispersion > 0.01) {
          float noise = random(vec2(aIndex, uTime));
          pos += (noise - 0.5) * uDispersion * 4.0;
      }

      // Mouse influence
      vec2 mousePos = uMouse * vec2(15.0, 10.0);
      float distM = distance(pos.xy, mousePos);
      if (distM < 5.0) {
          float force = (1.0 - distM / 5.0) * 2.5;
          pos.xy += normalize(pos.xy - mousePos) * force;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (2.0 + random(vec2(aIndex)) * 2.0) * (120.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      vDepth = -mvPosition.z;
      vOpacity = (1.0 - smoothstep(10.0, 80.0, vDepth)) * 0.9;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vOpacity;
    varying float vDepth;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      gl_FragColor = vec4(uColor, (1.0 - dist * 2.0) * vOpacity);
    }
  `;

  const indices = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = i;
    return arr;
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-aIndex" count={count} array={indices} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
};

const SacredArtifact = () => {
  const groupRef = useRef();
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      // Rotation Mode: Principal rotation on Z-axis for a high-energy disc/propeller effect - Much slower
      groupRef.current.rotation.z = time * 0.15;
      // Subtle 3D tilt for depth
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
      groupRef.current.rotation.y = Math.cos(time * 0.2) * 0.1;

      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      groupRef.current.scale.setScalar(1);
      groupRef.current.visible = true;
    }
  });

  const arms = useMemo(() => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      items.push({ angle, id: i });
    }
    return items;
  }, []);

  return (
    <group position={[0, 0, 0]}> {/* Positioned at center of its local canvas */}
      {/* Refined Official Network Logo 3D */}
      <group ref={groupRef}>
        {/* Central Hub - High Glow */}
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00e5ff"
            emissiveIntensity={3}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Radial Arms and Torus Nodes */}
        {arms.map((arm) => (
          <group key={arm.id} rotation={[0, 0, arm.angle]}>
            {/* Arms - Sleek Metal */}
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
              <meshStandardMaterial
                color="#8899aa"
                emissive="#00e5ff"
                emissiveIntensity={0.3}
                metalness={1}
                roughness={0.1}
              />
            </mesh>
            {/* Faithful Node Design: Torus Ring - Now White/Silver with Cyan Glow */}
            <mesh position={[2.5, 0, 0]}>
              <torusGeometry args={[0.22, 0.07, 16, 48]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#00e5ff"
                emissiveIntensity={2.5}
                metalness={1}
                roughness={0}
              />
            </mesh>
          </group>
        ))}
        <pointLight intensity={5} distance={20} color="#00e5ff" />
      </group>
    </group>
  );
};

const HeroLogoCanvas = () => {
  return (
    <div className="hero-logo-canvas">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <SacredArtifact />
      </Canvas>
    </div>
  );
};

const BackgroundScene = ({ activeProgress }) => {
  return (
    <div className="space-background">
      <Canvas
        gl={{ alpha: true }}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}
      >
        {/* Camera centered to show stars in the middle */}
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />

        <Suspense fallback={null}>
          <StaticStarfield />
          <DynamicStarfield progressOverride={activeProgress} />
          {/* Removed SacredArtifact from background to move it to hero section */}
        </Suspense>
      </Canvas>
    </div>
  );
};

const CinematicEcosystem = ({ t, onProgress }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const divisions = [
    { icon: Bot, title: "Intelligence Omni", description: "Core AI architecture for enterprise-scale autonomous decision making.", color: "#00e5ff" },
    { icon: GraduationCap, title: "Horizon Education", description: "Revolutionizing academic management with intelligent identity resolution.", color: "#a0c4ff" },
    { icon: Code, title: "Engineering Core", description: "Blueprinting innovation through expert knowledge transfer and systems design.", color: "#ffffff" },
    { icon: TrendingUp, title: "Capital 3.0", description: "Decentralized liquidity protocols and multi-chain wealth management.", color: "#ffd700" },
    { icon: Music, title: "Sonic Intelligence", description: "The intersection of algorithmic composition and luxury brand identity.", color: "#ff4d4d" },
    { icon: Globe, title: "Visual Synthesis", description: "Advanced CGI and real-time visualization for digital-first ecosystems.", color: "#ff00ff" },
    { icon: Box, title: "Cloud Nexus", description: "Distributed high-performance infrastructure for next-gen scalability.", color: "#00ff88" },
    { icon: Shield, title: "Guardian Cyber", description: "Zero-trust security frameworks for the sovereign digital era.", color: "#0066ff" },
    { icon: Cpu, title: "Quantis Neural", description: "Experimental research in quantum-ready machine learning models.", color: "#8a2be2" },
    { icon: LineChart, title: "Trade Momentum", description: "Algorithmic market execution with neural sentiment analysis.", color: "#ff8c00" },
    { icon: Zap, title: "Synergy Unity", description: "The final integration of all divisions into a single cohesive empire.", color: "#00e5ff" }
  ];

  const numDivisions = divisions.length;
  // Shaped Progress: 11 divisions mean 10 transitions
  const steps = [];
  const outputs = [];
  for (let i = 0; i <= numDivisions * 2; i++) {
    steps.push(i / (numDivisions * 2));
    outputs.push(Math.floor((i + 1) / 2) / numDivisions);
  }

  const shapedProgress = useTransform(scrollYProgress, steps, outputs);

  // Carousel X Movement: Slide the entire track based on scroll
  // We want to translate -100% * current index? Or specific px values?
  // Let's use % based on index.
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, numDivisions - 1]);
  const xTransform = useTransform(activeIndex, (v) => `${-v * 520}px`); // Assuming card width + gap

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    return activeIndex.onChange(v => {
      const idx = Math.min(numDivisions - 1, Math.max(0, Math.round(v)));
      if (idx !== current) setCurrent(idx);
    });
  }, [activeIndex, current, numDivisions]);

  useEffect(() => {
    return shapedProgress.onChange(v => onProgress(v));
  }, [shapedProgress, onProgress]);

  return (
    <section ref={targetRef} className="cinematic-ecosystem-container" id="ecosystem">
      <div className="sticky-wrapper">
        <div className="split-layout">
          <div className="particle-stage-area">
            {/* Dynamic Title for the current formation */}
            <motion.div
              className="floating-stage-label"
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {divisions[current].title.split(" ")[0]}
            </motion.div>

            <motion.div
              className="stage-glow"
              animate={{ background: `radial-gradient(circle at center, ${divisions[current].color}11 0%, transparent 70%)` }}
            />
          </div>

          <div className="content-carousel-area">
            <div className="carousel-header">
              <SectionHeader label={t.ecoLabel} title={t.ecoTitle} align="left" />
            </div>

            <div className="carousel-mask">
              <motion.div
                className="carousel-track"
                style={{ x: xTransform }}
              >
                {divisions.map((div, index) => {
                  const isActive = index === current;
                  return (
                    <motion.div
                      key={index}
                      className={`carousel-card ${isActive ? 'active' : 'inactive'}`}
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.5,
                        filter: isActive ? 'blur(0px)' : 'blur(2px)'
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="card-number">0{index + 1}</div>
                      <div className="card-top-icon">
                        <ArrowRight size={20} />
                      </div>

                      <div className="card-content-inner">
                        <div className="card-icon-large" style={{ color: div.color }}>
                          {React.createElement(div.icon, { size: 48 })}
                        </div>
                        <h3>{div.title}</h3>
                        <p>{div.description}</p>

                        <div className="card-footer-services">
                          <span className="service-tag">Strategy</span>
                          <span className="service-tag">Design</span>
                          <span className="service-tag-icon"><Box size={14} /></span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="stack-footer">
              <div className="progress-bar-container">
                <motion.div className="progress-bar-fill" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- New Detail Sections ---

const CryptoSection = ({ t }) => (
  <section className="crypto-section" id="crypto">
    <div className="container">
      <div className="crypto-layout">
        <div className="crypto-info">
          <SectionHeader label="3.0 Division" title={t.cryptoTitle} align="left" />
          <p className="description">
            Infrastructure for the decentralized web. We build tools that bridge traditional finance with the transparency of blockchain.
          </p>
          <div className="crypto-list">
            <div className="crypto-item glass-panel">
              <Wallet className="icon" size={24} />
              <h4>Portfolio Manager</h4>
              <p>Multi-chain asset tracking and optimization.</p>
            </div>
            <div className="crypto-item glass-panel">
              <TrendingUp className="icon" size={24} />
              <h4>DeFi Yield Hub</h4>
              <p>Automated strategy execution across protocols.</p>
            </div>
            <div className="crypto-item glass-panel">
              <LineChart className="icon" size={24} />
              <h4>Analytics 3.0</h4>
              <p>Real-time on-chain data visualization.</p>
            </div>
            <div className="crypto-item glass-panel">
              <Globe className="icon" size={24} />
              <h4>Bridge Alpha</h4>
              <p>Trustless cross-chain liquidity solutions.</p>
            </div>
          </div>
        </div>
        <div className="crypto-visual">
          <div className="sphere-card glass-panel">
            {/* Abstract visual represented by CSS/Icons if no asset */}
            <div className="sphere-glow"></div>
            <Wallet size={120} className="floating" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MusicSection = ({ t }) => (
  <section className="music-section" id="music">
    <div className="container align-center">
      <SectionHeader label="Music Division" title={t.musicTitle} />
      <div className="music-content">
        <div className="waveform-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="bar"
              animate={{ height: [20, 100, 40, 80, 20] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
        <p className="music-desc">
          Soundscapes for the digital era. Artistic direction, sonic branding, and custom composition for futuristic projects.
        </p>
        <button className="btn btn-outline">Listen to Samples</button>
      </div>
    </div>
  </section>
);

const DevSection = ({ t }) => (
  <section className="dev-section" id="formations">
    <div className="container">
      <div className="edu-content">
        <div className="edu-info align-left">
          <SectionHeader label="Dev Division" title={t.devTitle} align="left" />
          <p className="description">
            Sharing the blueprints of innovation. Expert coaching and structured training in AI integration, modern web development, and system architecture.
          </p>
          <div className="dev-modules">
            <span className="dev-pill">Full-stack Excellence</span>
            <span className="dev-pill">AI Implementation</span>
            <span className="dev-pill">Cloud Architecture</span>
            <span className="dev-pill">Security First</span>
          </div>
          <a href="#" className="btn btn-primary">Enroll in Programs</a>
        </div>
        <div className="edu-visual">
          <div className="code-mockup glass-panel">
            <div className="code-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <pre><code>{`function buildFuture() {
  const ecosystem = ["AI", "Edu", "3.0"];
  return ecosystem.map(node => bridge(node));
}
// modular excellence`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- UI Components ---

const Navbar = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    en: { home: 'Home', eco: 'Ecosystem', ai: 'AI', edu: 'Education', music: 'Music', dev: 'Dev', contact: 'Contact' },
    fr: { home: 'Accueil', eco: 'Écosystème', ai: 'IA', edu: 'Éducation', music: 'Musique', dev: 'Dev', contact: 'Contact' }
  }[lang];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="nav-left">
          <div className="logo-text">shaï's <span>company</span></div>
        </div>

        <div className="nav-links">
          <a href="#hero">{t.home}</a>
          <a href="#ecosystem">{t.eco}</a>
          <a href="#ai">{t.ai}</a>
          <a href="#education">{t.edu}</a>
          <a href="#crypto">{t.music}</a>
          <a href="#formations">{t.dev}</a>
        </div>

        <div className="nav-right">
          <button className="lang-switcher" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>
            <Globe size={18} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <a href="#contact" className="btn btn-primary nav-cta">{t.contact}</a>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader = ({ label, title, subtitle, align = 'center' }) => (
  <div className={`section-header align-${align}`}>
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-label"
    >
      {label}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="section-title text-gradient"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="section-subtitle"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const DivisionCard = ({ icon: Icon, title, description, href, color }) => (
  <motion.a
    href={href}
    className="division-card glass-panel"
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${color}22 0%, transparent 70%)` }}></div>
    <div className="card-icon" style={{ color }}>
      <Icon size={32} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="card-footer">
      <span>Discover</span>
      <ArrowRight size={16} />
    </div>
  </motion.a>
);

// --- Main Components ---

function App() {
  const [lang, setLang] = useState('en');
  const [activeProgress, setActiveProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const t = {
    en: {
      heroTitle: "Forging the Sovereign Horizon.",
      heroSub: "A sacred modular ecosystem connecting intelligence, finance and artistic creation.",
      heroCTA1: "Enter Gateway",
      heroCTA2: "Protocol Charter",
      ecoLabel: "The Ecosystem",
      ecoTitle: "Technological Pillars",
      ecoSub: "Five divisions defining the new era of decentralization and creativity.",
      aiLabel: "Core AI",
      aiTitle: "Artificial Omniscience",
      eduTitle: "NotiaNote Vision",
      cryptoTitle: "Sovereign Web 3.0",
      musicTitle: "Sonic Intelligence",
      devTitle: "Knowledge Transfer",
      contactTitle: "Initiate Communication.",
    },
    fr: {
      heroTitle: "Bâtir l'Horizon Souverain.",
      heroSub: "Un écosystème modulaire sacré reliant l'intelligence, la finance et la création artistique.",
      heroCTA1: "Entrer dans le Portail",
      heroCTA2: "Charte du Protocole",
      ecoLabel: "L'Écosystème",
      ecoTitle: "Piliers Technologiques",
      ecoSub: "Cinq divisions définissant la nouvelle ère de la décentralisation et de la créativité.",
      aiLabel: "Cœur IA",
      aiTitle: "Omniscience Artificielle",
      eduTitle: "Vision NotiaNote",
      cryptoTitle: "Web 3.0 Souverain",
      musicTitle: "Intelligence Sonore",
      devTitle: "Transfert de Savoir",
      contactTitle: "Initier la Communication.",
    }
  }[lang];

  return (
    <div className="App dark-empire">
      <BackgroundScene activeProgress={activeProgress} />
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <div className="hero-text-overlay">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "20px" }}
                animate={{ opacity: 1, letterSpacing: "4px" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="hero-title epic-text"
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="hero-subtitle luxury-sub"
              >
                {t.heroSub}
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                <a href="#ecosystem" className="btn btn-primary pulse-glow">{t.heroCTA1}</a>
                <a href="#contact" className="btn btn-outline">{t.heroCTA2}</a>
              </motion.div>
            </div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <HeroLogoCanvas />
            </motion.div>
          </div>
        </div>
        <div className="empire-scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      <CinematicEcosystem t={t} onProgress={setActiveProgress} />

      {/* Remaining sections kept but simplified for this version */}
      <section className="ai-section" id="ai">
        <div className="container">
          <div className="ai-layout">
            <div className="ai-info">
              <SectionHeader label={t.aiLabel} title={t.aiTitle} align="left" />
              <div className="ai-modules-empire">
                {['Omniscient-1 (Student)', 'Debate Core', 'Unrestricted API', 'Algo Trading'].map((m) => (
                  <div key={m} className="empire-node glass-panel">
                    <div className="status-dot online"></div>
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="education-section" id="education">
        <div className="container">
          <SectionHeader label="Education Division" title={t.eduTitle} />
          <p className="description luxury-sub align-center">
            The premier platform for high-level academic management. NotiaNote integrates AI-driven analytics with seamless scheduling.
          </p>
        </div>
      </section>

      <CryptoSection t={t} />
      <MusicSection t={t} />
      <DevSection t={t} />

      <footer className="footer-empire">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand epic-text">shaï's <span>company</span></div>
            <div className="footer-mission">Building the sovereign infrastructure of the next technological era.</div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} shaï's company. Sovereign Entity.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
