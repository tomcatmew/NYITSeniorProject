// function load() {
//   var mydata = JSON.parse(data);
//   return mydata[0].departmentCode + "&nbsp" +  mydata[0].courseNumber + "&nbsp" + mydata[0].courseTitle + "&nbsp" + mydata[0].term + "&nbsp" + mydata[0].location + "-----"+ mydata[0].time + mydata[0].credits + "<br /> Instructor:&nbsp" +  mydata[0].instructor ;
// }


function SaveUserInfo(user){

  var db = firebase.firestore();

  var userData = {
   userInfo:{
      uid: user.uid,
      name: user.displayName,
      email: user.email
    },
    courses:{
      course1:{
        course_id: "1235",
        department_code: "CSCI",
        course_number: "101",
        course_title: "Coursetitle",
        term: "Fall 2019",
        capmus: "Manhattan Campus",
        location: "Guiliano Global",
        room: "601",
        instructor: "Dr. Li",
        time: "time"
      },

      course2:{
        course_id: "2235",
        department_code: "CSCI",
        course_number: "201",
        course_title: "Coursetitle",
        term: "Fall 2019",
        capmus: "Manhattan Campus",
        location: "Guiliano Global",
        room: "501",
        instructor: "Dr. Lu",
        time: "time"
      }

    }
  };

db.collection("user").doc(user.email).set(userData).then(function() {
    console.log("Document successfully written!");
});

}//end  SaveUserInfo(user)

//format error
// function addCourse(user){
//   var db = firebase.firestore();
//   db.collection("user").doc(user.email).set({
//     courses:{
//       course_id: "1235",
//       department_code: "CSCI",
//       course_number: "101",
//       course_title: "Coursetitle",
//       capmus: "Manhattan Campus",
//       location: "Guiliano Global",
//       room: "601",
//       instructor: "Dr. Li",
//       time: "time"
//     },
//     userInfo:{
//
//      }
//
//
//
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });
// }

function courseDescription(info){
     // var tempCourse = "";
     // var name = "course2";
     // var ref = info.courses.course1
     // var ref2 = info.courses.course2
     // var list = document.createElement("LI");
     // var course1Test = document.createTextNode( "("+ ref.course_id +  ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor );
     // var course2Test = document.createTextNode( "("+ ref2.course_id +  ") " + ref2.department_code + " " + ref2.course_number + " " + ref2.course_title + " " + ref2.location + " " + ref2.room + " " + ref2.term + " " + ref2.time + "instructor: " + ref2.instructor );
     // list.appendChild(course1Test);
     // list.appendChild(course2Test);
     //
     // document.getElementById("course-list").appendChild(list);

}

function getCourseTest(info){
   var userRef = info.userInfo
   var ref = info.courses.course1
   var ref2 = info.courses.course2

     document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>Email: " + userRef.email + "</br>UID: " + userRef.uid + "</br>";
   document.getElementById("course1-info").innerHTML = "Courses Info: </br>"+ "("+ ref.course_id +  ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor ;
   document.getElementById("course2-info").innerHTML = "("+ ref2.course_id +  ") " + ref2.department_code + " " + ref2.course_number + " " + ref2.course_title + " " + ref2.location + " " + ref2.room + " " + ref2.term + " " + ref2.time + "instructor: " + ref2.instructor ;


}//end getCourseTest(info)


function getUserInfoRealTime(user){
    var db = firebase.firestore();
    db.collection("user").doc(user.email)
    .onSnapshot(function(doc) {
          console.log("Current data: ", doc.data());
          getCourseTest(doc.data());

      });

}

function getUserCountAdmin(){
   var size = 0;
   var db = firebase.firestore();
   db.collection('user').get().then(snap => {
   size = snap.size // will return the collection size
});

}




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
