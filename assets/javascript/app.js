const firebaseConfig = {
    apiKey: "AIzaSyCqTwnF9I9bc_BpcQ2Mcy3k5Hc6daU4C_Y",
    authDomain: "utbc-project-1.firebaseapp.com",
    databaseURL: "https://utbc-project-1.firebaseio.com",
    projectId: "utbc-project-1",
    storageBucket: "utbc-project-1.appspot.com",
    messagingSenderId: "1068762432323",
    appId: "1:1068762432323:web:db2b5691200179d9"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var name = "";
var line = "";
var destination = "";
var firstDept = "";
var freq = "";
var cost = 0;
//Will figure out Next Arrival and Time to Arrival by...
    //Next Arrival: 
    //Time to Arrival: 