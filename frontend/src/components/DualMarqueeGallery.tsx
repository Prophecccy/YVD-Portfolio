import React, { useRef, useState, useEffect } from 'react';
import './DualMarqueeGallery.css';

export interface Sofa {
  id: number;
  src: string;
  name: string;
}

export const SOFA_CATALOG: Sofa[] = [
  { id: 1, src: '/portfolio/sofa-1.jpg', name: 'The Silverstone Sectional' },
  { id: 2, src: '/portfolio/sofa-2.jpg', name: 'The Sovereign Velvet Chaise' },
  { id: 3, src: '/portfolio/sofa-3.jpg', name: 'The Emerald Diamond Quilt' },
  { id: 4, src: '/portfolio/sofa-4.jpg', name: 'The Milanese Silhouette' },
  { id: 5, src: '/portfolio/sofa-5.jpg', name: 'The Botanical Print Loveseat' },
  { id: 6, src: '/portfolio/sofa-6.jpg', name: 'The Nordic Mint Loveseat' },
  { id: 7, src: '/portfolio/sofa-7.jpg', name: 'The Sahara Olive Modular' },
  { id: 8, src: '/portfolio/sofa-8.jpg', name: 'The Rosewood Contour Quartet' },
  { id: 9, src: '/portfolio/sofa-9.jpg', name: 'The Graphite Stiletto L-Shape' },
  { id: 10, src: '/portfolio/sofa-10.jpg', name: 'The Imperial Cocoa Cinema Set' },
  { id: 11, src: '/portfolio/sofa-11.jpg', name: 'The Havana Velvet Modular' },
  { id: 12, src: '/portfolio/sofa-12.jpg', name: 'The Valencia Accent Chair' },
  { id: 13, src: '/portfolio/sofa-13.jpg', name: 'The Sienna Channel Loveseat' },
  { id: 14, src: '/portfolio/sofa-14.jpg', name: 'The Champagne Gold L-Shape' },
  { id: 15, src: '/portfolio/sofa-15.jpg', name: 'The Azure Heritage Chair' },
  { id: 16, src: '/portfolio/sofa-16.jpg', name: 'The Mint Cherrywood Tub Chair' },
  { id: 17, src: '/portfolio/sofa-17.jpg', name: 'The Sculptural Cream Chair' },
  { id: 19, src: '/portfolio/sofa-19.jpg', name: 'The Sovereign Blue High-Back' },
  { id: 20, src: '/portfolio/sofa-20.jpg', name: 'The Classic Gold Wingback' },
];

interface MarqueeRowProps {
  images: Sofa[];
  direction: 1 | -1; // 1 = scrolls right, -1 = scrolls left
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ images, direction, hoveredId, setHoveredId, speed = 1.2 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  
  // Dragging Mathematics Core
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const exactScrollLeft = useRef<number | null>(null);

  // Maintain fluid interaction values without triggering effect teardowns
  const interactionState = useRef({ hoveredId, isDragging });
  useEffect(() => {
    interactionState.current = { hoveredId, isDragging };
  }, [hoveredId, isDragging]);

  // Duplicating the image array natively enables our infinite math loop
  const duplicatedImages = [...images, ...images];

  // Mathematical loop for continuous sub-pixel scrolling (Strictly 60fps locked)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const { isDragging: currentDrag } = interactionState.current;

      // Only iterate the scroll matrix if undragged! Hovering no longer pauses the flow.
      if (!currentDrag && trackRef.current) {
        if (exactScrollLeft.current === null) exactScrollLeft.current = trackRef.current.scrollLeft;

        const track = trackRef.current;
        const halfWidth = track.scrollWidth / 2;

        // Use precise internal floating point precision rather than relying on DOM truncation
        exactScrollLeft.current += direction * speed * (delta / 16);

        // Infinite Modulo Looping
        if (direction === 1) { 
          if (exactScrollLeft.current >= halfWidth) exactScrollLeft.current -= halfWidth;
        } else { 
          if (exactScrollLeft.current <= 0) exactScrollLeft.current += halfWidth;
        }
        
        // Write the truncated value to DOM
        track.scrollLeft = exactScrollLeft.current;
      } else if (trackRef.current) {
         // Sync math tracker back to real DOM position when dragged or paused
         exactScrollLeft.current = trackRef.current.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, speed]);

  // Pointer event handlers for draggable swipe logic
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeftStart.current = trackRef.current?.scrollLeft || 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 2.5; // Drag friction multiplier
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;

    // Handle instant wrap-around teleportation while actively dragging
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (trackRef.current.scrollLeft >= halfWidth) {
      trackRef.current.scrollLeft -= halfWidth;
      startX.current = x;
      scrollLeftStart.current = trackRef.current.scrollLeft;
    } else if (trackRef.current.scrollLeft <= 0) {
      trackRef.current.scrollLeft += halfWidth;
      startX.current = x;
      scrollLeftStart.current = trackRef.current.scrollLeft;
    }
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div 
      className="marquee-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="marquee-track" ref={trackRef}>
        {duplicatedImages.map((sofa, idx) => {
          const uniqueId = `${sofa.id}-${idx}`; // Globally unique hover target ID
          const isHoveredLocal = hoveredId === uniqueId;

          return (
             <div 
               key={idx} 
               className={`marquee-item ${isHoveredLocal ? 'hovered' : ''}`}
               onMouseEnter={() => setHoveredId(uniqueId)}
               onMouseLeave={() => setHoveredId(null)}
             >
               <img src={sofa.src} alt={sofa.name} draggable={false} loading="lazy" decoding="async" />
               <div className="hover-badge">
                 <span className="hover-index">NO. {sofa.id.toString().padStart(2, '0')}</span>
                 <span className="hover-name">{sofa.name}</span>
               </div>
             </div>
          );
        })}
      </div>
    </div>
  );
};

const DualMarqueeGallery = () => {
  // Global focus state allows us to dim elements across *both* separate rows
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Divide the 20 asset images cleanly into two distinct 10-item tracks using the defined catalog
  const row1Images = SOFA_CATALOG.slice(0, 10);
  const row2Images = SOFA_CATALOG.slice(10, 20);

  return (
    <section className={`dual-marquee-wrapper ${hoveredId ? 'is-hovering' : ''}`} id="portfolio">
      <div className="marquee-header">
         <h2>The Portfolio.</h2>
         <p>Drag to explore. Hover to focus.</p>
      </div>
      <MarqueeRow images={row1Images} direction={1} hoveredId={hoveredId} setHoveredId={setHoveredId} speed={0.8} />
      <MarqueeRow images={row2Images} direction={-1} hoveredId={hoveredId} setHoveredId={setHoveredId} speed={0.65} />
    </section>
  );
};

export default DualMarqueeGallery;
