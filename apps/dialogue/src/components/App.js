/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import './../assets/scss/app.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import {sequence} from '../config/sequence.js';
import * as I18n from '../vendors/I18n.js';
import Exit from './Exit.jsx';

let escapp;
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function App() {
  let [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(sequence);
  const [history, setHistory] = useState([]);
  const [passed, setPassed] = useState(undefined);
  const [door, setDoor] = useState(false);

  const handleAnswerClick = (nextQuestion,index) => {
    setCurrentQuestion(nextQuestion);
    const newHist = [...history,index];
    setHistory(newHist);
    console.log(nextQuestion)
    if(!nextQuestion.answers || nextQuestion.answers.length == 0) {
      console.log("fsd")
      submit(newHist)
    }
  };

  const resetHistory = () => {
    setHistory([]);
    setPassed(undefined);
    setCurrentQuestion(sequence);
    setDoor(true);
  }

  useEffect(() => {
    I18n.init(GLOBAL_CONFIG);
     
    //LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
    GLOBAL_CONFIG.escapp.onNewErStateCallback = er_state => restoreState(er_state);
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    //reset(); //For development
    //pedir login del usuario:
    escapp.validate((success, er_state) => {
      if(success){
        restoreState(er_state);
      }
    });

    setLoading(false);
  }, []);

  const reset = () => {
    escapp.reset();
    localStorage.clear();
  }

  //restaurar estado del puzzle. Es solo si ha terminado o no.
  const restoreState = (er_state) => {
    if (er_state && er_state.puzzlesSolved && er_state.puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[0])!=-1){
 
    }
  }

  

  const submit = (solution) => {
    console.log(solution)
    const lettersol = solution.reduce((a,b)=>a+abc[b],"")
    console.log(lettersol)
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.appPuzzleIds[0], lettersol, {}, function(success){
      if(success){
        setPassed(true);
         
      } else {
        setPassed(false);
       // setShowModalEnd(true);
      }
    });
  }




  if(loading){
    return <div>LOADING</div> ;
  } else if(door) {
    return <div className="Door" onClick={()=>setDoor(false)}>
    sdfsdfs
    </div>
  } else {
    return (
        <div className="App">
        <div className="questions">
          <h1>{currentQuestion.question}</h1>
          <ul>
            {currentQuestion.answers?.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer, index)}>
                {answer.answer}
              </li>
            ))}
          </ul>
          <div>{passed ? "Congrats":""}</div>
          <div>{passed === false ? <Exit onExit={resetHistory}/>:""}</div>
        </div>
        </div>
      );
  }
}


