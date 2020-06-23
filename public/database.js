// function load() {
//   var mydata = JSON.parse(data);
//   return mydata[0].departmentCode + "&nbsp" +  mydata[0].courseNumber + "&nbsp" + mydata[0].courseTitle + "&nbsp" + mydata[0].term + "&nbsp" + mydata[0].location + "-----"+ mydata[0].time + mydata[0].credits + "<br /> Instructor:&nbsp" +  mydata[0].instructor ;
// }
var course_enrolled = new Set();
var global_count = 1;
var message_count = 0;
// var courseArray_2 = {};

function addMessageToDatable(email){
    var db = firebase.firestore();
    var message = document.getElementById("textbar");
    var anony = document.getElementById("a_Check");
    var ana_check = false;
    if (anony.checked == true)
        ana_check = true;
    var u_email = email;
    var d = new Date();
    var g = Date.now();
    var tempt_id = $("#message_select").val();
    var course_ss = $( "#message_select option:selected" ).text();
    let action = confirm("Send the Message ?");
    if(action == true){
        db.collection("user").doc(u_email).collection("account").doc("userInfo")
         .get().then(function(doc2) {
          var userRef = doc2.data();
          u_name = userRef.name;
          u_role = userRef.role;
          if(ana_check)
            u_name = "Anonymous Student";
          db.collection("message").add({
            user_name : u_name,
            user_email: u_email,
            course_id: tempt_id,
            message: message.value,
            time: g,
            course_short : course_ss,
            role : u_role
        })
        .then(function() {
          message.innerHTML = '';
            console.log("message successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        alert("You have successfully sent the message ");
        });
    }
    else
    {
      console.log("cancel course");
    }

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

// function addCourse(user){
//   var db = firebase.firestore();
//   db.collection("user").doc(user.email).collection("courses").add({
//     course_id: "1817",
//     department_code: "MATH",
//     course_number: "115",
//     course_title: "Introductory Concepts of Mathematics",
//     capmus: "Manhattan Campus",
//     location: "Guiliano Global Center",
//     term: "Spring 2019",
//     instructor: "Carol Bilsky_Bieniek",
//     schedule: "GGC 401 1 15:30 16:50 GGC 401 3 15:30 16:50"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });
// }


function addcoursefromdatabase(user_mail,input_campus,input_id,input_number,input_Ttitle,input_code,input_prof,input_locat,input_schedule,input_terms,input_room,input_section){
  var db = firebase.firestore();

  db.collection("user").doc(user_mail).collection("courses").doc(input_id).set({
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

function mess_note()
{
    var db = firebase.firestore();
    db.collection("message")
    .onSnapshot(function(querySnapshot) {
      var old_count = message_count;
      message_count = 0;
      querySnapshot.forEach(function(doc) {
          var ref = doc.data();
          for(let i of course_enrolled)
          {
            if(i == ref.course_id)
                message_count ++;
          }
      });
      console.log("old count :" + old_count);
      console.log("message_count" + message_count);
      if(message_count > old_count)
          {
            $(".red_notification").html("!");
            $(".red_notification").css("display", "block");
          }
    });
}


function getDatabaseCourseInfo(){
    var math_course = [];
    var csci_course = [];
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
            if(ref.department_code == "MATH"){
                math_course.push(list_transfer);
            }
            else {
               csci_course.push(list_transfer);
            }

            });
            console.log("courses Database: ", sortObject(csci_course));
            sortObject(csci_course);
            math_course.sort((a,b) => (a.course_number > b.course_number)? -1: 1);
            const finalCourseList = csci_course.concat(math_course);
            courseList(finalCourseList);
        });
}

function room_update_test(){
  var db = firebase.firestore();
  var room_data = {
    room: "821",
    location: "16W",
    book_list:[],
    status: "green"
  };

  db.collection("room").doc("b" + room_data["location"] + room_data["room"]).set(room_data).then(function() {
      console.log("Room Turn to Red");
  });

}

function sortObject(obj)
{
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]

	// sort items by value
	sortable.sort(function(a, b)
	{
	  return a[1]-b[1]; // compare numbers
	});


	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function message_update(){
  var db = firebase.firestore();

  var selectElement = document.getElementById("message_select");
  selectElement.addEventListener('change', message_listener);
}

function message_listener(){
    var db = firebase.firestore();
    var count  = 0;

    db.collection("message").orderBy("time", "desc")
    .onSnapshot(function(querySnapshot) {
      var tempt = document.getElementById("message_info");
      tempt.innerHTML = '';

       querySnapshot.forEach(function(doc) {
              var ref = doc.data();
              if((course_enrolled.has(ref.course_id))&&(ref.course_id == $("#message_select").val()))
              {
                let formated_time = new Date(ref.time);
                var t = document.getElementById("message_info");
                var z = document.createElement('div');

                var unm = document.createElement('div');
                unm.innerHTML = ref.user_name + ": "+ ref.message;
                unm.style.fontSize='25px';

                unm.style.fontFamily = 'Arial ';

                var ci = document.createElement('div');
                ci.innerHTML = "</br>" + "course : " + ref.course_short + "  ";
                ci.style.color = 'gray';
                ci.style.fontSize='15px';

                var pi = document.createElement('p3');
                if(ref.role == "professor")
                {
                  pi.innerHTML = "P";
                  pi.style.color = 'red';
                }
                  else if (ref.role == "student")
                  {
                    pi.innerHTML = "S";
                    pi.style.color = 'blue';
                  }

                pi.style.fontSize='18px';
                pi.style.border = "2px solid black";
                pi.style.padding = "1px";
                pi.style.width = "16px";
                // pi.style.height = "20px";

                var tm = document.createElement('div');
                tm.innerHTML = messageTimeFormat(formated_time) + "</br>"+"</br>"+ "<hr>";
                tm.style.color = 'gray';
                tm.style.fontSize='15px';
                tm.style.fontStyle="italic";

                  // z.innerHTML = "Course ID : " + ref.course_id + "</br>" + "Message : " + ref.message + "</br>" + "From : " + ref.user_email + "</br>" + "Time : " +  formated_time + "</br>" + "</br>";
                /*z.innerHTML = "Course ID : " + ref.course_id + "</br>" +user_name + " : "  + ref.message + "</br>" + "Time : " +  messageTimeFormat(formated_time) + "</br>" + "</br>"+"<hr>";*/

                ci.appendChild(pi);
                z.appendChild(ci);
                z.appendChild(unm);
                z.appendChild(tm);
                //Lin add

                z.setAttribute("id","message" + count);
                t.appendChild(z);
              }
             count++;
       });
   });
}


function delete_list(usermail)
{
  var db = firebase.firestore();

  db.collection("user").doc(usermail).collection("courses")
  .onSnapshot(function(querySnapshot) {
           var tt = document.getElementById("delete_select");
           tt.innerHTML = '';
           var opp = document.createElement("option");
           opp.text = "Select Course";
           tt.add(opp,0);
           course_enrolled.clear();
     querySnapshot.forEach(function(doc)  {
           ref_tempt = doc.data();
           course_enrolled.add(ref_tempt.course_id);
         });
         for(let value of course_enrolled)
         {
           var x = document.getElementById("delete_select");
           var option = document.createElement("option");
           option.value = value;
           for(var ind = 0; ind < course_list_global.length; ind ++)
           {
             if(course_list_global[ind][1] == value)
                option.text = course_list_global[ind][4] + ' ' + course_list_global[ind][2] + ' ' + course_list_global[ind][10];
           }
           x.add(option,value);
         }
  });
}

function room_des(id)
{
  var db = firebase.firestore();
  if (id != null)
    db.collection("room").doc(id).get().then(function(doc) {
      var userRef = doc.data();
      $("#classdes").html(userRef.book_list);
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
          document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>" + "Identity: " + userRef.role  + "</br>Email: " + userRef.email + "</br>";
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
             g.innerHTML = "Course Info " + global_count + ": </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>Location : ";
             for(var i = 0 ; i < ref.location.split(" ").length; i++)
             {
              if(i == ref.location.split(" ").length - 1)
                g.innerHTML += ref.location.split(" ")[i] + " " + ref.room.split(" ")[i];
              else
                g.innerHTML += ref.location.split(" ")[i] + " " + ref.room.split(" ")[i]  + ", ";
             }
             g.innerHTML += "</br>Schedule: " + scheduleFormat(ref.schedule) + "</br>" + "</br>";
             g.setAttribute("id", "Div" + global_count);
             x.appendChild(g);

             // $("#course1-info").html("Course Info: </br>"+ "Name: " + ref.department_code  + " " + ref.course_number + "</br>Schedule: " + ref.schedule + "</br>");
           global_count++;
       });
       // console.log("hhhhhhhh", courseDetail);
   });
}


// switch (tempt_list][1]) {
//     case 1:  the_montht = "January"; break;
//     case 2:  the_montht = "February"; break;
//     case 3:  the_montht = "March"; break;
//     case 4:  the_montht = "April"; break;
//     case 5:  the_montht = "May"; break;
//     case 6:  the_montht = "June"; break;
//     case 7:  the_montht = "July"; break;
//     case 8:  the_montht = "August"; break;
//     case 9:  the_montht = "September"; break;
//     case 10:  the_montht = "October"; break;
//     case 11:  the_montht = "November"; break;
//     case 12:  the_montht = "December"; break;
//     default: return "Error";
// }


function get_class_status(){
  var db = firebase.firestore();
  db.collection("room")
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var ref = doc.data();
      switch(ref.status)
      {
        case "red":
          var locate = 'b'  + ref.location +   ref.room;
          var x = document.getElementById(locate);
          if( x != null)
            x.style.fill = 'red';
          break;
        case "green":
          var locate = 'b'  + ref.location +  ref.room;
          var x = document.getElementById(locate);
          if( x != null)
              x.style.fill = 'green';
          break;
        case "yellow":
            var locate = 'b'  + ref.location +   ref.room;
            var x = document.getElementById(locate);
            if( x != null)
                x.style.fill = 'yellow';
        break;
       default:
          var locate = 'b'  + ref.location +   ref.room;
          var x = document.getElementById(locate);
          if( x != null)
              x.style.fill = 'green';
          break;
      }
    });
  });
}



