import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Calendar, Play, MapPin, ChevronLeft, ChevronRight, ArrowRight, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import { MoserGrid, KlimtCascade, HoffmannLeaves } from './components/SecessionArtworks';
import { translations, Language } from './translations';
import { Analytics } from '@vercel/analytics/react';

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.539-1.56.239z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.67.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.84 2.15-1.63 3.2-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

// Secessionist Ornament Component
const SecessionOrnament = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="w-px h-16 bg-vienna-gold"></div>
    <div className="grid grid-cols-2 gap-[2px] mt-1">
      <div className="w-1.5 h-1.5 bg-vienna-gold"></div>
      <div className="w-1.5 h-1.5 bg-secession-black"></div>
      <div className="w-1.5 h-1.5 bg-secession-black"></div>
      <div className="w-1.5 h-1.5 bg-vienna-gold"></div>
    </div>
  </div>
);

// Reusable Secessionist Frame
const SecessionFrame = ({ children, className = "", innerClassName = "" }: { children: React.ReactNode, className?: string, innerClassName?: string }) => (
  <div className={`relative p-8 md:p-12 bg-cream/80 backdrop-blur-md shadow-2xl border border-vienna-gold/20 ${className}`}>
    {/* Inner decorative border */}
    <div className="absolute inset-3 md:inset-4 border border-vienna-gold/40 pointer-events-none"></div>
    
    {/* Corner squares (Secessionist style) */}
    <div className="absolute top-2 left-2 w-2 h-2 bg-vienna-gold"></div>
    <div className="absolute top-2 right-2 w-2 h-2 bg-vienna-gold"></div>
    <div className="absolute bottom-2 left-2 w-2 h-2 bg-vienna-gold"></div>
    <div className="absolute bottom-2 right-2 w-2 h-2 bg-vienna-gold"></div>
    
    {/* Center accents */}
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-px bg-vienna-gold"></div>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-px bg-vienna-gold"></div>
    
    <div className={`relative z-10 pt-2 pb-2 px-2 ${innerClassName}`}>
      {children}
    </div>
  </div>
);

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || 
          target.tagName.toLowerCase() === 'a' || 
          target.closest('button') || 
          target.closest('a') ||
          target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-vienna-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-vienna-gold rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </>
  );
};

// Instrumental Scrollbar Component
const InstrumentalScrollbar = () => {
  const { scrollYProgress } = useScroll();
  const bowPosition = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const topPosition = useTransform(bowPosition, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-2 md:right-8 top-[20%] bottom-[20%] md:top-1/4 md:bottom-1/4 w-4 md:w-8 z-50 flex justify-center pointer-events-none opacity-60 md:opacity-100">
      {/* 4 Cello Strings */}
      <div className="flex justify-between w-2 md:w-4 h-full relative">
        <div className="w-[1px] md:w-[2px] h-full bg-secession-black/30" /> {/* C string */}
        <div className="w-[1px] md:w-[1.5px] h-full bg-secession-black/25" /> {/* G string */}
        <div className="w-[0.5px] md:w-[1px] h-full bg-secession-black/20" /> {/* D string */}
        <div className="w-[0.5px] h-full bg-secession-black/20" /> {/* A string */}
        
        {/* The Bow */}
        <motion.div
          className="absolute left-1/2 h-[1px] md:h-[2px] w-12 md:w-24 bg-cream shadow-[0_0_4px_rgba(255,255,255,0.8)] md:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            top: topPosition,
            x: "-50%",
            rotate: -6,
            marginTop: "-1px"
          }}
        >
          {/* Bow stick detail */}
          <div className="absolute -top-[3px] md:-top-[6px] left-0 right-0 h-[1px] md:h-[2px] bg-vienna-gold shadow-[0_0_2px_rgba(212,175,55,0.5)] md:shadow-[0_0_4px_rgba(212,175,55,0.5)]" />
          {/* Bow frog / handle detail */}
          <div className="absolute -top-[4px] md:-top-[8px] -right-[1px] md:-right-[2px] w-[4px] md:w-[8px] h-[6px] md:h-[12px] bg-imperial-red rounded-sm shadow-sm md:shadow-md" />
          {/* Bow tip */}
          <div className="absolute -top-[3px] md:-top-[6px] -left-[1px] md:-left-[2px] w-[2px] md:w-[4px] h-[4px] md:h-[8px] bg-vienna-gold rounded-l-full" />
        </motion.div>
      </div>
    </div>
  );
};

