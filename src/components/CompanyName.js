import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {company} from '../utils.js';


export default function CompanyName(props) {
  return (
    <div>
        <Grid container spacing={2} sx={{ marginTop: '1rem', marginBottom: '1rem'}}>
          <Grid item xs={6} md={8}>
            <Typography component="h1" variant="h5">
              {company.Name} ({company.Symbol})
            </Typography>
          </Grid>
          <Grid item xs={6} md={4} sx={{ display: 'none' }}>
            <Typography component="h5" variant="h5">
              {company.Exchange}
            </Typography>
          </Grid>
        </Grid>
      </div>
  );
}