  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBf5mSRgDO-SKfoyUyWwXZE1GYNhR07Zeg",
    authDomain: "traintime-hw07.firebaseapp.com",
    databaseURL: "https://traintime-hw07.firebaseio.com",
    projectId: "traintime-hw07",
    storageBucket: "traintime-hw07.appspot.com",
    messagingSenderId: "202352953043"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var train = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;
  var nextArrival;
  var minutesAway;

  // Capture Button Click
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    train = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = moment($("#firstTrain").val().trim()).format("HH:mm");
    frequency = $("#frequency").val().trim();

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Code for the push
    dataRef.ref().push({
      train: train,
      destination: destination,
      firstTrain: firstTimeConverted,
      frequncy: frequency,
    });
  });

  // Firebase watcher + initial loader HINT: .on("value")
  dataRef.ref().on("child_added", function (snapshot) {
    // Log everything that"s coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().train);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    // Change the HTML to reflect
    database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val())
    
        // Current Time
    var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
    var remainder = diffTime % frequency;
        console.log(remainder);
    
        // Minute Until Train
    var minutesAway = frequency - remainder;
        console.log("MINUTES TILL TRAIN: " + minutesAway);
    
        // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    $("#table-data").append("<tr><td>" + snapshot.val().train + "</td><td>" + snapshot.val().desination + "</td><td>"  
    + snapshot.val().frequency + "</td><td>" +snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway + "</td></tr>");
    
    
    
    });

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });

