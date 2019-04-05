```
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
        signInSuccessUrl: 'loggedIn.html',

```
```

function getDatabaseCourseInfo(){
    db.collection("courseDatabase").where("course_number", ">=", "100")
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          //courseInfoList(doc.data());
          var ref = doc.data();
          list.push(`(${ref.course_id})${ref.department_code}${ref.course_number} ${ref.course_title} ${ref.schedule} ${ref.term} Instructor: ${ref.instructor}`);
          });
          console.log("courses Database: ", list.join(", "));
      });

  }


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
