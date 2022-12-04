import * as React from "react";
import { Typography } from "@mui/material";
import { convertToCurrency, company } from "../utils.js";

export default function MoreStats(props) {
  return (
    <div class="mainContainer">
      <div class="container2" id="container">
        <div class="box">
          {" "}
          <Typography>Sector:</Typography>
          <span class="value">
            <Typography>{company.Sector}</Typography>
          </span>
        </div>
        <div class="box">
          {" "}
          <Typography>Market Capitalization:</Typography>{" "}
          <Typography>
            {convertToCurrency(company.MarketCapitalization)}
          </Typography>
        </div>
        <div class="box">
          {" "}
          <Typography>Revenue TTM:</Typography>{" "}
          <Typography>{convertToCurrency(company.RevenueTTM)}</Typography>
        </div>
      </div>

      <div class="container2" id="container">
        <div class="box">
          {" "}
          <Typography>EBITDA:</Typography>
          <Typography>{convertToCurrency(company.EBITDA)}</Typography>
        </div>
        <div class="box">
          {" "}
          <Typography>Gross Profit TTM:</Typography>
          <Typography>{convertToCurrency(company.GrossProfitTTM)}</Typography>
        </div>
        <div class="box">
          {" "}
          <Typography>PE Ratio:</Typography>{" "}
          <Typography>{company.PERatio}</Typography>
        </div>
      </div>

      <div class="container2" id="container">
        <div class="box">
          {" "}
          <Typography>Divident Yield (%):</Typography>{" "}
          <Typography>{company.DividendYield}</Typography>
        </div>
        <div class="box">
          {" "}
          <Typography>Book Value:</Typography>
          <Typography>{company.BookValue}</Typography>
        </div>
        <div class="box">
          {" "}
          <span class="key">Revenue </span> <span class="value">60 Bn</span>
        </div>
      </div>
    </div>
  );
}
