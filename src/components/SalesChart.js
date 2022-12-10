import * as React from "react";
import Box from "@mui/material/Box";
import { useRecoilValue, useRecoilState } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";
import { toSentenceCase,convertMillions } from "../utils.js";
import { Card, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export default function SalesChart() {

  const incomeStatement = useRecoilValue(incomeStatementState);


  const years = [];
  const revenue = []; 
  const operatingProfit = [];
  const netProfit = [];

  incomeStatement.annualReports.slice(0,5).map((year) => {
    years.push(year.fiscalDateEnding.substring(0, 4));
    revenue.push(convertMillions(year.totalRevenue));
    operatingProfit.push(convertMillions(year.operatingIncome));
    netProfit.push(convertMillions(year.netIncome));
  });

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Revenue',
        data:  revenue,
        backgroundColor: '#ADD8E6', //7CB9E8
      },
      {
        label: 'Gross Profit',
        data:  operatingProfit,
        backgroundColor: '#ADC2AD',
      },
      {
        label: 'Net Profit',
        data:  netProfit,
        backgroundColor: '#0B7A75',
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
          display: true,
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
      title="REVENUE AND PROFIT"
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
