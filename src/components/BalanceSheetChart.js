import * as React from "react";
import Grid from "@mui/material/Grid";
import { useRecoilValue } from "recoil";
import { convertMillions,toSentenceCase } from "../utils.js";
import {Card, CardContent,CardHeader, Box } from "@mui/material";
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

import { balanceSheet as balanceSheetState } from "../states";

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
   color:"orange" 
}

const subTitleStyles = {
  fontSize: "0.6rem",
   color:"grey" 
}


const assetColors = [  
  '#0A758F',
  '#0D98BA',
  '#10BBE5',
  '#32CBF1',
  '#5DD6F4'
]


const liabilitiesColors = [  
  '#7d3c34',
  '#984940',
  '#b4564b',
  '#bf7067',
  '#d7a49e'
]

export const options = {
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false   
    }    
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      grid: {
        display: false
      }
    },
  },
};

let libOptions = JSON.parse(JSON.stringify(options));
libOptions.scales.y.ticks = {
  display: false
};

export default function BalanceSheetChart() {

  const balanceSheet = useRecoilValue(balanceSheetState);
  const latest = balanceSheet.annualReports[0];

  const assetsDataset = [];
  const liabilitiesDataset = [];
  
  const assets = (({ totalCurrentAssets, totalNonCurrentAssets }) => 
    ({ totalCurrentAssets, totalNonCurrentAssets}))(latest);


  const liabilities = (({ totalCurrentLiabilities ,totalNonCurrentLiabilities, totalShareholderEquity }) => 
    ({ totalCurrentLiabilities ,totalNonCurrentLiabilities, totalShareholderEquity }))(latest);

  Object.keys(assets).forEach((e,i) => assetsDataset.push(
    {
      label: toSentenceCase(e),
      data: [convertMillions(assets[e])],
      backgroundColor: assetColors[i]
    }
  ));

  Object.keys(liabilities).forEach((e,i) => liabilitiesDataset.push(
    {
      label: toSentenceCase(e),
      data: [convertMillions(liabilities[e])],
      backgroundColor: liabilitiesColors[i]
    }
  ));

  const assetsData = {
    labels: ['Assets'],
    datasets: assetsDataset    
  };

  const liabilitiesData = {
    labels: ['Liabilities'],
    datasets: liabilitiesDataset    
  };

  const getAssetsChartHeight = (val) => {    
    return val * 100 / convertMillions(latest.totalAssets);
  };

  const getLiabilitiesChartHeight = (val) => {    
    return val * 100 / convertMillions(latest.totalLiabilities + latest.totalShareholderEquity);
  };

  const graphAssetItemStyle = (item,idx) => {    
    return  {
    backgroundColor:assetColors[idx],
    height: getAssetsChartHeight(item.data) + '%',
    fontSize: "1rem",
    color:'#E2DFD2',
    textAlign:"center",
    borderBottom:'1px solid #EDEADE'
    }
  };

  const graphLiabilityItemStyle = (item,idx) => {    
    return  {
    backgroundColor:liabilitiesColors[idx],
    height: getAssetsChartHeight(item.data) + '%',
    fontSize: "1rem",
    color:'#E2DFD2',
    textAlign:"center",
    borderBottom:'1px solid #EDEADE'
    }
  };


  const graphLabelsStyle = (item,idx) => {    
    return  {
    height: getAssetsChartHeight(item.data) + '%',
    fontSize: "0.7rem",
    color:'#E2DFD2',
    textAlign:"center",
    color: 'brown'
    }
  };
  return (
    <Card variant="outlined" raised="true">
        <Header
          title="BALANCE SHEET"
          titleTypographyProps={TitleStyles}
          subheader="As of Date, $million"
          subheaderTypographyProps={subTitleStyles}
        ></Header>
        <Content>
      <Grid container spacing={2} columns={16} display="true">
        <Grid item xs={5} flexDirection="column" sx={{height:'20rem'}}>
          {assetsDataset.map((item, index) => (
              <Grid key={index} sx={graphLabelsStyle(item, index)}>
                <span>{ getAssetsChartHeight(item.data) > 5 ? item.label : '' }</span>
              </Grid>
            ))}
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={1} flexDirection="column" sx={{height:'20rem'}}>
            {assetsDataset.map((item, index) => (
              <Grid key={index} sx={graphAssetItemStyle(item, index)}>
                <span>{ getAssetsChartHeight(item.data) > 5 ? item.data : '' }</span>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={1} flexDirection="column" sx={{height:'20rem'}}>
            {liabilitiesDataset.map((item, index) => (
              <Grid key={index} sx={graphLiabilityItemStyle(item, index)}>
                <span>{ getLiabilitiesChartHeight(item.data) > 5 ? item.data : '' }</span>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={5} flexDirection="column" sx={{height:'20rem'}}>
          {liabilitiesDataset.map((item, index) => (
              <Grid key={index} sx={graphLabelsStyle(item, index)}>
                <span>{ getLiabilitiesChartHeight(item.data) > 5 ? item.label : '' }</span>
              </Grid>
            ))}
        </Grid>
    </Grid>

    </Content>
      </Card>      
  );
}
