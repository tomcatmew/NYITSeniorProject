# push notification
```
after add message:
  $(".red_notification").html("1");

inside style.css:
 .red_notification {
	background-color: #fa3e3e;
	border-radius: 2px;
	color: white;
	padding: 1px 3px;
	font-size: 15px;
	position: absolute;
	top: 0;
	right: 0;
}
main.js line 3152:      
<a href="#" class="projects2" v-on:click="makeActive('projects2')">Message<span class = "red_notification">0</span></a>
```
# Delete Course Update - confirm box
```
function delete_course(current_user_email){


  var course_id = $("#delete_select").val();
  var db = firebase.firestore();
  db.collection("user").doc(current_user_email).collection('courses').where("course_id", "==", course_id)
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
            const dep = doc.data().department_code;
            const cn = doc.data().course_number;
            const sn = doc.data().section;

            const action = confirm("Do you really want to delete " + dep+cn + " " + sn);
            if(action){
              doc.ref.delete();
                alert("You have successfully deleted " + dep+cn + " " + sn);
                      console.log("DELETE course Id :  " +  course_id  );
            }else{
              //do nothing!!!
            }

        });

    });
}
```


```
    var delay = ( function() {
      var timer = 0;
      return function(callback, ms) {
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
      };
  })();

    getDatabaseCourseInfo();

    console.log("before Delay:");
    check_if_in_class();

    delay(function(){
        console.log("after Delay:");
        window.setInterval(function(){
  /// call your function here
        check_if_in_class();
}, 5000);


  }, 1000 ); // end delay



```

# database.js  
```
sort by course_number
line 182 change to -> db.collection("user").doc(user.email).collection("courses").orderBy("course_number","asc")
```
# Message Time Format:
```                                                            

function messageTimeFormat(timeInSecond){
    //from: 1234567891000
    //to: (02/13/2009 18:31)
    let formated_time = new Date(timeInSecond);

    const month = parseInt(formated_time.getMonth() + 1);
    const date = formated_time.getDate();
    const year = formated_time.getFullYear();
    const hour = formated_time.getHours();
    const minute = formated_time.getMinutes();
    
    let monthString,hourString,dateString,minuteString;

    if(date < 10)
        dateString =  "0" + date;
    else
        dateString = date;

    if(hour < 10)
        hourString = "0"+ hour;
    else
        hourString = hour;

    if(minute < 10)
        minuteString = "0"+ minute;
    else
        minuteString = minute;

    if(month < 10)
        monthString = "0" + month;
    else
        monthString = month;
    
    
    return `(${monthString}/${dateString}/${year} ${hourString}:${minuteString})`;
}

```


# Schedule Format:
```
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
    const loopTime = sa.length / 5;
    let i = 0;
    let dayIndex = 2;
    let tempString = "";
    while(i < loopTime){
        tempString += `${sa[0]} Room${sa[1]} ${getDayName(parseInt(sa[dayIndex]))} ${sa[3]}-${sa[4]},`;
        i++;
        dayIndex += 5;
    }
    const finalString = tempString.replace(/.$/,".");
    return finalString;
}
```


# Time Converter

```
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
     }

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
