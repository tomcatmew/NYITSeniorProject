// function load() {
//   var mydata = JSON.parse(data);
//   return mydata[0].departmentCode + "&nbsp" +  mydata[0].courseNumber + "&nbsp" + mydata[0].courseTitle + "&nbsp" + mydata[0].term + "&nbsp" + mydata[0].location + "-----"+ mydata[0].time + mydata[0].credits + "<br /> Instructor:&nbsp" +  mydata[0].instructor ;
// }
var course_enrolled = new Set();
var global_count = 1;



function addMessageToDatable(email){
    var db = firebase.firestore();
    var message = document.getElementById("textbar").value;
    var d = new Date();
    var g = Date.now();
    var tempt_id = $("#message_select").val();
  db.collection("message").add({
    user_email: email,
    course_id: tempt_id,
    message: message,
    time: g
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


function addcoursefromdatabase(user_mail,input_campus,input_id,input_number,input_Ttitle,input_code,input_prof,input_locat,input_schedule,input_terms,input_room,input_section){
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
  schedule: input_schedule,
  room: input_room,
  section: input_section
})
.then(function() {
    console.log("course successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

function getDatabaseCourseInfo(){
    var list_transfer_final = [];
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
            list_transfer.push(`${ref.room}`);
            list_transfer.push(`${ref.section}`);
            list_transfer_final.push(list_transfer);
            });
            console.log("courses Database: ", list_transfer_final);
            courseList(list_transfer_final);
        });
}


function getUserInfoRealTime(user){
    var db = firebase.firestore();

    var courseDetail = [];



    db.collection("user").doc(user.email).collection("account").doc("userInfo")
    .onSnapshot(function(doc) {
          var userRef = doc.data();
          console.log("Current data: ", doc.data());
          user_name = userRef.name;
          document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>Email: " + userRef.email + "</br>UID: " + userRef.uid + "</br>";
      });

    db.collection("user").doc(user.email).collection("courses")
    .onSnapshot(function(querySnapshot) {
            var tempt = document.getElementById("course1-info");
            tempt.innerHTML = '';
            global_count = 1;
       querySnapshot.forEach(function(doc) {
             ref = doc.data();
             courseDetail.push(ref.department_code,ref.course_number,ref.schedule);
             var x = document.getElementById("course1-info");
             var g = document.createElement('div');
             g.innerHTML = "Course Info " + global_count + ": </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>CourseID: " + ref.course_id  + "</br>Schedule: " + ref.schedule + "</br>" + "</br>";
             g.setAttribute("id", "Div" + global_count);
             x.appendChild(g);

             // $("#course1-info").html("Course Info: </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>Schedule: " + ref.schedule + "</br>");
           global_count++;
       });
       // console.log("hhhhhhhh", courseDetail);
   });
}

function get_class_status(){
  var db = firebase.firestore();
  db.collection("room")
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var ref = doc.data();
      switch(`${ref.status}`)
      {
        case "red":
          console.log("colrrrrrrrrrrrrrrrrr");
          console.log(`${ref.location}`);
          console.log(`${ref.room}`);
          var locate = 'b'  + `${ref.location}` +   `${ref.room}`;
          var x = document.getElementById(locate);
          if( x != null)
            x.style.fill = 'red';
          break;
        case "green":
          var locate = 'b'  + `${ref.location}` +   `${ref.room}`;
          var x = document.getElementById(locate);
          if( x != null)
              x.style.fill = 'green';
          break;
        default:
      }
    });
  });
}


function check_if_in_class(){
  var list_transfer_2 = [];

  var db = firebase.firestore();
  db.collection("courseDatabase").where("course_number", ">=", "100")
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var ref = doc.data();
      var list_transfer = [];
      list_transfer.push(`${ref.capmus}`);
      list_transfer.push(`${ref.course_id}`);
      list_transfer.push(`${ref.course_number}`);
      list_transfer.push(`${ref.course_title}`);
      list_transfer.push(`${ref.department_code}`);
      list_transfer.push(`${ref.instructor}`);
      list_transfer.push(`${ref.location}`);
      list_transfer.push(`${ref.schedule}`);
      list_transfer.push(`${ref.term}`);
      list_transfer.push(`${ref.room}`);
      list_transfer.push(`${ref.section}`);
      list_transfer_2.push(list_transfer);
      });
      // for each wan
      var d = new Date();
      var z = d.getHours();
      var n = d.getMinutes();
      var current_min = z*60 + n;
      console.log("type of array :");
      console.log(typeof list_transfer_2);
      console.log("the of array :");
      console.log(list_transfer_2.length);

      for(var i = 0; i < list_transfer_2.length; i++)
      {
          var check_length = list_transfer_2[i][7].split(" ").length;
          real_leng = check_length/3;
          for(var j = 0 ; j < real_leng; j++)
          {
          var tempt1 = list_transfer_2[i][7].split(" ")[j*3 + 1];
          var tempt2 = list_transfer_2[i][7].split(" ")[j*3 + 2];
          var start_time = timeConverterMinute(tempt1);
          var end_time = timeConverterMinute(tempt2);
            if((start_time < current_min)&&(current_min < end_time))
            {
              console.log("Time is in between :");
              console.log(start_time);
              console.log(current_min);
              console.log(end_time);
              console.log(list_transfer_2[i][4] + list_transfer_2[i][2]);
              console.log(list_transfer_2[i][9].split(" ")[j]);
              console.log(list_transfer_2[i][6].split(" ")[j]);
              var tempt_room = {
                room: list_transfer_2[i][9].split(" ")[j],
                location: list_transfer_2[i][6].split(" ")[j],
                book_list:[],
                status: "red"
              };

              db.collection("room").get().then(function(querySnapshot2)
              {
                querySnapshot2.forEach(function(doc)
                 {
                   console.log(doc.id, " => ", doc.data());
                   db.collection("room").doc(doc.id).update(tempt_room).where("location", "==", list_transfer_2[i][6].split(" ")[j]).where("room", "==", list_transfer_2[i][9].split(" ")[j]);
                 });
              });
            }
          }
      }
    }
   );

}

function getUserCourseMessageRealTime(usermail){
  var db = firebase.firestore();
  var count = 1;
  // var course_enrolled = [];

  db.collection("user").doc(usermail).collection("courses")
  .onSnapshot(function(querySnapshot) {
           var tt = document.getElementById("message_select");
           tt.innerHTML = '';
           course_enrolled.clear();
     querySnapshot.forEach(function(doc)  {
           ref_tempt = doc.data();
           course_enrolled.add(ref_tempt.course_id);
         });
         for(let value of course_enrolled)
         {
           var x = document.getElementById("message_select");
           var option = document.createElement("option");
           option.value = value;
           for(var ind = 0; ind < course_list_global.length; ind ++)
           {
             if(course_list_global[ind][1] == value)
                option.text = course_list_global[ind][4] + ' ' + course_list_global[ind][2] + ' ' + course_list_global[ind][10];
           }
           x.add(option,value);
         }
    console.log(course_enrolled);
  });

  db.collection("message")
  .onSnapshot(function(querySnapshot) {
    var tempt = document.getElementById("message_info");
    tempt.innerHTML = '';
     querySnapshot.forEach(function(doc) {
           ref = doc.data();
               // if((course_enrolled.has(ref.course_id))&&(ref.course_id == $("#message_select").val()))
               // {
               //   var t =document.getElementById("message_info");
               //   var z = document.createElement('div');
               //   z.innerHTML = "Course ID : " + ref.course_id + "</br>" + "Message : " + ref.message + "</br>" + "From : " + ref.user_email + "</br>" + "Time :" + ref.time + "</br>" + "</br>";
               //   z.setAttribute("id","message" + count);
               //   t.appendChild(z);
               // }
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

function timeConverterMinute(timeString){
    if(!timeString instanceof String)
        throw new Error("Input is not string");
try{
    var time = timeString.split(":");
    var minutes = parseInt(time[0]) * 60 + parseInt(time[1]);
}
catch(e){
    console.log(e.message);
}
  return minutes
}

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
