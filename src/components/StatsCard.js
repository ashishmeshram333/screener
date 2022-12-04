import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "400",
}));

const Key = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: "400",
}));

const Change = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: "green",
}));

const ChangeDivStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

export default function StatsCard(props) {
  return (
    <div>
      <Item>
        <Key>{props.title}</Key>
        <Value> {props.value}</Value>
        {props.showChange && (
          <div style={ChangeDivStyle}>
            <KeyboardArrowUp sx={{ color: "green" }} />
            <Change>10.23% </Change>
          </div>
        )}
      </Item>
    </div>
  );
}
