import React from 'react';
import {changeScreen} from '../reducers/actions.jsx';

export default class MainScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if(typeof this.props.current_url !== "string"){
      return "";
    }

    return (
      <iframe className="iframe_wrapper" src={this.props.current_url} width="100%" height="100%" style={{border:0}} allowFullScreen mozallowfullscreen="true" webkitallowfullscreen="true" frameBorder="0"/>
    );
  }
}