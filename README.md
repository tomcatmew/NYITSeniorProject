function getCourseTest(info){
   var userRef = info.userInfo;

  document.getElementById("user-info").innerHTML = "User Info: </br>"+ "Name: " + userRef.name  + "</br>Email: " + userRef.email + "</br>UID: " + userRef.uid + "</br>";
  var count = 1;
  console.log(info.courses);

  for(let z of Object.keys(info.courses))
  {
    var ref = info.courses[z];
    document.getElementById("course" + count + "-info").innerHTML = "Courses Info: </br>"+ "("+ ref.course_id +  ") " + ref.department_code + " " + ref.course_number + " " + ref.course_title + " " + ref.location + " " + ref.room + " " + ref.term + " " + ref.time + "instructor: " + ref.instructor ;
    count++;
  }



# NYITSeniorProject
NYIT Senior Project - Web App

前端测试 ： https://delta-chess-735.firebaseapp.com/

后端测试 ： https://seniorproject-4f192.firebaseapp.com
