import logo from "./logo.svg";
import "./App.css";
import { colors, CssBaseline, Container, Divider } from "@mui/material";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Navbar from "./components/layout/navbar";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import CompanyName from "./components/CompanyName";
import Stats from "./components/Stats";
import Ratios from "./components/Ratios";
import MoreStats from "./components/MoreStats";
import SalesChart from "./components/SalesChart";
import BalanceSheetChart from "./components/BalanceSheetChart";
import IncomeChart from "./components/IncomeChart";
import CashFlowChart from "./components/CashFlowChart";
import IncomeTable from "./components/IncomeTable";
import DividendChart from "./components/DividendChart";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42c2db",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <Container component="main">
        <Navbar></Navbar>
        <CompanyName></CompanyName>        
        <Grid container spacing={1} columns={12}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Stats></Stats>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box><SalesChart></SalesChart></Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Ratios />
          </Grid>
        </Grid>
        <Grid container spacing={1} columns={12}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BalanceSheetChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <CashFlowChart />
          </Grid>          
        </Grid>
        <Grid container spacing={1} columns={12}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <IncomeChart />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <DividendChart />
          </Grid>          
          <Grid item xs={12}>
            <IncomeTable />
          </Grid>
        </Grid>
      </Container>
    </RecoilRoot>
  );
}

export default App;
