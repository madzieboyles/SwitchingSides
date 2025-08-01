import React from 'react';
import { useEffect, useState, useRef } from 'react';

function Parties() {

const Chart = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js"; // Replace with your script URL
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Cleanup to remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once

  return <div>Script is added to document</div>;
};
    
     // Plugin for horizontal lines and country labels (common for all charts)
    Chart.register({
      id: 'customLines',
      afterDraw: function(chart) {
        const ctx = chart.ctx;
        const yAxis = chart.scales.y;
        const xAxis = chart.scales.x;
        
        const countryPositions = {
          'CZ': yAxis.getPixelForValue(1),
          'PL': yAxis.getPixelForValue(2),
          'AT': yAxis.getPixelForValue(3),
          'DE': yAxis.getPixelForValue(4)
        };

        // Horizontal lines
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        Object.values(countryPositions).forEach(y => {
          ctx.beginPath();
          ctx.moveTo(xAxis.left, y);
          ctx.lineTo(xAxis.right, y);
          ctx.stroke();
        });
        ctx.restore();

        // Country labels on the right side
        ctx.save();
        ctx.font = 'bold 14px Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'left';
        Object.entries(countryPositions).forEach(([country, y]) => {
          ctx.fillText(country, xAxis.right + 8, y + 5); 
        });
        ctx.restore();
      }
    });

    // Basic common configuration
    const baseConfig = {
      type: 'scatter',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 40,
            top: 15,
            left: 15,
            right: 30
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 16, weight: 'bold' },
            bodyFont: { size: 14 },
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                return `${label.split(' - ')[0]}`;
              }
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 10,
            title: {
              display: true,
              text: 'Political Spectrum',
              font: { size: 16, weight: 'bold' },
              padding: { top: 15 }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              lineWidth: 1
            },
            ticks: {
              callback: function(value) {
                const labels = {
                  0: 'Far-left',
                  2.5: 'Left',
                  5: 'Center',
                  7.5: 'Right',
                  10: 'Far-right'
                };
                return labels[value] || '';
              },
              font: { size: 13 },
              padding: 10
            }
          },
          y: {
            min: 0.5,
            max: 4.5,
            grid: { display: false },
            ticks: {
              callback: function() { return ''; }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'nearest'
        }
      }
    };




    // Data and specific configurations for each chart
    const chartConfigs = {
      // Chart 1 - Immigration
      chart1: {
        ...baseConfig,
        data: {
          datasets: [
            // Germany
            {
              label: 'Die Linke (DE) - Far-left',
              data: [{ x: 2, y: 4 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (DE) - Center-left',
              data: [{ x: 3.5, y: 4 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'CDU (DE) - Right',
              data: [{ x: 6, y: 4 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'AfD (DE) - Far-right',
              data: [{ x: 9.5, y: 4 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Austria
            {
              label: 'The Greens (AT) - Center-left',
              data: [{ x: 2.5, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ÖVP (AT) - Center-right',
              data: [{ x: 7, y: 3 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'Social Democratic Party (AT) - Center-left',
              data: [{ x: 4, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'FPÖ (AT) - Far Right',
              data: [{ x: 9, y: 3 }],
              backgroundColor: '#34495e',
              borderColor: '#2c3e50',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Czech Republic
             {
              label: 'Communist Party (CZ) - Far-left',
              data: [{ x: 3, y: 1 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          {
              label: 'Social Democracy (CZ) - Center-left',
              data: [{ x: 4.5, y: 1 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ODS (CZ) - Center-right',
              data: [{ x: 8, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ANO (CZ) - Center-right',
              data: [{ x: 8, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (CZ) - Far-right',
              data: [{ x: 9, y: 1 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Poland
            {
              label: 'Third Way (PL) - Center-right',
              data: [{ x: 5.5, y: 2 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'United Right (PL) - Far-right',
              data: [{ x: 8.5, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'The Left (PL) - Center-left',
              data: [{ x: 3.0, y: 2 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'Confederation (PL) - Far-right',
              data: [{ x: 9.5, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            
          ]
        }
      },
      // Chart 2 - Environment
      chart2: {
        ...baseConfig,
        data: {
          datasets: [
            // Germany
            {
              label: 'Die Linke (DE) - Far-left',
              data: [{ x: 2, y: 4 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (DE) - Center-left',
              data: [{ x: 3, y: 4 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'CDU (DE) - Center-right',
              data: [{ x: 5.5, y: 4 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'AfD (DE) - Far-right',
              data: [{ x: 9, y: 4 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          // Austria
            {
              label: 'The Greens (AT) - Center-left',
              data: [{ x: 1.5, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ÖVP (AT) - Center-right',
              data: [{ x: 6, y: 3 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'Social Democratic Party (AT) - Center-left',
              data: [{ x: 3.5, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'FPÖ (AT) - Far Right',
              data: [{ x: 8.5, y: 3 }],
              backgroundColor: '#34495e',
              borderColor: '#2c3e50',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Czech Republic
             {
              label: 'Communist Party (CZ) - Far-left',
              data: [{ x: 4.0, y: 1 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          {
              label: 'Social Democracy (CZ) - Center-left',
              data: [{ x: 4.5, y: 1 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ODS (CZ) - Center-right',
              data: [{ x: 6, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ANO (CZ) - Center-right',
              data: [{ x: 7, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (CZ) - Far-right',
              data: [{ x: 8, y: 1 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Poland
            {
              label: 'Third Way (PL) - Center-right',
              data: [{ x: 6.5, y: 2 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'United Right (PL) - Far-right',
              data: [{ x: 8, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'Confederation (PL) - Far-right',
              data: [{ x: 9, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'The Left (PL) - Center-left',
              data: [{ x: 3.5, y: 2 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          ]
        }
      },
      // Chart 3 - Economy
      chart3: {
        ...baseConfig,
        data: {
          datasets: [
            // Germany
                       {
              label: 'Die Linke (DE) - Far-left',
              data: [{ x: 1.5, y: 4 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (DE) - Center-left',
              data: [{ x: 3, y: 4 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'CDU (DE) - Center-right',
              data: [{ x: 6.5, y: 4 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'AfD (DE) - Far-right',
              data: [{ x: 8, y: 4 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          // Poland
            {
              label: 'Third Way (PL) - Center-right',
              data: [{ x: 5.5, y: 2 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'United Right (PL) - Far-right',
              data: [{ x: 4.5, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'The Left (PL) - Center-left',
              data: [{ x: 2.5, y: 2 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'Confederation (PL) - Far-right',
              data: [{ x: 9, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Austria
            {
              label: 'The Greens (AT) - Center-left',
              data: [{ x: 3.5, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ÖVP (AT) - Center-right',
              data: [{ x: 7, y: 3 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'Social Democratic Party (AT) - Center-left',
              data: [{ x: 3, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'FPÖ (AT) - Far Right',
              data: [{ x: 7.5, y: 3 }],
              backgroundColor: '#34495e',
              borderColor: '#2c3e50',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Czech Republic
             {
              label: 'Communist Party (CZ) - Far-left',
              data: [{ x: 2, y: 1 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          {
              label: 'Social Democracy (CZ) - Center-left',
              data: [{ x: 4, y: 1 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ANO (CZ) - Center-right',
              data: [{ x: 4, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ODS (CZ) - Center-right',
              data: [{ x: 8, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (CZ) - Far-right',
              data: [{ x: 8.5, y: 1 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          ]
        }
      },
      // Chart 4 - Social Policy
      chart4: {
        ...baseConfig,
        data: {
          datasets: [
            // Germany
                        {
              label: 'Die Linke (DE) - Far-left',
              data: [{ x: 1.5, y: 4 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (DE) - Center-left',
              data: [{ x: 3, y: 4 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'CDU (DE) - Center-right',
              data: [{ x: 6, y: 4 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'AfD (DE) - Far-right',
              data: [{ x: 9.5, y: 4 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          // Czech Republic
             {
              label: 'Communist Party (CZ) - Far-left',
              data: [{ x: 4, y: 1 }],
              backgroundColor: '#8e44ad',
              borderColor: '#6c3483',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          {
              label: 'Social Democracy (CZ) - Center-left',
              data: [{ x: 4.5, y: 1 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ODS (CZ) - Center-right',
              data: [{ x: 7, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ANO (CZ) - Center-right',
              data: [{ x: 6, y: 1 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'SPD (CZ) - Far-right',
              data: [{ x: 9, y: 1 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Poland
            {
              label: 'Third Way (PL) - Center-right',
              data: [{ x: 5, y: 2 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'United Right (PL) - Far-right',
              data: [{ x: 8.5, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'The Left (PL) - Center-left',
              data: [{ x: 2.5, y: 2 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'Confederation (PL) - Far-right',
              data: [{ x: 9.5, y: 2 }],
              backgroundColor: '#2c3e50',
              borderColor: '#1a1a1a',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            // Austria
            {
              label: 'The Greens (AT) - Center-left',
              data: [{ x: 2, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
            {
              label: 'ÖVP (AT) - Center-right',
              data: [{ x: 7, y: 3 }],
              backgroundColor: '#3498db',
              borderColor: '#2980b9',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'Social Democratic Party (AT) - Center-left',
              data: [{ x: 3.5, y: 3 }],
              backgroundColor: '#e74c3c',
              borderColor: '#c0392b',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
             {
              label: 'FPÖ (AT) - Far Right',
              data: [{ x: 9, y: 3 }],
              backgroundColor: '#34495e',
              borderColor: '#2c3e50',
              borderWidth: 1,
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 10
            },
          ]
        }
      }
    };

    // 4 charts with their specific configurations
    const chart1 = new Chart(
      document.getElementById('chart1'),
      chartConfigs.chart1
    );
    
    const chart2 = new Chart(
      document.getElementById('chart2'),
      chartConfigs.chart2
    );
    
    const chart3 = new Chart(
      document.getElementById('chart3'),
      chartConfigs.chart3
    );
    
    const chart4 = new Chart(
      document.getElementById('chart4'),
      chartConfigs.chart4
    );


    return(
        <body id="parties_graphic">
        <div class="header">
            <h1>Political Spectrum – Comparison</h1>
            <div class="subtitle">Comparative analysis of Central European political systems</div>
            <div class="political-spectrum-legend">
            <div class="spectrum-container">
                <div class="spectrum-item">
                <div class="spectrum-dot far-left-dot"></div>
                <span class="spectrum-label">Far-left</span>
                </div>
                <div class="spectrum-item">
                <div class="spectrum-dot left-dot"></div>
                <span class="spectrum-label">Center-Left</span>
                </div>
                <div class="spectrum-item">
                <div class="spectrum-dot right-dot"></div>
                <span class="spectrum-label">Center-Right</span>
                </div>
                <div class="spectrum-item">
                <div class="spectrum-dot far-right-dot"></div>
                <span class="spectrum-label">Far-right</span>
                </div>
            </div>
            </div>
        </div>

        <div class="chart-grid">
            <div class="chart-container">
            <div class="chart-title">Immigration</div>
            <canvas id="chart1"></canvas>
            </div>
            <div class="chart-container">
            <div class="chart-title">Environment</div>
            <canvas id="chart2"></canvas>
            </div>
            <div class="chart-container">
            <div class="chart-title">Economy</div>
            <canvas id="chart3"></canvas>
            </div>
            <div class="chart-container">
            <div class="chart-title">Social Policy</div>
            <canvas id="chart4"></canvas>
            </div>
        </div>

        <div class="footer">
            Source: Own analysis. Data represents average political orientation.
        </div>
        </body>
    );

};

export default Parties;