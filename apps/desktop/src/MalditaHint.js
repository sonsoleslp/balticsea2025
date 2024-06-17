import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function MalditaHint(props) {
 
  const { I18n, puzzleCompleted, show } = props;
  
  return <div className={"malditaHint" + ((show && !puzzleCompleted) ? " show" : "")} >
  		<p>{I18n.getTrans("hint")}</p>
    </div>;
}
export default MalditaHint;