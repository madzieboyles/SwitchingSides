import React from "react";
import TextPressure from "./TextPressure";
import "./App.css";
import Magnet from './magnet.js';
import Navbar from "./Navbar.js";
import ScrollReveal from './components/scrollreveal';
import { useEffect, useState, useRef } from 'react';
import MapboxMap from './components/MapboxMap';


function Home() {
  
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
      <div className="notBlank"><Navbar /></div>
      {/* Section 1: TextPressure */}
      <section className="hero-section">
        <div className="noise"></div>
        
              <div className="pressure-wrapper">
          {!isMobile ? (
            <TextPressure
              text="SWITCHING SIDES"
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
            <h1 className="static-title">SWITCHING SIDES</h1>
          )}
        </div>

        <div className="hero-layer stars">
          <img src="stars.png" className="unstars" />
        </div>

        <div className="hero-layer fist">
          <Magnet padding={50} magnetStrength={25}>
            <img src="sift.png" className="sifthand" />
          </Magnet>
        </div>

        <div className="hero-layer wall">
          <img src="wall.png" className="wall" />
        </div>
        
        
      </section>
        
      <section className="cover">

        
      </section>

      {/* Section 2: Scrollable Globe */}
      <section className="scroll-section">
        <div className = "textintro">
          <h3>What happens when countries change course?</h3>
        </div>
        <div className="p_intro">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            Between elections, crises, and international deals, politics in Central Europe
            has been in constant motion. This story isn’t about parties, it’s about ideas:
            left, center, right… Who’s steering the wheel? And why? Here you’ll see how
            Germany, Poland, Austria, and the Czech Republic have shifted politically in
            recent years, and how those changes affect their societies and international roles.
          </ScrollReveal>
        </div>

        <div className="globe-container">
          <Magnet padding={60} magnetStrength={35}>
            <img src="world2.png" alt="Globe" className="globe" />
          </Magnet>
        </div>

        <div className="scroll-description">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={10}
            >
              Here you’ll see how Germany, Poland, Austria, and the Czech Republic have shifted politically in recent years, and how those shifts connect to their economies, societies, and international roles.

              But this is also a story about democracy — who gets to decide, and who feels the impact. Political shifts shape policies that touch everyone, including people who don't have a vote: immigrants, refugees, and marginalized communities. Understanding these changes helps us reflect on inclusion, representation, and the real-life consequences of shifting ideologies.
            </ScrollReveal>
          </div>


        <div
          id="hover-zone"
          className="hover-zone"
          onMouseMove={handleHover}
        >
          {showBox && (
            <div className={`info-box ${hoverSide}`}>
              {hoverSide === 'left' ? (
                <p><strong>Left-wing politics:</strong> Social justice, labor rights, environmentalism, redistributive policies and state welfare are often core tenets.</p>
              ) : (
                <p><strong>Right-wing politics:</strong> National identity, free markets, traditional values, and strong border control often guide right-wing platforms.</p>
              )}
            </div>
            
          )}
          <div
          className="hover-circle"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-50%, -50%)",
            background: `conic-gradient(white ${progress * 360}deg, transparent 0deg)`
          }}
        ></div>

        </div>


        <div className="background-split"></div>
        <div className="noise"></div>
      </section>
    <div className="notBlank"><Navbar /></div>
    </div>
  );
}

export default Home;
