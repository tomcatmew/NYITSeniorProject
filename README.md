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
# database part
```
var list = [];
function getDatabaseCourseInfo(){
    var db = firebase.firestore();

    db.collection("courseDatabase").doc("courses")
    .onSnapshot(function(doc) {
          courseInfoList(doc.data()); //retrieve data from courseDatabase
          console.log("courses Database: ", doc.data());
      });

  }

function courseInfoList(info){ //helper function
  var count = 1;
  for(let z of Object.keys(info))
    {
      var ref = info[z];
      list.push(`(${ref.course_id})${ref.department_code}${ref.course_number} ${ref.course_title} ${ref.schedule} ${ref.term} Instructor: ${ref.instructor}`);
      count++;
    }
      console.log("List: ",list);
}




```
# function: getDatabaseCourseInfo() output:

0: "(1884)CSCI125 Computer Programming I GGC 601 2 14:00 16:20 GGC 601 4 14:00 15:20 Spring 2019 Instructor: Felix Fischman"
1: "(1886)CSCI125 Computer Programming I GGC 601 2 17:30 19:10 Spring 2019 Instructor: Michael Kadri"
2: "(2253)CSCI125 Computer Programming I GGC 601 5 17:30 21:10 Spring 2019 Instructor: Felix Fischman"
3: "(2743)CSCI125 Computer Programming I GGC 601 1 14:00 16:50 GGC 601 3 15:30 16:50 Spring 2019 Instructor: Hakan Pekcan"
4: "(3660)CSCI130 Computer Organization 16W 723 5 5:30 8:10 Spring 2019 Instructor: Simon Ben-Avi"
5: "(3669)CSCI130 Computer Organization 26W 11 2 15:30 16:50 26W 11 4 15:30 16:50 Spring 2019 Instructor: Nabi Sertac Artan"
6: "(3670)CSCI130 Computer Organization GGC 405 1 14:00 15:20 GGC 405 3 14:00 15:20 Spring 2019 Instructor: Steven Billis"
7: "(2871)CSCI135 Digital Logic Design Fundamentals  16W 723 5 17:30 20:10 Spring 2019 Instructor: Simon Ben-Avi"
8: "(3671)CSCI135 Digital Logic Design Fundamentals  26W 11 2 15:30 16:50 26W 11 4 15:30 16:50 Spring 2019 Instructor: Nabi Sertac Artan"
9: "(3672)CSCI135 Digital Logic Design Fundamentals  GGC 606 1 14:00 15:20 GGC 606 3 14:00 15:20 Spring 2019 Instructor: Nabi Sertac Artan"
10: "(2454)CSCI155 Computer Organization and Architecture 16W 822 4 17:30 21:10 Spring 2019 Instructor: Maharshi Shah"
11: "(1888)CSCI155 Computer Organization and Architecture 26W 312 2 17:30 20:10 Spring 2019 Instructor: Simon Ben-Avi"
12: "(2752)CSCI155 Computer Organization and Architecture 26W 312 2 15:30 16:50 26W 312 4 15:30 16:50 Spring 2019 Instructor: Simon Ben-Avi"
13: "(1892)CSCI185 Computer Programming II GGC 312 1 17:30 21:10 Spring 2019 Instructor: Michael Kadri"
14: "(2755)CSCI185 Computer Programming II GGC 601 2 9:00 10:50 GGC 601 4 9:00 10:50 Spring 2019 Instructor: Wenjia Li"
15: "(1893)CSCI235 Computer Programming II 26W 11 2 17:30 20:10 Spring 2019 Instructor: Felix Fischman"
16: "(2759)CSCI235 Computer Programming II 16W 723 1 9:30 10:50 16W 723 2 9:30 10:50 Spring 2019 Instructor: Susan Gass"
17: "(1895)CSCI260  Data Structures  1 14:00 15:20 3 14:00 15:20  Spring 2019 Instructor: Huanying Gu"
18: "(2447)CSCI260  Data Structures 3 17:30 20:10 Spring 2019 Instructor: Altion Simo"
19: "(2762)CSCI260  Data Structures 2 09:30 10:50 4 09:30 10:50 Spring 2019 Instructor: Michael Kadri"
20: "(1897)CSCI270 Probability and Statistics for Computer 16W 822 1 15:30 16:50 GGC 706 3 15:30 16:50 Spring 2019 Instructor: Herbert Taylor"
21: "(1898)CSCI300 Database Management 26W 11 2 14:00 15:20 26W 313 4 14:00 15:20 Spring 2019 Instructor: Houwei Cao"
22: "(2969)CSCI300 Database Management 2 17:30 20:10 Spring 2019 Instructor:  Felix Fischman"
23: "(1899)CSCI312 Theory of Computation  2 11:00 12:20 4 11:00 12:20 Spring 2019 Instructor: Paolo Gasti"
24: "(1900)CSCI318 Programming Language Concepts 2 14:00 15:20 4 14:00 15:20  Spring 2019 Instructor:  Wenjia Li"
25: "(1901)CSCI330 Operating Systems  1 17:30 20:10 Spring 2019 Instructor: Susan Gass"
26: "(2764)CSCI330 Operating Systems 2 15:30 16:50 4 15:30 16:50  Spring 2019 Instructor: Susan Gass"
27: "(1903)CSCI335 Design and Analysis of Algorithms 1 17:45 20:25 Spring 2019 Instructor: Herbert Taylor"
28: "(1904)CSCI345 Computer Networks 3 17:30 20:10 Spring 2019 Instructor: Anand Santhanakrishnan"
29: "(3753)CSCI345 Computer Networks 1 17:30 20:10 Spring 2019 Instructor: Damon Bruccoleri"
30: "(1905)CSCI355 Artificial Intelligence I 3 20:20 23:00 Spring 2019 Instructor:  Altion Simo"
31: "(2188)CSCI357 Cisco Academy Level I 1 14:00 16:50 Spring 2019 Instructor: Michael Silva "
32: "(2242)CSCI362 Information System Security Engineering and Administration 2 20:35 23:15  Spring 2019 Instructor:  Michael Nizich"
33: "(1906)CSCI380 Introduction to Software Engineering 1 12:30 13:50 3 12:30 13:50  Spring 2019 Instructor:  Maherukh Akhtar"
34: "(1991)CSCI405 Distributed Database Systems 5 17:30 20:10 Spring 2019 Instructor:  Sandra Kopecky"
35: "(1907)CSCI415  Introduction to Data Mining 1 12:30 13:50 3 12:30 13:50 Spring 2019 Instructor:  Huanying Gu"
36: "(2827)CSCI436 Big Data Management & Analytics  2 17:45  20:25 Spring 2019 Instructor: Qian Wang"
37: "(2449)CSCI445 Operating System Security 16W 624 5 09:30  12:10 Spring 2019 Instructor: Li"
38: "(1815)MATH101 Developmental Mathematics I/II 26W 314 1 12:30 13:55 26W 314 3 12:30 13:55 26W 314 5 12:30 13:55 Spring 2019 Instructor: Marcus Johnson"
39: "(1817)MATH115 Introductory Concepts of Mathematics GGC 401 1 15:30 16:50 GGC 401 3 15:30 16:50 Spring 2019 Instructor: Carol Bilsky_Bieniek"
40: "(1818)MATH125 Finite Mathematics 26W 312 2 9:30 10:50 26W 312 4 9:30 10:50 Spring 2019 Instructor: Xiaoyan Yang"
41: "(2568)MATH135 Fundamentals of Precalculus I 26W 312 2 17:30 19:45 26W 312 4 17:30 19:45 Spring 2019 Instructor: Owen Johnson"
42: "(2569)MATH136 Fundamentals of Precalculus II 16W 723 1 15:30 17:45 16W 723 3 15:30 17:45 Spring 2019 Instructor: John Gordon"
43: "(2688)MATH136 Fundamentals of Precalculus II 16W 721 1 11:00 12:20 16W 721 3 11:00 12:20 16W 721 4 11:00 12:20 Spring 2019 Instructor: Carol Bilsky-Bieniek"
44: "(2689)MATH136 Fundamentals of Precalculus II 16W 822 1 9:30 10:50 16W 822 3 9:30 10:50 26W 11 4 9:30 10:50 Spring 2019 Instructor: Chatur Advani"
45: "(1819)MATH141 Precalculus 26W 11 1 10:55 12:25 16W 11 3 10:55 12:25 16W 822 4 9:30 10:50 Spring 2019 Instructor: Laihan Luo"
46: "(1820)MATH141 Precalculus 26W 312 2 14:00 15:30 16W 723 4 14:00 15:30 26W 312 5 14:00 15:20 Spring 2019 Instructor: Julius Chini"
47: "(1821)MATH151 Fundamentals of Calculus GGC 409 1 14:00 15:20 16W 821 3 14:00 15:20 Spring 2019 Instructor: John Gordon"
48: "(1822)MATH151 Fundamentals of Calculus 16W 723 17:30 20:10 Spring 2019 Instructor: Theodore Preston"
49: "(1823)MATH161 Basic Applied Calculus GGC 409 1 14:00 15:20 16W 821 14:00 15:20 Spring 2019 Instructor: John Gordon"
50: "(1824)MATH161 Basic Applied Calculus 16W 723 3 17:30 20:10 Spring 2019 Instructor: John Gordon"
51: "(1825)MATH171 Calculus I GGC 401 2 14:00 16:30 GGC 401 4 14:00 16:30 Spring 2019 Instructor: Taposh Gayen"
52: "(1826)MATH171 Calculus I 16W 721 1 14:00 16:30 16W 822 14:00 16:30 Spring 2019 Instructor: Julius Chini"
53: "(1827)MATH171 Calculus I 16W 820 1 17:30 19:45 16W 822 17:30 19:45 Spring 2019 Instructor: Laihan Luo"
54: "(1828)MATH180 Calculus II 26W 312 1 14:00 16:30 26W 11 14:00 16:30 Spring 2019 Instructor: Changiz Alizadeh"
55: "(1829)MATH180 Calculus II 26W 207 2 17:30 19:45 26W 313 17:30 19:45 Spring 2019 Instructor: Klara Lagrance"
56: "(2686)MATH180 Calculus II 16W 624 1 14:00 16:30 16W 721 14:00 16:30 Spring 2019 Instructor: Vitaly Katsnelson"
57: "(2687)MATH180 Calculus II GGC 405 2 14:00 16:30 16W 722 14:00 16:30 Spring 2019 Instructor: Robert Bell"
58: "(2317)MATH235 Applied Statistics GGC 409 1 15:30 16:50 GGC 409 15:30 16:50 Spring 2019 Instructor: Owen Johnson"
59: "(1830)MATH260 Calculus III 26W 312 1 9:00 10:50 26W 312 9:00 10:50 Spring 2019 Instructor: Robert Bell"
60: "(3489)MATH180 Calculus III 26W 312 1 9:00 10:50 26W 312 9:00 10:50 Spring 2019 Instructor: Robert Bell"
61: "(1831)MATH310 Linear Algebra 26W 312 1 9:00 10:50 26W 312 9:00 10:50 Spring 2019 Instructor: Changiz Alizadeh"
62: "(2434)MATH310 Linear Algebra 16W 624 1 12:30 13:50 16W 624 12:30 13:50 Spring 2019 Instructor: Vitaly Katsnelson"
63: "(1832)MATH320 Differential Equations 16W 821 1 12:30 13:50 16W 721 12:30 13:50 Spring 2019 Instructor: Robert Bell"
64: "(3488)MATH350 Advanced Calculus GGC 702 1 15:30 16:50 GGC 702 15:30 16:50 Spring 2019 Instructor: Ranja Roy"
      
