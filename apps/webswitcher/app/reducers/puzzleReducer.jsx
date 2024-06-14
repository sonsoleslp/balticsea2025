function puzzleReducer(state = 0, action){
  switch (action.type){
  case 'RESTORE_STATE':
    if((typeof action.new_state === "object") && (typeof action.new_state.puzzle === "number")){
      return action.new_state.puzzle;
    }
    return state;
  case 'RESTORE_STATE_FOR_PUZZLE':
    if(typeof action.puzzle_id === "number"){
      return action.puzzle_id;
    }
    return state;
  case 'CHANGE_PUZZLE':
    if((typeof action.puzzle_id === "number") && (action.puzzle_id > state)){
      return action.puzzle_id;
    }
    return state;
  default:
    return state;
  }
}

export default puzzleReducer;