function getUserCourseMessageRealTime(usermail){
  var db = firebase.firestore();
  var count = 1;
  // var course_enrolled = [];

  db.collection("user").doc(usermail).collection("courses")
  .onSnapshot(function(querySnapshot) {
           var tt = document.getElementById("message_select");
           tt.innerHTML = '';
           var opp = document.createElement("option");
           opp.text = "Select Course";
           tt.add(opp,0);
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
  });

 //  db.collection("message")
 //  .onSnapshot(function(querySnapshot) {
 //    var tempt = document.getElementById("message_info");
 //    tempt.innerHTML = '';
 //     querySnapshot.forEach(function(doc) {
 //           ref = doc.data();
 //           count++;
 //     });
 // });
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


function getDayName(dayNumber) {
    // 0 -> Sun, 1 -> Mon
    switch (dayNumber) {
        case 0:  dayName = "Sun"; break;
        case 1:  dayName = "Mon"; break;
        case 2:  dayName = "Tue"; break;
        case 3:  dayName = "Wed"; break;
        case 4:  dayName = "Thu"; break;
        case 5:  dayName = "Fri"; break;
        case 6:  dayName = "Sat"; break;
        default: return "Error";
    }
     return dayName;
}

function scheduleFormat(schedule){
    //from: 16W 723 1 9:30 10:50 16W 723 2 9:30 10:50
    //to: 16W Room723 Mon 9:30-10:50,16W Room723 Tue 9:30-10:50.
    const sa = schedule.split(" ");
    const loopTime = sa.length / 3;
    let i = 0;
    let dayIndex = 0;
    let fpos = 1;
    let dpos = 2;
    let tempString = "";
    while(i < loopTime){
        tempString += `${getDayName(parseInt(sa[dayIndex]))} ${sa[fpos]}-${sa[dpos]},`;
        i++;
        fpos += 3;
        dpos += 3;
        dayIndex += 3;
    }
    const finalString = tempString.replace(/.$/,".");
    return finalString;
}

function check_if_book()
{
  var db = firebase.firestore();
  db.collection("room").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
  room_info  = ref.location + ref.room
  ref = doc.data();
  book_string = ref.book;
  // ref.status = "green";
  if(book_string != " ")
  {
        lista = book_string.split(" ");
        for(var i = 0; i < lista.length; i++)
        {
          var tempt_list = lista[i].split(",");
          var c_month = tempt_list[1];
          var c_date = tempt_list[0];
          var book_start_time;
          var book_end_time;

          var today = new Date();
          var the_date = today.getDate();
          var the_month = today.getMonth() + 1;

          switch (tempt_list[2]) {
              case '0':
                      book_start_time = 9*60;
                      book_end_time = 11*60;
                      break;
              case '1':
                      book_start_time = 11*60;
                      book_end_time = 13*60;
                      break;
              case '2':
                      book_start_time = 13*60;
                      book_end_time = 15*60;
                      break;
              case '3':
                      book_start_time = 15*60;
                      book_end_time = 17*60;
                      break;
              default: return "Error";
          }
          var z = today.getHours();
          var n = today.getMinutes();
          var current_min = z*60 + n;

          console.log("=================================================================================");
          console.log("current minutes: " + current_min);
          console.log("start minutes: " + book_start_time);
          console.log("end minutes: " + book_end_time);
          console.log("current date: " + the_date);
          console.log("current  month: " + the_month);
          console.log("book date: " + c_date);
          console.log("book month: " + c_month);
          if((the_date == c_date)&&(the_month == c_month))
          {
            if((book_start_time <= current_min)&&(current_min <= book_end_time))
            {
              if(ref.status != "red")
                  db.collection("room").doc("b" + ref.location + ref.room).update({
                      "book_list" : room_info + " room is Reserved",
                      "status": "yellow"
                  });
            }
            else
            {
              if(ref.status == "yellow")
              db.collection("room").doc("b" + ref.location + ref.room).update({
                  "book" : " ",
                  "book_list" : room_info + " room is free",
                  "status": "green"
              });
            }
          }

        }
   }
   });
  });
}

