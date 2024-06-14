import React from 'react';
import { useState } from "react";


export default function MainScreen(props) {

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        if (touchStart - touchEnd > 150) {
            props.right();
        }
        if (touchStart - touchEnd < -150) {
            props.left();
        }
    }

    let selectedClassname = "";
    let trueSelected= "";
    let falseSelected= "";
    let item = props.news[props.newsIndex];
    let numberselected = props.news.filter(item => item.answer === true).length;
    let numberdiscarded = props.news.filter(item => item.answer === false).length;
    let buttonsubmitdisabled = numberdiscarded + numberselected < props.news.length;
    let buttonleftdisabled = props.newsIndex === 0;
    let buttonrightdisabled = props.newsIndex === props.news.length - 1;

    if(props.passed){
      numberselected = props.news.filter(item => item.true_or_false === true).length;
      numberdiscarded = props.news.filter(item => item.true_or_false === false).length;
    }

    if((props.passed && item.true_or_false===false) || (item.answer !== undefined && item.answer === false)){
      selectedClassname = "selected";
      falseSelected = "false_selected";
    } else if((props.passed && item.true_or_false===true) ||item.answer !== undefined && item.answer === true){
      selectedClassname = "discarded";
      trueSelected = "true_selected";;
    }

    const submitClick = () => {
      if(buttonsubmitdisabled){
        return;
      } else {
        props.submit();
      }
    }

    return (
      <div className="App">
        <div className='header'>
          <div className="notice_data">
            <h2>{props.I18n.getTrans("i.header")}</h2>   
            {item.comment !== undefined ? <div className="context">{item.comment}</div>:null}         
          </div>
          <div className="selection_info">
            <div className="true">
              <svg viewBox="0 0 33 34">
                <path d="M16.647 0c.556 0 1.105.036 1.615.121a8.71 8.71 0 011.48.327c.485.147.96.33 1.433.56.461.218.935.486 1.409.777.801.51 1.59.922 2.393 1.252a16.016 16.016 0 004.953 1.115 37.35 37.35 0 002.671.098v8.5c0 1.615-.206 3.145-.618 4.603a19.12 19.12 0 01-1.677 4.129 21.913 21.913 0 01-2.524 3.665 32.06 32.06 0 01-3.17 3.256 37.33 37.33 0 01-3.62 2.815 56.038 56.038 0 01-3.812 2.43l-.51.303-.51-.304a57.555 57.555 0 01-3.838-2.429 33.116 33.116 0 01-3.619-2.815 32.058 32.058 0 01-3.168-3.256 23.26 23.26 0 01-2.537-3.665 20.728 20.728 0 01-1.677-4.13 16.782 16.782 0 01-.608-4.602v-8.5c.925 0 1.81-.036 2.674-.098A17.34 17.34 0 005.91 3.79a15.223 15.223 0 002.429-.752c.831-.336 1.628-.75 2.38-1.24a11.599 11.599 0 012.818-1.35A10.18 10.18 0 0116.647 0zm13.816 6.339a20.328 20.328 0 01-4.747-.801c-1.537-.459-3-1.133-4.348-2.004a9.06 9.06 0 00-2.254-1.069 8.255 8.255 0 00-2.457-.353 8.479 8.479 0 00-2.475.353 8.385 8.385 0 00-2.249 1.069 16.844 16.844 0 01-4.358 2.012 21.45 21.45 0 01-4.737.804v6.41c0 1.41.183 2.757.549 4.055.372 1.287.885 2.53 1.53 3.704a20.409 20.409 0 002.295 3.34 30.992 30.992 0 002.851 2.937 33.588 33.588 0 003.207 2.563 46.971 46.971 0 003.387 2.161 47.616 47.616 0 003.377-2.161 32.695 32.695 0 003.217-2.563 31.016 31.016 0 002.854-2.936 20.392 20.392 0 002.295-3.341 17.543 17.543 0 001.507-3.704 14.48 14.48 0 00.556-4.054V6.339z"/>
                <path fillRule="evenodd" d="M24.569 10.007l-.935-.804-.863.075-9.265 10.94-3.156-4.506-.85-.144-.984.703-.146.85 4.056 5.793.461.255.972.06.497-.217L24.63 10.867l-.061-.86z" clipRule="evenodd"/>
              </svg>
              <div className="counter true_news">
                {numberselected}
              </div>
            </div>
            <div className="false">
              <svg viewBox="0 0 25 23">
                <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
              </svg>
              <div className="counter false_news">
                {numberdiscarded}
              </div>
              </div>
          </div>

        </div>

        <div className="full_content" onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()}>
          <button className={"buttonleft " + (buttonleftdisabled ? "buttondisabled":"buttonenabled")} onClick={()=>props.left()}>
            <svg viewBox="0 0 23 22">
              <path fillRule="evenodd" d="M9 1A1 1 0 007.21.386l-7 9a1 1 0 000 1.228l7 9A1 1 0 009 19v-3.99c5.379.112 7.963 1.133 9.261 2.243 1.234 1.055 1.46 2.296 1.695 3.596l.061.335a1 1 0 001.981-.122c.171-2.748-.086-6.73-2.027-10.061C18.087 7.768 14.694 5.282 9 5.022V1z" clipRule="evenodd"/>
            </svg>
					</button>
          <div className={'content ' + selectedClassname }>
              <img src={item.path} alt=""/>
          </div>
          <button className={"buttonright " + (buttonrightdisabled ? "buttondisabled":"buttonenabled")} onClick={()=>props.right()}>
            <svg viewBox="0 0 23 22">
              <path fillRule="evenodd" d="M14 1a1 1 0 011.79-.614l7 9a1 1 0 010 1.228l-7 9A1 1 0 0114 19v-3.99c-5.379.112-7.963 1.133-9.261 2.243-1.234 1.055-1.46 2.296-1.695 3.596l-.061.335a1 1 0 01-1.981-.122c-.171-2.748.086-6.73 2.027-10.061C4.913 7.768 8.306 5.282 14 5.022V1z" clipRule="evenodd"/>
            </svg>
					</button>
        </div>

        <div className='footer'>
          <div className="information">
            <button className="buttoninfo" onClick={()=>props.openModalStart()}>
              <svg viewBox="0 0 22 22">
                <path fillRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm-.5 5a1 1 0 000 2h.5a1 1 0 100-2h-.5zM9 9a1 1 0 000 2h1v3H9a1 1 0 100 2h4a1 1 0 000-2h-1v-4a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>

          <div className="selection_buttons">
            <button className={'buttonno ' + trueSelected } onClick={()=>props.istrue()}>
            {props.I18n.getTrans("i.button_ok")}
            </button>
            <button className={'buttonyes ' + falseSelected } onClick={()=>props.isfalse()}>
            {props.I18n.getTrans("i.button_nok")}
            </button>
          </div>

          <div className="submit">
            {!props.passed ?
            <button className={"buttonsubmit " + (buttonsubmitdisabled ? "buttondisabled":"buttonenabled")}  onClick={submitClick}>
              <p className="send_warning">{props.I18n.getTrans("i.send_disabled")}</p>
              <svg viewBox="0 0 25 23">
                <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
              </svg>
              {props.I18n.getTrans("i.send")}
            </button>:
            <button className="buttonsubmit buttonenabled"  onClick={props.openModalEnd}>
              <svg viewBox="0 0 25 23">
                <path d="M20.214 12.041l-1.212 1.213 2.213 2.216h-7a3.429 3.429 0 100 6.857h1.714v-1.714h-1.715a1.714 1.714 0 110-3.429h7l-2.213 2.218 1.213 1.21 4.286-4.285-4.286-4.286z"/>
                <path d="M7.357 15.47H2.214L2.212 2.532l9.8 6.786a.857.857 0 00.976 0l9.798-6.782v7.791H24.5V1.756A1.716 1.716 0 0022.786.042H2.214A1.714 1.714 0 00.5 1.753V15.47a1.717 1.717 0 001.714 1.714h5.143V15.47zM20.9 1.756L12.5 7.57 4.1 1.756h16.8z"/>
              </svg>
              {props.I18n.getTrans("i.end")}
            </button>
            }
          </div>

        </div>
      </div>
    );
  }
