// *** SETUP ***
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCSQJwbAX93xZfim906usewzFd2SW8dSdE",
    authDomain: "characters-3083c.firebaseapp.com",
    databaseURL: "https://characters-3083c.firebaseio.com",
    projectId: "characters-3083c",
    storageBucket: "",
    messagingSenderId: "476732178009"
};
firebase.initializeApp(config);
var database = firebase.database();
var charsRef = database.ref("/characters");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// *** ROUTING ***

// GET "/" renders "view.html"
app.get('/', (req, res, next) => {
    var fileName = __dirname + '/view.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/add" renders "add.html"
app.get('/add', (req, res, next) => {
    var fileName = __dirname + '/add.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/all" renders "all.html"
app.get('/all', (req, res, next) => {
    var fileName = __dirname + '/all.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/api/characters"
// Displays all characters
app.get('/api/characters', (req, res) => {
    // res.send('Display all characters');
    console.log('Getting all characters');
    var fileName = __dirname + '/seeds.json';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/api/characters/:character" gets `:character` passed in as a request param
// Displays a single character, or returns false
app.get('/api/characters/:character', (req, res) => {
    res.send('view.html')
});

// POST "/api/characters"
// creates New Characters with JSON input(using body - parser)
app.use('/api/characters', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body);
    let child = encodeURIComponent(req.name.toLowerCase());
    let newRef = charsRef.child(child);
    newRef.onDisconnect().remove();
    newRef.set({
        name: req.name,
        role: req.role,
        age: parseInt(req.age),
        forcePoints: parseInt(req.forcePoints)
    });
});

app.listen(3000, () => console.log('App listening on port 3000!'));

var addPlayer = () => {
    var playerName = $("#nameInput").val();
    $("#playerGreeting").text(`Hi, ${playerName}. You are Player ${player}.`);
    userRef = playersRef.child(player);
    userRef.onDisconnect().remove();
    userRef.set({
        name: playerName,
        wins: 0,
        losses: 0
    });
}