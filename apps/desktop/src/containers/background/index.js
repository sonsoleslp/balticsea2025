import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Image } from "../../utils/general";

import "./back.scss";

export const Background = () => {
  const wall = useSelector((state) => state.wallpaper);
  const dispatch = useDispatch();

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(img/wallpaper/${wall.src})`,
      }}
    ></div>
  );
};

export const BootScreen = (props) => {
  const dispatch = useDispatch();
  const wall = useSelector((state) => state.wallpaper);
  const [blackout, setBlackOut] = useState(false);

  useEffect(() => {
    if (props.dir < 0) {
      setTimeout(() => {
        console.log("blackout");
        setBlackOut(true);
      }, 4000);
    }
  }, [props.dir]);

  useEffect(() => {
    if (props.dir < 0) {
      if (blackout) {
        if (wall.act == "restart") {
          setTimeout(() => {
            setBlackOut(false);
            setTimeout(() => {
              dispatch({ type: "WALLBOOTED" });
            }, 4000);
          }, 2000);
        }
      }
    }
  }, [blackout]);

  return (
    <div className="bootscreen">
      <div className={blackout ? "hidden" : ""}>
        <Image src="asset/bootlogo" w={180} />
        <div className="mt-48" id="loader">
          <svg className="progressRing" height={48} width={48} viewBox="0 0 16 16">
            <circle cx="8px" cy="8px" r="7px"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const LockScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  const [password, setPass] = useState("");
  const [passType, setType] = useState(1);
  const [forgot, setForget] = useState(false);
  const [failed, setFailed] = useState(false);
  const dispatch = useDispatch();

  const action = (e) => {
    var act = e.target.dataset.action,
      payload = e.target.dataset.payload;

    if (act == "splash") setLock(true);
    else if (act == "inpass") {
      var val = e.target.value;
      if (!passType) {
        val = val.substring(0, 4);
        val = !Number(val) ? "" : val;
      }

      setPass(val);
    } else if (act == "forgot") setForget(true);
    else if (act == "pinlock") setType(0);
    else if (act == "passkey") setType(1);

    if (act == "pinlock" || act == "passkey") setPass("");
  };

  const proceed = () => {
    props.checkLogin(password,(success) => {
      if (success) {
        setUnLock(true);
        setTimeout(() => {
          dispatch({ type: "WALLUNLOCK" });
        }, 1000);
      } else {
         setUnLock(false);
         setFailed(true);
         setTimeout(() => {
          setFailed(false);
        }, 3000);
      }
    })
  };

  const action2 = (e) => {
    if (e.key == "Enter") proceed();
  };

  return (
    <div
      className={"lockscreen " + (props.dir == -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url(${`img/wallpaper/lock.jpg`})`,
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-6xl font-semibold text-gray-100">
          8:15 AM
        </div>
        <div className="text-lg font-medium text-gray-200">
          {props.I18n.getTrans("currentDate")}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        <Image className="rounded-full overflow-hidden" src="img/asset/prof.jpg" w={200} ext />
        <div className="mt-2 text-2xl font-medium text-gray-200">Gabrielle</div>
           <input type={passType?"text":"password"} 
           className={"password-input" + (failed ? " shake" : "")}
           value={password} onChange={action}
              data-action="inpass" onKeyDown={action2} placeholder={passType?"Password":"PIN"}/>
          <Icon className=" handcr" fafa="faArrowRight" width={14}
            color="rgba(170, 170, 170, 0.6)" onClick={proceed}/>
      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={16} invert />
        <Icon className="mx-2" src="battery" ui width={16} invert />
      </div>
    </div>
  );
};
