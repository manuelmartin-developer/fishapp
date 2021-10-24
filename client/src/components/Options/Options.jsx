import React from "react";
import "./Options.scss";

const Options = (props) => {
  const options = [
    {
      text: "Síntomas",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Consejos", handler: () => {}, id: 2 },
    { text: "Veterinario", handler: () => {}, id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;