#=================================================================================          
# Courses Data    
      
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

           MATH115_M01:{
             course_id: "1817",
             department_code: "MATH",
             course_number: "115",
             course_title: "Introductory Concepts of Mathematics",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Carol Bilsky_Bieniek",
             schedule: "GGC 401 1 15:30 16:50 GGC 401 3 15:30 16:50"
           },

           MATH125_M01:{
             course_id: "1818",
             department_code: "MATH",
             course_number: "125",
             course_title: "Finite Mathematics",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Xiaoyan Yang",
             schedule: "26W 312 2 9:30 10:50 26W 312 4 9:30 10:50"
           },

           MATH135_M01:{
             course_id: "2568",
             department_code: "MATH",
             course_number: "135",
             course_title: "Fundamentals of Precalculus I",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Owen Johnson",
             schedule: "26W 312 2 17:30 19:45 26W 312 4 17:30 19:45"
           },

           MATH136_M01:{
             course_id: "2569",
             department_code: "MATH",
             course_number: "136",
             course_title: "Fundamentals of Precalculus II",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "John Gordon",
             schedule: "16W 723 1 15:30 17:45 16W 723 3 15:30 17:45"
           },

           MATH136_M02:{
             course_id: "2688",
             department_code: "MATH",
             course_number: "136",
             course_title: "Fundamentals of Precalculus II",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Carol Bilsky-Bieniek",
             schedule: "16W 721 1 11:00 12:20 16W 721 3 11:00 12:20 16W 721 4 11:00 12:20"
           },
           MATH136_M03:{
             course_id: "2689",
             department_code: "MATH",
             course_number: "136",
             course_title: "Fundamentals of Precalculus II",
             capmus: "Manhattan Campus",
             location: "16W 26W",
             term: "Spring 2019",
             instructor: "Chatur Advani",
             schedule: "16W 822 1 9:30 10:50 16W 822 3 9:30 10:50 26W 11 4 9:30 10:50"
           },

           MATH141_M01:{
             course_id: "1819",
             department_code: "MATH",
             course_number: "141",
             course_title: "Precalculus",
             capmus: "Manhattan Campus",
             location: "26W 16W",
             term: "Spring 2019",
             instructor: "Laihan Luo",
             schedule: "26W 11 1 10:55 12:25 16W 11 3 10:55 12:25 16W 822 4 9:30 10:50"
           },

           MATH141_M02:{
             course_id: "1820",
             department_code: "MATH",
             course_number: "141",
             course_title: "Precalculus",
             capmus: "Manhattan Campus",
             location: "26W 16W",
             term: "Spring 2019",
             instructor: "Julius Chini",
             schedule: "26W 312 2 14:00 15:30 16W 723 4 14:00 15:30 26W 312 5 14:00 15:20"
           },

           MATH151_M01:{
             course_id: "1821",
             department_code: "MATH",
             course_number: "151",
             course_title: "Fundamentals of Calculus",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center 16W",
             term: "Spring 2019",
             instructor: "John Gordon",
             schedule: "GGC 409 1 14:00 15:20 16W 821 3 14:00 15:20"
           },

           MATH151_M02:{
             course_id: "1822",
             department_code: "MATH",
             course_number: "151",
             course_title: "Fundamentals of Calculus",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Theodore Preston",
             schedule: "16W 723 17:30 20:10"
           },

           MATH161_M01:{
             course_id: "1823",
             department_code: "MATH",
             course_number: "161",
             course_title: "Basic Applied Calculus",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center 16W",
             term: "Spring 2019",
             instructor: "John Gordon",
             schedule: "GGC 409 1 14:00 15:20 16W 821 14:00 15:20"
           },

           MATH161_M02:{
             course_id: "1824",
             department_code: "MATH",
             course_number: "161",
             course_title: "Basic Applied Calculus",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center 16W",
             term: "Spring 2019",
             instructor: "John Gordon",
             schedule: "16W 723 3 17:30 20:10"
           },

           MATH171_M01:{
             course_id: "1825",
             department_code: "MATH",
             course_number: "171",
             course_title: "Calculus I",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center 16W",
             term: "Spring 2019",
             instructor: "Taposh Gayen",
             schedule: "GGC 401 2 14:00 16:30 GGC 401 4 14:00 16:30"
           },

           MATH171_M02:{
             course_id: "1826",
             department_code: "MATH",
             course_number: "171",
             course_title: "Calculus I",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Julius Chini",
             schedule: "16W 721 1 14:00 16:30 16W 822 14:00 16:30"
           },

           MATH171_M03:{
             course_id: "1827",
             department_code: "MATH",
             course_number: "171",
             course_title: "Calculus I",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Laihan Luo",
             schedule: "16W 820 1 17:30 19:45 16W 822 17:30 19:45"
           },

           MATH180_M01:{
             course_id: "1828",
             department_code: "MATH",
             course_number: "180",
             course_title: "Calculus II",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Changiz Alizadeh",
             schedule: "26W 312 1 14:00 16:30 26W 11 14:00 16:30"
           },

           MATH180_M02:{
             course_id: "1829",
             department_code: "MATH",
             course_number: "180",
             course_title: "Calculus II",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Klara Lagrance",
             schedule: "26W 207 2 17:30 19:45 26W 313 17:30 19:45"
           },

           MATH180_M03:{
             course_id: "2686",
             department_code: "MATH",
             course_number: "180",
             course_title: "Calculus II",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Vitaly Katsnelson",
             schedule: "16W 624 1 14:00 16:30 16W 721 14:00 16:30"
           },

           MATH180_M04:{
             course_id: "2687",
             department_code: "MATH",
             course_number: "180",
             course_title: "Calculus II",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Robert Bell",
             schedule: "GGC 405 2 14:00 16:30 16W 722 14:00 16:30"
           },

           MATH235_M01:{
             course_id: "2317",
             department_code: "MATH",
             course_number: "235",
             course_title: "Applied Statistics",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Owen Johnson",
             schedule: "GGC 409 1 15:30 16:50 GGC 409 15:30 16:50"
           },

           MATH260_M01:{
             course_id: "1830",
             department_code: "MATH",
             course_number: "260",
             course_title: "Calculus III",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Robert Bell",
             schedule: "26W 312 1 9:00 10:50 26W 312 9:00 10:50"
           },

           MATH260_M02:{
             course_id: "3489",
             department_code: "MATH",
             course_number: "180",
             course_title: "Calculus III",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Robert Bell",
             schedule: "26W 312 1 9:00 10:50 26W 312 9:00 10:50"
           },

           MATH310_M01:{
             course_id: "1831",
             department_code: "MATH",
             course_number: "310",
             course_title: "Linear Algebra",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Changiz Alizadeh",
             schedule: "26W 312 1 9:00 10:50 26W 312 9:00 10:50"
           },

           MATH310_M02:{
             course_id: "2434",
             department_code: "MATH",
             course_number: "310",
             course_title: "Linear Algebra",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Vitaly Katsnelson",
             schedule: "16W 624 1 12:30 13:50 16W 624 12:30 13:50"
           },

           MATH320_M01:{
             course_id: "1832",
             department_code: "MATH",
             course_number: "320",
             course_title: "Differential Equations",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Robert Bell",
             schedule: "16W 821 1 12:30 13:50 16W 721 12:30 13:50"
           },

           MATH350_M01:{
             course_id: "3488",
             department_code: "MATH",
             course_number: "350",
             course_title: "Advanced Calculus",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Ranja Roy",
             schedule: "GGC 702 1 15:30 16:50 GGC 702 15:30 16:50"
           },


            CSCI125_M01:{
             course_id: "1884",
             department_code: "CSCI",
             course_number: "125",
             course_title: "Computer Programming I",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Felix Fischman",
             schedule: "GGC 601 2 14:00 16:20 GGC 601 4 14:00 15:20"
           },


           CSCI125_M03:{
             course_id: "1886",
             department_code: "CSCI",
             course_number: "125",
             course_title: "Computer Programming I",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Michael Kadri",
             schedule: "GGC 601 2 17:30 19:10"
           },

           CSCI125_M05:{
             course_id: "2253",
             department_code: "CSCI",
             course_number: "125",
             course_title: "Computer Programming I",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Felix Fischman",
             schedule: "GGC 601 5 17:30 21:10"
           },

           CSCI125_M07:{
             course_id: "2743",
             department_code: "CSCI",
             course_number: "125",
             course_title: "Computer Programming I",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Hakan Pekcan",
             schedule: "GGC 601 1 14:00 16:50 GGC 601 3 15:30 16:50"
           },

           CSCI130_M01:{
             course_id: "3660",
             department_code: "CSCI",
             course_number: "130",
             course_title: "Computer Organization",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Simon Ben-Avi",
             schedule: "16W 723 5 5:30 8:10"
           },
           CSCI130_M02:{
             course_id: "3669",
             department_code: "CSCI",
             course_number: "130",
             course_title: "Computer Organization",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Nabi Sertac Artan",
             schedule: "26W 11 2 15:30 16:50 26W 11 4 15:30 16:50"
           },
           CSCI130_M03:{
             course_id: "3670",
             department_code: "CSCI",
             course_number: "130",
             course_title: "Computer Organization",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Steven Billis",
             schedule: "GGC 405 1 14:00 15:20 GGC 405 3 14:00 15:20"
           },

           CSCI135_M01:{
             course_id: "2871",
             department_code: "CSCI",
             course_number: "135",
             course_title: "Digital Logic Design Fundamentals ",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Simon Ben-Avi",
             schedule: "16W 723 5 17:30 20:10"
           },
           CSCI135_M02:{
             course_id: "3671",
             department_code: "CSCI",
             course_number: "135",
             section:"M02",
             course_title: "Digital Logic Design Fundamentals ",
             capmus: "Manhattan Campus",
             location: "26W",
             room: "11",
             term: "Spring 2019",
             instructor: "Nabi Sertac Artan",
             schedule: "26W 11 2 15:30 16:50 26W 11 4 15:30 16:50"
           },
           CSCI135_M03:{
             course_id: "3672",
             department_code: "CSCI",
             course_number: "135",
             course_title: "Digital Logic Design Fundamentals ",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Nabi Sertac Artan",
             schedule: "GGC 606 1 14:00 15:20 GGC 606 3 14:00 15:20"
           },
           CSCI155_M01:{
             course_id: "2454",
             department_code: "CSCI",
             course_number: "155",
             course_title: "Computer Organization and Architecture",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Maharshi Shah",
             schedule: "16W 822 4 17:30 21:10"
           },
           CSCI155_M03:{
             course_id: "1888",
             department_code: "CSCI",
             course_number: "155",
             course_title: "Computer Organization and Architecture",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Simon Ben-Avi",
             schedule: "26W 312 2 17:30 20:10"
           },
           CSCI155_M05:{
             course_id: "2752",
             department_code: "CSCI",
             course_number: "155",
             course_title: "Computer Organization and Architecture",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Simon Ben-Avi",
             schedule: "26W 312 2 15:30 16:50 26W 312 4 15:30 16:50"
           },
           CSCI185_M03:{
             course_id: "1892",
             department_code: "CSCI",
             course_number: "185",
             course_title: "Computer Programming II",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Michael Kadri",
             schedule: "GGC 312 1 17:30 21:10"
           },


           CSCI185_M05:{
             course_id: "2755",
             department_code: "CSCI",
             course_number: "185",
             course_title: "Computer Programming II",
             capmus: "Manhattan Campus",
             location: "Guiliano Global Center",
             term: "Spring 2019",
             instructor: "Wenjia Li",
             schedule: "GGC 601 2 9:00 10:50 GGC 601 4 9:00 10:50"
           },

           CSCI235_M01:{
             course_id: "1893",
             department_code: "CSCI",
             course_number: "235",
             course_title: "Computer Programming II",
             capmus: "Manhattan Campus",
             location: "26W",
             term: "Spring 2019",
             instructor: "Felix Fischman",
             schedule: "26W 11 2 17:30 20:10"
           },

           CSCI235_M03:{
             course_id: "2759",
             department_code: "CSCI",
             course_number: "235",
             course_title: "Computer Programming II",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Susan Gass",
             schedule: "16W 723 1 9:30 10:50 16W 723 2 9:30 10:50"
           },




           CSCI445_M02:{
             course_id: "2449",
             department_code: "CSCI",
             course_number: "445",
             course_title: "Operating System Security",
             capmus: "Manhattan Campus",
             location: "16W",
             term: "Spring 2019",
             instructor: "Li",
             schedule: "16W 624 5 09:30  12:10"
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
             schedule: "2 17:45  20:25"
           },

          CSCI415_M01:{
             course_id: "1907",
             department_code: "CSCI",
             course_number: "415",
             section:"M01",
             course_title: " Introduction to Data Mining",
             capmus: "Manhattan Campus",
             location: "16W",
             room: "723",
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
             location: "Guiliano Global",
             room: "821",
             term: "Spring 2019",
             instructor: " Sandra Kopecky",
             schedule: "5 17:30 20:10"
           },

          CSCI380_M01D:{
             course_id: "1906",
             department_code: "CSCI",
             course_number: "380",
             section:"M01D",
             course_title: "Introduction to Software Engineering",
             capmus: "Manhattan Campus",
             location: "Guiliano Global",
             room: "702",
             term: "Spring 2019",
             instructor: " Maherukh Akhtar",
             schedule: "1 12:30 13:50 3 12:30 13:50 "
           },



          CSCI362_M01D:{
             course_id: "2242",
             department_code: "CSCI",
             course_number: "362",
             section:"M01D",
             course_title: "Information System Security Engineering and Administration",
             capmus: "Manhattan Campus",
             location: "16W",
             room: "624",
             term: "Spring 2019",
             instructor: " Michael Nizich",
             schedule: "2 20:35 23:15 "
           },

          CSCI357_M01:{
             course_id: "2188",
             department_code: "CSCI",
             course_number: "357",
             section:"M01",
             course_title: "Cisco Academy Level I",
             capmus: "Manhattan Campus",
             location: " Guiliano Global ",
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
             location: "26W ",
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
             location: "16W ",
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
             location: "16W ",
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
             location: "16W ",
             room: "624",
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
             location: "16W ",
             room: "822",
             term: "Spring 2019",
             instructor: "Susan Gass",
             schedule: "1 17:30 20:10"
           },

          CSCI330_M03:{
             course_id: "2764",
             department_code: "CSCI",
             course_number: "330",
             section:"M01",
             course_title: "Operating Systems",
             capmus: "Manhattan Campus",
             location: "16W ",
             room: "624",
             term: "Spring 2019",
             instructor: "Susan Gass",
             schedule: "2 15:30 16:50 4 15:30 16:50 "
           },
          CSCI318_M01:{
             course_id: "1900",
             department_code: "CSCI",
             course_number: "318",
             section:"M01",
             course_title: "Programming Language Concepts",
             capmus: "Manhattan Campus",
             location: "16W ",
             room: "624",
             term: "Spring 2019",
             instructor: " Wenjia Li",
             schedule: "2 14:00 15:20 4 14:00 15:20 "
           },




          CSCI312_M01:{
             course_id: "1899",
             department_code: "CSCI",
             course_number: "312",
             section:"M01",
             course_title: "Theory of Computation ",
             capmus: "Manhattan Campus",
             location: "16W ",
             room: "721",
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
             location: "26W ",
             term: "Spring 2019",
             instructor: "Houwei Cao",
             schedule: "26W 11 2 14:00 15:20 26W 313 4 14:00 15:20"
           },

          CSCI300_M02:{
             course_id: "2969",
             department_code: "CSCI",
             course_number: "300",
             section:"M02",
             course_title: "Database Management",
             capmus: "Manhattan Campus",
             location: "16W ",
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
             location: "16W ",
             term: "Spring 2019",
             instructor: "Herbert Taylor",
             schedule: "16W 822 1 15:30 16:50 GGC 706 3 15:30 16:50"
           },

          CSCI260_M01:{
             course_id: "1895",
             department_code: "CSCI",
             course_number: "260",
             section:"M01",
             course_title: " Data Structures",
             capmus: "Manhattan Campus",
             location: "16W ",
             room: "723",
             term: "Spring 2019",
             instructor: "Huanying Gu",
             schedule: " 1 14:00 15:20 3 14:00 15:20 "
           },

          CSCI260_M03:{
             course_id: "2447",
             department_code: "CSCI",
             course_number: "260",
             section:"M03",
             course_title: " Data Structures",
             capmus: "Manhattan Campus",
             location: "16W ",
             room: "624",
             term: "Spring 2019",
             instructor: "Altion Simo",
             schedule: "3 17:30 20:10"
           },

          CSCI260_M05:{
             course_id: "2762",
             department_code: "CSCI",
             course_number: "260",
             section:"M05",
             course_title: " Data Structures",
             capmus: "Manhattan Campus",
             location: "Guiliano Global ",
             room: "624",
             term: "Spring 2019",
             instructor: "Michael Kadri",
             schedule: "2 09:30 10:50 4 09:30 10:50"
            }

      
      
      
      

# NYITSeniorProject
NYIT Senior Project - Web App

前端测试 ： https://delta-chess-735.firebaseapp.com/

后端测试 ： https://seniorproject-4f192.firebaseapp.com
