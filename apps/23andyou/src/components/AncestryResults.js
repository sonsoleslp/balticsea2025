import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import Accordion from './Accordion';
import {GLOBAL_CONFIG} from '../config/config.js';
const {ancestryData} = GLOBAL_CONFIG;
Chart.register(ArcElement);



const AncestryDetails = ({ region, percentage, details, isOpen, onClick }) => (
  <div>
    <div className="ancestry-title" onClick={onClick}>
      {region}: {percentage}%
    </div>
    {isOpen && <div className="ancestry-details">{details}</div>}
  </div>
);

const AncestryResults = () => {
  const [expandedRegion, setExpandedRegion] = useState(null);

  const handleTitleClick = (region) => {
    setExpandedRegion(prevRegion => prevRegion === region ? null : region);
  };

  const chartOptions = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const label = data.labels[tooltipItem.index];
          const value = dataset.data[tooltipItem.index];
          return `${label}: ${value}%`;
        }
      }
    }
  };
    const chartData = {
    labels: ancestryData.map(item => item.region),
    datasets: [{
      labels: ancestryData.map(item => item.region),

      data: ancestryData.map(item => item.percentage),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF9F40',
        '#4BC0C0'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF9F40',
        '#4BC0C0'
      ]
    }]
  };

  return (<div>
          <h2>Where do you come from?</h2>

    <div className="ancestry-results">
      <Pie data={chartData} options={chartOptions} />

    </div>
    <div>
          {ancestryData.map((item, index) => (
            <Accordion key={index} title={item.region  + " (" + item.percentage + "%)"}>
              <p>{item.details}</p>
            </Accordion>

          ))}
    </div>

    </div>
  );
};

export default AncestryResults;
