import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Chart } from "react-google-charts";


export default function IncomeChart() {
  const data1 = [
            {from: 'Revenue', to: 'Cost of Revenue', value: 25865},
            {from: 'Revenue', to: 'Gross Profit', value: 31486},
            {from: 'Gross Profit', to: 'Operating Expense', value: 24654},
            {from: 'Gross Profit', to: 'Operating Income', value: 6832},
            {from: 'Operating Expense', to: 'Selling/General/Admin. Expenses', value: 18608},
            {from: 'Operating Expense', to: 'Research & Development', value: 6488},
            {from: 'Operating Expense', to: 'Depreciation / Amortization', value: 435},
            {from: 'Operating Income', to: 'Tax Provision', value: 124},
            {from: 'Operating Income', to: 'Pre-Tax Income', value: 4837},        
            {from: 'Operating Income', to: 'Interest Expense', value: 1155},        
            {from: 'Operating Income', to: 'Net Non Operating Interest Income Expenses', value: 890},        

        ];
        
    const data = [
            ["From", "To", "Weight"],
            ['Revenue', 'Cost of Revenue', 25865]
            ['Revenue', 'Gross Profit', 31486]            
          ];
          
 const options = {};

  return (
    <Chart
      chartType="Sankey"
      width="40%"
      height="200px"
      data={data}
      options={options}
    />
  );
};