function check_time2(){
  var db = firebase.firestore();
  db.collection("courseDatabase").get().then(function(querySnapshot) {
    var courseArray_2 = {};
    querySnapshot.forEach(function(doc) {
      var ref = doc.data();
      courseArray_2[ref.department_code + ref.course_number + ref.section] =
      {
            course_id: ref.course_id,
            department_code: ref.department_code,
            course_number: ref.course_number,
            section:ref.section,
            course_title: ref.course_title,
            capmus: ref.capmus,
            location: ref.location,
            room: ref.room,
            term: ref.term,
            instructor: ref.instructor,
            schedule: ref.schedule
      }
      });

  var d = new Date();
  var z = d.getHours();
  var n = d.getMinutes();
  var day = d.getDay();
  var current_min = z*60 + n;
  console.log("courseArray2 is ");
  console.log(courseArray_2);
  var count = 0;
  for(let i of Object.keys(courseArray_2))
  {
      var same_c_check = true;
      var check_length = courseArray_2[i]["schedule"].split(" ").length;
      var real_leng = check_length/3;
      // console.log("real_leng : " + real_leng);
      for(var j = 0 ; j < real_leng; j++)
      {
        if(same_c_check == false)
          break;
        // console.log("count : " + count);
        count++;
          var tempt_room  = courseArray_2[i]["room"].split(" ")[j];
          var tempt_location  = courseArray_2[i]["location"].split(" ")[j];
          var c_day = courseArray_2[i]["schedule"].split(" ")[j*3];
          var tempt1 = courseArray_2[i]["schedule"].split(" ")[j*3 + 1];
          var tempt2 = courseArray_2[i]["schedule"].split(" ")[j*3 + 2];
          var start_time = timeConverterMinute(tempt1);
          var end_time = timeConverterMinute(tempt2);
          // console.log(courseArray_2[i]["department_code"] + " " + courseArray_2[i]["course_number"]);
          // console.log(start_time);
          // console.log(current_min);
          // console.log(end_time);
          // console.log("=============");
            if((c_day == day)&&(start_time < current_min)&&(current_min < end_time))
            {
              console.log(courseArray_2[i]["department_code"] + " " + courseArray_2[i]["course_number"] + "is in class");
                db.collection("room").doc("b" + courseArray_2[i]["location"].split(" ")[j] + courseArray_2[i]["room"].split(" ")[j]).update({
                    "book_list" : courseArray_2[i]["department_code"] + " " + courseArray_2[i]["course_number"] + " " + courseArray_2[i]["section"] + " is in class",
                    "in_course_id" : courseArray_2[i]["course_id"],
                    "status": "red"
                });
              same_c_check = false;
              break;
            }
            else
            {
                if(same_c_check){
                  // .onSnapshot(function(doc) {
                  // .doc("b" + courseArray_2[i]["location"].split(" ")[j] + courseArray_2[i]["room"].split(" ")[j])
                    db.collection("room").where("in_course_id", "==", courseArray_2[i]["course_id"]).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                           var userRef = doc.data();
                           if(userRef.status == "red")
                           {
                                    console.log("Class is Over : "+ userRef.location + userRef.room);
                                     db.collection("room").doc("b" + userRef.location + userRef.room).update({
                                         "book_list" : userRef.location + userRef.room + " room is free",
                                         "in_course_id" : "0",
                                         "status": "green"
                                     });
                           }
                      });
                  });
              }
            }
            // if(j = real_leng - 1)
            //   same_c_check = true;
       }
    }
    });
}

