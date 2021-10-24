import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Questions from "../components/Questions/Questions";


const config = {
  botName: "Dr.Glub",
  initialMessages: [
    createChatBotMessage(`Hola, ¿en que te puedo ayudar?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "consultaMedica",
      widgetFunc: (props) => <Questions {...props} />,
      props: {
        questions: [
          {
            question: "¿Qué síntomas tiene?",
            /* answer:
              "Puntos blancos en las escamas" */
            id: 1,
          },
          {
            question: "Presenta dificultades para nadar?",
            /* answer:
              , */
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;