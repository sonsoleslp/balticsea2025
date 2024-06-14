/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import './../assets/scss/app.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import {NEWSes, NEWSit, NEWSen} from '../config/news.js';
import * as I18n from '../vendors/I18n.js';

import ModalStart from "./ModalStart";
import ModalEnd from "./ModalEnd";
import ModalCodes from "./ModalCodes";
import ModalFeedback from './ModalFeedback';
import MainScreen from './MainScreen.js';

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
    setNews(NEWSen);
    
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
    let solution = "";
    news.map(n => {
      if(n.answer===true){
        solution += "1";
      } else if (n.answer===false){
        solution += "0";
      }
    });
    console.log("SOLUTION: " + solution);
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.appPuzzleIds[0], solution, {}, function(success){
      if(success){
        setPassed(true);
        setShowModalEnd(true);
      } else {
        setPassed(false);
        setShowModalEnd(true);
      }
    });
  }

  const openModalStart = () => {
    setShowModalStart(true);
  }

  const openModalEnd = () => {
    setShowModalEnd(true);
  }

  const closeModalStart = () => {
    setShowModalStart(false);
  }

  const closeModalEnd = () => {
    setShowModalEnd(false);
  }

  const openModalCodes = () => {
    setShowModalCodes(true);
  }

  const closeModalCodes = () => {
    setShowModalCodes(false);
  }

  const openModalFeedback = () => {
    setShowModalFeedback(true);
  }

  const closeModalFeedback = () => {
    setShowModalFeedback(false);
  }

  if(loading){
    return <div>LOADING</div> ;
  } else {
    return <>
      <ModalStart showModal={showModalStart} closeModal={closeModalStart} I18n={I18n}/>
      <ModalEnd openModalFeedback={openModalFeedback} openModalCodes={openModalCodes} showModal={showModalEnd} closeModal={closeModalEnd} I18n={I18n} passed={passed}/>
      <ModalCodes showModal={showModalCodes} closeModal={closeModalCodes} I18n={I18n}/>
      <ModalFeedback news={news} showModal={showModalFeedback} closeModal={closeModalFeedback} I18n={I18n}/>
      <MainScreen passed={passed} news={news} newsIndex={newsIndex} openModalStart={openModalStart} openModalEnd={openModalEnd} left={left} right={right} isfalse={isfalse} istrue={istrue} submit={submit} I18n={I18n}/>
    </>;
  }
}
