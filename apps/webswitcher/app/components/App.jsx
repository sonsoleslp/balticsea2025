import React from 'react';
import {connect} from 'react-redux';
import {restoreState, restoreStateForPuzzle, loaded, changeScreen, changePuzzle} from '../reducers/actions.jsx';
import './../assets/scss/app.scss';
import './../assets/scss/modal.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import * as I18n from '../vendors/I18n.js';
import * as LocalStorage from '../vendors/Storage.js';

import MainScreen from './MainScreen.jsx';

let escapp;

export class App extends React.Component {
  constructor(props){
    super(props);
    this.saveState = this.saveState.bind(this);
    this.onPuzzleCompleted = this.onPuzzleCompleted.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount(){
    I18n.init(GLOBAL_CONFIG);
    LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
    try {
      const prevEmail = LocalStorage.getSetting("user");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const email = urlParams.get('escapp_email');
      if(prevEmail && prevEmail.email && email && (email != prevEmail)){
        localStorage.clear();
        LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
      }
    } catch (e){
      console.error(e);
    }
    // Set the array of webs to be used based on locale
    let webLocales = Object.keys(GLOBAL_CONFIG.webs);
    if(webLocales.indexOf(I18n.getLocale()) !== -1){
      GLOBAL_CONFIG.webs = GLOBAL_CONFIG.webs[I18n.getLocale()];
    } else {
      GLOBAL_CONFIG.webs = GLOBAL_CONFIG.webs[webLocales[0]];
    }
    GLOBAL_CONFIG.escapp.onErRestartCallback =  function(er_state){
      localStorage.clear();
    }.bind(this);
    GLOBAL_CONFIG.escapp.onNewErStateCallback = function(er_state){
      this.restoreState(er_state);
    }.bind(this);
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // this.reset(); //For development
    escapp.validate(function(success, er_state){
      if(success){
          // Add escapp's user credentials to each URL
        if((typeof GLOBAL_CONFIG === "object") && (GLOBAL_CONFIG.webs instanceof Array)){
          for(let i = 0; i < GLOBAL_CONFIG.webs.length; i++){
            GLOBAL_CONFIG.webs[i].url = escapp.addEscappSettingsToUrl(GLOBAL_CONFIG.webs[i].url);
          }
        }
        this.restoreState(er_state);
      }
    }.bind(this));
  }
  reset(){
    escapp.reset();
    localStorage.clear();
  }
  restoreState(er_state){
    // console.log(er_state);
    if(er_state.puzzlesSolved.length > 0){
      let lastPuzzleSolved = Math.max.apply(null, er_state.puzzlesSolved);
      // lastPuzzleSolved = 3; //Force a puzzle (for development)
      this.props.dispatch(restoreStateForPuzzle(lastPuzzleSolved));
    } else {
      this.props.dispatch(loaded(true));
      // this.restoreLocalState();
    }
  }
  saveState(){
    let currentState = this.props.store.getState();
    LocalStorage.saveSetting("app_state", currentState);
  }
  restoreLocalState(){
    let stateToRestore = LocalStorage.getSetting("app_state");
    if(typeof stateToRestore !== "undefined"){
      this.props.dispatch(restoreState(stateToRestore));
    }
    this.props.dispatch(loaded(true));
  }
  onPuzzleCompleted(puzzle_id){
    this.props.dispatch(changePuzzle(puzzle_id));
    this.saveState();
  }
  getCurrentURL(){
    if((typeof GLOBAL_CONFIG !== "object") || (!(GLOBAL_CONFIG.webs instanceof Array)) || (GLOBAL_CONFIG.webs.length === 0) || (typeof this.props.puzzle !== "number")){
      return undefined;
    }
    let currentUrl = undefined;
    for(let i = 0; i < GLOBAL_CONFIG.webs.length; i++){
      if((typeof GLOBAL_CONFIG.webs[i].switchOnPuzzle === "number") && (typeof GLOBAL_CONFIG.webs[i].url === "string")){
        if(this.props.puzzle >= GLOBAL_CONFIG.webs[i].switchOnPuzzle){
          currentUrl = GLOBAL_CONFIG.webs[i].url;
        }
      }
    }
    return currentUrl;
  }
  render(){
    if(this.props.loading){
      return "";
    }
    return <MainScreen current_url={this.getCurrentURL()} I18n={I18n}/>;
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);