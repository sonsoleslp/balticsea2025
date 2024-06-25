/* eslint-disable no-undef */
// src/App.js

import React from 'react';
import RiskTable from './RiskTable';
import { useState, useEffect } from "react";

import AncestryResults from './AncestryResults';
import Bloc from './Bloc';
import '../assets/scss/app.scss';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';

let escapp;

export default function App() {
  let [loading, setLoading] = useState(true);
  let [passed, setPassed] = useState(false);

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
        setPassed(true);
    }
  }
 

  const submit = (solution) => {
    const puzId = GLOBAL_CONFIG.escapp.appPuzzleIds[0];
    escapp.submitPuzzle(puzId, solution, {}, function(success){
       
    });
  }
  const puzzleSolution = escapp?.getNewestState().puzzleData[GLOBAL_CONFIG.escapp.appPuzzleIds[1]]?.solution;
  const puzzleCompleted = escapp?.getNewestState().puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[1]) != -1;
  const drop = (GLOBAL_CONFIG.riskData.elevatedRisk.map(a=>a.name)).concat((GLOBAL_CONFIG.riskData.decreasedRisk.map(a=>a.name)))
  return (
    <div className="App">

        <h1 className="maintitle"> 
          Genetic screening <img className="logo" src="../assets/images/ur46.png"/> 
        </h1>
        <div><p>Hi, Robert Devii. Are you ready to know what your genes unveil about yourself?</p></div>

      <Bloc checkPlace={submit} puzzleSolution={puzzleSolution} puzzleCompleted={puzzleCompleted} dropdown={drop}/>
      <AncestryResults />
      <RiskTable />
    </div>
  );
}

