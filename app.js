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
//Initial variables
  var database = firebase.database();
  var train = ""
  var destination = ""
  var firstTrain = ""
  var frequency = ""
 
  // Capture Button Click
  $("#submitBtn").on("click", function (event) {
    event.preventDefault();
    //Assign input values to variables
    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    // Push to Firebase
    database.ref().push({
      train: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
  });

  // Firebase watcher + initial loader 
  database.ref().on("child_added", function (snapshot) {
    //Local variables; assign input values to table

    var trainFrequency = snapshot.val().frequency;
    console.log("Frequency: " + trainFrequency);
    var trainFirst = snapshot.val().firstTrain;
    console.log(trainFirst);
    var trainFirstConverted = moment(trainFirst, "HH:mm");
    console.log(trainFirstConverted);
    var difference = moment().diff(moment(firstTrain), "minutes");
    console.log("Difference: " + difference);
    var remainder = difference % trainFrequency;
    console.log("Remainder: " + remainder);
    var minutesAway = trainFrequency - remainder;
    console.log("Minutes Away: " + minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("NextTrain @: " + nextTrain);
    var nextArrival = moment(nextTrain).format("HH:mm");
    console.log("Next Arrival: " + nextArrival);
    console.log("___________________________");
      
    $("#table-data").append("<tr><td>" 
    + snapshot.val().train + "</td><td>" 
    + snapshot.val().desination + "</td><td>"  
    + snapshot.val().trainFrequency + "</td><td>" 
    + snapshot.val().nextArrival + "</td><td>" 
    + snapshot.val().minutesAway + "</td></tr>");
    

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });

