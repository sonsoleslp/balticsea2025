import React from 'react';
import { useState, useEffect } from "react";

export default function Exit(props) {

	return <div>
	<button className="exit" onClick = {props.onExit}>Return to the corridor</button>
	</div>

}