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
      <section className="map-hero-section">
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
          )} </div>
        </section>

      {/* Section 3: Map */}
      <p className="center-text">This project assesses the left and right political shifts in the last two election periods of four countries in Central Europe to detect the presence and characteristics of polarization in Central Europe. The shift is calculated for the far-side parties. If there are no far-side parties, the shift was calculated from center parties. Due to data availability, in Czechia only the biggest regions (kraj) were used due to lack of open statistical information.</p>
      <section className="map-section">
          <div className="city-plot">
            <svg height="300" width="300" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 500">
              <rect class="ccls-15" x="53.53" y="27.13" width="125.71" height="124.42"/>
              <rect class="ccls-12" x="179.25" y="27.13" width="124.42" height="124.42"/>
              <rect class="ccls-17" x="303.66" y="27.13" width="123.12" height="124.42"/>
              <rect class="ccls-3" x="53.53" y="151.55" width="125.71" height="124.42"/>
              <rect class="ccls-2" x="179.25" y="151.55" width="124.42" height="124.42"/>
              <rect class="ccls-7" x="303.66" y="151.55" width="123.12" height="124.42"/>
              <rect class="ccls-4" x="53.53" y="275.96" width="125.71" height="124.42"/>
              <rect class="ccls-9" x="179.25" y="275.96" width="124.42" height="124.42"/>
              <rect class="ccls-14" x="303.66" y="275.96" width="123.12" height="124.42"/>
              <path class="ccls-16" d="M53.53,27.13v373.25"/>
              <path class="ccls-16" d="M53.53,400.38h373.25"/>
              <path class="ccls-16" d="M53.53,27.13v373.25"/>
              <path class="ccls-16" d="M53.53,400.38h373.25"/>
              <path class="ccls-16" d="M53.53,27.13v373.25"/>
              <path class="ccls-16" d="M53.53,400.38h373.25"/>
              <text font-family='Space Grotesk' font-size="30" x="0" y="15" fill="white">Left</text>
              <text font-family='Space Grotesk' font-size="30" x="440" y="400" fill="white">Right</text>
              <text font-family='Space Grotesk' font-size="30" x="350" y="440" fill="white">2%+</text>
              <text font-family='Space Grotesk' font-size="30" x="200" y="440" fill="white">0%-2%</text>
              <text font-family='Space Grotesk' font-size="30" x="90" y="440" fill="white">-2%</text>
              <text font-family='Space Grotesk' font-size="30" x="85" y="45" transform="rotate(270,100,100)" fill="white">2%+</text>
              <text font-family='Space Grotesk' font-size="30" x="-60" y="45" transform="rotate(270,100,100)" fill="white">0%-2%</text>
              <text font-family='Space Grotesk' font-size="30" x="-160" y="45" transform="rotate(270,100,100)" fill="white">-2%</text>
            </svg>
            <p className="legend-text">This map displays the political shifts between the two most recent election periods for Austria, Czechia, Poland, and Germany. The symbology is based upon a places shifts toward the left AND the right in increments of less than 2%, between -2%, 0%, and 2%, and greater than 2%. Select a region on the map below to view the specific shift amounts, as well as the election results!</p>
          </div>

        <div className="mapbox-container">
          <MapboxMap />
        </div>
        <div className="background-split"></div>
      </section>

      <section className="city-plot1">
        <p className="legend-text">How has your city shifted? Compare the shift position of your city to that of others. See how the legend changes to accomodate the wide range of political shifts throughout Central Europe.</p>
        <div className="city-svg-container">
          <svg className="city-svg" id="Landscape_Graph" data-name="Landscape Graph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <rect class="backing" x="20" y="0" width="395" height="390" rx="10" ry="10"/>
            <rect class="cls-30" x="246.56" y="224.95" width="149.65" height="147.23"/>
            <rect class="cls-34" x="38.07" y="14.03" width="145.38" height="150.18"/>
            <rect class="cls-22" x="183.45" y="14.03" width="67.48" height="150.09"/>
            <rect class="cls-40" x="248.39" y="14.03" width="147.82" height="150.18"/>
            <rect class="cls-7" x="37.89" y="164.21" width="146.21" height="61.63"/>
            <rect class="cls-6" x="183.45" y="164.21" width="64.92" height="61.63"/>
            <rect class="cls-17" x="248.37" y="164.21" width="147.84" height="61.63"/>
            <rect class="cls-9" x="38.07" y="224.95" width="145.38" height="147.23"/>
            <rect class="cls-19" x="183.62" y="224.95" width="64.75" height="147.23"/>
            <path class="cls-39" d="M217.05,14.03v179.16"/>
            <path class="cls-39" d="M217.05,193.19h179.16"/>
            <g>
              <text class="cls-5" transform="translate(209.15 185)"><tspan x="0" y="0">1</tspan></text>
              <text class="cls-5" transform="translate(209.15 164.21)"><tspan x="0" y="0">2</tspan></text>
              <text class="cls-5" transform="translate(209.15 143.42)"><tspan x="0" y="0">3</tspan></text>
              <text class="cls-5" transform="translate(209.15 122.62)"><tspan x="0" y="0">4</tspan></text>
              <text class="cls-5" transform="translate(209.15 101.83)"><tspan x="0" y="0">5</tspan></text>
              <text class="cls-5" transform="translate(209.15 81.03)"><tspan x="0" y="0">6</tspan></text>
              <text class="cls-5" transform="translate(209.15 60.24)"><tspan x="0" y="0">7</tspan></text>
              <text class="cls-5" transform="translate(209.15 39.45)"><tspan x="0" y="0">8</tspan></text>
              <text class="cls-5" transform="translate(209.15 18.65)"><tspan x="0" y="0">9</tspan></text>
            </g>
            <text class="cls-5" transform="translate(225.51 200.68)"><tspan x="0" y="0">1</tspan></text>
            <text class="cls-5" transform="translate(246.3 200.68)"><tspan x="0" y="0">2</tspan></text>
            <text class="cls-5" transform="translate(267.1 200.68)"><tspan x="0" y="0">3</tspan></text>
            <text class="cls-5" transform="translate(287.89 200.68)"><tspan x="0" y="0">4</tspan></text>
            <text class="cls-5" transform="translate(308.68 200.68)"><tspan x="0" y="0">5</tspan></text>
            <text class="cls-2" transform="translate(329.48 200.68)"><tspan x="0" y="0">6</tspan></text>
            <text class="cls-2" transform="translate(350.27 200.68)"><tspan x="0" y="0">7</tspan></text>
            <text class="cls-2" transform="translate(371.07 200.68)"><tspan x="0" y="0">8</tspan></text>
            <text class="cls-2" transform="translate(391.86 200.68)"><tspan x="0" y="0">9</tspan></text>
            <circle class="warsaw" cx="102.52" cy="270.62" r="3.8"/>
            <text class="cls-4" transform="translate(98.72 285.93)"><tspan class="cls-20" x="0" y="0">W</tspan><tspan x="7.32" y="0">ars</tspan><tspan class="cls-37" x="18.16" y="0">a</tspan><tspan class="cls-29" x="22.43" y="0">w</tspan><tspan x="28.7" y="0">,</tspan></text>
            <circle class="wroclaw" cx="52.51" cy="282.13" r="3.8"/>
            <text class="cls-4" transform="translate(41.87 298.38)"><tspan class="cls-28" x="0" y="0">W</tspan><tspan class="cls-31" x="7.47" y="0">r</tspan><tspan x="10.32" y="0">ocl</tspan><tspan class="cls-18" x="21.42" y="0">a</tspan><tspan class="cls-23" x="25.69" y="0">w</tspan><tspan x="31.96" y="0">,</tspan></text>
            <circle class="krakow" cx="41.87" cy="230.5" r="3.8"/>
            <text class="cls-4" transform="translate(49.93 232.94)"><tspan class="cls-26" x="0" y="0">K</tspan><tspan class="cls-10" x="4.97" y="0">r</tspan><tspan class="cls-42" x="7.87" y="0">ak</tspan><tspan class="cls-35" x="16.42" y="0">o</tspan><tspan class="cls-29" x="21.3" y="0">w</tspan><tspan x="27.58" y="0">,</tspan></text>
            <circle class="ostrava" cx="172.77" cy="253.36" r="3.8"/>
            <text class="cls-4" transform="translate(168.97 268.28)"><tspan x="0" y="0">Ost</tspan><tspan class="cls-15" x="12.74" y="0">r</tspan><tspan class="cls-37" x="15.64" y="0">a</tspan><tspan class="cls-8" x="19.91" y="0">v</tspan><tspan x="24.2" y="0">a,</tspan></text>
            <circle class="prague" cx="200.92" cy="198.24" r="3.8"/>
            <text class="cls-4" transform="translate(177.34 178.21)"><tspan class="cls-33" x="0" y="0">P</tspan><tspan class="cls-10" x="4.64" y="0">r</tspan><tspan x="7.54" y="0">agu</tspan><tspan class="cls-36" x="21.87" y="0">e</tspan><tspan x="26.27" y="0">,</tspan></text>
            <circle class="brno" cx="204.12" cy="247.49" r="3.8"/>
            <text class="cls-4" transform="translate(176.58 238.09)"><tspan class="cls-11" x="0" y="0">C</tspan><tspan class="cls-35" x="5.26" y="0">z</tspan><tspan x="9.04" y="0">echia</tspan></text>
            <circle class="munich" cx="304.5" cy="107.41" r="3.8"/>
            <text class="cls-4" transform="translate(300.7 122.62)"><tspan class="cls-13" x="0" y="0">M</tspan><tspan x="7.26" y="0">unich,</tspan></text>
            <circle class="hamburg" cx="327.44" cy="42.53" r="3.8"/>
            <text class="cls-4" transform="translate(280.74 40.2)"><tspan x="0" y="0">Hambu</tspan><tspan class="cls-18" x="27.79" y="0">r</tspan><tspan class="cls-32" x="30.66" y="0">g</tspan><tspan x="35.56" y="0">, </tspan></text>
            <circle class="berlin" cx="348.47" cy="31.83" r="3.8"/>
            <text class="cls-4" transform="translate(356.53 34.27)"><tspan class="cls-11" x="0" y="0">B</tspan><tspan x="4.91" y="0">e</tspan><tspan class="cls-11" x="9.42" y="0">r</tspan><tspan x="12.4" y="0">lin, </tspan></text>
            <circle class="vienna" cx="364.44" cy="306.79" r="3.8"/>
            <text class="cls-4" transform="translate(364.38 320.58)"><tspan class="cls-33" x="0" y="0">V</tspan><tspan x="4.88" y="0">ienna,</tspan></text>
            <circle class="graz" cx="365.33" cy="295.94" r="3.8"/>
            <text class="cls-4" transform="translate(342.56 279.33)"><tspan x="0" y="0">G</tspan><tspan class="cls-10" x="5.81" y="0">r</tspan><tspan x="8.71" y="0">az, </tspan></text>
            <circle class="linz" cx="389.83" cy="353.18" r="3.8"/>
            <text class="cls-4" transform="translate(363.69 352.95)"><tspan x="0" y="0">Linz,</tspan></text>
            <path class="cls-39" d="M37.89,193.19h179.16"/>
            <path class="cls-39" d="M217.05,193.19v179.16"/>
            <text class="cls-5" transform="translate(204.25 200.74)"><tspan x="0" y="0">-1</tspan></text>
            <text class="cls-5" transform="translate(183.45 200.74)"><tspan x="0" y="0">-2</tspan></text>
            <text class="cls-5" transform="translate(162.66 200.74)"><tspan x="0" y="0">-3</tspan></text>
            <text class="cls-5" transform="translate(141.86 200.74)"><tspan x="0" y="0">-4</tspan></text>
            <text class="cls-5" transform="translate(121.07 200.74)"><tspan x="0" y="0">-5</tspan></text>
            <text class="cls-2" transform="translate(100.28 200.74)"><tspan x="0" y="0">-6</tspan></text>
            <text class="cls-2" transform="translate(79.48 200.74)"><tspan x="0" y="0">-7</tspan></text>
            <text class="cls-2" transform="translate(58.69 200.74)"><tspan x="0" y="0">-8</tspan></text>
            <text class="cls-2" transform="translate(37.9 200.74)"><tspan x="0" y="0">-9</tspan></text>
            <text class="cls-5" transform="translate(207.93 205.9)"><tspan x="0" y="0">-1</tspan></text>
            <text class="cls-5" transform="translate(207.93 226.7)"><tspan x="0" y="0">-2</tspan></text>
            <text class="cls-5" transform="translate(207.93 247.49)"><tspan x="0" y="0">-3</tspan></text>
            <text class="cls-5" transform="translate(207.93 268.28)"><tspan x="0" y="0">-4</tspan></text>
            <text class="cls-5" transform="translate(207.93 289.08)"><tspan x="0" y="0">-5</tspan></text>
            <text class="cls-2" transform="translate(207.93 309.87)"><tspan x="0" y="0">-6</tspan></text>
            <text class="cls-2" transform="translate(207.93 330.67)"><tspan x="0" y="0">-7</tspan></text>
            <text class="cls-2" transform="translate(207.93 351.46)"><tspan x="0" y="0">-8</tspan></text>
            <text class="cls-2" transform="translate(207.93 372.25)"><tspan x="0" y="0">-9</tspan></text>
            <text class="cls-4" transform="translate(42.41 310.6)"><tspan class="cls-38" x="0" y="0">P</tspan><tspan x="4.56" y="0">oland</tspan></text>
            <text class="cls-4" transform="translate(100.45 298.38)"><tspan class="cls-38" x="0" y="0">P</tspan><tspan x="4.56" y="0">oland</tspan></text>
            <text class="cls-4" transform="translate(50.69 245.08)"><tspan class="cls-38" x="0" y="0">P</tspan><tspan x="4.56" y="0">oland</tspan></text>
            <text class="cls-4" transform="translate(169.33 279.33)"><tspan class="cls-11" x="0" y="0">C</tspan><tspan class="cls-35" x="5.26" y="0">z</tspan><tspan x="9.04" y="0">echia</tspan></text>
            <text class="cls-4" transform="translate(176.58 225.84)"><tspan x="0" y="0">B</tspan><tspan class="cls-11" x="4.88" y="0">r</tspan><tspan class="cls-16" x="7.86" y="0">n</tspan><tspan class="cls-41" x="12.85" y="0">o</tspan><tspan class="cls-42" x="17.58" y="0">,</tspan></text>
            <text class="cls-4" transform="translate(176.58 189.57)"><tspan class="cls-11" x="0" y="0">C</tspan><tspan class="cls-35" x="5.26" y="0">z</tspan><tspan x="9.04" y="0">echia</tspan></text>
            <text class="cls-4" transform="translate(301.28 133.43)"><tspan class="cls-27" x="0" y="0">G</tspan><tspan x="5.86" y="0">e</tspan><tspan class="cls-11" x="10.37" y="0">r</tspan><tspan x="13.35" y="0">ma</tspan><tspan class="cls-12" x="25.19" y="0">n</tspan><tspan x="30.07" y="0">y</tspan></text>
            <text class="cls-4" transform="translate(281.5 52.46)"><tspan class="cls-27" x="0" y="0">G</tspan><tspan x="5.86" y="0">e</tspan><tspan class="cls-11" x="10.37" y="0">r</tspan><tspan x="13.35" y="0">ma</tspan><tspan class="cls-12" x="25.19" y="0">n</tspan><tspan x="30.07" y="0">y</tspan></text>
            <text class="cls-4" transform="translate(355.29 45.65)"><tspan class="cls-27" x="0" y="0">G</tspan><tspan x="5.86" y="0">e</tspan><tspan class="cls-11" x="10.37" y="0">r</tspan><tspan x="13.35" y="0">ma</tspan><tspan class="cls-12" x="25.19" y="0">n</tspan><tspan x="30.07" y="0">y</tspan></text>
            <text class="cls-4" transform="translate(365.33 332.95)"><tspan class="cls-36" x="0" y="0">A</tspan><tspan x="5.4" y="0">ust</tspan><tspan class="cls-11" x="16.9" y="0">r</tspan><tspan x="19.88" y="0">ia</tspan></text>
            <text class="cls-4" transform="translate(335.52 289.14)"><tspan class="cls-36" x="0" y="0">A</tspan><tspan x="5.4" y="0">ust</tspan><tspan class="cls-11" x="16.9" y="0">r</tspan><tspan x="19.88" y="0">ia</tspan></text>
            <text class="cls-4" transform="translate(359.81 362.51)"><tspan class="cls-36" x="0" y="0">A</tspan><tspan x="5.4" y="0">ust</tspan><tspan class="cls-11" x="16.9" y="0">r</tspan><tspan x="19.88" y="0">ia</tspan></text>
            <text font-family='Space Grotesk' font-size="12" x="20" y="-25" fill="black" transform="rotate(90, 100, 100)">Left %</text>
            <text font-family='Space Grotesk' font-size="12" x="350" y="185" fill="black">Right %</text>
          </svg>
        </div>
      </section>

    </div>
  );
}

export default MapPage;
