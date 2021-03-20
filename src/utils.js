const Chance = require("chance");

let chance = new Chance();

const createNewAlert = () => {
  return {
    key: chance.guid(),
    title: chance.sentence({ words: 5 }),
    severity: chance.integer({ min: 1, max: 5 }),
    type: chance.pickone(["mechanical", "software", "human"]),
    isPrediction: chance.pickone([true, false]),
    predictionConfidence: chance.integer({ min: 70, max: 99 }),
    description: chance.paragraph({ sentences: 2 }),
    time: new Date()
  };
};

// create a new alert stream
export const createAlertStream = ({ onNewAlert, intervalDuration }) => {
  const interval = setInterval(() => {
    const newItem = createNewAlert();
    if (onNewAlert && typeof onNewAlert === "function") {
      onNewAlert((items) => [...items, newItem]);
    }
  }, intervalDuration);
  return () => clearInterval(interval);
};
