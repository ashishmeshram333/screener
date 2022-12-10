import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilValue, useRecoilState } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";
import { toSentenceCase } from "../utils.js";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const convertMillions = (labelValue) => {
  return ((Number(labelValue)) / 1.0e6).toFixed(1)  
};

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default function DenseTable() {

    const incomeStatement = useRecoilValue(incomeStatementState);

    const years = [];
    const data = [];

    incomeStatement.annualReports.map((year) => {
        years.push(year.fiscalDateEnding.substring(0, 4));
    });
    
    const result = Object.assign(...Object.keys(incomeStatement.annualReports[0]).map( key =>
      ({ [key]: incomeStatement.annualReports.map( o => isNumeric(o[key])? convertMillions(o[key]) : o[key] ) })
    ));

    console.log(result.fiscalDateEnding);
    
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>See Tabular Income Statement</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="Income statement">
              <TableHead>
                <TableRow>
                  { result.fiscalDateEnding.map((key) => {            
                      <TableCell>{key}</TableCell>          
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(result).filter(key => key != 'reportedCurrency').map((key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {toSentenceCase(key)}
                    </TableCell>
                    {result[key].map((item) => (
                      <TableCell align="right">{item}</TableCell>  ))  }        
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>     
  );
}