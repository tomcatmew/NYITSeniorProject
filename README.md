# https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
# &#x1F534;Database Format&#x1F534;



```
CSCI445_M02:{ 
        course_id: "2449",
        department_code: "CSCI",
        course_number: "445",
        section:"M01",  //MUST CONTAIN SECTION
        course_title: "Operating System Security",
        capmus: "Manhattan Campus",
        location: "16W",  // 16W  NOT 16w , no space at the end
        room: "624",
        term: "Spring 2019",
        instructor: "Li",
        time: "5 09:30 12:10"  //1 space only, !16W
      },
CSCI380_M01D:{ 
        course_id: "1906",
        department_code: "CSCI",
        course_number: "380",
        section:"M01D", //missing comma
        course_title: "Introduction to Software Engineering",
        capmus: "Manhattan Campus",
        location: "GGC,", //GGC NOT ggc
        room: "702 702",
        term: "Spring 2019",
        instructor: " Maherukh Akhtar",
        time: "1 12:30 13:50 3 12:30 13:50"
      }
```

# ======================================>

# Day in number to date string 0 -> Sunday, 1 -> Monday
```
function getDayName(dateString) {
     //12/07/2016
    let dayName;
    let date = new Date(dateString);
    let dayNumber = date.getDay();
    switch (dayNumber) {
        case 0:  dayName = "Sunday"; break;
        case 1:  dayName = "Monday"; break;
        case 2:  dayName = "Tuesday"; break;
        case 3:  dayName = "Wednesday"; break;
        case 4:  dayName = "Thursday"; break;
        case 5:  dayName = "Friday"; break;
        case 6:  dayName = "Saturday"; break;
        default: return "Error";
    }
     return dayName;

```

#  Add Course Alert

main.js
```
function course_add(){
  var tempt = document.getElementById("course_select");
  var tempt_value = tempt.value;
  var tempt_text = tempt.options[tempt_value].text;
  var db = firebase.firestore();

  db.collection('user').doc(current_user_email).collection('courses').get().then(snap => {
  if(snap.size < 6) // will return the collection size
  {
    let action = confirm("Do you really want to add " + tempt_text);
    if(action == true){
      addcoursefromdatabase(current_user_email,course_list_global[tempt_value][0],course_list_global[tempt_value][1],course_list_global[tempt_value][2],course_list_global[tempt_value][3],course_list_global[tempt_value][4],course_list_global[tempt_value][5],course_list_global[tempt_value][6],course_list_global[tempt_value][7],course_list_global[tempt_value][8]);
      alert("You have successfully added " + tempt_text);
    }else{
      console.log("cancel course");
    }
  }
  else{
    alert("More than 6 courses are not allowed. ");
  }

});


}//end course_add()

```

# Course Conflict
top add global: var userAddcourses = new Set();
```
function timeConflict(current_user_email,selectedValue){
  var db = firebase.firestore();

 db.collection("user").doc(current_user_email).collection("courses")
 .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
          let ref = doc.data();
          userAddcourses.add(`${ref.department_code} ${ref.course_number}`);
        });
        console.log(userAddcourses);
 });

 console.log(userAddcourses);
 if(userAddcourses.has(`${department_code} ${ref.course_number}`) == selectedValue ){
   alert(`Conflict Course Found!!! --> ${department_code}${ref.course_number}`);
 }else{
   alert("Successfully Added Course");
 }

}


```
# DELETE COURSE

In main.html manually input course id:           deleteCourse(user,'1817');
```
function deleteCourse(current_user_email,course_id){
  var db = firebase.firestore();
    db.collection("user").doc(current_user_email).collection('courses').where("course_id", "==", course_id)
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
           doc.ref.delete();
          });
          console.log("DELETE course Id :  " +  course_id  );
      });
}
```

# SET

```
最上面的： var course_enrolled = new Set();

main.html  line 2410 :  if((course_enrolled.has(ref.course_id))&&(ref.course_id == $("#message_select").val()))

function getUserCourseMessageRealTime(usermail){
  var db = firebase.firestore();
  var count = 1;

  // var course_enrolled = [];

  db.collection("user").doc(usermail).collection("courses")
  .onSnapshot(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
           ref_tempt = doc.data();
           if(!course_enrolled.has(ref_tempt.course_id))
           course_enrolled.add(ref_tempt.course_id);
         });
         for(let value of course_enrolled)
         {
           var x = document.getElementById("message_select");
           var option = document.createElement("option");
           option.value = value
           option.text = value;
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
           if((course_enrolled.has(ref.course_id))&&(ref.course_id == $("#message_select").val()))
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


```

# Disable Account Chooser
```
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
        signInSuccessUrl: 'loggedIn.html',

```

# authentication.js   ->user logout

```
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch(function(error) {
    // An error happened.
  });
}
```

      
#=================================================================================          
      
      

# NYITSeniorProject
NYIT Senior Project - Web App

前端测试 ： https://delta-chess-735.firebaseapp.com/

后端测试 ： https://seniorproject-4f192.firebaseapp.com
