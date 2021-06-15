import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ title, statistic }) => {
  return (
    <p>
      {title} {statistic}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <br />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <br />
      <h1>statistics</h1>
      <br />
      {good || neutral || bad ? (
        <>
          <Statistics title="good" statistic={good} />
          <Statistics title="neutral" statistic={neutral} />
          <Statistics title="bad" statistic={bad} />
          <Statistics title="all" statistic={good + neutral + bad} />
          <Statistics
            title="average"
            statistic={(good - bad) / (good + bad + neutral)}
          />
          <Statistics
            title="positive"
            statistic={`${(good / (good + neutral + bad)) * 100}%`}
          />
        </>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default App;
