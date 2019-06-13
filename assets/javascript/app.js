var config = {
    apiKey: "AIzaSyBcji1-J7P-BZfCfZfjaJpyWb9JH9Oa2Qk",
    authDomain: "train-tracker-1eecf.firebaseapp.com",
    databaseURL: "https://train-tracker-1eecf.firebaseio.com",
    projectId: "train-tracker-1eecf",
    storageBucket: "train-tracker-1eecf.appspot.com",
    messagingSenderId: "569769386434",
    appId: "1:569769386434:web:272449e62e4fddd3"
};

firebase.initializeApp(config);

var database = firebase.database();

var modal = document.getElementById("modal-empty");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// var num = "";
// var line = "";
// var destination = "";
// var firstDept = "";
// var freq = "";
// var platform = ""
// var cost = 0;
// var currentTime = 0; //Will get this value from moment.js? Timestamp?


//Only allows # to be typed
// function isNumber(evt) {
//     var iKeyCode = (evt.which) ? evt.which : evt.keyCode
//     if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
//         alert("Only Numbers, Please");
//         return false;
//     } else {
//         return true;
//     }
// }

// onkeypress="javascript:return isNumber(event)"

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

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

    if (trainNum === "" || trainLine === "" || trainDest === "" || trainDept === "" || trainFreq === "" || trainPlatform === "" || trainCost === "") {
        modal.style.display = "block";
        return;
    }

     // Testing with console.log
     console.log(trainNum);
     console.log(trainLine);
     console.log(trainDest);
     console.log(trainDept);
     console.log(trainFreq);
     console.log(trainPlatform);
     console.log(trainCost);

     //If there's no $ in the cost, this adds one
    if (trainCost.indexOf('$') < 0) {
        console.log("There's no $ sign!");
        trainCost = "$" + trainCost;
    }   else {
        console.log("There is a $ sign!");
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

    alert("Train Added!");
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

    firstDeptConverted = moment(firstDept, "HH:mm");
    console.log(firstDeptConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    //Difference Between the Current Time and the First Departure
    var timeDifference = currentTime.diff(moment(firstDeptConverted), "minutes");
    console.log("Difference in Time: " + timeDifference);

    //Time Remainder
    var timeRemainder = timeDifference % freq;
    console.log("Time Remainder: " + timeRemainder);

    //Minutes Until Train
    var minutesRemain = freq - timeRemainder;
    console.log("Minutes Remaining: " + minutesRemain);

    //Next Train
    var nextTrain = moment().add(minutesRemain, "minutes");
    console.log("Next Train: " + nextTrain);


    // Testing with consolelog
    console.log(num);
    console.log(line);
    console.log(destination);
    console.log(firstDept);
    console.log(freq);
    console.log(platform);
    console.log(cost);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(num),
        $("<td>").text(line),
        $("<td>").text(destination),
        $("<td>").text(nextTrain.format("hh:mm")),
        $("<td>").text(minutesRemain + " minutes"),
        $("<td>").text(freq + " minutes"),
        $("<td>").text(platform),
        $("<td>").text(cost)
    );

    // Append the new row to the table
    $("#train-table-body").append(newRow);
});



