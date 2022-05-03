import { useEffect, useState } from "react";
import wrong from "../sounds/src_sounds_wrong.mp3";
import useSound from "use-sound";

const Timer = ({ questionNumber, setStop, selectedAnswer }) => {
  const [timer, setTimer] = useState(30);
  const [worngAnswer] = useSound(wrong);
  //
  useEffect(() => {
    if (timer === 0) {
      setStop(true);
      worngAnswer();
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    const interval = setInterval(() => {
      !selectedAnswer && setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  //
  return timer;
};

export default Timer;
