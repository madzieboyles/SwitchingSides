import React from "react";
import TextPressure from "./TextPressure.js";
import "./App.css";
import {Helmet} from 'react-helmet';
import { useEffect, useState, useRef } from 'react';
import Navbar from "./Navbar.js";
import RenderExternalHTML from "./PartiesGraphic.js";


function GraphicPage() {
  
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
      <section>
             <div className="pressure-wrapper">
          {!isMobile ? (
            <TextPressure
              text="THE PARTIES"
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
            <h1 className="static-title">THE PARTIES</h1>
          )}
        </div>

        <div className = "normal">
          <h3>A comparative analysis of Central European political systems.</h3>
        </div>
      </section>

      <section>
        <iframe id="frame"
          src="/TheParties.html"
          title="The Parties Content"
          style={{
            width: "100%",
            height: "800px", // Adjust the height as needed
            border: "none",
            marginTop: "20px",
          }}
        />
      </section>

     <section className="party-analysis">
          <p>The radical right in Central Europe, particularly active in Poland, Germany, Austria, and the Czech Republic, has been the subject of scrutiny by constitutional watchdogs, EU institutions, and academic researchers for promoting reforms that may weaken liberal-democratic institutions. Although these movements formally maintain electoral processes, they are often associated with efforts to erode institutional checks and balances and strengthen executive authority, a phenomenon described by scholars as “illiberal democracy” (Platnner, 2019).</p>
          <p>In Poland, the Law and Justice party (PiS), in power from 2015 to 2023, introduced judicial reforms that led to multiple infringement proceedings by the European Commission. The Court of Justice of the European Union (CJEU) ruled that Poland had violated EU law by undermining judicial independence (CJEU, Case C-791/19, 2021). The Venice Commission also criticized the reforms for creating excessive political influence over the judiciary (Venice Commission, Opinion 904/2017). Additionally, PiS extended its control over public media and justified certain restrictions on LGBTQ+ and women’s rights through appeals to “traditional values” (Graff & Korolczuk, 2022).</p>
  
          <p>In Germany, the Alternative für Deutschland (AfD) combines nationalist and anti-immigration rhetoric with neoliberal economic positions. In 2021, the Federal Office for the Protection of the Constitution (Bundesamt für Verfassungsschutz) designated parts of the AfD, such as the “Flügel” faction, as extremist and placed them under surveillance due to concerns about anti-democratic tendencies (BfV Annual Report, 2022).</p>
          <p>In Austria, the Freedom Party (FPÖ) has participated in coalition governments and significantly influenced national discourse on migration and national identity. The party promotes a restrictive vision of Austrian identity and has supported limitations on asylum and civil liberties (Heinisch, 2020). Scholars argue that the FPÖ has contributed to the normalization of far-right rhetoric within mainstream politics (Pelinka, 2013; Wodak, 2015).</p>
        
        
          <p>In the Czech Republic, the far-right Freedom and Direct Democracy (SPD) party employs strong anti-immigration and Eurosceptic rhetoric. While not strictly categorized as far-right, the centrist-populist movement ANO, led by former Prime Minister Andrej Babiš, has been criticized by Transparency International and the European Parliament for conflicts of interest, media concentration, and undermining independent institutions (European Parliament, 2020; TI Czech Republic, 2021). Political analysts point to growing executive centralization and a weakening of democratic accountability mechanisms (Hanley & Vachudova, 2018).</p>
          <p>Across these national cases, a common characteristic is the use of democratic procedures to implement measures that, according to constitutional courts, watchdog organizations, and academic studies, may erode liberal-democratic norms. These include restricting minority rights, politicizing public institutions, and challenging the independence of the judiciary. Analysts argue that such strategies divert attention from structural socioeconomic challenges by focusing on identity politics, nationalism, and perceived external threats (Pappas, 2019; European Union Agency for Fundamental Rights, 2020).</p>
          
      </section>
      <section className="references">
          <p>References:</p>
          <p>Bundesamt für Verfassungsschutz (BfV). (2022). Annual Report on the Protection of the
            Constitution. https://www.verfassungsschutz.de/SharedDocs/publikationen/EN/reportson-the-protection-of-the-constitution/2023-06-brief-summary-2022-report-on-theprotection-of-the-constitution.html
            CJEU, Case C-791/19 (2021). Judgment of the Court, 15 July 2021
            European Parliament. (2020). Resolution on the conflict of interest of the Czech Prime
            Minister (2021/2671(RSP)).
            Graff, A., & Korolczuk, E. (2022). Anti-Gender Politics in the Populist Moment. Routledge.
            Hanley, S., & Vachudova, M. A. (2018). "Understanding the illiberal turn: democratic
            backsliding in the Czech Republic." East European Politics, 34.
            Heinisch, R. (2020). The People and the Nation: Populism and Ethno-Territorial Politics in
            Europe. Routledge.
            Pappas, T. (2019). Populism and Liberal Democracy: A Comparative and Theoretical
            Analysis. Oxford University Press.
            Pelinka, A. (2013). "Right-Wing Populism: Austria’s Freedom Party (FPÖ)". Europe-Asia
            Studies.
            Plattner, M. F. (2019). Illiberal democracy and the struggle on the right. Journal of
            Democracy, 30 . https://doi.org/10.1353/jod.2019.0000
            Wodak, R. (2015). The Politics of Fear: What Right-Wing Populist Discourses Mean. Sage.</p>
          </section>

        
     </div>
  );
}

export default GraphicPage;
