import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function Bloc(props) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [escappFailMessage, setEscappFailMessage] = useState(undefined);
  const [escappSuccessMessage, setEscappSuccessMessage] = useState(undefined);
  const { checkPlace, puzzleSolution, puzzleCompleted } = props;
  const handleKeyUp = (e) => {
  	if(e.keyCode == 13){
      textSolve((text || "").toString());
    }
  }
  const handleWrite = (e) => {
    setText(e.target.value);
    if(escappFailMessage != undefined) {
    	setEscappFailMessage(undefined);
    }
  }

  const textSolve = (text) => {
  	checkPlace(text, (success) => {
  		if (success) {
  			setEscappSuccessMessage(true);
  			// to-do
  			// Close app and open email
        setTimeout(()=>{dispatch({type: "CLOSE_BLOC_SHOW_NOTIFICATION"})},2000);
  		} else {
  			setEscappFailMessage(true);
  		}
  	});
  }

  const onContinue = e => {
    textSolve((text || "").toString());
  }


  return <div className={"bloc" + (props.show ? " show" : "")} >
  		<div>	
		    <img src="img/asset/notebook.svg"/>
		    <div className="bloc_content">
			    <p>{props.I18n.getTrans("previous_text")}:</p>
			    {puzzleCompleted ? <p>{puzzleSolution}</p> : null}
			    <p>{puzzleCompleted ? null : <input type="text" id="bloc_input" autoFocus
			      onChange={handleWrite}
			      onKeyUp={handleKeyUp}
			      value={text}
			      placeholder={props.I18n.getTrans("placeholder")}
			      autoCorrect="off" autoComplete="off" />}</p>
			    {puzzleCompleted ? null : <p><button className="continue" onClick={onContinue}>{props.I18n.getTrans("continue")}</button></p>}
			    {escappFailMessage ? <p className="danger">{props.I18n.getTrans("wrong_solution")}</p> : null}
			    {escappSuccessMessage ? <p className="success">{props.I18n.getTrans("right_solution")}</p> : null}
			    </div>
		    </div>
    </div>;
}
export default Bloc;