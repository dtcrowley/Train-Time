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
    firstTrain = $("#firstTrain").val().trim(), "HH:mm";
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
    console.log(trainFrequency);
    var trainFirst = snapshot.val().firstTrain
    console.log(trainFirst);
    var difference = moment().subtract(moment(trainFirst), "minutes");
    console.log(difference);
    var remainder = difference % trainFrequency;
    console.log(remainder);
    var minutesAway = trainFrequency - remainder;
    console.log(minutesAway);
    //var trainNext = moment().add(minutesAway, "minutes");
    var nextArrival = moment().add(minutesAway,"minutes").format("HH:mm");
    console.log(nextArrival);
      
    $("#table-data").append("<tr><td>" 
    + snapshot.val().train + "</td><td>" 
    + snapshot.val().destination + "</td><td>"  
    + snapshot.val().trainFrequency + "</td><td>" 
    + snapshot.val().minutesAway + "</td><td>" 
    + snapshot.val().nextArrival + "</td></tr>");

  });

