// function load() {
//   var mydata = JSON.parse(data);
//   return mydata[0].departmentCode + "&nbsp" +  mydata[0].courseNumber + "&nbsp" + mydata[0].courseTitle + "&nbsp" + mydata[0].term + "&nbsp" + mydata[0].location + "-----"+ mydata[0].time + mydata[0].credits + "<br /> Instructor:&nbsp" +  mydata[0].instructor ;
// }
var course_enrolled = [];


function addMessageToDatable(email){
    var db = firebase.firestore();
    var message = document.getElementById("textbar").value;
    var d = new Date();
    var tempt_id = $("#message_select").val();
  db.collection("message").add({
    user_email: email,
    course_id: tempt_id,
    message: message,
    time: d
})
.then(function() {
    console.log("message successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}


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
    course_id: "1817",
    department_code: "MATH",
    course_number: "115",
    course_title: "Introductory Concepts of Mathematics",
    capmus: "Manhattan Campus",
    location: "Guiliano Global Center",
    term: "Spring 2019",
    instructor: "Carol Bilsky_Bieniek",
    schedule: "GGC 401 1 15:30 16:50 GGC 401 3 15:30 16:50"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}


function addcoursefromdatabase(user_mail,input_campus,input_id,input_number,input_Ttitle,input_code,input_prof,input_locat,input_schedule,input_terms){
  var db = firebase.firestore();
  db.collection("user").doc(user_mail).collection("courses").add({
  course_id: input_id,
  department_code: input_code,
  course_number: input_number,
  course_title: input_Ttitle,
  capmus:input_campus,
  location: input_locat,
  term: input_terms,
  instructor:input_prof,
  schedule: input_schedule
})
.then(function() {
    console.log("course successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

var list_transfer_final = [];

function getDatabaseCourseInfo(){
    var db = firebase.firestore();
      db.collection("courseDatabase").where("course_number", ">=", "100")
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //courseInfoList(doc.data());
            var ref = doc.data();
            var list_transfer  = [];
            list_transfer.push(`${ref.capmus}`);
            list_transfer.push(`${ref.course_id}`);
            list_transfer.push(`${ref.course_number}`);
            list_transfer.push(`${ref.course_title}`);
            list_transfer.push(`${ref.department_code}`);
            list_transfer.push(`${ref.instructor}`);
            list_transfer.push(`${ref.location}`);
            list_transfer.push(`${ref.schedule}`);
            list_transfer.push(`${ref.term}`);
            list_transfer_final.push(list_transfer);
            });
            console.log("courses Database: ", list_transfer_final);
            courseList(list_transfer_final);
        });
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
            var tempt = document.getElementById("course1-info");
            tempt.innerHTML = '';
       querySnapshot.forEach(function(doc) {
            ref = doc.data();
             courseDetail.push(ref.department_code,ref.course_number,ref.schedule);
             var x = document.getElementById("course1-info");
             var g = document.createElement('div');
             g.innerHTML = "Course Info " + count + ": </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>CourseID: " + ref.course_id  + "</br>Schedule: " + ref.schedule + "</br>" + "</br>";
             g.setAttribute("id", "Div" + count);
             x.appendChild(g);

             // $("#course1-info").html("Course Info: </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>Schedule: " + ref.schedule + "</br>");
           count++;
       });
       // console.log("hhhhhhhh", courseDetail);
   });
}

function getUserCourseMessageRealTime(usermail){
  var db = firebase.firestore();
  var count = 1;

  // var course_enrolled = [];

  db.collection("user").doc(usermail).collection("courses")
  .onSnapshot(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
           ref_tempt = doc.data();
           course_enrolled.push(ref_tempt.course_id);
         });
         for(var i = 0 ; i < course_enrolled.length; i++)
         {
           var x = document.getElementById("message_select");
           var option = document.createElement("option");
           option.value = course_enrolled[i];
           option.text = course_enrolled[i];
           x.add(option,i);
         }
    console.log(course_enrolled);
  });

  db.collection("message")
  .onSnapshot(function(querySnapshot) {
    var tempt = document.getElementById("message_info");
    tempt.innerHTML = '';
     querySnapshot.forEach(function(doc) {
           ref = doc.data();
           if((course_enrolled.includes(ref.course_id))&&(ref.course_id == $("#message_select").val()))
           {
             var t =document.getElementById("message_info");
             var z = document.createElement('div');
             z.innerHTML = "Course ID : " + ref.course_id + "</br>" + "Message : " + ref.message + "</br>" + "From : " + ref.user_email + "</br>" + "</br>";
             z.setAttribute("id","message" + count);
             t.appendChild(z);
           }
           count++;
     });
 });
}


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

//end getUserInfoRealTime(user)

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
