'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Play, X, ChevronDown } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'SUPCOM Hackaton Trailer (REEL)',
    thumb: 'https://www.ecoles.com.tn/sites/default/files/universite/logo/sup-com-logo.jpg',
    videoUrl: 'https://drive.google.com/file/d/1jpyZ8AHS7oOnrXzLVr0ogiSGtcHvfmfe/view?usp=drive_link',
    isReel: true
  },
  {
    id: 2,
    title: 'WarSaw ',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQEVyyxUb-FVY6qYOI26emoXbpwhhHoHHsg&s',
    videoUrl: 'https://drive.google.com/file/d/1m7DxMXtG5FE8ZuMvK2xOYh5fRnkT5kGC/view?usp=drive_link',
    isReel: false
  },
  {
    id: 3,
    title: 'Break The Pattern (REEL)',
    thumb: 'https://i.scdn.co/image/ab67616d0000b27325017bcbc386eda1cb436889',
    videoUrl: 'https://drive.google.com/file/d/1FZ8GHhnQr5cJVDdAiAOo_3cX1_odZUw2/view?usp=drive_link',
    isReel: true
  },
  {
    id: 4,
    title: 'StartUp Village (REEL)',
    thumb: 'https://thd.tn/wp-content/uploads/2022/07/startup-village.png',
    videoUrl: 'https://drive.google.com/file/d/1HptWYBPuzI2CwDJnWER0VMJ26BYCAhH9/view?usp=drive_link',
    isReel: true
  },
];

function VideoCard({ vid, setSelectedVideo }) {
  const cardRef = useRef(null);
  const xElement = useMotionValue(0);
  const yElement = useMotionValue(0);
  const mouseXSpring = useSpring(xElement, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(yElement, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    xElement.set(xPct);
    yElement.set(yPct);
  };

  const handleMouseLeave = () => {
    xElement.set(0);
    yElement.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15 } }
      }}
    >
      <motion.div
        className="video-card glass"
        onClick={() => setSelectedVideo(vid)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img 
          src={vid.thumb} 
          alt={vid.title} 
          className="video-thumbnail"
        />
        <div className="video-overlay" style={{ flexDirection: 'column', gap: '15px' }}>
          <motion.div 
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="play-button"
            style={{ translateZ: 50 }}
          >
            <Play fill="currentColor" size={30} />
          </motion.div>
          <motion.h3 style={{ color: 'white', fontWeight: '700', letterSpacing: '2px', translateZ: 30, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            {vid.title}
          </motion.h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Dynamic variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const titleText = "RAYEN LAAFIF";

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  return (
    <>
      <header className="hero" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Parallax Animated background blobs */}
        <motion.div 
          className="bg-blob"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(65,105,225,0.2) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, y: yBg }}
        />
        <motion.div 
          className="bg-blob"
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(65,105,225,0.15) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, y: yBg }}
        />
        
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ zIndex: 1, opacity: opacityHero, width: '100%', padding: '0 1rem' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1 className="title" style={{ display: 'flex', justifyContent: 'center', gap: '0.1rem', flexWrap: 'wrap' }}>
            {titleText.split('').map((char, index) => (
              <motion.span 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                }}
                whileHover={{ scale: 1.2, color: 'var(--accent)', rotate: Math.random() * 20 - 10 }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p variants={textVariants} className="subtitle" style={{ letterSpacing: '4px', textTransform: 'uppercase' }}>
            Cinematographer <span style={{ color: 'var(--accent)' }}>&</span> Director
          </motion.p>
          <motion.div variants={textVariants} style={{ marginTop: '2rem' }}>
             <motion.button 
               className="hero-button"
               whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(65,105,225,0.6)", backgroundColor: "var(--accent)" }}
               whileTap={{ scale: 0.95 }}
               style={{ padding: '16px 45px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '3px', background: 'transparent', color: '#fff', border: '2px solid var(--accent)', borderRadius: '40px', cursor: 'pointer', transition: 'background-color 0.3s' }}
               onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
             >
               View Selected Works
             </motion.button>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: '#aaa', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown size={40} />
          </motion.div>
        </motion.div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 8rem' }}>
        <motion.div 
          className="portfolio-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {videos.map((vid) => (
            <VideoCard key={vid.id} vid={vid} setSelectedVideo={setSelectedVideo} />
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              className={`video-modal glass ${selectedVideo.isReel ? 'reel' : ''}`}
              initial={{ scale: 0.8, opacity: 0, rotateX: 20, y: 100 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '5px',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                aspectRatio: selectedVideo.isReel ? "9/16" : "16/9",
                height: selectedVideo.isReel ? "85vh" : "auto",
                width: selectedVideo.isReel ? "auto" : "100%",
                maxWidth: selectedVideo.isReel ? "calc(85vh * 9 / 16)" : "1000px"
              }}
            >
              <button 
                className="close-btn"
                onClick={() => setSelectedVideo(null)}
                style={{ top: '-50px', right: '-10px', background: 'var(--accent)', borderRadius: '50%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={24} />
              </button>
              <iframe 
                src={getEmbedUrl(selectedVideo.videoUrl)} 
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
