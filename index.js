var alphabet = 'abcdefghijklmnopqrstuvwxyz';
function Log(date, log) {
	this.date = date;
	this.log = log;
}
function User(name, password) {
	this.id = alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)] + alphabet[Math.floor(Math.random()*26)];
	this.name = name;
	this.password = password;
	this.logs = [];
}

const express = require('express');
const app = express();
var accounts = [];

app.listen(3000, () => console.log('listening at 3000'));
app.use( express.static( __dirname ) );
app.use(express.json());


app.post('/login', (request, response) => {
	var data = request.body;
	var f = true;
	for (var u in accounts) {
		if (data.username === accounts[u].name && data.password === accounts[u].password) {
			response.send({success: true, id: accounts[u].id});
			console.log("User: " + accounts[u].id + ' logged in.');
			f = false;
			return;
		}
	}
	if (f) {
		console.log("Client entered incorrect username or password!");
		response.send({success: false, reason: "Username or password is incorrect!"});
	}
});
app.post('/getData', (request, response) => {
	var data = request.body;
	for (var u in accounts) {
		if (data.id === accounts[u].id) {
			response.send({success: true, logs: accounts[u].logs});
			console.log("User: " + accounts[u].id + ' grabbed their data.');
			return;
		}
	}
	response.send({success: false, reason: "Account does not exist!"});
});
app.post('/addData', (request, response) => {
	var data = request.body;
	for (var u in accounts) {
		if (data.id === accounts[u].id) {
			accounts[u].logs.push(new Log(data.date, data.log));
			console.log("User: " + accounts[u].id + ' added data to their account.');
			response.send({success: true});
			return;
		}
	}
	response.send({success: false, reason: "Account does not exist!"});
	
});
app.post('/newUser', (request, response) => {
	var data = request.body;
	for (var i in accounts) {
		if (accounts[i].name === data.username) {
			response.send({success: false, reason: "Account already taken!"});
			console.log('User tried to create an account with a user name already taken!');
			return;
		}
	}
	accounts.push(new User(data.username, data.password));
	console.log("New user account.");
	var i = accounts.length - 1;
	console.log('{\n id: ' + accounts[i].id + '\n name: ' + accounts[i].name + "\n password: " + accounts[i].password + '\n}')
	response.send({success: true});
})