// function check_if_in_class(){
//
//
//   var db = firebase.firestore();
//   db.collection("courseDatabase").where("course_number", ">=", "100")
//   .onSnapshot(function(querySnapshot) {
//     var list_transfer_2 = {};
//     querySnapshot.forEach(function(doc) {
//       var ref = doc.data();
//       list_transfer_2[ref.department_code + ref.course_number]=
//       {
//             course_id: ref.course_id,
//             department_code: ref.department_code,
//             course_number: ref.course_number,
//             section:ref.section,
//             course_title: ref.course_title,
//             capmus: ref.capmus,
//             location: ref.location,
//             room: ref.room,
//             term: ref.term,
//             instructor: ref.instructor,
//             schedule: ref.schedule
//       }
//       });
//
//       var d = new Date();
//       var z = d.getHours();
//       var n = d.getMinutes();
//       var current_min = z*60 + n;
//
//       for(var i = 0; i < list_transfer_2.length; i++)
//       {
//           var check_length = list_transfer_2[i][7].split(" ").length;
//           real_leng = check_length/3;
//           for(var j = 0 ; j < real_leng; j++)
//           {
//           var tempt1 = list_transfer_2[i][7].split(" ")[j*3 + 1];
//           var tempt2 = list_transfer_2[i][7].split(" ")[j*3 + 2];
//           var start_time = timeConverterMinute(tempt1);
//           var end_time = timeConverterMinute(tempt2);
//             if((start_time < current_min)&&(current_min < end_time))
//             {
//               console.log("Time is in between :");
//               console.log(start_time);
//               console.log(current_min);
//               console.log(end_time);
//
//             }
//           }
//       }
//     });
//
// }

function book_check_class(time_area,day){
  var db = firebase.firestore();
  // var d = new Date();
  var unable_book_list = [];
  var book_start_time;
  var book_end_time;

  switch (time_area) {
      case '0':
              book_start_time = 9*60;
              book_end_time = 11*60;
              break;
      case '1':
              book_start_time = 11*60;
              book_end_time = 13*60;
              break;
      case '2':
              book_start_time = 13*60;
              book_end_time = 14*60;
              break;
      case '3':
              book_start_time = 15*60;
              book_end_time = 17*60;
              break;
      default: return "Error";
  }


  for(let i of Object.keys(courseArray_3))
  {
      var check_length = courseArray_3[i]["schedule"].split(" ").length;
      var real_leng = check_length/3;
      for(var j = 0 ; j < real_leng; j++)
      {
      var tempt_room  = courseArray_3[i]["room"].split(" ")[j];
      var tempt_location  = courseArray_3[i]["location"].split(" ")[j];
      var c_day = courseArray_3[i]["schedule"].split(" ")[j*3];
      var tempt1 = courseArray_3[i]["schedule"].split(" ")[j*3 + 1];
      var tempt2 = courseArray_3[i]["schedule"].split(" ")[j*3 + 2];
      var start_time = timeConverterMinute(tempt1);
      var end_time = timeConverterMinute(tempt2);

            if(c_day == day)
            {
                  if((start_time <= book_start_time)&&(book_start_time <= end_time))
                  {
                    unable_book_list.push(tempt_location+tempt_room);
                  }
                  else if ((end_time <= book_end_time)&&(book_end_time <= end_time))
                    unable_book_list.push(tempt_location+tempt_room);
            }
       }
  }

  return unable_book_list;
}





