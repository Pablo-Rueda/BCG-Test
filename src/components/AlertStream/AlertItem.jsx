// I´ve created a separated component for the Alert Items to work with them as separated entities.
// This way, I was able to worry less about how to remove Items from the AlertStream level

import React, { useState } from "react";
import styled from "styled-components";
// Material UI library - styling library, works well with styled components and allows to work faster with a clean design
import {
  Card,
  CardContent,
  Grid,
  Collapse,
  Typography,
  Button
} from "@material-ui/core";

// Styling:
const Item = styled(Card)`
  display: ${(props) => props.display};
  margin: 10px !important;
  text-align: center;
  background-color: #fafafa !important;
  padding: 0px;
`;
const Title = styled(CardContent)`
  &:hover {
    /* set title on hover as pointer, since it can be clicked*/
    cursor: pointer;
    color: grey !important;
  }
`;
const SolvedButton = styled(Button)`
  background-color: #59ba59 !important;
  margin: 10px;
`;

// Component:
const AlertItem = ({ event }) => {
  // destructure the event:
  const {
    title,
    severity,
    type,
    isPrediction,
    predictionConfidence,
    description
  } = event;

  // States and functions:
  // Expand information (description and solved button):
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Remove issue when solved:
  const [solved, setSolved] = useState("block");

  const handleButtonClick = () => {
    // ideally, here we would be sending a request to the server with the
    // issue ID to remove it. For now, since I don't have access to the server, I
    // hide the component
    setSolved("none");
  };

  // Issue header color system to allow a faster screening (based on color)
  // It is based on the Severity and the Prediction Confidence Level
  const severityStyling =
    severity >= 4
      ? {
          // if high severity (4,5) the header color will be red
          backgroundColor:
            "rgba(242, 63, 63, " +
            (!isPrediction
              ? severity / 5
              : (severity * predictionConfidence) ** 2 / 500 ** 2) +
            ")" //if it is a real event, the color intensity will be based only on  the event severity;
          // if it is a prediction, the color intensity will be based on the prediction Confidence Level and the Severity.
          // The calculation is exponential to increase the color difference
        }
      : severity >= 2
      ? {
          // if meddium severity (2,3) the header color will be yellow
          backgroundColor:
            "rgba(252, 215, 3, " +
            (!isPrediction
              ? severity / 3
              : (severity * predictionConfidence) ** 2 / 300 ** 2) +
            ")"
        }
      : {
          // if low severity (1) the header color will be blue
          backgroundColor: "#e3f9fa"
        };

  return (
    <Item display={solved}>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={severityStyling}
      >
        {/* 
        The Alert Item header will show: Severity, Type of Issue and it Confidence Level.
        This information can be usefull to get an idea of the issues in a first quick screening.
        I understood that a "predicted = false" issue was not a prediction, but a happening issue, so it will set as "Real".
      */}
        <Grid item xs={4}>
          <Typography variant="h6" color="textSecondary">
            Severity: {severity}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="textSecondary">
            {type}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" color="textSecondary">
            {isPrediction ? "CL " + predictionConfidence + "%" : "Real"}
          </Typography>
        </Grid>
      </Grid>
      <Title onClick={handleExpandClick}>
        {/* 
          After the header, we have the title for an initial idea of the issue.
          If it is severe and urgent, it can be clicked to get more information.
        */}
        <Typography variant="h6" style={{ margin: 0, padding: 0 }}>
          {title}
        </Typography>
      </Title>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent onClick={handleExpandClick}>
          {/*The event Description is not necessary when screening the issues. 
          It is hidden, unless the engineer needs to check an issue in detail*/}
          <Typography>{description}</Typography>
          {/* When an issue is solved, it can be removed by clicking the "Solved?" button.
            It is hidden to avoid clicking it accidentaly when screening the issues
            with mobile phone or Ipad*/}
          <SolvedButton onClick={handleButtonClick}>Solved?</SolvedButton>
        </CardContent>
      </Collapse>
    </Item>
  );
};
export default AlertItem;
