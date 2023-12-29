import React, { useState } from "react";

function ScoreBoard(props) {
  const handleContent = (e) => {
    props.setScore(e.target.value);
  };

  const scores = [1, 2, 3, 4, 5];
  return scores.map((score) => (
    <input
      type="radio"
      name={props.name}
      value={score}
      onChange={(e) => handleContent(e)}
    ></input>
  ));
}
export { ScoreBoard };