var courseArray_3 = {
  MATH101_M01:{
  course_id: "1815",
  department_code: "MATH",
  course_number: "101",
  section:"M01",
  course_title: "Developmental Mathematics I/II",
  capmus: "Manhattan Campus",
  location: "26W 26W 26W",
  room: "314 314 314",
  term: "Spring 2019",
  instructor: "Marcus Johnson",
  schedule: "1 17:30 20:50 3 12:30 13:55 5 12:30 13:55"
},
MATH115_M01:{
  course_id: "1817",
  department_code: "MATH",
  course_number: "115",
  section:"M01",
  course_title: "Introductory Concepts of Mathematics",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room:"401 401",
  term: "Spring 2019",
  instructor: "Carol Bilsky_Bieniek",
  schedule: "1 14:30 16:50 3 15:30 16:50"
},

MATH125_M01:{
  course_id: "1818",
  department_code: "MATH",
  course_number: "125",
  section:"M01",
  course_title: "Finite Mathematics",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Xiaoyan Yang",
  schedule: "2 9:30 10:50 4 9:30 10:50"
},

MATH135_M01:{
  course_id: "2568",
  department_code: "MATH",
  course_number: "135",
  section:"M01",
  course_title: "Fundamentals of Precalculus I",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Owen Johnson",
  schedule: "2 17:30 19:45 4 17:30 19:45"
},

MATH136_M01:{
  course_id: "2569",
  department_code: "MATH",
  course_number: "136",
  section:"M01",
  course_title: "Fundamentals of Precalculus II",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "723 723",
  term: "Spring 2019",
  instructor: "John Gordon",
  schedule: "1 15:30 17:45 3 15:30 17:45"
},

MATH136_M02:{
  course_id: "2688",
  department_code: "MATH",
  course_number: "136",
  section:"M02",
  course_title: "Fundamentals of Precalculus II",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "721 721",
  term: "Spring 2019",
  instructor: "Carol Bilsky-Bieniek",
  schedule: "1 11:00 12:20 3 11:00 12:20"
},
MATH136_M03:{
  course_id: "2689",
  department_code: "MATH",
  course_number: "136",
  section:"M03",
  course_title: "Fundamentals of Precalculus II",
  capmus: "Manhattan Campus",
  location: "16W 26W",
  room: "822 11",
  term: "Spring 2019",
  instructor: "Chatur Advani",
  schedule: "1 9:30 10:50 3 9:30 10:50"
},

MATH141_M01:{
  course_id: "1819",
  department_code: "MATH",
  course_number: "141",
  section:"M01",
  course_title: "Precalculus",
  capmus: "Manhattan Campus",
  location: "26W 16W",
  room: "11 822",
  term: "Spring 2019",
  instructor: "Laihan Luo",
  schedule: "1 10:55 12:25 4 9:30 10:50"
},

MATH141_M02:{
  course_id: "1820",
  department_code: "MATH",
  course_number: "141",
  section:"M02",
  course_title: "Precalculus",
  capmus: "Manhattan Campus",
  location: "26W 16W",
  room: "312 723",
  term: "Spring 2019",
  instructor: "Julius Chini",
  schedule: "2 14:00 15:30 4 14:00 15:30"
},

MATH151_M01:{
  course_id: "1821",
  department_code: "MATH",
  course_number: "151",
  section:"M01",
  course_title: "Fundamentals of Calculus",
  capmus: "Manhattan Campus",
  location: "GGC 16W",
  room: "409 821",
  term: "Spring 2019",
  instructor: "John Gordon",
  schedule: "1 14:00 15:20 3 14:00 15:20"
},

MATH151_M02:{
  course_id: "1822",
  department_code: "MATH",
  course_number: "151",
  section:"M02",
  course_title: "Fundamentals of Calculus",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "723",
  term: "Spring 2019",
  instructor: "Theodore Preston",
  schedule: "4 17:30 20:10"
},

MATH161_M01:{
  course_id: "1823",
  department_code: "MATH",
  course_number: "161",
  section:"M01",
  course_title: "Basic Applied Calculus",
  capmus: "Manhattan Campus",
  location: "GGC 16W",
  room: "409 821",
  term: "Spring 2019",
  instructor: "John Gordon",
  schedule: "1 14:00 15:20 4 14:00 15:20"
},

MATH161_M02:{
  course_id: "1824",
  department_code: "MATH",
  course_number: "161",
  section:"M02",
  course_title: "Basic Applied Calculus",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "723",
  term: "Spring 2019",
  instructor: "John Gordon",
  schedule: "3 17:30 20:10"
},

MATH171_M01:{
  course_id: "1825",
  department_code: "MATH",
  course_number: "171",
  section:"M01",
  course_title: "Calculus I",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "401 401",
  term: "Spring 2019",
  instructor: "Taposh Gayen",
  schedule: "2 14:00 16:30 4 14:00 16:30"
},

MATH171_M02:{
  course_id: "1826",
  department_code: "MATH",
  course_number: "171",
  section:"M02",
  course_title: "Calculus I",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "721 822",
  term: "Spring 2019",
  instructor: "Julius Chini",
  schedule: "1 14:00 16:30 3 14:00 16:30"
},

MATH171_M03:{
  course_id: "1827",
  department_code: "MATH",
  course_number: "171",
  section:"M03",
  course_title: "Calculus I",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "405 405",
  term: "Spring 2019",
  instructor: "Laihan Luo",
  schedule: "1 17:30 19:45 3 17:30 19:45"
},

MATH180_M01:{
  course_id: "1828",
  department_code: "MATH",
  course_number: "180",
  section:"M01",
  course_title: "Calculus II",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 11",
  term: "Spring 2019",
  instructor: "Changiz Alizadeh",
  schedule: "1 14:00 16:30 3 14:00 16:30"
},

MATH180_M02:{
  course_id: "1829",
  department_code: "MATH",
  course_number: "180",
  section:"M02",
  course_title: "Calculus II",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "207 313",
  term: "Spring 2019",
  instructor: "Klara Lagrance",
  schedule: "2 17:30 19:45 4 17:30 19:45"
},

MATH180_M03:{
  course_id: "2686",
  department_code: "MATH",
  course_number: "180",
  section:"M03",
  course_title: "Calculus II",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "820 721",
  term: "Spring 2019",
  instructor: "Vitaly Katsnelson",
  schedule: "1 14:00 16:30 3 14:00 16:30"
},

MATH180_M04:{
  course_id: "2687",
  department_code: "MATH",
  course_number: "180",
  section:"M04",
  course_title: "Calculus II",
  capmus: "Manhattan Campus",
  location: "GGC 16W",
  room: "405 722",
  term: "Spring 2019",
  instructor: "Robert Bell",
  schedule: "2 14:00 16:30 4 14:00 16:30"
},

MATH235_M01:{
  course_id: "2317",
  department_code: "MATH",
  course_number: "235",
  section:"M01",
  course_title: "Applied Statistics",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "409 409",
  term: "Spring 2019",
  instructor: "Owen Johnson",
  schedule: "1 15:30 16:50 3 15:30 16:50"
},

MATH260_M01:{
  course_id: "1830",
  department_code: "MATH",
  course_number: "260",
  section:"M01",
  course_title: "Calculus III",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Robert Bell",
  schedule: "1 9:00 10:50 3 9:00 10:50"
},

MATH260_M02:{
  course_id: "3489",
  department_code: "MATH",
  course_number: "180",
  section:"M02",
  course_title: "Calculus III",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Robert Bell",
  schedule: "1 9:00 10:50 3 9:00 10:50"
},

MATH310_M01:{
  course_id: "1831",
  department_code: "MATH",
  course_number: "310",
  section:"M01",
  course_title: "Linear Algebra",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Changiz Alizadeh",
  schedule: "1 9:00 10:50 3 9:00 10:50"
},

MATH310_M02:{
  course_id: "2434",
  department_code: "MATH",
  course_number: "310",
  section:"M02",
  course_title: "Linear Algebra",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "820 820",
  term: "Spring 2019",
  instructor: "Vitaly Katsnelson",
  schedule: "1 12:30 13:50 3 12:30 13:50"
},

MATH320_M01:{
  course_id: "1832",
  department_code: "MATH",
  course_number: "320",
  section:"M01",
  course_title: "Differential Equations",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "821 721",
  term: "Spring 2019",
  instructor: "Robert Bell",
  schedule: "1 12:30 13:50 3 12:30 13:50"
},

MATH350_M01:{
  course_id: "3488",
  department_code: "MATH",
  course_number: "350",
  section:"M01",
  course_title: "Advanced Calculus",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "702 702",
  term: "Spring 2019",
  instructor: "Ranja Roy",
  schedule: "1 15:30 16:50 3 15:30 16:50"
},


 CSCI125_M01:{
  course_id: "1884",
  department_code: "CSCI",
  course_number: "125",
  section:"M01",
  course_title: "Computer Programming I",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "601 601",
  term: "Spring 2019",
  instructor: "Felix Fischman",
  schedule: "2 14:00 16:20 4 14:00 15:20"
},


CSCI125_M03:{
  course_id: "1886",
  department_code: "CSCI",
  course_number: "125",
  section:"M03",
  course_title: "Computer Programming I",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "601",
  term: "Spring 2019",
  instructor: "Michael Kadri",
  schedule: "2 17:30 19:10"
},

CSCI125_M05:{
  course_id: "2253",
  department_code: "CSCI",
  course_number: "125",
  section:"M05",
  course_title: "Computer Programming I",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "601",
  term: "Spring 2019",
  instructor: "Felix Fischman",
  schedule: "5 17:30 21:10"
},

CSCI125_M07:{
  course_id: "2743",
  department_code: "CSCI",
  course_number: "125",
  section:"M07",
  course_title: "Computer Programming I",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "601 601",
  term: "Spring 2019",
  instructor: "Hakan Pekcan",
  schedule: "1 14:00 16:50 3 15:30 16:50"
},

CSCI130_M01:{
  course_id: "3660",
  department_code: "CSCI",
  course_number: "130",
  section:"M01",
  course_title: "Computer Organization",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "723",
  term: "Spring 2019",
  instructor: "Simon Ben-Avi",
  schedule: "5 5:30 8:10"
},
CSCI130_M02:{
  course_id: "3669",
  department_code: "CSCI",
  course_number: "130",
  section:"M02",
  course_title: "Computer Organization",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "11 11",
  term: "Spring 2019",
  instructor: "Nabi Sertac Artan",
  schedule: "2 15:30 16:50 4 15:30 16:50"
},
CSCI130_M03:{
  course_id: "3670",
  department_code: "CSCI",
  course_number: "130",
  section:"M03",
  course_title: "Computer Organization",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "405 405",
  term: "Spring 2019",
  instructor: "Steven Billis",
  schedule: "1 14:00 15:20 3 14:00 15:20"
},

CSCI135_M01:{
  course_id: "2871",
  department_code: "CSCI",
  course_number: "135",
  section:"M01",
  course_title: "Digital Logic Design Fundamentals ",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "723",
  term: "Spring 2019",
  instructor: "Simon Ben-Avi",
  schedule: "5 17:30 20:10"
},
CSCI135_M02:{
  course_id: "3671",
  department_code: "CSCI",
  course_number: "135",
  section:"M02",
  course_title: "Digital Logic Design Fundamentals ",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "11 11",
  term: "Spring 2019",
  instructor: "Nabi Sertac Artan",
  schedule: "2 15:30 16:50 4 15:30 16:50"
},
CSCI135_M03:{
  course_id: "3672",
  department_code: "CSCI",
  course_number: "135",
  section:"M03",
  course_title: "Digital Logic Design Fundamentals ",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "606 606",
  term: "Spring 2019",
  instructor: "Nabi Sertac Artan",
  schedule: "1 14:00 15:20 3 14:00 15:20"
},
CSCI155_M01:{
  course_id: "2454",
  department_code: "CSCI",
  course_number: "155",
  section:"M01",
  course_title: "Computer Organization and Architecture",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "822",
  term: "Spring 2019",
  instructor: "Maharshi Shah",
  schedule: "4 17:30 21:10"
},
CSCI155_M03:{
  course_id: "1888",
  department_code: "CSCI",
  course_number: "155",
  section:"M03",
  course_title: "Computer Organization and Architecture",
  capmus: "Manhattan Campus",
  location: "26W",
  room: "312",
  term: "Spring 2019",
  instructor: "Simon Ben-Avi",
  schedule: "2 17:30 20:10"
},
CSCI155_M05:{
  course_id: "2752",
  department_code: "CSCI",
  course_number: "155",
  section:"M05",
  course_title: "Computer Organization and Architecture",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "312 312",
  term: "Spring 2019",
  instructor: "Simon Ben-Avi",
  schedule: "2 15:30 16:50 4 15:30 16:50"
},
CSCI185_M03:{
  course_id: "1892",
  department_code: "CSCI",
  course_number: "185",
  section:"M03",
  course_title: "Computer Programming II",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "312",
  term: "Spring 2019",
  instructor: "Michael Kadri",
  schedule: "1 17:30 21:10"
},


CSCI185_M05:{
  course_id: "2755",
  department_code: "CSCI",
  course_number: "185",
  section:"M05",
  course_title: "Computer Programming II",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "601 601",
  term: "Spring 2019",
  instructor: "Wenjia Li",
  schedule: "2 9:00 10:50 4 9:00 10:50"
},

CSCI235_M01:{
  course_id: "1893",
  department_code: "CSCI",
  course_number: "235",
  section:"M01",
  course_title: "Computer Programming II",
  capmus: "Manhattan Campus",
  location: "26W",
  room: "11",
  term: "Spring 2019",
  instructor: "Felix Fischman",
  schedule: "2 17:30 20:10"
},

CSCI235_M03:{
  course_id: "2759",
  department_code: "CSCI",
  course_number: "235",
  section:"M03",
  course_title: "Computer Programming II",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "723 723",
  term: "Spring 2019",
  instructor: "Susan Gass",
  schedule: "1 9:30 10:50 2 9:30 10:50"
},

CSCI445_M02:{
  course_id: "2449",
  department_code: "CSCI",
  course_number: "445",
  section:"M02",
  course_title: "Operating System Security",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "820",
  term: "Spring 2019",
  instructor: "Li",
  schedule: "5 09:30 12:10"
},


CSCI436_M01:{
  course_id: "2827",
  department_code: "CSCI",
  course_number: "436",
  section:"M01",
  course_title: "Big Data Management & Analytics ",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "723",
  term: "Spring 2019",
  instructor: "Qian Wang",
  schedule: "2 17:45 20:25"
},

CSCI415_M01:{
  course_id: "1907",
  department_code: "CSCI",
  course_number: "415",
  section:"M01",
  course_title: " Introduction to Data Mining",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "723 723",
  term: "Spring 2019",
  instructor: " Huanying Gu",
  schedule: "1 12:30 13:50 3 12:30 13:50"
},

CSCI405_M01:{
  course_id: "1991",
  department_code: "CSCI",
  course_number: "405",
  section:"M01",
  course_title: "Distributed Database Systems",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "821",
  term: "Spring 2019",
  instructor: "Sandra Kopecky",
  schedule: "5 17:30 20:10"
},

CSCI380_M01D:{
  course_id: "1906",
  department_code: "CSCI",
  course_number: "380",
  section:"M01D",
  course_title: "Introduction to Software Engineering",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "702 702",
  term: "Spring 2019",
  instructor: " Maherukh Akhtar",
  schedule: "1 12:30 13:50 3 12:30 13:50"
},



CSCI362_M01D:{
  course_id: "2242",
  department_code: "CSCI",
  course_number: "362",
  section:"M01D",
  course_title: "Information System Security Engineering and Administration",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "820",
  term: "Spring 2019",
  instructor: " Michael Nizich",
  schedule: "2 20:35 23:15"
},

CSCI357_M01:{
  course_id: "2188",
  department_code: "CSCI",
  course_number: "357",
  section:"M01",
  course_title: "Cisco Academy Level I",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "601",
  term: "Spring 2019",
  instructor: "Michael Silva ",
  schedule: "1 14:00 16:50"
},

CSCI355_M01:{
  course_id: "1905",
  department_code: "CSCI",
  course_number: "355",
  section:"M01",
  course_title: "Artificial Intelligence I",
  capmus: "Manhattan Campus",
  location: "26W",
  room: "301",
  term: "Spring 2019",
  instructor: " Altion Simo",
  schedule: "3 20:20 23:00"
},



CSCI345_M01:{
  course_id: "1904",
  department_code: "CSCI",
  course_number: "345",
  section:"M01",
  course_title: "Computer Networks",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "721",
  term: "Spring 2019",
  instructor: "Anand Santhanakrishnan",
  schedule: "3 17:30 20:10"
},

CSCI345_M02:{
  course_id: "3753",
  department_code: "CSCI",
  course_number: "345",
  section:"M02",
  course_title: "Computer Networks",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "821",
  term: "Spring 2019",
  instructor: "Damon Bruccoleri",
  schedule: "1 17:30 20:10"
},


CSCI335_M01:{
  course_id: "1903",
  department_code: "CSCI",
  course_number: "335",
  section:"M01",
  course_title: "Design and Analysis of Algorithms",
  capmus: "Manhattan Campus",
  location: "GGC",
  room: "406",
  term: "Spring 2019",
  instructor: "Herbert Taylor",
  schedule: "1 17:45 20:25"
},


CSCI330_M01:{
  course_id: "1901",
  department_code: "CSCI",
  course_number: "330",
  section:"M01",
  course_title: "Operating Systems ",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "822",
  term: "Spring 2019",
  instructor: "Susan Gass",
  schedule: "1 17:30 20:10"
},

CSCI330_M03:{
  course_id: "2764",
  department_code: "CSCI",
  course_number: "330",
  section:"M03",
  course_title: "Operating Systems",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "407 407",
  term: "Spring 2019",
  instructor: "Susan Gass",
  schedule: "2 15:30 16:50 4 15:30 16:50"
},
CSCI318_M01:{
  course_id: "1900",
  department_code: "CSCI",
  course_number: "318",
  section:"M01",
  course_title: "Programming Language Concepts",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "404 404",
  term: "Spring 2019",
  instructor: " Wenjia Li",
  schedule: "2 14:00 15:20 4 14:00 15:20"
},
CSCI312_M01:{
  course_id: "1899",
  department_code: "CSCI",
  course_number: "312",
  section:"M01",
  course_title: "Theory of Computation ",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "721 721",
  term: "Spring 2019",
  instructor: "Paolo Gasti",
  schedule: "2 11:00 12:20 4 11:00 12:20"
},

CSCI300_M01:{
  course_id: "1898",
  department_code: "CSCI",
  course_number: "300",
  section:"M01",
  course_title: "Database Management",
  capmus: "Manhattan Campus",
  location: "26W 26W",
  room: "313 313",
  term: "Spring 2019",
  instructor: "Houwei Cao",
  schedule: "2 14:00 15:20 4 14:00 15:20"
},

CSCI300_M02:{
  course_id: "2969",
  department_code: "CSCI",
  course_number: "300",
  section:"M02",
  course_title: "Database Management",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "623",
  term: "Spring 2019",
  instructor: " Felix Fischman",
  schedule: "2 17:30 20:10"
},
CSCI270_M01:{
  course_id: "1897",
  department_code: "CSCI",
  course_number: "270",
  section:"M01",
  course_title: "Probability and Statistics for Computer",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room:"722 722",
  term: "Spring 2019",
  instructor: "Herbert Taylor",
  schedule: "1 15:30 16:50 3 15:30 16:50"
},
CSCI260_M01:{
  course_id: "1895",
  department_code: "CSCI",
  course_number: "260",
  section:"M01",
  course_title: " Data Structures",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "723 723",
  term: "Spring 2019",
  instructor: "Huanying Gu",
  schedule: "1 14:00 15:20 3 14:00 15:20"
},
CSCI260_M03:{
  course_id: "2447",
  department_code: "CSCI",
  course_number: "260",
  section:"M03",
  course_title: " Data Structures",
  capmus: "Manhattan Campus",
  location: "16W",
  room: "820",
  term: "Spring 2019",
  instructor: "Altion Simo",
  schedule: "3 17:30 20:10"
}
};
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
