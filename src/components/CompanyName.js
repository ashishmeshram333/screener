import * as React from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { company as companyState } from "../states";

export default function CompanyName() {
  const company = useRecoilValue(companyState);
  console.log("company details in CompanyName: " + JSON.stringify(company));
  return JSON.stringify(company) != "{}" ? (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <Grid item xs={6} md={8}>
          <Typography component="h1" variant="h5">
            {company.Name} ({company.Symbol})
          </Typography>
          <Typography variant="caption" sx={{ fontSize: "0.6rem" }} gutterBottom>
            {company.Sector}  /  {company.Industry}
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Chip label={company.Exchange} /> &nbsp;&nbsp;
          <Chip label={company.Currency} /> &nbsp;&nbsp;
          <Chip label={company.Sector} /> &nbsp;&nbsp;          
        </Grid>
      </Grid>
    </div>
  ) : (
    <span>Nothing to display</span>
  );
}
