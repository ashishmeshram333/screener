import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Card, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toSentenceCase } from "../utils.js";
import { fromToMapForIncomeStatementSankeyChart as fromToMap } from "../states";
import { useRecoilValue, useRecoilState } from "recoil";
import { cashFlowStatement as cashFlowStatementState } from "../states";
import Box from "@mui/material/Box";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  color: "orange",
};

const subTitleStyles = {
  fontSize: "0.6rem",
  color: "grey",
};

const convertMillions = (labelValue) => {
    return ((Number(labelValue)) / 1.0e6).toFixed(1)  
  };    

export default function IncomeChart() {
    const cashFlowStatement = useRecoilValue(cashFlowStatementState);

    const years = [];
    const operation = []; 
    const investment = [];
    const finance = [];

cashFlowStatement.annualReports.slice(0,5).map((year) => {
  years.push(year.fiscalDateEnding.substring(0, 4));
  operation.push(convertMillions(year.operatingCashflow));
  investment.push(convertMillions(year.cashflowFromInvestment));
  finance.push(convertMillions(year.cashflowFromFinancing));
});

const data = {
    labels: years,
    datasets: [
      {
        label: 'Operations',
        data:  operation,
        backgroundColor: '#439A86',
      },
      {
        label: 'Investments',
        data:  investment,
        backgroundColor: '#40798C',
      },
      {
        label: 'Financing',
        data:  finance,
        backgroundColor: '#A9DDD6',
      }
    ]
  };

  const options = {
    scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              }
            },
            y: {
              stacked: true,
              grid: {
                display: true
              }
            }
        }
  };
  
  return (
    <Card variant="outlined" raised="true">
      <Header
        title="CASH FLOW STATEMENT"
        titleTypographyProps={TitleStyles}
        subheader="$million"
        subheaderTypographyProps={subTitleStyles}
      ></Header>
      <Content>
      <Box sx={{height: '21rem'}}>
        <Bar options={options} data={data} />
      </Box>
      </Content>
    </Card>
  );
}
