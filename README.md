# Alert Stream Challenge

## Brief

Your team is introducing a Prediction Engine to software at a car manufacturer which generates live events – things Engineers must respond to.

The Engineers must be able to consume this information quickly, and identify issues which require immediate attention.

They currently receive alerts as individual emails, which keeps them at their desk (this is far away from the assembly line). They wish to use this application on iPads so they can move around the building whilst monitoring issues.

## Instructions

Please fork this sandbox. Implement the component in /src/components/AlertStream to solve this challenge. You may add more dependencies to the project if required for this component.

You may also create additional components if required.

Please aim to spend ~1 hour on this challenge. Tests are not required.

## Alert Schema

The alert data is generated using the Chance library, and has a schema as follows:

```
{
    key: chance.guid(),
    title: chance.sentence({ words: 5 }),
    severity: chance.integer({ min: 1, max: 5 }),
    type: chance.pickone(["mechanical", "software", "human"]),
    isPrediction: chance.pickone([true, false]),
    predictionConfidence: chance.integer({ min: 70, max: 99 }),
    description: chance.paragraph({ sentences: 2 }),
    time: new Date()
}
```
