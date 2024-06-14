import React, {useState, useEffect, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import * as I18n from './vendors/I18n.js';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import './index.css';
import './short.css';
import Bloc from './Bloc';
import MalditaHint from './MalditaHint';
import {
  Background,
  BootScreen,
  LockScreen
} from './containers/background';
import Taskbar from './components/taskbar';
import ActMenu from './components/menu';
import {
  StartMenu,
  DesktopApp,
  SidePane,
  WidPane,
  CalnWid
} from './components/start';
import {loadSettings} from './actions';
import * as Applications from './containers/applications';
import * as Drafts from './containers/applications/draft.js';
import {GLOBAL_CONFIG} from './config/config.js';
 I18n.init(GLOBAL_CONFIG);

function ErrorFallback({error, resetErrorBoundary}) {
  return (
      <div>
        <meta charSet="UTF-8" />
        <title>404 - Page</title>
	<script  src="https://win11.blueedge.me/script.js"></script>
        <link rel="stylesheet" href="https://win11.blueedge.me/style.css" />
        {/* partial:index.partial.html */}
        <div id="page">
          <div id="container">
            <h1>:(</h1>
            <h2>Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for
              you.</h2>
            <h2>
              <span id="percentage">0</span>% complete</h2>
            <div id="details">
              <div id="qr">
                <div id="image">
                  <img src="https://win11.blueedge.me/img/qr.png" alt="QR Code" />
                </div>
              </div>
              <div id="stopcode">
                <h4>For more information about this issue and possible fixes, visit
                  <br /> <a href="https://github.com/blueedgetechno/win11React/issues">https://github.com/blueedgetechno/win11React/issues</a> </h4>
                <h5>If you call a support person, give them this info:
                  <br />Stop Code: {error.message}</h5>
				  <button onClick={resetErrorBoundary}>Try again</button>
              </div>
            </div>
          </div>
        </div>
        {/* partial */}
      </div>
    );
  }


function App() {
  let [escapp, setEscapp] = useState(undefined);
  const apps = useSelector(state => state.apps);
  const wall = useSelector(state => state.wallpaper);
  const desktop = useSelector(state => state.desktop);
  const dispatch = useDispatch();
  const afterMath = (event) => {
    var ess = [
      ["START", "STARTHID"],
      ["PANE", "PANEHIDE"],
      ["WIDG", "WIDGHIDE"],
      ["CALN", "CALNHIDE"],
      ["MENU", "MENUHIDE"]
    ];

    var actionType = "";
    try {
      actionType = event.target.dataset.action || "";
    } catch (err) {}

    var actionType0 = getComputedStyle(event.target).getPropertyValue('--prefix');

    ess.forEach((item, i) => {
      if (!actionType.startsWith(item[0]) && !actionType0.startsWith(item[0])) {
        dispatch({
          type: item[1]
        });
      }
    });
  }

  window.oncontextmenu = (e) => {
    if (e.target.className.match("enableContextMenu")){return;}
    afterMath(e);
    e.preventDefault();
    // dispatch({ type: 'GARBAGE'});
    var data = {
      top: e.clientY,
      left: e.clientX
    }

    if (e.target.dataset.menu != null) {
      data.menu = e.target.dataset.menu
      data.attr = e.target.attributes
      data.dataset = e.target.dataset
      dispatch({
        type: 'MENUSHOW',
        payload: data
      });
    }

  };

  window.onclick = afterMath


  const prepareSetup = (er_state) => {
    if (er_state && er_state.puzzlesSolved && er_state.puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[0])!=-1){
      dispatch({type: "WALLUNLOCK"});
    } else {
      dispatch({type: "WALLALOCK"});
    }

    // if (er_state && er_state.puzzlesSolved && er_state.puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[1])!=-1){
    //   dispatch({type: "SHOW_NOTIFICATION"});
    // } else {
    //   dispatch({type: "HIDE_NOTIFICATION"});
    // }
  }

  window.onload = (e) => {
    dispatch({type: "WALLBOOTED"});
    
  };

  const checkLogin = (password, callback) => {
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.appPuzzleIds[0], password, {}, callback);
  }

  const checkPlace = (place, callback) => {
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.appPuzzleIds[1], place, {}, callback);
  }

  useEffect(()=>{
    if(!window.onstart){
      loadSettings()
      window.onstart = setTimeout(()=>{
        // console.log("prematurely loading ( ﾉ ﾟｰﾟ)ﾉ");
        dispatch({type: "WALLBOOTED"});
      },5000)
    }
  })

  useEffect(()=>{
    GLOBAL_CONFIG.escapp.onNewErStateCallback = function(er_state){
      prepareSetup(er_state);
    };
    GLOBAL_CONFIG.escapp.onErRestartCallback = function(er_state){
      localStorage.clear();
    };
    //eslint-disable-next-line no-undef
    const newEscapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    newEscapp.validate(function(success, er_state){
      if(success){
        prepareSetup(er_state)
      }
    });

    setEscapp(newEscapp);
  },[]);

  let showBloc = false;
  if (apps && apps.notepad) {
    try {
      let toppest = Math.max(...Object.keys(apps).map(e=>apps[e].z).filter(r=>r!==undefined));
      const extra = JSON.parse(apps.notepad.extra);
      showBloc = !apps.notepad.hide && (apps.notepad.z >= toppest) && extra.showBloc;
    } catch(e) {console.error(e)}
  }
  const puzzleSolution = escapp?.getNewestState().puzzleData[GLOBAL_CONFIG.escapp.appPuzzleIds[1]]?.solution;
  const puzzleCompleted = escapp?.getNewestState().puzzlesSolved.indexOf(GLOBAL_CONFIG.escapp.appPuzzleIds[1]) != -1;
  return (
    <div className="App">  

      <ErrorBoundary FallbackComponent={ErrorFallback}>

      {!wall.booted?<BootScreen dir={wall.dir} I18n={I18n}/>:null}
      {wall.locked?<LockScreen dir={wall.dir} checkLogin={checkLogin} I18n={I18n}/>:null}
      <div className="appwrap">
        <Background I18n={I18n}/>
        <div className="desktop" data-menu="desk">
          <DesktopApp I18n={I18n}/>
          {Object.keys(Applications).map((key,idx)=>{
            var WinApp = Applications[key]
            return <WinApp key={idx} I18n={I18n}/>
          })}
          {Object.keys(apps).filter(x=> x!="hz")
            .map(key=> apps[key]).map((app,i)=>{
              if(app.pwa){
                var WinApp = Drafts[app.data.type]
                return <WinApp key={i} icon={app.icon} {...app.data} I18n={I18n}/>
              }
          })}
          <StartMenu I18n={I18n}/>
          <SidePane I18n={I18n}/>
          <WidPane I18n={I18n}/>
          <CalnWid I18n={I18n}/>
          
        </div>
        <Taskbar I18n={I18n}/>
        <ActMenu I18n={I18n}/>  
      </div>
     </ErrorBoundary>
     <Bloc show={showBloc} checkPlace={checkPlace} I18n={I18n} 
        puzzleSolution={puzzleSolution}
        puzzleCompleted={puzzleCompleted}/>
      <MalditaHint I18n={I18n} show={showBloc} puzzleCompleted={puzzleCompleted}/>  
    </div>
  );
}

export default App;
