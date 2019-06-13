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

var num = "";
var line = "";
var destination = "";
var firstDept = "";
var freq = "";
var platform = ""
var cost = 0;
var currentTime = 0; //Will get this value from moment.js? Timestamp?

//Will figure out Next Arrival and Time to Arrival by...
//Next Arrival: Start time and Frequency
//Time to Arrival: Next Arrival - Current Time

//Only allows # to be typed
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        alert("Only Numbers, Please");
        return false;
    } else {
        return true; 
    }
}

$("#add-btn").on("click", function (event) {
    //Prevents the add button from reloading the page
    event.preventDefault();

    //Get values from the form
    num = $("#num-input").val().trim();
    line = $("#line-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstDept = $("#start-time-input").val().trim();
    freq = $("#freq-input").val().trim();
    platform = $("#plat-input").val().trim();
    cost = $("#cost-input").val().trim();

    console.log(num + " " + line + " " + destination + " " + firstDept +
        " " + freq + " " + platform + " " + cost);

    //Push these values to the database
    database.ref().push({
        num: num,
        line: line,
        destination: destination,
        firstDept: firstDept,
        freq: freq,
        platform: platform,
        cost: cost,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

rowCount = 1;

database.ref().on("child_added", function (snapshot) {
    currentRow = "#row" + rowCount;
    console.log(snapshot.child());
    $("tbody").append("<tr><th id=\"row" + rowCount + "/>" +
        snapshot.val().num + "</th>" + "<td>" +
        snapshot.val().line + "</td>" + "<td>" +
        snapshot.val().destination + "</td>" +
        "<td> Next Arrival Would Go Here </td>" +
        "<td> Time to Arrival Would Go Here </td>" +
        "<td>" + snapshot.val().freq + " min</td>" +
        "<td>" + snapshot.val().platform + "</td>"
    )
    if(snapshot.val().cost.charAt(0) !== "$") {
        $(currentRow).append( "<td> $ " + snapshot.val().platform + "</td>");
    } else {
        $(currentRow).append( "<td>" + snapshot.val().platform + "</td>");
    }   
    rowCount++;
});




