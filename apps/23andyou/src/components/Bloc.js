import React, {useState, useEffect} from 'react';

function Bloc(props) {
 
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [escappFailMessage, setEscappFailMessage] = useState(undefined);
  const [escappSuccessMessage, setEscappSuccessMessage] = useState(undefined);
  const { checkPlace, puzzleSolution, puzzleCompleted } = props;
  const handleKeyUp = (e) => {
  	if(e.keyCode == 13){
      textSolve(buildText());
    }
  }
  const buildText = () => {
    return (text1 || "").toString() + "_" + (text2 || "").toString();
  }
  const handleWrite1 = (e) => {
    setText1(e.target.value);
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

  const textSolve = (text) => {
  	checkPlace(buildText(), (success) => {
  		if (success) {
  			setEscappSuccessMessage(true);
  			// to-do
  			// Close app and open email
        // setTimeout(()=>{dispatch({type: "CLOSE_BLOC_SHOW_NOTIFICATION"})},2000);
  		} else {
  			setEscappFailMessage(true);
  		}
  	});
  }

  const onContinue = e => {
    textSolve(buildText());
  }


  return <div className={"bloc" + (props.show ? " show" : "")} >
  		<div>	
		    <img src="./assets/images/notebook.svg"/>
		    <div className="bloc_content">
			    <p>Is there any indicator that could make Bob more sensitive to cyanide?</p>
			    {puzzleCompleted ? <p>{puzzleSolution}</p> : null}
           <p>{puzzleCompleted ? null : <div>Ancestry:  <select  id="bloc_input" autoFocus
            onChange={handleWrite1}  defaultValue={""}>
            <option key={"option"}>{"None"}</option>
              {props.dropdown1.map((p,i)=><option key={"option_"+i}  value={p}>{p}</option>)}
            </select></div>}</p>
			    <p>{puzzleCompleted ? null : <div>Genes:  <select  id="bloc_input" autoFocus
            onChange={handleWrite2}  defaultValue={""}>
            <option key={"option"}>{"None"}</option>
              {props.dropdown2.map((p,i)=><option key={"option_"+i}  value={p}>{p}</option>)}
            </select></div>}</p>
			    {puzzleCompleted ? null : <p><button className="continue" onClick={onContinue}>Confirm</button></p>}
			    {escappFailMessage ? <p className="danger">It does not seem related</p> : null}
			    {escappSuccessMessage ? <p className="success">Great!</p> : null}
			    </div>
		    </div>
    </div>;
}
export default Bloc;