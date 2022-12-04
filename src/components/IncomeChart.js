import React from 'react';
import { Chart } from "react-google-charts";
import {Card, CardContent,CardHeader, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toSentenceCase } from "../utils.js";
import { fromToMapForIncomeStatementSankeyChart as fromToMap, } from "../states";
import { useRecoilValue } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";


const Header = styled(CardHeader)(({ theme }) => ({
    padding: "5px",
  }));
  
  const Content = styled(CardContent)(({ theme }) => ({
    paddingTop: "0",
    paddingBottom: "0",
    margin: "0",
  }));
  
  const TitleStyles = {
    fontSize: "0.7rem",
     color:"orange" 
  }
  
  const subTitleStyles = {
    fontSize: "0.6rem",
     color:"grey" 
  }

export default function IncomeChart() {
    
    const incomeStatement = useRecoilValue(incomeStatementState);
    let currentStatement = incomeStatement.annualReports[0];

    const dataArr = [["From", "To", "Weight"]];
    

    fromToMap.map(fromTo =>
            dataArr.push([toSentenceCase(fromTo[0]),toSentenceCase(fromTo[1]),Number(currentStatement[fromTo[1]])])
         );

    dataArr.map(item =>
        console.log(item)
        );
    
    const data = [
            ["From", "To", "Weight"],
            ['Revenue', 'Cost of Revenue', 25865],
            ['Revenue', 'Gross Profit', 31486],
            ['Gross Profit', 'Operating Expense', 24654],
            ['Gross Profit', 'Operating Income', 6832],
            ['Operating Expense', 'Selling/General/Admin. Expenses', 18608],
            ['Operating Expense', 'Research & Development', 6488],
            ['Operating Expense', 'Depreciation / Amortization', 435],
            ['Operating Income', 'Tax Provision', 124],
            ['Operating Income', 'Pre-Tax Income', 4837],        
            ['Operating Income', 'Interest Expense', 1155],        
            ['Operating Income', 'Net Non Operating Interest Income Expenses', 890],
        ];

    var colors = ['#64b5f6', '#b2df8a', '#6aa84f', '#fdbf6f',
        '#557153', '#1f78b4', '#33a02c'];

    var options = {
        height: 400,
        sankey: {
            node: {
            colors: colors,
            width:20,
            label: {
                fontSize: 12,
                color: '#003333',
            },
          
            },
            link: {
                color: {
                  fill: '#dee2e6',     // Color of the link.
                  fillOpacity: 0.8, // Transparency of the link.
                }
              }
        }
    };
      
  return (
    <Card variant="outlined" raised="true">
        <Header
          title="INCOME STATEMENT"
          titleTypographyProps={TitleStyles}
          subheader="As of Date, $million"
          subheaderTypographyProps={subTitleStyles}
        ></Header>
        <Content>
      
    <Chart
      chartType="Sankey"    
      data={dataArr}
      options={options}
    />
    </Content>
      </Card>      
  );
};
