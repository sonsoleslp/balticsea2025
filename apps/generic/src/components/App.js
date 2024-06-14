/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
 

let escapp;

export default function App() {
  let [loading, setLoading] = useState(true);
  let [showModalStart, setShowModalStart] = useState(true);
  let [showModalEnd, setShowModalEnd] = useState(false);
  let [showModalCodes, setShowModalCodes] = useState(false);
  let [showModalFeedback, setShowModalFeedback] = useState(false);
  let [news, setNews] = useState([]);
  let [newsIndex, setNewsIndex] = useState(0);
  let [passed, setPassed] = useState(false);

  useEffect(() => {
    I18n.init(GLOBAL_CONFIG);
    
    //LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
    GLOBAL_CONFIG.escapp.onNewErStateCallback = er_state => restoreState(er_state);
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    //reset(); //For development
    //pedir login del usuario:
    escapp.validate((success, er_state) => {
      console.log(success,er_state)
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
        setShowModalStart(false);
        setPassed(true);
        setShowModalEnd(true);
    }
  }

  const left = () => {
    if(newsIndex > 0){
      setNewsIndex(newsIndex - 1);
    }
  }

  const right = () => {
    if(newsIndex < news.length - 1){
      setNewsIndex(newsIndex + 1);
    }
  }

  const isfalse = () => {
    if(!passed){
      let mynews = JSON.parse(JSON.stringify(news));
      mynews[newsIndex].answer = false;
      setNews(mynews);
    }
  }

  const istrue = () => {
    if(!passed){
      let mynews = JSON.parse(JSON.stringify(news));
      mynews[newsIndex].answer = true;
      setNews(mynews);
    }
  }

  const submit = () => {
    let searchParams = new URL(document.location).searchParams;

    const puzId = searchParams.has('puzzleId') ?  searchParams.get('puzzleId') : GLOBAL_CONFIG.escapp.appPuzzleIds[0];
    const solution = searchParams.has('solution') ?  searchParams.get('solution') : puzId;
    escapp.submitPuzzle(puzId, solution, {}, function(success){
       
      
    });
  }
 

  
    return <div style={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "transparent"}} onClick={submit}></div>
  
}
