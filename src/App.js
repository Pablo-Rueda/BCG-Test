import React, { useEffect, useRef, useState } from "react";
import AlertStream from "./components/AlertStream";
import { createAlertStream } from "./utils";
import styled from "styled-components";

// you may decrease this if you're feeling brave!
const INTERVAL_DURATION = 2000;

const DebugNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
`;

const BriefWrap = styled.div`
  padding: 1rem;
  background: #d2ffe7;
  margin-top: 2rem;
  text-align: left;
`;

export default function App() {
  const [items, setItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);

  // clear the alert stream
  function handleClearTapped() {
    setItems([]);
  }

  // start the alert stream
  function handleStartTapped() {
    if (!interval.current) {
      setIsRunning(true);
      interval.current = createAlertStream({
        onNewAlert: setItems,
        intervalDuration: INTERVAL_DURATION
      });
    }
  }

  // stop the alert stream
  function handleStopTapped() {
    if (interval.current) {
      interval.current();
      interval.current = null;
      setIsRunning(false);
    }
  }

  // start the alert stream on mount
  useEffect(() => {
    if (!interval.current) {
      interval.current = createAlertStream({
        onNewAlert: setItems,
        intervalDuration: INTERVAL_DURATION
      });
      setIsRunning(true);
    }
  }, []);

  return (
    <div className="App">
      <BriefWrap>
        <h1>Alert Stream Challenge</h1>
        <h3>Brief</h3>
        <p>
          Your team is introducing a Prediction Engine to software at a car
          manufacturer which generates live events – things Engineers must
          respond to.
        </p>
        <p>
          The Engineers must be able to consume this information quickly, and
          identify issues which require immediate attention.
        </p>
        <p>
          They currently receive alerts as individual emails, which keeps them
          at their desk (this is far away from the assembly line). They wish to
          use this application on iPads so they can move around the building
          whilst monitoring issues.
        </p>
        <h3>Instructions</h3>
        <p>
          <strong>Please fork this sandbox.</strong> Implement the component in
          /src/components/AlertStream to solve this challenge. You may add more
          dependencies to the project if required for this component.
        </p>
        <p>You may also create additional components if required.</p>

        <p>
          Please aim to spend ~1 hour on this challenge. Tests are not required.
        </p>
        <p>
          <i>You can remove this section before sharing your answer.</i>
        </p>
      </BriefWrap>

      <DebugNav>
        <button disabled={isRunning} onClick={handleStartTapped}>
          start
        </button>
        <button disabled={!isRunning} onClick={handleStopTapped}>
          stop
        </button>
        <button disabled={!items.length} onClick={handleClearTapped}>
          clear
        </button>
      </DebugNav>
      <AlertStream data={items} />
    </div>
  );
}
