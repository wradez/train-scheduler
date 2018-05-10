// Initialize Firebase
var config = {
apiKey: "AIzaSyCDckFcQIe70SVJD2be05nkdEENTsSvYEw",
authDomain: "train-scheduler-c3b9b.firebaseapp.com",
databaseURL: "https://train-scheduler-c3b9b.firebaseio.com",
projectId: "train-scheduler-c3b9b",
storageBucket: "train-scheduler-c3b9b.appspot.com",
messagingSenderId: "664774837557"
};

firebase.initializeApp(config);
    
var database = firebase.database();


// Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = "";

// Capture Button Click
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(snapshot) {
    
    var db = snapshot.val();

    var firstTimeConverted = moment(db.firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment().format("HH:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % db.frequency;
    var tMinutesTillTrain = db.frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");


    console.log(db);

    var tableRow = $("<tr><td>" + db.trainName + "</td><td>" + db.destination + "</td><td>" + db.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    $("#trainSchedule").append(tableRow);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject);
});

$("#updateTrain").on("click", function(){
    event.preventDefault();

    // Grabbed values from mdoal text-boxes
    trainName = $("#updateTrainName").val().trim();
    destination = $("#updateDestination").val().trim();
    firstTrainTime = $("#updateFirstTrainTime").val().trim();
    frequency = $("#updateFrequency").val().trim();

    database.ref("???").update({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

});