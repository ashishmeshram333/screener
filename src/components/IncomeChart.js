import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Card, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toSentenceCase,convertMillions, sankeyColorPallet } from "../utils.js";
import { fromToMapForIncomeStatementSankeyChart as fromToMap } from "../states";
import { useRecoilValue, useRecoilState } from "recoil";
import { incomeStatement as incomeStatementState } from "../states";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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

const data = [["From", "To", "Weight"]];

var options = {
  height: 400,
  sankey: {
    node: {
      colors: sankeyColorPallet,
      width: 20,
      label: {
        fontSize: 12,
        color: "#003333",
      },
    },
    link: {
      color: {
        fill: "#dee2e6", // Color of the link.
        fillOpacity: 0.8, // Transparency of the link.
      },
    },
  },
};

export default function IncomeChart() {
  const incomeStatement = useRecoilValue(incomeStatementState);

  const [currentStatement, setCurrentStatement] = useState(
    incomeStatement.annualReports[0]
  );
  const [currentYear, setCurrentYear] = useState(
    incomeStatement.annualReports[0].fiscalDateEnding
  );
  const [isAnnual, setAnnual] = useState(true);

  const setQuarterly = () => {
    setAnnual(false);
    setCurrentYear(incomeStatement.quarterlyReports[0].fiscalDateEnding);
  };

  const setAnnually = () => {
    setAnnual(true);
    setCurrentYear(incomeStatement.annualReports[0].fiscalDateEnding);
  };

  const setDataSetForChart = () => {
    data.splice(0, data.length);
    data.push(["From", "To", "Weight"]);
    fromToMap.map((fromTo) =>
      data.push([
        toSentenceCase(fromTo[0]),
        toSentenceCase(fromTo[1]),
        Number(convertMillions(currentStatement[fromTo[1]])),
      ])
    );
  };

  useEffect(() => {
    let reports = isAnnual
      ? incomeStatement.annualReports
      : incomeStatement.quarterlyReports;

    let statement = reports.find((report) => {
      return report.fiscalDateEnding === currentYear;
    });

    setCurrentStatement(statement);

    setDataSetForChart();
  });

  return (
    <Card variant="outlined" raised="true">
      <Header
        title="INCOME STATEMENT"
        titleTypographyProps={TitleStyles}
        subheader="$million"
        subheaderTypographyProps={subTitleStyles}
      ></Header>
      <Content>
        <Stack direction="row" spacing={1} sx={{ marginBottom: "1rem" }}>
          <Chip
            color="success"
            size="small"
            label="Annual"
            sx={{ height: "1.2rem", fontSize: "0.7rem" }}
            variant={isAnnual ? "filled" : "outlined"}
            onClick={() => setAnnually()}
          />

          <Chip
            color="success"
            size="small"
            label="Quarterly"
            sx={{ height: "1.2rem", fontSize: "0.7rem" }}
            variant={isAnnual ? "outlined" : "filled"}
            onClick={() => setQuarterly()}
          />
          {isAnnual ? (
            <Stack direction="row" spacing={1} sx={{ marginBottom: "1rem" }}>
              {incomeStatement.annualReports.slice(0, 5).map((year) => (
                <Chip
                  key={year.fiscalDateEnding}
                  label={year.fiscalDateEnding.substring(0, 4)}
                  color="info"
                  size="small"
                  sx={{ height: "1.2rem", fontSize: "0.7rem" }}
                  variant={
                    currentYear === year.fiscalDateEnding
                      ? "filled"
                      : "outlined"
                  }
                  clickable={currentYear != year.fiscalDateEnding}
                  onClick={() => setCurrentYear(year.fiscalDateEnding)}
                />
              ))}
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ marginBottom: "1rem" }}>
              {incomeStatement.quarterlyReports.slice(0, 5).map((year) => (
                <Chip
                  key={year.fiscalDateEnding}
                  label={year.fiscalDateEnding}
                  color="info"
                  size="small"
                  sx={{ height: "1.2rem", fontSize: "0.7rem" }}
                  variant={
                    currentYear === year.fiscalDateEnding
                      ? "filled"
                      : "outlined"
                  }
                  clickable={currentYear != year.fiscalDateEnding}
                  onClick={() => setCurrentYear(year.fiscalDateEnding)}
                />
              ))}
            </Stack>
          )}
        </Stack>
        <Chart chartType="Sankey" data={data} options={options} />
      </Content>
    </Card>
  );
}
