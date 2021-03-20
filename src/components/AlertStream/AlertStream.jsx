import React from "react";
import styled from "styled-components";

// Data available
// ------------------
// The alert data is generated using the Chance library.
// The definitions can be seen below.
// ------------------
// key: chance.guid(),
// title: chance.sentence({ words: 5 }),
// severity: chance.integer({ min: 1, max: 5 }), (1 = highest, 5 = lowest)
// type: chance.pickone(["mechanical", "software", "human"]),
// isPrediction: chance.pickone([true, false]),
// predictionConfidence: chance.integer({ min: 70, max: 99 }), (99% = almost certain to happen)
// description: chance.paragraph({ sentences: 2 }),
// time: new Date()

const AlertItems = styled.ul``;
const AlertItem = styled.li`
  text-align: left;
`;

const AlertStream = ({ data }) => (
  <AlertItems>
    {data.map(
      ({
        key,
        title,
        severity,
        type,
        isPrediction,
        predictionConfidence,
        description,
        time
      }) => (
        <AlertItem key={key}>
          <p>{title}</p>
          {/* <p>{severity}</p>
          <p>{type}</p>
          <p>{isPrediction ? "YES" : "NO"}</p>
          <p>{description}</p>
          <p>{time.toString()}</p> */}
        </AlertItem>
      )
    )}
  </AlertItems>
);

export default AlertStream;
