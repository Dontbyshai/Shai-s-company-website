import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  Shield,
  Clock,
  Zap,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Code
} from 'lucide-react';
import './App.css';

// Logo SVG Component - Faithful to original design
const Logo = ({ className = '', style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Center ellipse with gradient */}
    <defs>
      <linearGradient id="centerGradient" x1="50" y1="36" x2="50" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8BA3B8"/>
        <stop offset="100%" stopColor="#5A7085"/>
      </linearGradient>
      <linearGradient id="coreGradient" x1="50" y1="42" x2="50" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00E5FF"/>
        <stop offset="100%" stopColor="#00B8D4"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Main center body */}
    <ellipse cx="50" cy="50" rx="11" ry="13" fill="url(#centerGradient)"/>
    {/* Inner cyan core */}
    <ellipse cx="50" cy="50" rx="6" ry="7" fill="url(#coreGradient)" filter="url(#glow)"/>
    
    {/* Top spoke */}
    <line x1="50" y1="37" x2="50" y2="16" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="50" cy="12" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="50" cy="12" r="2" fill="#7B8FA0" opacity="0.5"/>
    
    {/* Bottom spoke */}
    <line x1="50" y1="63" x2="50" y2="84" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="50" cy="88" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="50" cy="88" r="2" fill="#7B8FA0" opacity="0.5"/>
    
    {/* Top-left spoke */}
    <line x1="40" y1="41" x2="24" y2="25" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="20" cy="21" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="20" cy="21" r="2" fill="#7B8FA0" opacity="0.5"/>
    
    {/* Top-right spoke */}
    <line x1="60" y1="41" x2="76" y2="25" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="80" cy="21" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="80" cy="21" r="2" fill="#7B8FA0" opacity="0.5"/>
    
    {/* Bottom-left spoke */}
    <line x1="40" y1="59" x2="24" y2="75" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="20" cy="79" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="20" cy="79" r="2" fill="#7B8FA0" opacity="0.5"/>
    
    {/* Bottom-right spoke */}
    <line x1="60" y1="59" x2="76" y2="75" stroke="#7B8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="80" cy="79" rx="5" ry="5" fill="none" stroke="#7B8FA0" strokeWidth="2.5"/>
    <circle cx="80" cy="79" r="2" fill="#7B8FA0" opacity="0.5"/>
  </svg>
);

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Badge Component
const Badge = ({ status }) => {
  const config = {
    active: { label: 'Active', className: 'badge badge-active' },
    development: { label: 'In Development', className: 'badge badge-development' },
    experimental: { label: 'Experimental', className: 'badge badge-experimental' }
  };
  const { label, className } = config[status] || config.development;
  
  return (
    <span className={className} data-testid={`badge-${status}`}>
      <span className="badge-dot"></span>
      {label}
    </span>
  );
};

// Section Component
const Section = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
};

