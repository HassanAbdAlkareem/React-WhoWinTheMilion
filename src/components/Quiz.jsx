import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../sounds/src_sounds_correct.mp3";
import play from "../sounds/src_sounds_play.mp3";
import wrong from "../sounds/src_sounds_wrong.mp3";
import wait from "../sounds/src_sounds_wait.mp3";

const Quiz = ({
  questionNumber,
  setQuestionsNumber,
  data,
  setStop,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  const [question, setQuestion] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [worngAnswer] = useSound(wrong);
  const [waiting] = useSound(wait);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    waiting();
  });

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  //
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionsNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        worngAnswer();
        delay(1000, () => {
          setStop(true);
          delay(4000, () => {
            setStop(false);
            window.location.reload();
          });
        });
      }
    });
  };

  //
  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a, index) => (
          <div
            key={index}
            onClick={() => handleClick(a)}
            className={selectedAnswer === a ? className : "answer"}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
