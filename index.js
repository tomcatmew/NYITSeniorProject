'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const db = admin.firestore();
var count = 0 ;
exports.accountcleanup = functions.pubsub.schedule('every 1 minutes').onRun(async context => {
  var docdata = {
    room: count,
    location: "TESTTTTTTTTTTTTT",
    book_list:[],
    status: ""
  };
  count ++;
  db.collection("room").add(docdata).then(function() {
      console.log("User DOCCCCCCCCCCCCCC successfully written!");;
    });
  console.log('User cleanup finished AAAAAAAAAAAAAAAAAAAAAA');
});


// export scheduledFunctionPlainEnglish =
// functions.pubsub.schedule('every 1 minutes').onRun((context) => {
//     console.log('This will be run every 1 minutes!');
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.status(200).send("Hello from Firebase!");
});
