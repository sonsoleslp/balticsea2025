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
          <img className="logo" src="images/downloadlogo.jpeg"/> Precision in Every Code, Care in Every Dose 
        </h1>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign:"right"}}>4.8.2025</div>
        <br/>
        <br/>
        <div>

        <p>Dear Alex, </p>

        <br/>

        <p>Thank you for ordering our pharmacogenetic testing panel PGxGen-S. Attached you can see your test results with our expert interpretation. </p>

        <p>If you would like to order more detailed Cytochrome P450 testing panel, you could order PGxCYP-L including more CYP enzymes with several new polymorphisms. Just use the order form on our webpage and give your customer number above. We store your sample 14 days from dating of this report. </p>

        <p>Hope that you are happy with the results and they help you to adjust your medication together with your doctor. Please do not hesitate to contact us if you have any questions. </p>


        <p>Best Regards </p>


        <p> <b> Eric Samson, Professor </b><br/>

          MBBS (HONS) MD (HONS) MAACB FRCPA PHD <br/>
         Speciality in Genetics, Clinical Pharmacology and Pathology </p><div style={{float:"right"}}>1/2</div>
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
              <td>c.421C/C NF</td>
              <td>ABCG2 c.421C /C. <br/> Normal BCRP activity (NF)</td>
              <td>This genotype is associated with a normal BCRP mediated drug transport rate. There is no need to modify the dose of BCRP transporter mediated drugs based on the genotype..</td>
            </tr>
            <tr>
              <td>CYP2B6</td>
              <td>*1*5 NM</td>
              <td>CYP2B6*1/ *5 <br/> Normal CYP2B6 metabolism (NM)</td>
              <td>This genotype is associated with normal CYP2B6 mediated drug metabolism. There is no need to modify CYP2B6 mediated drug therapy or dose based on this genotype.</td>
            </tr>
            <tr>
              <td>CYP2C9*</td>
              <td>*1*2 IM</td>
              <td>CYP2C9*1/ *2 <br/>Less than normal CYP2C9 metabolism (IM)</td>
              <td>This genotype is associated with slower than normal CYP2C9 mediated drug metabolism. Plasma concentrations of many CYP2C9-mediated drugs may be higher than normal, resulting in lower than normal dose requirements and increased risk of adverse reactions. There is usually no need to modify CYP2C9-mediated drug therapy or dose based on this genotype..</td>
            </tr>
            <tr>
              <td>CYP2C19*</td>
              <td>*1 *1 NM</td>
              <td>Normal CYP2C19 metabolism (NM)</td>
              <td>This genotype is associated with normal CYP2C19-mediated drug metabolism. There is no need to modify CYP2C19-mediated drug therapy or dose based on the genotype.</td>
            </tr>
            <tr>
              <td>CYP2D6</td>
              <td>*1*41 NM</td>
              <td>CYP2D6*1/ *41 <br/> Normal CYP2D6 metabolism (NM)</td>
              <td>This genotype is associated with normal CYP2D6 mediated drug metabolism. There is no need to modify CYP2D6 mediated drug therapy or dose based on the genotype.</td>
            </tr>
            <tr>
              <td>CYP3A5</td>
              <td>*3*3 PM</td>
              <td>CYP3A5*3/*3 <br/> Slow CYP3A5 metabolism (PM)</td>
              <td>Based on the CYP3A5*3/*3 genotype, there is no need to change the usual dose of systemically administered tacrolimus.</td>
            </tr>
            <tr>
              <td>CYP4F2</td>
              <td>*1*1</td>
              <td>CYP4F2*1/*1</td>
              <td>This genotype is associated with a normal warfarin dose requirement. In addition, many other factors such as variations in CYP2C9 and VKORC1 genes, age, weight, gender, drug interactions, other diseases, etc., influence the warfarin dose.</td>
            </tr>
            <tr>
              <td>DPYD</td>
              <td>cc.1236G/A <br/> c.1679T/T <br/>  c.1905+1G/G <br/> c.2846A/A <br/> AS 1.5 IM</td>
              <td>Activity score 1.5, decreased DPD activity</td>
              <td>This genotype is associated with reduced DPD activity and an increased risk of severe and fatal adverse effects from systemically administered fluoropyrimidines. It is recommended to reduce the starting dose of 5-fluorouracil and capecitabine and the starting dose of tegafur.</td>
            </tr>
            <tr>
              <td>NUDT15</td>
              <td>*1*1 NM</td>
              <td>NUDT15*1/ *1 <br/> Normal NUDT15 metabolism (NM)</td>
              <td>This genotype is associated with normal NUDT15 mediated drug metabolism. There is no need to change the starting dose of azathioprine, mercaptopurine or tioguanine based on the genotype. However, some patients may experience severe toxicity due to other causes and should be dose reduced or discontinued. The TPMT genotype should also be taken into account in the dose selection of thiopurines.</td>
            </tr>
            <tr>
              <td>TST</td>
              <td>c.616C/T DF</td>
              <td>TST c.616C/T <br/> Decreased TST activity</td>
              <td>This genotype is associated with reduced TST activity and can affect the efficiency of TST dependent detoxification processes, like detoxifying cyanide by converting it to less toxic thiocyanate.</td>
            </tr>
            <tr>
              <td>SLCO1B1</td>
              <td>DF</td>
              <td>SLCO1B1*1/*15 <br/> Decreased OATP1B1 activity (DF)</td>
              <td>This genotype is associated with slower than normal OATP1B1-mediated transport of drugs into liver cells and an increased risk of muscle adverse effects from atorvastatin, lovastatin and simvastatin.</td>
            </tr>
            <tr>
              <td>TPMT</td>
              <td>*1*1 NM</td>
              <td>TPMT*1/*1 <br/> Normal TPMT metabolism (NM)</td>
              <td>This genotype is associated with normal TPMT mediated drug metabolism. There is no need to change the starting dose of azathioprine, mercaptopurine or thioguanine based on the genotype. However, some patients may experience severe toxicity due to other causes and should be dose reduced or discontinued. The NUDT15 genotype should also be taken into account in the dose selection of thiopurines.</td>
            </tr>
            <tr>
              <td>VKORC1*</td>
              <td>1173C/T</td>
              <td>VKORCl 1173C/T genotype</td>
              <td>This genotype is associated with lower than normal warfarin dose requirements. In addition, many other factors such as CYP2C9 and CYP4F2 gene variants, age, weight, gender, drug interactions and other medical conditions influence warfarin dose.</td>
            </tr>
          </tbody>
        </table>

        <div className="footer-note">
          * Part of our warfarin panel PGxVAR-L. Use www.warfarindosing.org to estimate the therapeutic dose in patients new to warfarin.
        </div>
        <div style={{float:"right"}}>2/2</div>
        </div>

        <Bloc checkPlace={submit} puzzleSolution={puzzleSolution} puzzleCompleted={puzzleCompleted} dropdown={drop} />
       
         
    </div>
  );
}

