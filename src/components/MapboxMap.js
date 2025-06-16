import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0a2lzNyIsImEiOiJjbWJycjBoN3UwOG8yMmxxeHJhYXlhYTB3In0.YEnqfR2D8ErFS_HfJ87nrQ';

const MapboxMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/artkis7/cmbuulcx0014z01qwg9cl4rus',
      center: [13, 51],
      zoom: 5,
      maxZoom: 8,
      minZoom: 5,
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point);

      if (!features.length) return;

      const props = features[0].properties;

      const popupHTML = `
        <div style="background:#f4f4f4; padding: 10px; border-radius: 12px; max-width: 250px;">
          <div style="font-size: 16px; font-weight: bold; color:#444;">${props.name_distr}</div>
          <div style="color:rgb(112, 112, 112);">${props.type_distr}</div>
          <div style="color: #444; font-size: 12px">${props.country}, ${props.region}</div>

          <div style="margin-top: 8px;">
            <span style="display: inline-flex; align-items: center; margin-right: 10px; color:#444;">
              <span style="width: 10px; height: 10px; background: #5b74f0; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
              Right-shift – ${props.right_shif > 0 ? "+" : ""}${Number(props.right_shif).toFixed(2)}%
            </span><br/>
            <span style="display: inline-flex; align-items: center; margin-top: 4px; color:#444;">
              <span style="width: 10px; height: 10px; background: #e74c3c; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
              Left-shift – ${props.left_shift > 0 ? "+" : ""}${Number(props.left_shift).toFixed(2)}%
            </span>
          </div>
        </div>
      `;

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHTML)
        .addTo(map);
    });

    return () => map.remove(); // ✅ Moved this outside of the click handler
  }, []);

  return <div ref={mapContainer} className="mapbox" style={{ width: '100%', height: '100vh' }} />;
};

export default MapboxMap;
