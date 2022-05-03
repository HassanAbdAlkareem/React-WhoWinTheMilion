import React, { useEffect, useState } from "react";
import "./App.css";
import { moneyPyramid, alData } from "./Data";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [questionNumber, setQuestionsNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("user") || null
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);

  const handelLogout = () => {
    setUsername(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * alData.length);
    setData(alData[randomNumber]);
  }, []);

  return (
    <div className="app">
      {username ? (
        <React.Fragment>
          <div className="main">
            {stop ? (
              <h1 className="stop">
                {username} لقد ربحت : {earned}
              </h1>
            ) : earned == "$ 32.000" ? (
              <div className="winner">
                {username} - مبروك لك فزت في الاختبار
              </div>
            ) : (
              <React.Fragment>
                <div className="top">
                  <button onClick={handelLogout} className="logout">
                    تسجيل خروج
                  </button>
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber}
                      selectedAnswer={selectedAnswer}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionsNumber={setQuestionsNumber}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    stop={stop}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="pryamid">
            <ul>
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={questionNumber === m.id ? "item active" : "item"}
                >
                  <span>{m.id}</span>
                  <span>{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ) : (
        <Start setUsername={setUsername} username={username} />
      )}
    </div>
  );
}

export default App;
