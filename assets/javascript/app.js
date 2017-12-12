// Initialize Firebase
var config = {
    apiKey: "AIzaSyClVnromzV5t1SEJFU_zR87uX7FrFeIn_E",
    authDomain: "fir-train-schedule.firebaseapp.com",
    databaseURL: "https://fir-train-schedule.firebaseio.com",
    projectId: "fir-train-schedule",
    storageBucket: "",
    messagingSenderId: "139447055002"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial variables
  var name = "";
  var destination = "";
  var trainTime = "";
  var frequencyMins = "";

  // Capture Button Click
  $("#add-user").on("click", function (event) {
      event.preventDefault();

      // Grabbed values from text-boxes
      name = $("#train-name").val().trim();
      destination = $("#destination-name").val().trim();
      trainTime = $("#train-time").val().trim();
      frequencyMins = $("#frequency-mins").val().trim();

      // Code for "Setting values in the database"
      database.ref().push({
          name: name,
          destination: destination,
          trainTime: trainTime,
          frequencyMins: frequencyMins,
          minutesAway: firebase.database.ServerValue.TIMESTAMP
      });
  });
  // Add them to the HTML in our table

  database.ref().on("child_added", function (childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequencyMins);

      // Change the HTML to reflect
      var newTr = $("<tr>")
      newTr.append("<td>" + childSnapshot.val().name + "</td>");
      newTr.append("<td>" + childSnapshot.val().destination + "</td>");
      newTr.append("<td>" + childSnapshot.val().trainTime + "</td>");
      newTr.append("<td>" + childSnapshot.val().minutesAway + "</td>");
      newTr.append("<td>" + childSnapshot.val().frequencyMins + "</td>");
      newTr.append("<td>" + 0 + "</td>");
      $("tbody").append(newTr);



      // Handle the errors
  }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });