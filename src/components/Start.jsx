import React, { useRef } from "react";

const Start = ({ setUsername }) => {
  const inputRef = useRef();
  //
  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
    inputRef.current.value &&
      localStorage.setItem("user", inputRef.current.value);
  };
  return (
    <div className="start">
      <input placeholder="Enter Your Name" ref={inputRef} />
      <button onClick={handleClick}>Start</button>
    </div>
  );
};

export default Start;
