import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0a2lzNyIsImEiOiJjbWJycjBoN3UwOG8yMmxxeHJhYXlhYTB3In0.YEnqfR2D8ErFS_HfJ87nrQ';

const MapboxMap = () => {
  const mapContainer = useRef(null);
  const [partyInfo, setPartyInfo] = useState(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const initialZoom = screenWidth < 800 ? 3.5 : 4.7;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/artkis7/cmbuulcx0014z01qwg9cl4rus',
      center: [14, 51],
      zoom: initialZoom,
      maxZoom: 8,
      minZoom: initialZoom,
      maxBounds: [
        [3, 20],   // SW corner
        [37, 70]   // NE corner
      ]
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
      // Deselect: hide the bottom box
      setPartyInfo(null);
      return;
      }

      const props = features[0].properties;
      const cr1 = Number(props.CR_1);
      const cl1 = Number(props.CL_1);
      const fl1 = Number(props.FL_1);
      const fr1 = Number(props.FR_1);
      const cr2 = Number(props.CR_2);
      const cl2 = Number(props.CL_2);
      const fl2 = Number(props.FL_2);
      const fr2 = Number(props.FR_2);
      const other1 = (100 - cr1 - cl1 - fl1 - fr1).toFixed(1);
      const other2 = (100 - cr2 - cl2 - fl2 - fr2).toFixed(1);

      const popupHTML = `
        <div style="background:#f4f4f4; padding: 10px; border-radius: 12px; max-width: 400px; font-size: 15px; color:#444; box-shadow: 0 4px 12px rgba(0,0,0,0.15)">
          <div style="font-size: 18px; font-weight: bold; color:#444;">${props.name_district}</div>
          <div style="color:rgb(112, 112, 112);">${props.type_distr}</div>
          <div style="color: #444; font-size: 12px">${props.country}, ${props.region}</div>

          <div style="margin-top: 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tbody>
                <tr>
                  <td style="padding: 6px 4px;">
                    <span style="display: inline-flex; align-items: center;">
                      <span style="width: 10px; height: 10px; background: #5b74f0; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
                      Right-shift
                    </span>
                  </td>
                  <td style="padding: 6px 4px;">${props.right_shif > 0 ? '+' : ''}${Number(props.right_shif).toFixed(1)}%</td>
                  <td style="padding: 6px 4px; color: ${props.right_shif > 0 ? 'green' : 'red'};">
                    ${props.right_shif > 0 ? '▲' : '▼'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 4px;">
                    <span style="display: inline-flex; align-items: center;">
                      <span style="width: 10px; height: 10px; background: #e74c3c; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
                      Left-shift
                    </span>
                  </td>
                  <td style="padding: 6px 4px;">${props.left_shift > 0 ? '+' : ''}${Number(props.left_shift).toFixed(1)}%</td>
                  <td style="padding: 6px 4px; color: ${props.left_shift > 0 ? 'green' : 'red'};">
                    ${props.left_shift > 0 ? '▲' : '▼'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;


      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHTML)
        .addTo(map);

      setPartyInfo({
        cr1, cr2, cl1, cl2, fl1, fl2, fr1, fr2, other1, other2,
        CR_name: props.CR_name,
        CL_name: props.CL_name,
        FL_name: props.FL_name,
        FR_name: props.FR_name
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapContainer} className="mapbox" style={{ width: '100%', height: '100%' }} />

      {partyInfo && (
        <div style={{
          position: 'absolute',
          bottom: '35px',
          left: '20px',
          right: '20px',
          background: 'white',
          color: 'black',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          zIndex: 10,
          maxWidth: '600px',
          margin: '0 auto',
        }}>

          <div style={{maxWidth: '600px', margin: '0 auto'}}>
            <table style={{ width: '100%', marginTop: '0px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#666' }}>
                  <th style={{ paddingBottom: '6px' }}>Party</th>
                  <th style={{ paddingBottom: '6px' }}> </th>
                  <th style={{ paddingBottom: '6px' }}>2021</th>
                  <th style={{ paddingBottom: '6px' }}>2025</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0px 5px 2px 0px' }}>Center-right</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.CR_name}</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.cr1.toFixed(1)}%</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.cr2.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td style={{ padding: '0px 5px 2px 0px' }}>Center-left</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.CL_name}</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.cl1.toFixed(1)}%</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.cl2.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td style={{ padding: '0px 5px 2px 0px' }}>Far-left</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.FL_name}</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.fl1.toFixed(1)}%</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.fl2.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td style={{ padding: '0px 5px 2px 0px' }}>Far-right</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.FR_name}</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.fr1.toFixed(1)}%</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.fr2.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td  style={{ padding: '0px 5px 2px 0px' }}>Other</td>
                  <td></td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.other1}%</td>
                  <td style={{ padding: '0px 5px 2px 0px' }}>{partyInfo.other2}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default MapboxMap;
