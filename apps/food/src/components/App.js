/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import MainDropComponent from './MainDropComponent.jsx'

import "../assets/scss/app.scss";

let escapp;

const initialImages = [
  { id: 1, src: "images/food/wine.png", width: "6vw" },
  { id: 2, src: "images/food/candy.png"  },
  { id: 3, src: "images/food/fish.png"  },
  { id: 4, src: "images/food/banana.png"  },
  { id: 5, src: "images/food/jam.png"  },
  { id: 6, src: "images/food/bread.png"  },
  { id: 7, src: "images/food/coffee.png"  },
  { id: 8, src: "images/food/tomato.png"  }
]

export default function App() {
  let [loading, setLoading] = useState(true);
  let [showModalStart, setShowModalStart] = useState(true);
  let [showModalEnd, setShowModalEnd] = useState(false);
  let [showModalCodes, setShowModalCodes] = useState(false);
  let [showModalFeedback, setShowModalFeedback] = useState(false);
  let [passed, setPassed] = useState(undefined);
  const [centerImages, setCenterImages] = useState(initialImages)
  const [leftImages, setLeftImages] = useState([])
  const [rightImages, setRightImages] = useState([])

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
        setShowModalStart(false);
        setPassed(true);
        setShowModalEnd(true);
    }
  }
  // 1_2_3_4_6_7_8;5
 
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
      const solution = reorder();
    const puzId =  GLOBAL_CONFIG.escapp.appPuzzleIds[0];
    escapp.submitPuzzle(puzId, solution, {}, function(success){
       
      
    });
  }
  const check = () => {
      const solution = reorder();
      const puzId =  GLOBAL_CONFIG.escapp.appPuzzleIds[0];
      escapp.checkPuzzle(puzId, solution, {}, function(success){
        if (success) {
           setPassed(true);
        } else {
          setPassed(false);
        }
      })
  }

  const reorder = () => {
    const orderedleftImages = leftImages.map(x=>x.id).sort().join("_");
    const orderedrightImages = rightImages.map(x=>x.id).sort().join("_");
    return(orderedleftImages + ";" + orderedrightImages)
  }
  
  return <div className={"passed-"+passed}>
    <MainDropComponent 
          passed = {passed} 
          setCenterImages={setCenterImages}
          setLeftImages={setLeftImages}
          setRightImages={setRightImages}
          rightImages={rightImages}
          leftImages={leftImages}
          centerImages={centerImages}/>
      {passed ? 
      <div className="final">
        <p>There was some cherry jam that I thought was very bitter, so I quickly stopped eating it, but Alex seemed to be eating it like candy! I wonder if it could have made them ill?</p>
        <img className={"submitImage"} src={"https://vishub.org/pictures/24411.png"} onClick={submit}/>
      </div>:
      <button className="confirm" onClick={check}>Confirm</button> }


    </div>
        
}
