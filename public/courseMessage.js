var  courseMessageArray = [];
function courseArrayInfo2(){
  var coursesMessage = {
    MATH101_M01:{
     course_id: "1815",
     department_code: "MATH",
     course_number: "101",
     course_title: "Developmental Mathematics I/II",
     capmus: "Manhattan Campus",
     location: "26W",
     term: "Spring 2019",
     instructor: "Marcus Johnson",
     schedule: "26W 314 1 12:30 13:55 26W 314 3 12:30 13:55 26W 314 5 12:30 13:55"
   },
   MATH101_M01:{
    course_id: "1815",
    department_code: "MATH",
    course_number: "101",
    course_title: "Developmental Mathematics I/II",
    capmus: "Manhattan Campus",
    location: "26W",
    term: "Spring 2019",
    instructor: "Marcus Johnson",
    schedule: "26W 314 1 12:30 13:55 26W 314 3 12:30 13:55 26W 314 5 12:30 13:55"
  },
  MATH101_M01:{
   course_id: "1815",
   department_code: "MATH",
   course_number: "101",
   course_title: "Developmental Mathematics I/II",
   capmus: "Manhattan Campus",
   location: "26W",
   term: "Spring 2019",
   instructor: "Marcus Johnson",
   schedule: "26W 314 1 12:30 13:55 26W 314 3 12:30 13:55 26W 314 5 12:30 13:55"
 }
 };
   for(let i of Object.keys(coursesMessage)){
      courseMessageArray.push(coursesMessage[i]);
   }
   console.log("Course Array Test: ", courseMessageArray);

} //end courseArrayInfo2()


function coursesMessage(){
    var db = firebase.firestore();
    for(i = 0; i < courseMessageArray.length; i++){
      db.collection("message").add(courseMessageArray[i]).then(function() {
          console.log("User InfoDocument successfully written!");
      });
    }

}
