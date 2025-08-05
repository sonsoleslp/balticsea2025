import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function Bloc(props) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [escappFailMessage, setEscappFailMessage] = useState(undefined);
  const [escappSuccessMessage, setEscappSuccessMessage] = useState(undefined);
  const { checkPlace, puzzleSolution, puzzleCompleted } = props;
  const puzzleSolutionSplit = (puzzleSolution || "").split("_");
  const handleWrite = (e) => {
    setText(e.target.value);
    if(escappFailMessage != undefined) {
    	setEscappFailMessage(undefined);
    }
  }
  const handleWrite2 = (e) => {
    setText2(e.target.value);
    if(escappFailMessage != undefined) {
      setEscappFailMessage(undefined);
    }
  }  
  const handleWrite3 = (e) => {
    setText3(e.target.value);
    if(escappFailMessage != undefined) {
      setEscappFailMessage(undefined);
    }
  }
  const handleWrite4 = (e) => {
    setText4(e.target.value);
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
    const textSolved = (text || "") + "_" + 
    (text2 || "") + "_" + 
    (text3 || "") + "_" + 
    (text4 || "") ;

    textSolve(textSolved);
  }


  return <div className={"bloc" + (props.show ? " show" : "")} >
  		<div>	
		    <img src="img/asset/notebook.svg"/>
		    <div className="bloc_content">
			    <p>
          <b>{props.I18n.getTrans("previous_text")} </b>
			    {puzzleCompleted ? (puzzleSolutionSplit[0] || "") : <select id="bloc_input" autoFocus className="bloc_input" 
			      onChange={handleWrite}
			      value={text}  >
            <option value={1}>Tube 1</option>
            <option value={2}>Tube 2</option>
            <option value={3}>Tube 3</option>
            <option value={4}>Tube 4</option>
            </select>}
          <b>{props.I18n.getTrans("previous_text2")} </b>
          {puzzleCompleted ? (puzzleSolutionSplit[1] || "") : <input type="number" id="bloc_input2" autoFocus className="bloc_input" 
            onChange={handleWrite2}
            value={text2}
            placeholder={props.I18n.getTrans("placeholder")}
            autoCorrect="off" autoComplete="off" />}
          <b>{props.I18n.getTrans("previous_text3")} </b>
          {puzzleCompleted ? (puzzleSolutionSplit[2] || "")  : <input type="number" id="bloc_input3" autoFocus className="bloc_input" 
            onChange={handleWrite3}
            value={text3}
            placeholder={props.I18n.getTrans("placeholder")}
            autoCorrect="off" autoComplete="off" />}
          <b>{props.I18n.getTrans("previous_text4")} </b>
          {puzzleCompleted ? (puzzleSolutionSplit[3] || "")  : <select   id="bloc_input4" autoFocus className="bloc_input" 
            onChange={handleWrite4}
            value={text4} >
            <option value="SAFE">Safe</option>
            <option value="NOT SAFE">Not Safe</option>
            </select>}
          </p>
			    {puzzleCompleted ? null : <p><button className="continue" onClick={onContinue}>{props.I18n.getTrans("continue")}</button></p>}
			    {escappFailMessage ? <p className="danger">{props.I18n.getTrans("wrong_solution")}</p> : null}
			    {escappSuccessMessage ? <p className="success">{props.I18n.getTrans("right_solution")}</p> : null}
			    </div>
		    </div>
    </div>;
}
export default Bloc;