console.log("Init task: Update Escapp library");

const {resolve} = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

const app_path = resolve(__dirname, '../app');
const escapp_library_path = resolve(__dirname, '../../../../escapp_client');

if(!fs.existsSync(escapp_library_path)){
  //Abort
  console.log("Escapp library not found");
  console.log(escapp_library_path);
  return;
}

let commands = [];
commands.push('cd ' + escapp_library_path + ' && npm run production');

let apps = ['../app'];
for(let i=0; i<apps.length; i++){
	let app_path = resolve(__dirname, apps[i]);
	if(!fs.existsSync(app_path)){
		//Abort
		console.log("App not found: " + app_path);
		return;
	}
	commands.push('cp ' + escapp_library_path + '/dist/escapp.js ' + app_path + '/vendors/escapp.js');
	commands.push('cp ' + escapp_library_path + '/dist/escapp.css ' + app_path  + '/vendors/css/escapp.css');
	commands.push('cp ' + escapp_library_path + '/dist/images/* ' + app_path  + '/assets/images/');
}

for(let j=0; j<commands.length; j++){
	console.log("Executing command");
	console.log(commands[j]);
	let stdout = execSync(commands[j]);
	console.log(`${stdout}`);
}

console.log("Task finished");