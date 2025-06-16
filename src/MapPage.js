import "./App.css";
import TextPressure from "./TextPressure.js";
import { useEffect, useState, useRef } from 'react';
import MapboxMap from './components/MapboxMap.js';
import Navbar from "./Navbar.js";


function MapPage() {
  
  const [hoverSide, setHoverSide] = useState(null); // 'left', 'right', or null
  const [showBox, setShowBox] = useState(false);
  const timerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

      const [isMobile, setIsMobile] = useState(false);
  
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1024);
        };
  
        handleResize(); // set initial state on load
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const handleHover = (e) => {
    const bounds = document.getElementById('hover-zone').getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const side = x < bounds.width / 2 ? 'left' : 'right';

    setCursorPos({ x, y });

    if (side !== hoverSide) {
      setHoverSide(side);
      setShowBox(false);
      setProgress(0);
      clearTimeout(timerRef.current);

      // progreso visual
      let start = Date.now();
      const duration = 1000;

      const tick = () => {
        const elapsed = Date.now() - start;
        const percentage = Math.min(elapsed / duration, 1);
        setProgress(percentage);

        if (percentage < 1) {
          timerRef.current = requestAnimationFrame(tick);
        } else {
          setShowBox(true);
        }
      };

      timerRef.current = requestAnimationFrame(tick);
    }
  };




  return (
    <div className="page">
      <div className="blank"><Navbar /></div>

      {/* Section 3: Map */}

      <section className="map-section">
             <div className="pressure-wrapper">
          {!isMobile ? (
            <TextPressure
              text="MAPPING POLITICAL SHIFTS"
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={false}
              textColor="white"
              strokeColor="transparent"
              minFontSize={40}
            />
          ) : (
            <h1 className="static-title">MAPPING POLITICAL SHIFTS</h1>
          )}
        </div>
      
        <div className="mapbox-container">
          <MapboxMap />
        </div>
        <div className="background-split"></div>
      </section>




    </div>
  );
}

export default MapPage;
