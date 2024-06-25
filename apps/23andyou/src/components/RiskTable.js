// src/components/RiskTable.js

import React, { useState } from 'react';
import Accordion from './Accordion';
import {GLOBAL_CONFIG} from "../config/config"
const {riskData} = GLOBAL_CONFIG;
const RiskTable = () => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortData = (items) => {
    if (sortConfig !== null) {
      return [...items].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  const renderAccordion = (items) => (
    items.map((item) => (
      <Accordion key={item.name} title={item.name}>
        <p>{item.details}</p>
      </Accordion>
    ))
  );

  return (
    <div className="risk-table">
      <h2>What do your genes say about your body and health?</h2>
      <h3>Elevated Risk</h3>
      {renderAccordion(sortData(riskData.elevatedRisk))}

      <h3>Decreased Risk</h3>
    
      {renderAccordion(sortData(riskData.decreasedRisk))}
    </div>
  );
};

export default RiskTable;