// Card Component
const Card = ({ icon: Icon, title, description, status, buttonText, href, delay = 0 }) => (
  <motion.div 
    className="card"
    variants={fadeUp}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, borderColor: 'rgba(0, 184, 212, 0.4)' }}
    data-testid={`card-${title?.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="card-header">
      <div className="card-icon">
        <Icon size={24} />
      </div>
      {status && <Badge status={status} />}
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-text">{description}</p>
    {buttonText && (
      <a href={href || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-testid={`btn-${title?.toLowerCase().replace(/\s+/g, '-')}`}>
        {buttonText} <ArrowRight size={14} />
      </a>
    )}
  </motion.div>
);

// Hero Section
const HeroSection = () => (
  <section className="hero" id="hero" data-testid="hero-section">
    <div className="hero-glow" />
    <motion.div 
      className="hero-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Logo className="hero-logo" />
      </motion.div>
      <h1 className="hero-title">shaï's company</h1>
      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Building systems. One module at a time.
      </motion.p>
      <motion.a
        href="#music"
        className="btn btn-outline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        data-testid="hero-explore-btn"
      >
        Explore Projects <ChevronDown size={16} />
      </motion.a>
    </motion.div>
    <motion.div 
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1, delay: 1.2 }}
    >
      <span>Scroll</span>
      <div className="scroll-line" />
    </motion.div>
  </section>
);

// Music Section
const MusicSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section music-section" id="music" data-testid="music-section">
      <div className="container">
        <div className="music-grid">
          <motion.div 
            className="music-image"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" 
              alt="Music Studio" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-label">Music Label</span>
            <h2 className="section-title">Sonic Innovation</h2>
            <p className="section-description" style={{ marginBottom: '16px' }}>
              A personal music label dedicated to artistic creation and curated public playlists. 
              Explore a distinct sonic universe with its own visual identity.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Part of shaï's company ecosystem
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-testid="btn-visit-label">
              Visit the Label <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// AI Section
const AISection = () => {
  const modules = [
    {
      icon: GraduationCap,
      title: "AI for Students",
      description: "Educational AI assistant designed for academic research and learning support.",
      status: "active",
      buttonText: "Access Module"
    },
    {
      icon: MessageSquare,
      title: "AI Discussion",
      description: "Conversational AI for general discussion and creative brainstorming.",
      status: "development",
      buttonText: "Coming Soon"
    },
    {
      icon: Sparkles,
      title: "AI No-Limit",
      description: "Unrestricted experimental AI module for advanced research purposes.",
      status: "experimental",
      buttonText: "Request Access"
    },
    {
      icon: TrendingUp,
      title: "AI Trading",
      description: "Market analysis and trading signal AI powered by proprietary algorithms.",
      status: "development",
      buttonText: "Join Waitlist"
    }
  ];

  return (
    <Section id="ai" data-testid="ai-section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-label">AI Modules</span>
          <h2 className="section-title">Intelligence, Modular</h2>
          <p className="section-description">
            A suite of AI modules designed for specific use cases. No desktop AI. 
            Each module serves a distinct purpose with clear boundaries.
          </p>
        </motion.div>
        <div className="ai-grid">
          {modules.map((module, i) => (
            <Card key={module.title} {...module} delay={i * 0.1} />
          ))}
        </div>
        <motion.div variants={fadeUp} style={{ marginTop: '48px', textAlign: 'center' }}>
          <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-outline" data-testid="btn-ai-explore">
            Explore AI Platform <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

// Education Section
const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section education-section" id="education" data-testid="education-section">
      <div className="container">
        <div className="education-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge status="development" />
            <h2 className="section-title" style={{ marginTop: '24px' }}>NotiaNote</h2>
            <p className="section-description" style={{ marginBottom: '24px' }}>
              An independent education application for school organization. 
              Designed for high schools and colleges, with future expansion 
              to higher education institutions.
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px', lineHeight: '2' }}>
              <li>• Class scheduling & management</li>
              <li>• Grade tracking & analytics</li>
              <li>• Communication tools</li>
              <li>• Similar to Pronote systems</li>
            </ul>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-testid="btn-notianote">
              Discover NotiaNote <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div 
            className="education-mockup"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mockup-header">
              <span className="mockup-dot" style={{ background: '#FF5F56' }} />
              <span className="mockup-dot" style={{ background: '#FFBD2E' }} />
              <span className="mockup-dot" style={{ background: '#27CA40' }} />
            </div>
            <div className="mockup-content">
              <div className="mockup-line w-50 primary" />
              <div className="mockup-line w-full" />
              <div className="mockup-line w-75" />
              <div className="mockup-line w-full" />
              <div className="mockup-line w-25 primary" />
              <div className="mockup-line w-full" />
              <div className="mockup-line w-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Crypto Section
const CryptoSection = () => {
  const components = [
    {
      icon: Wallet,
      title: "Hexyra",
      description: "Non-custodial crypto wallet. Buy, sell, and manage crypto without KYC. Ledger compatible for maximum security.",
      status: "development",
      buttonText: "Learn More"
    },
    {
      icon: LineChart,
      title: "Portfolio Tracker",
      description: "Multi-wallet tracking with comprehensive portfolio overview. Monitor all your assets in one place.",
      status: "development",
      buttonText: "Coming Soon"
    },
    {
      icon: BookOpen,
      title: "Crypto Formation",
      description: "Educational platform for cryptocurrency fundamentals and advanced trading strategies. Hosted on School.",
      status: "development",
      buttonText: "View Course"
    },
    {
      icon: TrendingUp,
      title: "TradingView Indicator",
      description: "Proprietary technical indicator for TradingView. Advanced signal generation for informed trading decisions.",
      status: "active",
      buttonText: "Get Indicator"
    }
  ];

  return (
    <Section id="crypto" data-testid="crypto-section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-label">Crypto Ecosystem</span>
          <h2 className="section-title">Decentralized Infrastructure</h2>
          <p className="section-description">
            A complete ecosystem for crypto users. From wallets to education, 
            each component integrates seamlessly while remaining independent.
          </p>
        </motion.div>
        <div className="crypto-grid">
          {components.map((component, i) => (
            <Card key={component.title} {...component} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};

// Formations Section
const FormationsSection = () => {
  const formations = [
    {
      icon: TrendingUp,
      title: "Crypto Formation",
      description: "From fundamentals to advanced trading strategies. Learn at your own pace.",
      status: "development"
    },
    {
      icon: Code,
      title: "Development Formation",
      description: "Modern web development with practical projects and real-world applications.",
      status: "development"
    },
    {
      icon: Bot,
      title: "AI-Assisted Development",
      description: "Learn to leverage AI tools for accelerated software development.",
      status: "experimental"
    }
  ];

  return (
    <Section id="formations" data-testid="formations-section">
      <div className="container">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-label">Formations</span>
          <h2 className="section-title">Knowledge Transfer</h2>
          <p className="section-description">
            Modular educational programs designed for practical skill acquisition. 
            All formations are currently in development.
          </p>
        </motion.div>
        <div className="formations-grid">
          {formations.map((formation, i) => (
            <Card key={formation.title} {...formation} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};

// Transparency Section
const TransparencySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const statuses = [
    { icon: Zap, label: "Active", value: "Fully functional and maintained" },
    { icon: Clock, label: "In Development", value: "Under active construction" },
    { icon: Shield, label: "Experimental", value: "Research phase, may change" }
  ];

  return (
    <section ref={ref} className="section transparency-section" id="transparency" data-testid="transparency-section">
      <div className="container">
        <motion.div 
          className="transparency-box"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Philosophy</span>
          <h2 className="section-title" style={{ marginTop: '16px' }}>Transparent by Design</h2>
          <p className="section-description">
            Every project is clearly labeled with its current status. No marketing exaggeration, 
            no false promises. shaï's company builds systems step by step, with honesty at its core. 
            What you see is what exists—or what is genuinely being built.
          </p>
          <div className="transparency-grid">
            {statuses.map((status, i) => (
              <motion.div 
                key={status.label}
                className="transparency-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <div className="transparency-icon">
                  <status.icon size={24} />
                </div>
                <p className="transparency-label">{status.label}</p>
                <p className="transparency-value">{status.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const projectLinks = [
    { name: 'Music Label', href: '#music' },
    { name: 'AI Modules', href: '#ai' },
    { name: 'NotiaNote', href: '#education' },
    { name: 'Crypto Ecosystem', href: '#crypto' }
  ];

  const resourceLinks = [
    { name: 'Formations', href: '#formations' },
    { name: 'Documentation', href: '#' },
    { name: 'API Access', href: '#' }
  ];

  return (
    <footer className="footer" id="contact" data-testid="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo style={{ width: '32px', height: '32px' }} />
              <span>shaï's company</span>
            </div>
            <p className="footer-tagline">
              Independent studio building modular systems for the future.
            </p>
            <p className="footer-location">
              <MapPin size={14} /> France
            </p>
          </div>
          
          <div className="footer-column">
            <h4>Projects</h4>
            <div className="footer-links">
              {projectLinks.map(link => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            <div className="footer-links">
              {resourceLinks.map(link => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="mailto:dontbyshai@gmail.com" className="footer-link" data-testid="footer-email">
                <Mail size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                dontbyshai@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} shaï's company. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="App" data-testid="app-container">
      <HeroSection />
      <MusicSection />
      <div className="section-divider" />
      <AISection />
      <div className="section-divider" />
      <EducationSection />
      <div className="section-divider" />
      <CryptoSection />
      <div className="section-divider" />
      <FormationsSection />
      <TransparencySection />
      <Footer />
    </div>
  );
}

export default App;
