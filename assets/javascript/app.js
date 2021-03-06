// MODALS
//================================================================

//Get the modal for an empty input box
var modalEmpty = document.getElementById("modal-empty");
var modalAddTrain = document.getElementById("modal-trainadd");
var modalNumber = document.getElementById("modal-num");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// FUNCTIONS-GLOBAL
//================================================================

//Displays current time to header
$(document).ready(function() {
    var currentTime = moment().format("HH:mm");
    $("#time-header").text("Current Time: " + currentTime);
});

// Only allows # to be typed
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        //Displays if anything but numbers are entered
        modalNumber.setAttribute("style","display: block;");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modalNumber.setAttribute("style","display: none;");
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modalNumber) {
                modalNumber.setAttribute("style","display: none;");
            }
        }
        //Stops Function
        return false;
    } else {
        //Continues Function
        return true;
    }
}

// FIREBASE CONFIG
//================================================================

var config = {
    apiKey: "AIzaSyBcji1-J7P-BZfCfZfjaJpyWb9JH9Oa2Qk",
    authDomain: "train-tracker-1eecf.firebaseapp.com",
    databaseURL: "https://train-tracker-1eecf.firebaseio.com",
    projectId: "train-tracker-1eecf",
    storageBucket: "train-tracker-1eecf.appspot.com",
    messagingSenderId: "569769386434",
    appId: "1:569769386434:web:272449e62e4fddd3"
};

//Initialize firebase with provided apiKey and documentation
firebase.initializeApp(config);

//Setting the variable database to be my firebase
var database = firebase.database();

//When the add button is pressed...
$("#add-btn").on("click", function (event) {

    //Prevents the add button from reloading the page
    event.preventDefault();

    //Get values from the form
    var trainNum = $("#num-input").val();
    var trainLine = $("#line-input").val();
    var trainDest = $("#dest-input").val();
    var trainDept = $("#start-time-input").val();
    var trainFreq = $("#freq-input").val();
    var trainPlatform = $("#plat-input").val();
    var trainCost = $("#cost-input").val();

    //If any input boxes are blank, a modal pops up anf function stops
    if (trainNum === "" || trainLine === "" || trainDest === "" || trainDept === "" || trainFreq === "" || trainPlatform === "" || trainCost === "") {
        //Displays the #modal-empty if there are any empty inputs
        modalEmpty.setAttribute("style","display: block;");
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modalEmpty.setAttribute("style","display: none;");
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modalEmpty) {
                modalEmpty.setAttribute("style","display: none;");
            }
        }
        return;
    }

    //If there's no $ in the cost, this adds one
    if (trainCost.indexOf('$') < 0) {
        trainCost = "$" + trainCost;
    }

    //Creates new local object with new keys/values
    var newTrain = {
        num: trainNum,
        line: trainLine,
        dest: trainDest,
        dept: trainDept,
        freq: trainFreq,
        platform: trainPlatform,
        cost: trainCost,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    //Push these values to the database
    database.ref().push(newTrain);

    //When we add a train to the database, the module lets the user know
    modalAddTrain.setAttribute("style","display: block;");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modalAddTrain.setAttribute("style","display: none;");
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modalAddTrain) {
            modalAddTrain.setAttribute("style","display: none;");
        }
    }

    //Emptying all the imput boxes when finished
    $("#num-input").val("");
    $("#line-input").val("");
    $("#dest-input").val("");
    $("#start-time-input").val("");
    $("#freq-input").val("");
    $("#plat-input").val("");
    $("#cost-input").val("");
});


database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var num = childSnapshot.val().num;
    var line = childSnapshot.val().line;
    var destination = childSnapshot.val().dest;
    var firstDept = childSnapshot.val().dept;
    var freq = childSnapshot.val().freq;
    var platform = childSnapshot.val().platform;
    var cost = childSnapshot.val().cost;

    //Converts the user entered information and stores it
    firstDeptConverted = moment(firstDept, "HH:mm");

    //Gets the current time and formats it
    var currentTime = moment();

    //Difference Between the Current Time and the First Departure
    var timeDifference = currentTime.diff(moment(firstDeptConverted), "minutes");

    //Time Remainder
    var timeRemainder = timeDifference % freq;

    //Minutes Until Train
    var minutesRemain = freq - timeRemainder;

    //Next Train
    var nextTrain = moment().add(minutesRemain, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(num),
        $("<td>").text(line),
        $("<td>").text(destination),
        $("<td>").text(moment(nextTrain).format("HH:mm")),
        $("<td>").text(minutesRemain + " minutes"),
        $("<td>").text(freq + " minutes"),
        $("<td>").text(platform),
        $("<td>").text(cost)
    );

    // Append the new row to the table
    $("#train-table-body").append(newRow);
});




