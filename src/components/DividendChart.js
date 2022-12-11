import * as React from "react";
import Box from "@mui/material/Box";
import { useRecoilValue, useRecoilState } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";
import { toSentenceCase,convertMillions } from "../utils.js";
import { Card, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { cashFlowStatement as cashFlowStatementState } from "../states";

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

export default function DividendChart() {

  const incomeStatement = useRecoilValue(incomeStatementState);
  const cashFlowStatement = useRecoilValue(cashFlowStatementState);

  const years = [];
  const dividends = []; 

    cashFlowStatement.annualReports.slice(0,10).map((year) => {
        years.push(year.fiscalDateEnding.substring(0, 4));
        dividends.push(convertMillions(year.dividendPayout));
    });

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Dividend',
        data:  dividends,
        backgroundColor: '#ADD8E6', //7CB9E8
        barPercentage: 0.5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
          display: false,
          position: 'bottom'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: true
        }
      }
  }
  };

  return (
    <Card variant="outlined" raised="true">
    <Header
      title="DIVIDENDS"
      titleTypographyProps={TitleStyles}
      subheader="$million"
      subheaderTypographyProps={subTitleStyles}
    ></Header>
    <Content>
      <Box>
        <Bar options={options} data={data} />
      </Box>
    </Content>
  </Card>    
  );
}