// Dummy Data
const CONCERTS = [
  {
    id: '1',
    date: '04. OKT 2025',
    time: 'Ganztägig',
    venue: 'Meisterkurs',
    location: 'Wien, Österreich',
    program: 'Meisterkurs bei Prof. Steven Isserlis',
    orchestra: '',
    conductor: '',
    ticketLink: '#',
    images: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ein intensiver Meisterkurs mit Fokus auf Interpretation und Technik. Die Teilnehmer haben die Möglichkeit, an ihrem Repertoire zu arbeiten und wertvolle Einblicke von Prof. Steven Isserlis zu erhalten.'
  },
  {
    id: '2',
    date: '23. JUL 2025',
    time: 'Ganztägig',
    venue: 'Meisterkurs',
    location: 'Wien, Österreich',
    program: 'Meisterkurs bei Jeremias Fliedl (bis 30.07.2025)',
    orchestra: '',
    conductor: '',
    ticketLink: '#',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Eine einwöchige Meisterklasse, die sich der Vertiefung des musikalischen Ausdrucks und der technischen Perfektion widmet. Jeremias Fliedl teilt seine Expertise in intensiven Einzelsitzungen und Gruppenworkshops.'
  },
  {
    id: '3',
    date: '01. JUL 2025',
    time: '19:30',
    venue: 'Konzertsaal',
    location: 'Wien, Österreich',
    program: 'Orchester Projekt',
    orchestra: 'Matrix Orchester',
    conductor: '',
    ticketLink: '#',
    images: [
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ein spannendes Orchesterprojekt mit dem Matrix Orchester. Auf dem Programm stehen Werke der klassischen und romantischen Epoche, dargeboten in einem der renommiertesten Konzertsäle Wiens.'
  },
  {
    id: '4',
    date: '01. MAI 2025',
    time: '20:00',
    venue: 'Hofburg',
    location: 'Wien, Österreich',
    program: 'Galakonzert des OPEC-Kongress',
    orchestra: '',
    conductor: '',
    ticketLink: '#',
    images: [
      'https://images.unsplash.com/photo-1593698054469-2bb0f0599846?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ein exklusives Galakonzert im Rahmen des OPEC-Kongresses in der historischen Wiener Hofburg. Ein Abend voller musikalischer Höhepunkte in einem atemberaubenden Ambiente.'
  }
];

const RECORDINGS = [
  {
    id: '1',
    title: 'Schumann: Adagio and Allegro',
    year: '2024',
    label: 'Independent',
    image: 'https://images.unsplash.com/photo-1690278813437-9aeb9a219d02?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    youtubeId: 'gM-T-1T0tEU',
    description: 'A deeply personal interpretation of Schumann\'s Adagio and Allegro in A flat Major, op. 70.',
    gallery: [
      'https://images.unsplash.com/photo-1607590207577-62402264d12c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585068249021-3e47340d70f1?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    title: 'Schumann: Piano Quintet',
    year: '2023',
    label: 'Independent',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
    youtubeId: '_8yE3E_389E',
    description: 'Piano Quintet in E flat Major, op. 44. Recorded with an outstanding chamber music ensemble.',
    gallery: [
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    title: 'Bach: Cello Suite No. 1',
    year: '2022',
    label: 'Independent',
    image: 'https://images.unsplash.com/photo-1579624594611-285671c6670a?q=80&w=800&auto=format&fit=crop',
    youtubeId: '1prweT95Mo0',
    description: 'A timeless performance of J.S. Bach\'s Cello Suite No. 1 in G Major, BWV 1007.',
    gallery: [
      'https://images.unsplash.com/photo-1579624594611-285671c6670a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460036521480-a5bb28121631?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    title: 'Brahms: Cello Sonata No. 1',
    year: '2021',
    label: 'Independent',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    youtubeId: 'b9X18A-wJ1g',
    description: 'Brahms Cello Sonata No. 1 in E minor, Op. 38. A rich and expressive interpretation.',
    gallery: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const AWARDS_AND_PRESS = [
  {
    id: 'foerderstipendium-ma7-2026',
    year: '19.03.2026',
    title: 'Förderstipendium der MA 7',
    description: 'Gewann ein Förderstipendium der MA 7 für herausragende Abschlussarbeiten in Höhe von 1000€',
    fullDescription: 'Gewann ein Förderstipendium der MA 7 für herausragende Abschlussarbeiten in Höhe von 1000€',
    image: 'https://tse3.mm.bing.net/th/id/OIP.NrnuaxskBMu5sWmIaiMyqgHaFb?rs=1&pid=ImgDetMain&o=7&rm=3',
    type: 'award'
  },
  {
    id: 'leistungsstipendium-2024',
    year: '19.11.2024',
    title: 'Leistungsstipendium der MUK',
    description: 'Gewann ein Leistungsstipendium der Musik und Kunst Privatuniversität der Stadt Wien in Höhe von 1500€',
    fullDescription: 'Gewann ein Leistungsstipendium der Musik und Kunst Privatuniversität der Stadt Wien in Höhe von 1500€',
    image: 'https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e5653d035f9b0ed0eb10048dacf341a237464cf2b436326716bf37ee4f0e20be811212be510a13ef06525d0e5c5ccc8c1',
    type: 'award'
  },
  {
    id: 'erasmus-2024',
    year: '08.01.2024',
    title: 'Erasmus+ Stipendium in Deutschland',
    description: 'Gewann ein Stipendium an der Folkwang Universität der Künste in Essen bei Prof. Christoph Richter.',
    fullDescription: 'Gewann ein Stipendium an der Folkwang Universität der Künste in Essen bei Prof. Christoph Richter.',
    image: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/a6a5150c-3d46-5c3a-b08d-d3b30f75b45c/4c7e917e-3b3f-507a-b6d0-d2190705d1bc.jpg',
    type: 'award'
  },
  {
    id: 'prima-la-musica-bundes-2018',
    year: '09.06.2018',
    title: 'Bundeswettbewerb Prima La Musica',
    description: 'Gewann den 2. Preis mit 85,80 Punkten, der Wertungskategorie Violoncello IIIplus',
    fullDescription: 'Gewann den 2. Preis mit 85,80 Punkten, der Wertungskategorie Violoncello IIIplus',
    image: 'https://musikderjugend.at/fileadmin/daten/allgemein/Logos_Musik_der_Jugend.svg',
    type: 'award'
  },
  {
    id: 'prima-la-musica-landes-2018',
    year: '25.02.2018',
    title: 'Landeswettbewerb Prima La Musica',
    description: 'Gewann den 1. Preis mit 93 Punkten, der Wertungskategorie Violoncello IIIplus',
    fullDescription: 'Gewann den 1. Preis mit 93 Punkten, der Wertungskategorie Violoncello IIIplus',
    image: 'https://musikderjugend.at/fileadmin/daten/allgemein/Logos_Musik_der_Jugend.svg',
    type: 'award'
  },
  {
    id: 'prima-la-musica-bundes-2015',
    year: '09.06.2015',
    title: 'Bundeswettbewerb Prima La Musica',
    description: 'Gewann den 2. Preis, der Wertungskategorie Kammermusik für Klavier',
    fullDescription: 'Gewann den 2. Preis, der Wertungskategorie Kammermusik für Klavier',
    image: 'https://musikderjugend.at/fileadmin/daten/allgemein/Logos_Musik_der_Jugend.svg',
    type: 'award'
  },
  {
    id: 'prima-la-musica-landes-2015',
    year: '24.02.2015',
    title: 'Landeswettbewerb Prima La Musica',
    description: 'Gewann den 1. Preis, der Wertungskategorie Kammermusik für Klavier',
    fullDescription: 'Gewann den 1. Preis, der Wertungskategorie Kammermusik für Klavier',
    image: 'https://musikderjugend.at/fileadmin/daten/allgemein/Logos_Musik_der_Jugend.svg',
    type: 'award'
  }
];

const Imprint = ({ t }: { t: any }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
    <SecessionFrame className="p-8 md:p-16 bg-cream">
      <h1 className="text-4xl md:text-7xl font-serif mb-6 md:mb-10 text-secession-black italic text-center">{t.imprint.title}</h1>
      <SecessionOrnament className="mb-10" />
      <div className="space-y-4 md:space-y-6 text-secession-black/80 font-medium text-base md:text-lg leading-relaxed">
        <p>{t.imprint.info}</p>
        
        <div className="my-8">
          <h2 className="text-2xl font-serif font-bold mb-2 text-secession-black">Bernadette König</h2>
          <p>Kärntner Straße 1</p>
          <p>1010 Wien</p>
          <p>Österreich</p>
        </div>

        <div className="my-8">
          <p><strong>Tel.:</strong> +43 1 234 5678</p>
          <p><strong>E-Mail:</strong> <a href="mailto:management@bernadettekoenig.com" className="hover:text-vienna-gold transition-colors">management@bernadettekoenig.com</a></p>
        </div>

        <div className="my-8">
          <p><strong>UID-Nummer:</strong> ATU12345678</p>
          <p><strong>{t.imprint.jobTitle}</strong></p>
        </div>

        <div className="pt-8 border-t border-secession-black/10">
          <h3 className="text-xl font-bold mb-4 text-secession-black">{t.imprint.euDisputeTitle}</h3>
          <p>{t.imprint.euDisputeText}</p>
        </div>

        <div className="pt-8 border-t border-secession-black/10">
          <h3 className="text-xl font-bold mb-4 text-secession-black">{t.imprint.liabilityTitle}</h3>
          <p>{t.imprint.liabilityText}</p>
        </div>
      </div>
    </SecessionFrame>
  </motion.div>
);

const PrivacyPolicy = ({ t }: { t: any }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
    <SecessionFrame className="p-8 md:p-16 bg-cream">
      <h1 className="text-4xl md:text-7xl font-serif mb-6 md:mb-10 text-secession-black italic text-center">{t.privacy.title}</h1>
      <SecessionOrnament className="mb-10" />
      <div className="space-y-4 md:space-y-6 text-secession-black/80 font-medium text-base md:text-lg leading-relaxed">
        <p>{t.privacy.intro}</p>
        
        <h2 className="text-3xl font-serif mt-12 mb-4 text-secession-black">{t.privacy.section1Title}</h2>
        <p>{t.privacy.section1Text}</p>
        <p className="pl-4 border-l-2 border-vienna-gold">Bernadette König<br/>Kärntner Straße 1<br/>1010 Wien, Österreich<br/>E-Mail: management@bernadettekoenig.com</p>

        <h2 className="text-3xl font-serif mt-12 mb-4 text-secession-black">{t.privacy.section2Title}</h2>
        <h3 className="text-xl font-bold mb-2 text-secession-black">{t.privacy.section2Subtitle}</h3>
        <p>{t.privacy.section2Text1}</p>
        <p>{t.privacy.section2Text2}</p>

        <h2 className="text-3xl font-serif mt-12 mb-4 text-secession-black">{t.privacy.section3Title}</h2>
        <p>{t.privacy.section3Text}</p>

        <h2 className="text-3xl font-serif mt-12 mb-4 text-secession-black">{t.privacy.section4Title}</h2>
        <p>{t.privacy.section4Text}</p>
        <p className="pl-4 border-l-2 border-vienna-gold">Österreichische Datenschutzbehörde<br/>Barichgasse 40-42<br/>1030 Wien<br/>Telefon: +43 1 52 152-0<br/>E-Mail: dsb@dsb.gv.at</p>
      </div>
    </SecessionFrame>
  </motion.div>
);

const TheatreCurtain = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none">
      {/* SVG Filter for Velvet Texture */}
      <svg className="hidden">
        <filter id="velvet-noise">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
        </filter>
      </svg>

      {/* Left Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.64, 0, 0.13, 1] }}
        onAnimationComplete={onComplete}
        className="w-1/2 h-full relative pointer-events-auto z-10"
        style={{
          background: 'linear-gradient(90deg, #4a0000 0%, #8b0000 15%, #5a0000 30%, #9b0000 45%, #4a0000 60%, #8b0000 75%, #5a0000 90%, #a00000 100%)',
          borderRight: '6px solid #D4AF37',
          boxShadow: '10px 0 30px rgba(0,0,0,0.7)'
        }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ filter: 'url(#velvet-noise)' }}></div>
        {/* Fringe */}
        <div className="absolute top-0 bottom-0 right-[-6px] w-[6px] bg-[repeating-linear-gradient(0deg,#D4AF37,#D4AF37_2px,#B8860B_2px,#B8860B_4px)]"></div>
      </motion.div>
      
      {/* Right Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.8, delay: 0.8, ease: [0.64, 0, 0.13, 1] }}
        className="w-1/2 h-full relative pointer-events-auto z-10"
        style={{
          background: 'linear-gradient(270deg, #4a0000 0%, #8b0000 15%, #5a0000 30%, #9b0000 45%, #4a0000 60%, #8b0000 75%, #5a0000 90%, #a00000 100%)',
          borderLeft: '6px solid #D4AF37',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.7)'
        }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ filter: 'url(#velvet-noise)' }}></div>
        {/* Fringe */}
        <div className="absolute top-0 bottom-0 left-[-6px] w-[6px] bg-[repeating-linear-gradient(0deg,#D4AF37,#D4AF37_2px,#B8860B_2px,#B8860B_4px)]"></div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const wienY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const wienOpacity = useTransform(scrollYProgress, [0, 0.3], [0.03, 0]);
  const wienScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroImageRotate = useTransform(scrollYProgress, [0, 0.2], [0, 2]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'imprint' | 'privacy' | 'recording'>('home');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);
  const [selectedAwardId, setSelectedAwardId] = useState<string | null>(null);
  const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  // Biography scroll animation hooks
  const bioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bioScrollProgressRaw } = useScroll({
    target: bioRef,
    offset: ["start 95%", "start 5%"]
  });
  
  const bioScrollProgress = useSpring(bioScrollProgressRaw, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const p1Opacity = useTransform(bioScrollProgress, [0, 0.16], [0, 1]);
  const p1Y = useTransform(bioScrollProgress, [0, 0.16], [20, 0]);
  const p1Blur = useTransform(bioScrollProgress, [0, 0.16], ["blur(10px)", "blur(0px)"]);

  const p2Opacity = useTransform(bioScrollProgress, [0.16, 0.33], [0, 1]);
  const p2Y = useTransform(bioScrollProgress, [0.16, 0.33], [20, 0]);
  const p2Blur = useTransform(bioScrollProgress, [0.16, 0.33], ["blur(10px)", "blur(0px)"]);

  const p3Opacity = useTransform(bioScrollProgress, [0.33, 0.5], [0, 1]);
  const p3Y = useTransform(bioScrollProgress, [0.33, 0.5], [20, 0]);
  const p3Blur = useTransform(bioScrollProgress, [0.33, 0.5], ["blur(10px)", "blur(0px)"]);

  const p4Opacity = useTransform(bioScrollProgress, [0.5, 0.66], [0, 1]);
  const p4Y = useTransform(bioScrollProgress, [0.5, 0.66], [20, 0]);
  const p4Blur = useTransform(bioScrollProgress, [0.5, 0.66], ["blur(10px)", "blur(0px)"]);

  const p5Opacity = useTransform(bioScrollProgress, [0.66, 0.83], [0, 1]);
  const p5Y = useTransform(bioScrollProgress, [0.66, 0.83], [20, 0]);
  const p5Blur = useTransform(bioScrollProgress, [0.66, 0.83], ["blur(10px)", "blur(0px)"]);

  const p6Opacity = useTransform(bioScrollProgress, [0.83, 1], [0, 1]);
  const p6Y = useTransform(bioScrollProgress, [0.83, 1], [20, 0]);
  const p6Blur = useTransform(bioScrollProgress, [0.83, 1], ["blur(10px)", "blur(0px)"]);

  // Handle scroll events for header and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['biography', 'awards', 'recordings', 'calendar', 'contact'];
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRecordingId(null);
        setFullscreenImage(null);
        if (currentPage === 'recording') {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream text-secession-black font-sans selection:bg-vienna-gold selection:text-cream relative">
      <AnimatePresence>
        {showCurtain && <TheatreCurtain onComplete={() => setShowCurtain(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <div className="bg-noise" />
      <InstrumentalScrollbar />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-cream/95 backdrop-blur-md border-b border-secession-black/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-secession-black cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            Bernadette König
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase font-semibold text-secession-black/80">
            {[
              { label: t.nav.biography, id: 'biography' },
              { label: t.nav.awards, id: 'awards' },
              { label: t.nav.recordings, id: 'recordings' },
              { label: t.nav.projects, id: 'calendar' },
              { label: t.nav.contact, id: 'contact' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-vienna-gold transition-colors cursor-pointer bg-transparent border-none relative ${activeSection === item.id ? 'text-vienna-gold' : ''}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="activeNav" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-vienna-gold rounded-full" />
                )}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-4 border-l border-secession-black/20 pl-6">
              <button 
                onClick={() => setLang('de')} 
                className={`transition-colors ${lang === 'de' ? 'text-vienna-gold font-bold' : 'hover:text-vienna-gold'}`}
              >
                DE
              </button>
              <span>|</span>
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors ${lang === 'en' ? 'text-vienna-gold font-bold' : 'hover:text-vienna-gold'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-secession-black z-50 relative p-2 -mr-2 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
             {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <SecessionOrnament className="mb-8" />
            {[
              { label: t.nav.biography, id: 'biography' },
              { label: t.nav.awards, id: 'awards' },
              { label: t.nav.recordings, id: 'recordings' },
              { label: t.nav.projects, id: 'calendar' },
              { label: t.nav.contact, id: 'contact' }
            ].map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-serif text-secession-black hover:text-vienna-gold transition-colors bg-transparent border-none"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mt-4 text-xl font-serif"
            >
              <button 
                onClick={() => { setLang('de'); setMobileMenuOpen(false); }} 
                className={`transition-colors ${lang === 'de' ? 'text-vienna-gold font-bold' : 'hover:text-vienna-gold'}`}
              >
                DE
              </button>
              <span>|</span>
              <button 
                onClick={() => { setLang('en'); setMobileMenuOpen(false); }} 
                className={`transition-colors ${lang === 'en' ? 'text-vienna-gold font-bold' : 'hover:text-vienna-gold'}`}
              >
                EN
              </button>
            </motion.div>
            <SecessionOrnament className="mt-4" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO SECTION */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-16 sm:pt-20 px-4 sm:px-6">
          {/* Huge background text */}
          <motion.div 
            style={{ y: wienY, opacity: wienOpacity, scale: wienScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif font-bold text-secession-black whitespace-nowrap pointer-events-none select-none"
          >
            WIEN
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10">
            <motion.div 
              style={{ y, opacity }}
              className="flex flex-col items-start mt-2 sm:mt-8 lg:mt-0 lg:col-span-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4 md:mb-6"
              >
                <div className="w-6 sm:w-8 h-px bg-vienna-gold" />
                <span className="text-vienna-gold tracking-[0.3em] uppercase text-[10px] sm:text-xs font-bold">
                  {t.hero.cellist}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-[3.5rem] leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-secession-black"
              >
                Bernadette <br/>
                <span className="italic font-light">König</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-4 sm:mt-6 md:mt-10 text-xs sm:text-base md:text-lg font-medium text-secession-black/70 max-w-md leading-relaxed border-l-2 border-vienna-gold pl-3 sm:pl-4 md:pl-6"
              >
                {t.hero.quote} <br/>
                <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mt-2 md:mt-4 block text-secession-black/50 font-bold">{t.hero.quoteAuthor}</span>
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                onClick={() => scrollToSection('recordings')}
                className="mt-4 sm:mt-6 md:mt-10 flex items-center gap-2 sm:gap-3 text-secession-black hover:text-vienna-gold transition-colors font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs border border-secession-black hover:border-vienna-gold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4"
              >
                {t.hero.listenRecordings} <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </motion.div>

            {/* Arch Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ y: heroImageY, scale: heroImageScale, rotate: heroImageRotate }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className="relative w-full h-[65vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] mt-6 lg:mt-0 max-w-lg sm:max-w-xl mx-auto lg:max-w-none lg:col-span-7"
            >
              <div className="absolute inset-0 bg-secession-black rounded-t-[140px] sm:rounded-t-[200px] lg:rounded-t-[300px] overflow-hidden cursor-pointer" onClick={() => setFullscreenImage("https://scontent-vie1-1.cdninstagram.com/v/t51.75761-15/504294764_18375063745126767_2542406022236296222_n.webp?stp=dst-webp_p750x750_sh0.08&_nc_cat=108&ig_cache_key=MzY1MjA4MDM2OTkyNjE5NzU1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=X5iqosgSUCoQ7kNvwHSU32B&_nc_oc=AdrHFGoCcgwHwwO7k_IX10Jcn9G9bqZ1Ex8g5C_CdsOUbLqhRRZEpxdH743tbmcfw1fn37ZtHu3_krmZBxvHZ8jD&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_gid=Nd66GKbRMSxTLvoHpyH38w&_nc_ss=7a32e&oh=00_Af2V6XRkx6LPGmOg3WsLQUwVhDr6wg7S1_21mlnv_Oyaew&oe=69DC2536")}>
                <img 
                  src="https://scontent-vie1-1.cdninstagram.com/v/t51.75761-15/504294764_18375063745126767_2542406022236296222_n.webp?stp=dst-webp_p750x750_sh0.08&_nc_cat=108&ig_cache_key=MzY1MjA4MDM2OTkyNjE5NzU1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=X5iqosgSUCoQ7kNvwHSU32B&_nc_oc=AdrHFGoCcgwHwwO7k_IX10Jcn9G9bqZ1Ex8g5C_CdsOUbLqhRRZEpxdH743tbmcfw1fn37ZtHu3_krmZBxvHZ8jD&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_gid=Nd66GKbRMSxTLvoHpyH38w&_nc_ss=7a32e&oh=00_Af2V6XRkx6LPGmOg3WsLQUwVhDr6wg7S1_21mlnv_Oyaew&oe=69DC2536" 
                  alt="Bernadette König playing cello" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_20%] lg:object-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-2 lg:-inset-4 border border-vienna-gold/30 rounded-t-[150px] sm:rounded-t-[210px] lg:rounded-t-[320px] pointer-events-none" />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-secession-black/50 font-bold">Scroll</span>
            <div className="w-px h-12 bg-secession-black/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-vienna-gold"
              />
            </div>
          </motion.div>
        </header>

        {/* BIOGRAPHY SECTION */}
        <section id="biography" className="py-16 md:py-32 bg-secession-black text-cream px-6 md:px-12 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          {/* Decorative Klimt Cascade */}
          <div className="absolute right-0 top-1/4 w-32 md:w-64 opacity-20 pointer-events-none translate-x-1/4">
            <KlimtCascade className="w-full h-auto" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SecessionOrnament className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-vienna-gold" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-8 md:mt-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="lg:col-span-5 relative"
              >
                <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden border-4 lg:border-8 border-vienna-gold/30 shadow-2xl relative z-10 max-w-md mx-auto lg:max-w-none cursor-pointer" onClick={() => setFullscreenImage("https://scontent-vie1-1.cdninstagram.com/v/t51.75761-15/504824538_18375063748126767_8152850662367009473_n.webp?stp=dst-webp_p750x750_sh0.08&_nc_cat=103&ig_cache_key=MzY1MjA4MDM2OTkwOTUyNDQzNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=6Q08o2Vf5QUQ7kNvwG0d8-Q&_nc_oc=AdrWponx1iJJjG6rKw4fE_r8PYN9Qj91CmJCcJlnhcmkTq7jq6G1aHJ0RiRTEtBAEJwM6gi37DgXt-Jksy2uanSx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_gid=Nd66GKbRMSxTLvoHpyH38w&_nc_ss=7a32e&oh=00_Af09hw6Pe4urIrHVkDnOeTsTb4_rLJ2zwR1IVx_c8aKtjw&oe=69DC1BE0")}>
                  <img 
                    src="https://scontent-vie1-1.cdninstagram.com/v/t51.75761-15/504824538_18375063748126767_8152850662367009473_n.webp?stp=dst-webp_p750x750_sh0.08&_nc_cat=103&ig_cache_key=MzY1MjA4MDM2OTkwOTUyNDQzNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=6Q08o2Vf5QUQ7kNvwG0d8-Q&_nc_oc=AdrWponx1iJJjG6rKw4fE_r8PYN9Qj91CmJCcJlnhcmkTq7jq6G1aHJ0RiRTEtBAEJwM6gi37DgXt-Jksy2uanSx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_gid=Nd66GKbRMSxTLvoHpyH38w&_nc_ss=7a32e&oh=00_Af09hw6Pe4urIrHVkDnOeTsTb4_rLJ2zwR1IVx_c8aKtjw&oe=69DC1BE0" 
                    alt="Cello details" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Geometric background accent */}
                <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-full h-full bg-vienna-gold/20 z-0 max-w-md mx-auto lg:max-w-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="lg:col-span-7 lg:pl-12"
              >
                <h2 className="text-4xl md:text-7xl font-serif mb-6 md:mb-10 text-vienna-gold italic">{t.biography.title}</h2>
                <SecessionFrame className="!bg-secession-black/50 border-vienna-gold/30">
                  <motion.div 
                    ref={bioRef}
                    className="space-y-4 md:space-y-6 text-cream/80 leading-relaxed text-base md:text-lg font-medium"
                  >
                    <motion.p style={{ opacity: p1Opacity, y: p1Y, filter: p1Blur }}>
                      {t.biography.text1}
                    </motion.p>
                    <motion.p style={{ opacity: p2Opacity, y: p2Y, filter: p2Blur }}>
                      {t.biography.text2}
                    </motion.p>
                    <motion.p style={{ opacity: p3Opacity, y: p3Y, filter: p3Blur }}>
                      {t.biography.text3}
                    </motion.p>
                    <motion.p style={{ opacity: p4Opacity, y: p4Y, filter: p4Blur }}>
                      {t.biography.text4}
                    </motion.p>
                    <motion.p style={{ opacity: p5Opacity, y: p5Y, filter: p5Blur }}>
                      {t.biography.text5}
                    </motion.p>
                    <motion.p style={{ opacity: p6Opacity, y: p6Y, filter: p6Blur }}>
                      {t.biography.text6}
                    </motion.p>
                  </motion.div>
                </SecessionFrame>
                <button className="mt-12 flex items-center gap-3 text-vienna-gold hover:text-cream transition-colors font-bold tracking-[0.2em] uppercase text-xs">
                  {t.biography.downloadCV} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AWARDS & RECOGNITION SECTION */}
        <section id="awards" className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <SecessionFrame className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              <div className="lg:w-1/3 lg:sticky top-32 relative">
                {/* Decorative background ampersand */}
                <div className="absolute -top-12 -left-8 md:-top-20 md:-left-12 text-[10rem] md:text-[14rem] font-serif text-vienna-gold/10 select-none pointer-events-none italic leading-none z-0">
                  &
                </div>
                
                <h2 className="relative z-10 flex flex-col mb-8">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-serif text-secession-black leading-tight mb-2" style={{ hyphens: 'auto', wordBreak: 'break-word' }}>
                    {t.awards.title}
                  </span>
                  <span className="flex items-center gap-4 mt-2">
                    <span className="text-3xl md:text-4xl font-serif text-imperial-red italic">&</span>
                    <span className="text-sm md:text-base font-sans tracking-[0.4em] uppercase text-secession-black font-bold">
                      {t.awards.prizes}
                    </span>
                    <div className="flex-1 h-px bg-vienna-gold/50 ml-2"></div>
                  </span>
                </h2>
                <SecessionOrnament className="items-start relative z-10" />
              </div>
              <div className="lg:w-2/3 space-y-12 md:space-y-16">
                {AWARDS_AND_PRESS.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-vienna-gold/30 p-6 md:p-8 relative group cursor-pointer bg-white/40 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-md"
                    onClick={() => setSelectedAwardId(item.id)}
                  >
                    {/* Secessionist Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-vienna-gold"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-vienna-gold"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-vienna-gold"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-vienna-gold"></div>
                    
                    {/* Inner subtle border on hover */}
                    <div className="absolute inset-2 border border-vienna-gold/0 group-hover:border-vienna-gold/20 transition-colors duration-500 pointer-events-none"></div>

                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start relative z-10">
                      <div className="flex-1 order-2 sm:order-1">
                        <span className="text-imperial-red font-bold tracking-widest text-xs md:text-sm uppercase flex items-center gap-3">
                          <span className="w-2 h-2 bg-vienna-gold inline-block rotate-45 group-hover:bg-imperial-red group-hover:rotate-[135deg] transition-all duration-500"></span>
                          {item.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif text-secession-black mt-3 mb-3 group-hover:text-imperial-red transition-colors duration-300 leading-snug">{item.title}</h3>
                        <p className="text-secession-black/70 font-medium leading-relaxed italic text-sm md:text-base">
                          {item.description}
                        </p>
                        <span className="inline-flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-widest text-vienna-gold group-hover:text-imperial-red transition-colors duration-300">
                          Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                      <div className="w-full sm:w-32 md:w-40 lg:w-48 aspect-video sm:aspect-square overflow-hidden border-2 border-vienna-gold/30 shrink-0 order-1 sm:order-2 relative">
                        <div className="absolute inset-0 bg-vienna-gold/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SecessionFrame>
        </section>

        {/* RECORDINGS SECTION */}
        <section id="recordings" className="py-16 md:py-32 bg-secession-black text-cream px-6 md:px-12 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          {/* Decorative Moser Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <MoserGrid className="w-full max-w-4xl h-auto" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
              <div>
                <h2 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-vienna-gold">{t.recordings.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {RECORDINGS.map((rec, index) => (
                <motion.div 
                  key={rec.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedRecordingId(rec.id);
                    setCurrentPage('recording');
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="relative aspect-square overflow-hidden mb-8 border border-cream/10 p-4">
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src={rec.image} 
                        alt={rec.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-secession-black/40 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-vienna-gold flex items-center justify-center text-vienna-gold backdrop-blur-md bg-secession-black/50">
                          <Play className="w-6 h-6 lg:w-8 lg:h-8 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif text-cream">{rec.title}</h3>
                    <span className="text-vienna-gold text-sm font-bold tracking-widest">{rec.year}</span>
                  </div>
                  <p className="text-xs text-imperial-red font-bold uppercase tracking-[0.2em] mb-4">{rec.label}</p>
                  <p className="text-sm text-cream/60 font-medium leading-relaxed">
                    {rec.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALENDAR SECTION */}
        <section id="calendar" className="py-16 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24 relative">
            <SecessionOrnament className="absolute -top-16 left-1/2 -translate-x-1/2" />
            <h2 className="text-4xl md:text-7xl font-serif mb-4 md:mb-6 text-secession-black">{t.calendar.title}</h2>
            <p className="text-secession-black/60 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">{t.calendar.season}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONCERTS.map((concert, index) => (
              <motion.div 
                key={concert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-vienna-gold/30 p-8 relative group cursor-pointer bg-white/40 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-md flex flex-col"
                onClick={() => setSelectedConcertId(concert.id)}
              >
                {/* Secessionist Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-vienna-gold"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-vienna-gold"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-vienna-gold"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-vienna-gold"></div>

                {/* Date & Time */}
                <div className="mb-6">
                  <div className="text-imperial-red font-bold tracking-[0.1em] text-lg mb-2">{concert.date}</div>
                  <div className="text-secession-black/60 text-sm flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4" /> {concert.time}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 mb-8">
                  <h3 className="text-2xl font-serif text-secession-black mb-4 group-hover:text-imperial-red transition-colors leading-tight">
                    {concert.program}
                  </h3>
                  <div className="text-secession-black/80 font-medium text-base mb-4 space-y-1">
                    {concert.orchestra && <p>{concert.orchestra}</p>}
                    {concert.conductor && <p className="text-secession-black/60">Dirigent: {concert.conductor}</p>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-secession-black/50 uppercase tracking-[0.1em] font-bold">
                    <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{concert.venue}, {concert.location}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-auto flex items-center justify-between border-t border-vienna-gold/20 pt-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-secession-black/50 group-hover:text-imperial-red transition-colors">
                    Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => setIsCalendarModalOpen(true)}
              className="px-10 py-4 border border-secession-black text-secession-black hover:bg-secession-black hover:text-cream transition-colors text-xs font-bold tracking-[0.2em] uppercase"
            >
              Alle Termine ansehen
            </button>
          </div>
        </section>
        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <SecessionFrame className="!p-8 md:!p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-serif mb-8 text-secession-black italic">{t.contact.title}</h2>
                <p className="text-secession-black/80 font-medium text-lg leading-relaxed mb-8 max-w-md">
                  {t.contact.description}
                </p>
                <SecessionOrnament className="items-start opacity-50" />
              </motion.div>
              
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 relative" 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormStatus('submitting');
                  setTimeout(() => setFormStatus('success'), 1500);
                }}
              >
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-cream/95 backdrop-blur-sm border border-vienna-gold/30 p-8 text-center"
                    >
                      <CheckCircle2 className="w-16 h-16 text-vienna-gold mb-4" />
                      <h3 className="text-2xl font-serif text-secession-black mb-2">Vielen Dank!</h3>
                      <p className="text-secession-black/70 font-medium">Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.</p>
                      <button 
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="mt-8 px-8 py-3 border border-secession-black text-secession-black hover:bg-secession-black hover:text-cream transition-colors text-xs font-bold tracking-[0.2em] uppercase"
                      >
                        Neue Nachricht
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`transition-opacity duration-300 ${formStatus !== 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold tracking-[0.2em] uppercase text-secession-black">Name</label>
                      <input type="text" id="name" className="w-full bg-transparent border-b border-secession-black/30 py-3 px-2 focus:outline-none focus:border-vienna-gold focus:bg-vienna-gold/5 transition-all text-secession-black placeholder:text-secession-black/30" placeholder="Ihr Name" required disabled={formStatus !== 'idle'} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold tracking-[0.2em] uppercase text-secession-black">E-Mail</label>
                      <input type="email" id="email" className="w-full bg-transparent border-b border-secession-black/30 py-3 px-2 focus:outline-none focus:border-vienna-gold focus:bg-vienna-gold/5 transition-all text-secession-black placeholder:text-secession-black/30" placeholder="Ihre E-Mail-Adresse" required disabled={formStatus !== 'idle'} />
                    </div>
                  </div>
                  <div className="space-y-2 mb-8">
                    <label htmlFor="subject" className="text-xs font-bold tracking-[0.2em] uppercase text-secession-black">Betreff</label>
                    <input type="text" id="subject" className="w-full bg-transparent border-b border-secession-black/30 py-3 px-2 focus:outline-none focus:border-vienna-gold focus:bg-vienna-gold/5 transition-all text-secession-black placeholder:text-secession-black/30" placeholder="Betreff Ihrer Nachricht" required disabled={formStatus !== 'idle'} />
                  </div>
                  <div className="space-y-2 mb-8">
                    <label htmlFor="message" className="text-xs font-bold tracking-[0.2em] uppercase text-secession-black">Nachricht</label>
                    <textarea id="message" rows={4} className="w-full bg-transparent border-b border-secession-black/30 py-3 px-2 focus:outline-none focus:border-vienna-gold focus:bg-vienna-gold/5 transition-all text-secession-black resize-none placeholder:text-secession-black/30" placeholder="Ihre Nachricht" required disabled={formStatus !== 'idle'}></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus !== 'idle'}
                    className="px-10 py-4 bg-secession-black text-cream hover:bg-vienna-gold transition-colors text-xs font-bold tracking-[0.2em] uppercase w-full md:w-auto disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {formStatus === 'submitting' ? (
                      <>Senden... <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" /></>
                    ) : (
                      'Nachricht senden'
                    )}
                  </button>
                </div>
              </motion.form>
            </div>
          </SecessionFrame>
        </section>
          </motion.div>
        )}

        {currentPage === 'imprint' && (
          <motion.div key="imprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <Imprint t={t} />
          </motion.div>
        )}
        {currentPage === 'privacy' && (
          <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <PrivacyPolicy t={t} />
          </motion.div>
        )}
        {currentPage === 'recording' && selectedRecordingId && (
          <motion.div 
            key="recording" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5 }}
            className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen"
          >
            <button 
              onClick={() => { setCurrentPage('home'); setSelectedRecordingId(null); window.scrollTo(0, 0); }}
              className="mb-8 flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-secession-black hover:text-vienna-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Zurück zur Übersicht
            </button>
            
            {(() => {
              const rec = RECORDINGS.find(r => r.id === selectedRecordingId);
              if (!rec) return null;
              return (
                <div className="space-y-12">
                  <SecessionFrame className="!p-8 md:!p-16">
                    <div className="text-center max-w-3xl mx-auto">
                      <span className="text-imperial-red font-bold tracking-widest text-sm uppercase">{rec.year} • {rec.label}</span>
                      <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-6 text-secession-black italic">{rec.title}</h1>
                      <SecessionOrnament className="my-8" />
                      <p className="text-secession-black/80 font-medium text-lg leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </SecessionFrame>

                  {rec.youtubeId && (
                    <div className="aspect-video w-full bg-secession-black border-4 border-vienna-gold shadow-2xl relative">
                      <iframe 
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${rec.youtubeId}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {rec.gallery && rec.gallery.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {rec.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden border-4 border-cream shadow-xl cursor-pointer" onClick={() => setFullscreenImage(img)}>
                          <img src={img} alt={`${rec.title} gallery ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-secession-black text-cream py-16 md:py-24 px-6 md:px-12 border-t-8 border-vienna-gold relative overflow-hidden">
        {/* Decorative Hoffmann Leaves */}
        <div className="absolute right-0 bottom-0 w-64 md:w-96 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
          <HoffmannLeaves className="w-full h-auto" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 relative z-10">
          <div className="lg:col-span-2">
            <div className="font-serif text-3xl md:text-4xl font-medium mb-6 md:mb-8 text-vienna-gold italic">
              Bernadette König
            </div>
            <p className="text-cream/70 font-medium max-w-sm leading-relaxed mb-8 text-sm md:text-base">
              Für allgemeine Anfragen, Meisterkurse und Pressematerialien kontaktieren Sie bitte das Management.
            </p>
            <SecessionOrnament className="items-start opacity-50" />
          </div>
          
          <div>
            <h4 className="text-imperial-red text-xs font-bold tracking-[0.2em] uppercase mb-8">Management</h4>
            <ul className="space-y-4 text-cream/80 font-medium text-sm">
              <li>
                <strong className="text-cream block mb-1">Bernadette König</strong>
                Wien, Österreich
              </li>
              <li>
                <a href="mailto:management@bernadettekoenig.com" className="hover:text-vienna-gold transition-colors">
                  management@bernadettekoenig.com
                </a>
              </li>
              <li>+43 1 234 5678</li>
            </ul>
          </div>

          <div>
            <h4 className="text-imperial-red text-xs font-bold tracking-[0.2em] uppercase mb-8">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="text-cream/80 hover:text-vienna-gold transition-all hover:scale-110 hover:-translate-y-1" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream/80 hover:text-vienna-gold transition-all hover:scale-110 hover:-translate-y-1" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream/80 hover:text-vienna-gold transition-all hover:scale-110 hover:-translate-y-1" aria-label="Spotify">
                <SpotifyIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream/80 hover:text-vienna-gold transition-all hover:scale-110 hover:-translate-y-1" aria-label="Apple Music">
                <AppleIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs text-cream/40 font-bold tracking-widest uppercase text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Bernadette König. {t.footer.rights}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button onClick={() => { setCurrentPage('privacy'); window.scrollTo(0,0); }} className="hover:text-vienna-gold transition-colors uppercase tracking-widest">{t.nav.privacy}</button>
            <button onClick={() => { setCurrentPage('imprint'); window.scrollTo(0,0); }} className="hover:text-vienna-gold transition-colors uppercase tracking-widest">{t.nav.imprint}</button>
          </div>
        </div>
      </footer>

      {/* CALENDAR MODAL */}
      <AnimatePresence>
        {isCalendarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-secession-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setIsCalendarModalOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-cream hover:text-vienna-gold transition-colors z-10"
              onClick={() => setIsCalendarModalOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <SecessionFrame className="p-8 md:p-12 bg-cream">
                <h2 className="text-3xl md:text-5xl font-serif mb-8 text-secession-black text-center">{t.calendar.allDates}</h2>
                <SecessionOrnament className="mb-8" />
                
                <div className="space-y-6">
                  {CONCERTS.map((concert) => (
                    <div 
                      key={concert.id} 
                      className="border-b border-secession-black/10 pb-6 last:border-0 last:pb-0 cursor-pointer hover:bg-vienna-gold/5 transition-colors px-4 py-2 -mx-4 rounded"
                      onClick={() => {
                        setIsCalendarModalOpen(false);
                        setSelectedConcertId(concert.id);
                      }}
                    >
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div>
                          <div className="text-imperial-red font-bold tracking-[0.1em] text-sm mb-1">{concert.date}</div>
                          <h3 className="text-xl font-serif text-secession-black mb-1">{concert.program}</h3>
                          <div className="text-secession-black/60 text-sm">{concert.venue}, {concert.location}</div>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-secession-black/50">
                          {t.calendar.details} <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Additional dummy concerts to show scrolling */}
                  <div className="border-b border-secession-black/10 pb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div>
                        <div className="text-imperial-red font-bold tracking-[0.1em] text-sm mb-1">15. APR 2025</div>
                        <h3 className="text-xl font-serif text-secession-black mb-1">Kammermusikabend</h3>
                        <div className="text-secession-black/60 text-sm">Mozarthaus, Wien</div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div>
                        <div className="text-imperial-red font-bold tracking-[0.1em] text-sm mb-1">02. MÄR 2025</div>
                        <h3 className="text-xl font-serif text-secession-black mb-1">Solorezital</h3>
                        <div className="text-secession-black/60 text-sm">Konzerthaus, Wien</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SecessionFrame>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE MODAL */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-secession-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setFullscreenImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-cream hover:text-vienna-gold transition-colors z-10"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cello string stylized frame */}
              <div className="absolute -inset-4 md:-inset-8 border border-vienna-gold/30 z-10 pointer-events-none flex justify-between px-2 md:px-4 py-2">
                <div className="flex gap-1 md:gap-2 h-full opacity-50">
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                </div>
                <div className="flex gap-1 md:gap-2 h-full opacity-50">
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                  <div className="w-px h-full bg-vienna-gold shadow-[0_0_4px_rgba(212,175,55,0.5)]"></div>
                </div>
              </div>
              
              <img 
                src={fullscreenImage} 
                alt="Fullscreen view"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain relative z-0 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AWARD DETAILS MODAL */}
      <AnimatePresence>
        {selectedAwardId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-secession-black/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
            onClick={() => setSelectedAwardId(null)}
          >
            <button 
              className="fixed top-6 right-6 text-cream hover:text-vienna-gold transition-colors z-[110]"
              onClick={() => setSelectedAwardId(null)}
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-cream my-auto shadow-2xl overflow-hidden border border-vienna-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const award = AWARDS_AND_PRESS.find(a => a.id === selectedAwardId);
                if (!award) return null;
                return (
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 aspect-square md:aspect-auto md:h-auto relative">
                      <img 
                        src={award.image} 
                        alt={award.title} 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      {/* Geometric overlay */}
                      <div className="absolute inset-0 bg-secession-black/10 mix-blend-multiply pointer-events-none"></div>
                      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cream/50 pointer-events-none"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cream/50 pointer-events-none"></div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-16 relative flex flex-col justify-center">
                      <div className="absolute top-0 left-0 w-full h-2 bg-vienna-gold"></div>
                      <span className="text-imperial-red font-bold tracking-widest text-sm uppercase block mb-4">{award.year}</span>
                      <h2 className="text-3xl md:text-5xl font-serif text-secession-black mb-6 italic leading-tight">{award.title}</h2>
                      <div className="w-16 h-px bg-vienna-gold mb-8"></div>
                      <p className="text-secession-black/80 font-medium leading-relaxed mb-12 text-lg">
                        {award.fullDescription}
                      </p>
                      <button 
                        onClick={() => setSelectedAwardId(null)}
                        className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-secession-black hover:text-imperial-red transition-colors w-fit group"
                      >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONCERT DETAILS MODAL */}
      <AnimatePresence>
        {selectedConcertId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-secession-black/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
            onClick={() => setSelectedConcertId(null)}
          >
            <button 
              className="fixed top-6 right-6 text-cream hover:text-vienna-gold transition-colors z-[110]"
              onClick={() => setSelectedConcertId(null)}
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-cream my-auto shadow-2xl overflow-hidden border border-vienna-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const concert = CONCERTS.find(c => c.id === selectedConcertId);
                if (!concert) return null;
                return (
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 flex flex-col">
                      {concert.images && concert.images.length > 0 ? (
                        <div className="relative flex-1 min-h-[300px] md:min-h-full">
                          <img 
                            src={concert.images[0]} 
                            alt={concert.program} 
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          />
                          {concert.images.length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-4 bg-gradient-to-t from-secession-black/80 to-transparent">
                              {concert.images.slice(1).map((img, idx) => (
                                <img key={idx} src={img} alt="" referrerPolicy="no-referrer" className="w-20 h-20 object-cover border border-cream/30 hover:border-vienna-gold transition-colors" />
                              ))}
                            </div>
                          )}
                          {/* Geometric overlay */}
                          <div className="absolute inset-0 bg-secession-black/10 mix-blend-multiply pointer-events-none"></div>
                          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cream/50 pointer-events-none"></div>
                          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cream/50 pointer-events-none"></div>
                        </div>
                      ) : (
                        <div className="relative flex-1 min-h-[300px] md:min-h-full bg-secession-black/5 flex items-center justify-center">
                          <SecessionOrnament className="opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="md:w-1/2 p-8 md:p-16 relative flex flex-col justify-center">
                      <div className="absolute top-0 left-0 w-full h-2 bg-vienna-gold"></div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-imperial-red font-bold tracking-widest text-sm uppercase">{concert.date}</span>
                        <span className="text-secession-black/50 text-sm font-medium">{concert.time}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif text-secession-black mb-6 italic leading-tight">{concert.program}</h2>
                      <div className="w-16 h-px bg-vienna-gold mb-6"></div>
                      
                      <div className="space-y-2 mb-8 text-sm font-bold tracking-widest uppercase text-secession-black/60">
                        {concert.orchestra && <p>{concert.orchestra}</p>}
                        {concert.conductor && <p>Dirigent: {concert.conductor}</p>}
                        <p className="flex items-center gap-2 mt-4 text-secession-black/80"><MapPin className="w-4 h-4" /> {concert.venue}, {concert.location}</p>
                      </div>

                      {concert.description && (
                        <p className="text-secession-black/80 font-medium leading-relaxed mb-12 text-lg">
                          {concert.description}
                        </p>
                      )}

                      <div className="flex items-center gap-6 mt-auto">
                        <button 
                          onClick={() => setSelectedConcertId(null)}
                          className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-secession-black hover:text-imperial-red transition-colors group"
                        >
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zurück zur Übersicht
                        </button>
                        {concert.ticketLink && concert.ticketLink !== '#' && (
                          <a 
                            href={concert.ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-vienna-gold hover:text-imperial-red transition-colors"
                          >
                            Tickets <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Analytics />
    </div>
  );
};

export default App;
