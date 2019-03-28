

function saveUserInfo(user){
  var db = firebase.firestore();

  var userInfoData = {
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      role: "student"
  };

db.collection("user").doc(user.email).collection("account").doc("userInfo").set(userInfoData).then(function() {
    console.log("User InfoDocument successfully written!");
});


}//end  SaveUserInfo(user)

//
//
// function courseDescription(room,location,time){
//
//   var rooms  = [];
//   var locations = [];
//   var times = [];
//   var result;
//
//   var tempRoomString = room.split(" ");
//   var tempLocationString = location.split(" ");
//   var tempTimesString = time.split(",");
//
//   for(var i = 0; i < tempRoomString.length; i++){
//     rooms.push(tempRoomString[i]);
//   }
//   for(var i = 0; i < tempLocationString.length; i++){
//     locations.push(tempLocationString[i]);
//   }
//   for(var i = 0; i < tempTimesString.length; i++){
//     times.push(tempTimesString[i]);
//   }
//   if (times.length == 3 && rooms.length == 3){
//       //meet 3 times with 3 room
//     result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[1]} ${times[1]} ${locations[2]} ${rooms[2]} ${times[2]}`;
//   }
//   else if (times.length == 2 && rooms.length == 2){
//       //meet 2 times with 2 room
//     result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[1]} ${times[1]}`;
//   }
//   else if (times.length == 2 && rooms.length == 1){
//     //meet 2 times with 1 room
//     result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[0]} ${times[1]}`;
//   }
//   else if (times.length == 1 && rooms.length == 1){
//     //meet 1 times with 1 room
//     result = `${locations[0]} ${rooms[0]} ${times[0]}`;
//   }
//   else{
//     console.log("Condition is not found");
//   }
//
//   return result;
// }//end courseDescription(room,location,time)

function addCourse(user){
  var db = firebase.firestore();
  db.collection("user").doc(user.email).collection("courses").add({
      course_id: "1235",
      department_code: "CSCI",
      course_number: "101",
      course_title: "Coursetitle",
      capmus: "Manhattan Campus",
      location: "Guiliano Global",
      room: "601",
      term: "Fall 2018",
      instructor: "Dr. Li",
      time: "time"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

  var list = [];
function getDatabaseCourseInfo(){
    var db = firebase.firestore();

    db.collection("courseDatabase").doc("courses")
    .onSnapshot(function(doc) {
          courseInfoList(doc.data());
          console.log("courses Database: ", doc.data());
      });

  }

function courseInfoList(info){
  var count = 1;
  for(let z of Object.keys(info))
    {
      var ref = info[z];
      list.push(`(${ref.course_id})${ref.department_code}${ref.course_number} ${ref.course_title} ${ref.schedule} ${ref.term} Instructor: ${ref.instructor}`);
      count++;
    }

      console.log("List: ",list);
}

function courseList(){
  new Vue({
  el: '#test',
  data: {
    selected: courseArray[0],
    options: [
        { text: courseArray[0], value: courseArray[0] },
        { text: courseArray[1], value: courseArray[1] },
        { text: courseArray[2], value: courseArray[2] },
        { text: courseArray[3], value: courseArray[3] },
        { text: courseArray[4], value: courseArray[4] },
        { text: courseArray[5], value: courseArray[5] },
        { text: courseArray[6], value: courseArray[6] },
        { text: courseArray[7], value: courseArray[7] },
        { text: courseArray[8], value: courseArray[8] },
        { text: courseArray[9], value: courseArray[9] },

        { text: courseArray[10], value: courseArray[10] },
        { text: courseArray[11], value: courseArray[11] },
        { text: courseArray[12], value: courseArray[12] },
        { text: courseArray[13], value: courseArray[13] },
        { text: courseArray[14], value: courseArray[14] },
        { text: courseArray[15], value: courseArray[15] },
        { text: courseArray[16], value: courseArray[16] },
        { text: courseArray[17], value: courseArray[17] },
        { text: courseArray[18], value: courseArray[18] },
        { text: courseArray[19], value: courseArray[19] },

        { text: courseArray[20], value: courseArray[20] },
        { text: courseArray[21], value: courseArray[21] },
        { text: courseArray[22], value: courseArray[22] },
        { text: courseArray[23], value: courseArray[23] },
        { text: courseArray[24], value: courseArray[24] },
        { text: courseArray[25], value: courseArray[25] },
        { text: courseArray[26], value: courseArray[26] },
        { text: courseArray[27], value: courseArray[27] },
        { text: courseArray[28], value: courseArray[28] },
        { text: courseArray[29], value: courseArray[29] }


    ]
  }
})

}



function getUserInfoRealTime(user){
    var db = firebase.firestore();
    var count = 1;

    var courseDetail = [];

    db.collection("user").doc(user.email).collection("account").doc("userInfo")
    .onSnapshot(function(doc) {
          var userRef = doc.data();
          console.log("Current data: ", doc.data());
          document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>Email: " + userRef.email + "</br>UID: " + userRef.uid + "</br>";
      });

    db.collection("user").doc(user.email).collection("courses")
    .onSnapshot(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
            ref = doc.data();
            //courseDetail.push(courseDescription(ref.room,ref.location,ref.time));

           document.getElementById("course" + count + "-info").innerHTML = "Courses Info: " + "("+ ref.course_id + ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor ;
           count++;
       });
       console.log("hhhhhhhh", courseDetail);

   });



   // not real time query courses
   // db.collection("user").doc(user.email).collection("courses")
   // .get()
   // .then(function(querySnapshot) {
   //     querySnapshot.forEach(function(doc) {
   //         // doc.data() is never undefined for query doc snapshots
   //         console.log(doc.id, " => ", doc.data());
   //         ref = doc.data();
   //         document.getElementById("course" + count + "-info").innerHTML = "Courses Info: " + "("+ ref.course_id + ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor ;
   //         count++;
   //     });
   // })
   // .catch(function(error) {
   //     console.log("Error getting documents: ", error);
   // });

}//end getUserInfoRealTime(user)

function getUserCountAdmin(){
   var size = 0;
   var db = firebase.firestore();
   db.collection('user').get().then(snap => {
   size = snap.size // will return the collection size
});

}//end getUserCountAdmin()


// function getCourseTest(info){
//    var userRef = info.userInfo;
//
//   document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>Email: " + userRef.email + "</br>UID: " + userRef.uid + "</br>";
//   var count = 1;
//   console.log(info.courses);
//
//   for(let z of Object.keys(info.courses))
//   {
//     var ref = info.courses[z];
//     document.getElementById("course" + count + "-info").innerHTML = "Courses Info: </br>"+ "("+ ref.course_id +  ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor ;
//     count++;
//   }

// //get user info once, will not update data if website is not refreshed.
// function getUserInfo(user){
//   var db = firebase.firestore();
//   var docRef = db.collection("user").doc(user.email);
//
//   docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//         getCourseTest(doc.data());
//   } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
// }// end getUserInfo(user)
