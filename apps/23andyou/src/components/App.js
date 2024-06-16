/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect } from "react";
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import "../assets/scss/app.scss"
 

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

  const submit = (solution) => {
    const puzId = GLOBAL_CONFIG.escapp.appPuzzleIds[0];
    escapp.submitPuzzle(puzId, solution, {}, function(success){
       
    });
  }
 

  
    return <div className="container">
        <div className="header">
            <h1>23andYou Test Results</h1>
        </div>

        <div className="section">
            <h2>Ancestry Composition</h2>
            <div className="pie-chart-container">
                
                <ul className="chart-skills">
                  <li>
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Scandinavian")}>Scandinavian</span>
                  </li>
                  <li>
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Finnish")}>Finnish</span>
                  </li>
                  <li>
                    <span style={{cursor: "pointer"}} onClick={()=>submit("British")}>British & Irish</span>
                  </li>
                  <li>
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Ashkenazi")}>Ashkenazi Jewish</span>
                  </li>
                </ul>
            </div>
        </div>

        <div className="section">
            <h2>Health Reports</h2>
            <div className="health-list">
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Alzheimer")}>Late-Onset Alzheimer's Disease</span>
                    <div><div className ="bar" style={{width: "30%", backgroundColor: "#E3E939"}}></div></div>
                    <span className="pctg-tag">30%</span>

                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Thrombophilia")}>Hereditary Thrombophilia</span>
                    <div><div className ="bar" style={{width: "70%", backgroundColor: "#F15946"}}></div></div>
                    <span className="pctg-tag">70%</span>
                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Parkinson")}>Parkinson's Disease</span>
                    <div><div className ="bar" style={{width: "50%", backgroundColor: "#F9C22E"}}></div></div>
                    <span className="pctg-tag">50%</span>
                </div>
            </div>
        </div>

        <div className="section">
            <h2>Trait Reports</h2>
            <div className="traits-list">
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Freckles")}>Freckles</span>
                    <div><div className ="bar" style={{width: "80%", backgroundColor: "brown"}}></div></div>
                    <span className="pctg-tag">80%</span>
                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Cleft")}>Cleft Chin</span>
                    <div><div className ="bar" style={{width: "10%", backgroundColor: "#d2b194"}}></div></div>
                    <span className="pctg-tag">10%</span>
                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Blue")}>Eye Color: Blue</span>
                    <div><div className ="bar" style={{width: "90%", backgroundColor: "#50d4cb"}}></div></div>
                    <span className="pctg-tag">90%</span>
                </div>
            </div>
        </div>

        <div className="section">
            <h2>Wellness Reports</h2>
            <div className="wellness-list">
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Lactose")}>Lactose Intolerance</span>
                    <div><div className ="bar" style={{width: "40%", backgroundColor: "#F9C22E"}}></div></div>
                    <span className="pctg-tag">40%</span>
                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Sleep")}>Deep Sleep</span>
                    <div><div className ="bar" style={{width: "60%", backgroundColor: "#FAA12D"}}></div></div>
                    <span className="pctg-tag">60%</span>
                </div>
                <div className="probability-bar" >
                    <span style={{cursor: "pointer"}} onClick={()=>submit("Muscle")}>Muscle Composition</span>
                    <div><div className ="bar" style={{width: "70%", backgroundColor: "#F15946"}}></div></div>
                    <span className="pctg-tag">70%</span>
                </div>
            </div>
        </div>
    </div>

  
}
