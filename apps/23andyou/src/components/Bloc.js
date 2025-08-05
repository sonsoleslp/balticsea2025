import React, {useState, useEffect} from 'react';

function Bloc(props) {
 
  const [text, setText] = useState("");
  const [escappFailMessage, setEscappFailMessage] = useState(undefined);
  const [escappSuccessMessage, setEscappSuccessMessage] = useState(undefined);
  const { checkPlace, puzzleSolution, puzzleCompleted } = props;
  const handleKeyUp = (e) => {
  	if(e.keyCode == 13){
      textSolve(buildText());
    }
  }
  const buildText = () => {
    return (text || "").toString();
  }
 
  const handleWrite = (e) => {
    setText(e.target.value);
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
			    <p>Is there any gene that makes Alex more sensitive to poisoning?</p>
			    {puzzleCompleted ? <p>{puzzleSolution}</p> : null}
          
			    <p>{puzzleCompleted ? null : <div> <select  id="bloc_input" autoFocus
            onChange={handleWrite}  defaultValue={""}>
            <option key={"option"}>{"None"}</option>
              {props.dropdown.map((p,i)=><option key={"option_"+i}  value={p}>{p}</option>)}
            </select></div>}</p>
			    {puzzleCompleted ? null : <p><button className="continue" onClick={onContinue}>Confirm</button></p>}
			    {escappFailMessage ? <p className="danger">It does not seem related</p> : null}
			    {escappSuccessMessage ? <p className="success">Great!</p> : null}
			    </div>
		    </div>
    </div>;
}
export default Bloc;