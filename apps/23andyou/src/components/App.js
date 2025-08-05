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
       setPassed(success);
    });
  }
  const puzzleSolution = escapp?.getNewestState().puzzleData[GLOBAL_CONFIG.escapp.appPuzzleIds[1]]?.solution;
  const puzzleCompleted = escapp?.getNewestState().puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[1]) != -1;
  const drop = ["ABCG2","CYP2B6","CYP2C9","CYP2C19","CYP2D6","CYP3A5","CYP4F2","DPYD","NUDT15","TST","SLCO1B1","TPMT","VKORC1"];
  return (
    <div className="App">

        <h1 className="maintitle"> 
          <img className="logo" src="./assets/images/downloadlogo.jpeg"/> Precision in Every Code, Care in Every Dose 
        </h1>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign:"right"}}>4.8.2025</div>
        <br/>
        <br/>
        <br/>
        <div>

        <p>Dear Bob, </p>

        <br/>

        <p>Thank you for ordering our pharmacogenetic testing panel PGxGen-S. Attached you can see your test results with our expert interpretation. </p>

        <p>If you would like to order more detailed Cytochrome P450 testing panel, you could order PGxCYP-L including more CYP enzymes with several new polymorphisms. Just use the order form on our webpage and give your customer number above. We store your sample 14 days from dating of this report. </p>

        <p>Hope that you are happy with the results and they help you to adjust your medication together with your doctor. Please do not hesitate to contact us if you have any questions. </p>

        <br/>

        <p>Best Regards </p>


        <p> <b> Eric Samson, Professor </b></p>

        <p>  MBBS (HONS) MD (HONS) MAACB FRCPA PHD </p>

        <p>  Speciality in Genetics, Clinical Pharmacology and Pathology </p>
        <br/>
        <br/>
        <hr/>

        </div>
        <div>
        <div style={{fontWeight: "bold"}}>
        <p>PATIENT COPY</p>
        <p>Test results for Customer number: 252900347</p>
        <p>Clinical lab operator: Kayle (189)</p>
        <p>Responsible doctor: Sofie (207)</p>
        </div>
        <table className="results">
          <thead>
            <tr>
              <th>Gene</th>
              <th>Genotype</th>
              <th>Result</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABCG2</td>
              <td>c.421C/C</td>
              <td>Normal BCRP activity (NF)</td>
              <td>No need to modify the dose of BCRP transporter mediated drugs based on this genotype.</td>
            </tr>
            <tr>
              <td>CYP2B6</td>
              <td>*1/*5</td>
              <td>Normal CYP2B6 metabolism (NM)</td>
              <td>No need to modify CYP2B6-mediated drug therapy or dose based on this genotype.</td>
            </tr>
            <tr>
              <td>CYP2C9</td>
              <td>*1/*2</td>
              <td>Less than normal CYP2C9 metabolism (IM)</td>
              <td>May require lower doses due to slower metabolism. Monitor for adverse reactions.</td>
            </tr>
            <tr>
              <td>CYP2C19</td>
              <td>*1/*1</td>
              <td>Normal CYP2C19 metabolism (NM)</td>
              <td>No dose modification needed for CYP2C19-mediated drugs.</td>
            </tr>
            <tr>
              <td>CYP2D6</td>
              <td>*1/*41</td>
              <td>Normal CYP2D6 metabolism (NM)</td>
              <td>No adjustment required for CYP2D6 substrates.</td>
            </tr>
            <tr>
              <td>CYP3A5</td>
              <td>*3/*3</td>
              <td>Slow CYP3A5 metabolism (PM)</td>
              <td>No need to change tacrolimus dose.</td>
            </tr>
            <tr>
              <td>CYP4F2</td>
              <td>*1/*1</td>
              <td>Normal warfarin dose requirement</td>
              <td>Other factors like CYP2C9/VKORC1 variants, age, etc., also affect warfarin dose.</td>
            </tr>
            <tr>
              <td>DPYD</td>
              <td>c.1236G/A, c.1679T/T, c.1905+1G/G, c.2846A/A</td>
              <td>Activity score 1.5 (IM)</td>
              <td>Reduce starting dose of fluoropyrimidines due to increased toxicity risk.</td>
            </tr>
            <tr>
              <td>NUDT15</td>
              <td>*1/*1</td>
              <td>Normal NUDT15 metabolism (NM)</td>
              <td>No dose adjustment needed for thiopurines unless other toxicity risk present.</td>
            </tr>
            <tr>
              <td>TST</td>
              <td>c.616C/T</td>
              <td>Decreased TST activity</td>
              <td>Can affect detoxification of cyanide; clinical implications vary.</td>
            </tr>
            <tr>
              <td>SLCO1B1</td>
              <td>*1/*15</td>
              <td>Decreased OATP1B1 activity (DF)</td>
              <td>Increased muscle toxicity risk with statins like simvastatin.</td>
            </tr>
            <tr>
              <td>TPMT</td>
              <td>*1/*1</td>
              <td>Normal TPMT metabolism (NM)</td>
              <td>No change in thiopurine starting dose needed unless other risk factors exist.</td>
            </tr>
            <tr>
              <td>VKORC1</td>
              <td>1173C/T</td>
              <td>Lower warfarin dose requirement</td>
              <td>Use <a href="https://www.warfarindosing.org" target="_blank">warfarindosing.org</a> to estimate therapeutic dose in new patients.</td>
            </tr>
          </tbody>
        </table>

        <div className="footer-note">
          * Genotypes marked as IM (Intermediate Metabolizer), NM (Normal Metabolizer), PM (Poor Metabolizer), DF (Decreased Function), or NF (Normal Function). For personalized treatment recommendations, consult your physician.
        </div>
        </div>

        <Bloc checkPlace={submit} puzzleSolution={puzzleSolution} puzzleCompleted={puzzleCompleted} dropdown={drop} />
       
         
    </div>
  );
}

