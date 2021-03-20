import React from "react";
import AlertItem from "./AlertItem";

const AlertStream = ({ data }) => {
  return (
    <div>
      {data.map((event) => (
        <AlertItem key={event.key} event={event} />
      ))}
    </div>
  );
};

export default AlertStream;
