import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image, ToolBar } from "../../../utils/general";


export const AboutWin = (props) => {
  const { abOpen } = useSelector((state) => state.desktop);
  const { locked, booted } = useSelector((state) => state.wallpaper);
  const [open, setOpen] = useState(true && process.env.REACT_APP_ENV != "development");
  const [timer, setTimer] = useState(localStorage.getItem("closeAbout") == "true" ? 0 : 5);
  const dispatch = useDispatch();

  const action = () => {
    setOpen(false);
    localStorage.setItem("closeAbout", true);
    dispatch({ type: "DESKABOUT", payload: false });
  };

  useEffect(() => {
    if (timer > 0 && !locked && booted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, locked, booted]);
  return null;
  return open || abOpen ? (
    <div className="aboutApp floatTab dpShad">
      <div className="content p-6">
        <div className="text-xl font-semibold">{props.I18n.getTrans('about.title')}</div>
        <p>{props.I18n.getTrans('about.opensource')}</p>
        <p>
          {props.I18n.getTrans('about.licensed')}&nbsp;
          <a target="_blank" href="https://github.com/blueedgetechno/win11React/blob/master/LICENSE" rel="noreferrer">
            {props.I18n.getTrans('about.Creative-Commons')}
          </a>
          .
        </p>
        <p className="pl-4">
          {props.I18n.getTrans('about.contact')} :&nbsp;
          <a target="_blank" href="mailto:gabrielle@balticlab.com" rel="noreferrer">
            gabrielle@balticlab.com
          </a>
        </p>

        <p>{props.I18n.getTrans('about.notmicrosoft')}</p>
        <p>
          {props.I18n.getTrans('about.alsonot')}&nbsp;
          <a target="_blank" href="https://www.microsoft.com/en-in/windows-365" rel="noreferrer">
            Windows 365 cloud PC
          </a>
          .
        </p>
        <p>{props.I18n.getTrans('about.microsoftcopywrite')}.</p>
      </div>
      <div className="okbtn px-6 py-4">
        <div data-allow={timer == 0} onClick={timer == 0 && action}>
          {props.I18n.getTrans('about.understand')} {timer > 0 ? <span>{`( ${timer} )`}</span> : null}
        </div>
      </div>
    </div>
  ) : null;
};
