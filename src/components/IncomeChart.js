import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import {Card, CardContent,CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toSentenceCase } from "../utils.js";
import { fromToMapForIncomeStatementSankeyChart as fromToMap, } from "../states";
import { useRecoilValue,useRecoilState } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

  var colors = ['#64b5f6', '#b2df8a', '#6aa84f', '#fdbf6f',
  '#557153', '#1f78b4', '#33a02c'];

  const data = [["From", "To", "Weight"]];

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

export default function IncomeChart() {
    
    const incomeStatement = useRecoilValue(incomeStatementState);
  
    const [currentStatement, setCurrentStatement] = useState(incomeStatement.annualReports[0]);
    const [currentYear, setCurrentYear] = useState(incomeStatement.annualReports[0].fiscalDateEnding);
    //const [currentReportType, setCurrentReportType] = useState("Annual");

    const setFiscalDate = (year) => {
        setCurrentYear(year);
    };

    const setDataSetForChart = () => {
        data.splice(0, data.length);
        data.push(["From", "To", "Weight"]);
        fromToMap.map(fromTo =>
            data.push([toSentenceCase(fromTo[0]),toSentenceCase(fromTo[1]),Number(currentStatement[fromTo[1]])])
         );          
    }

  useEffect(() => {    
    let statement = incomeStatement.annualReports.find(report => {
        return report.fiscalDateEnding === currentYear;
    });
    setCurrentStatement(statement);
    setDataSetForChart();
    
  }, [currentYear]);

  return (
    <Card variant="outlined" raised="true">
        <Header
          title="INCOME STATEMENT"
          titleTypographyProps={TitleStyles}
          subheader="As of Date, $million"
          subheaderTypographyProps={subTitleStyles}
        ></Header>
        <Content>
            <Stack direction="row" spacing={1} sx={{marginBottom: '1rem'}}>
                <Chip color="success" size="small" label="Annual" sx={{height:'1.2rem',fontSize: '0.7rem'}}
                    //onClick={setCurrentReportType("Annual")}
                    variant="outlined" />
                
                <Chip color="success" size="small" label="Quarterly" sx={{height:'1.2rem',fontSize: '0.7rem'}}
                //onClick={setCurrentReportType("Quarterly")}
                />

                    <Stack direction="row" spacing={1} sx={{marginBottom: '1rem'}}>
                        {incomeStatement.annualReports.map((year) =>
                            <Chip key={year.fiscalDateEnding} label={year.fiscalDateEnding} color="info" size="small" sx={{height:'1.2rem',fontSize: '0.7rem'}}
                                variant={currentYear === year.fiscalDateEnding ? "filled" : "outlined" }
                                clickable = {currentYear != year.fiscalDateEnding}
                                onClick={() => setFiscalDate(year.fiscalDateEnding)}/>
                        )}
                    </Stack>
            </Stack>
            <Chart
            chartType="Sankey"    
            data={data}
            options={options}
            />
    </Content>
      </Card>      
  );
};
