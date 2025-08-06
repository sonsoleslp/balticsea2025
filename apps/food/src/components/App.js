/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import MainDropComponent from './MainDropComponent.jsx'

import "../assets/scss/app.scss";

let escapp;

const initialImages = [
  { id: 1, title: "wine", src: "assets/images/food/wine.png", width: "6vw" },
  { id: 2, title: "candy", src: "assets/images/food/candy.png"  },
  { id: 3, title: "fish", src: "assets/images/food/fish.png"  },
  { id: 4, title: "banana", src: "assets/images/food/banana.png"  },
  { id: 5, title: "cherry jam", src: "assets/images/food/jam.png"  },
  { id: 6, title: "bread", src: "assets/images/food/bread.png"  },
  { id: 7, title: "espresso machiato", src: "assets/images/food/coffee.png"  },
  { id: 8, title: "tomato", src: "assets/images/food/tomato.png"  }
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
        <p>Alex said this jam was made with a special family recipe, including the cherry pits. Most other recipes would skip the pits due to the bitter taste. 
        Alex liked it so much and ate the bread crackers with a big pile of jam on them! We all tried only a tiny bit. Would this special cherry jam make Alex ill?</p>
        <img className={"submitImage"} src={"https://vishub.org/pictures/24411.png"} onClick={submit}/>
      </div>:
      <button className="confirm" onClick={check}>Confirm</button> }


    </div>
        
}
