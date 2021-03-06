const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const promisePool = require('es6-promise-pool');
const PromisePool = promisePool.PromisePool;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const db = admin.firestore();
const MAX_CONCURRENT = 80;


const courseArray_6 = {
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
  schedule: "1 7:00 9:55 3 12:30 13:55 5 12:30 13:55"
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
  schedule: "1 15:30 16:50 3 15:30 16:50"
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
  location: "16W 16W",
  room: "820 822",
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
  room: "624 721",
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
  room: "624 624",
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
  room: "624",
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
  instructor: "Huanying Gu",
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
  room: "801",
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
  instructor: "Maherukh Akhtar",
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
  room: "624",
  term: "Spring 2019",
  instructor: "Michael Nizich",
  schedule: "2 20:35 23:15"
},

CSCI357_M01:{
  course_id: "2188",
  department_code: "CSCI",
  course_number: "357",
  section:"M01",
  course_title: "Cisco Academy Level I",
  capmus: "Manhattan Campus",
  location: "GGC ",
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
  instructor: "Altion Simo",
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
  location: "16W",
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
  section:"M01",
  course_title: "Operating Systems",
  capmus: "Manhattan Campus",
  location: "16W 16W",
  room: "624 624",
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
  location: "16W 16W",
  room: "624 624",
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
  course_title: "Data Structures",
  capmus: "Manhattan Campus",
  location: "GGC GGC",
  room: "624 624",
  term: "Spring 2019",
  instructor: "Michael Kadri",
  schedule: "2 09:30 10:50 4 09:30 10:50"
 }
};

function timeConverterMinute(timeString){
    var time = timeString.split(":");
    var minutes = parseInt(time[0]) * 60 + parseInt(time[1]);

  return minutes
}

function check_time2(){
  var courseArray_2 = {
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
    schedule: "1 7:00 9:55 3 12:30 13:55 5 12:30 13:55"
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
    schedule: "1 15:30 16:50 3 15:30 16:50"
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
    location: "16W 16W",
    room: "820 822",
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
    room: "624 721",
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
    room: "624 624",
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
    room: "624",
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
    instructor: "Huanying Gu",
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
    room: "801",
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
    instructor: "Maherukh Akhtar",
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
    room: "624",
    term: "Spring 2019",
    instructor: "Michael Nizich",
    schedule: "2 20:35 23:15"
  },

  CSCI357_M01:{
    course_id: "2188",
    department_code: "CSCI",
    course_number: "357",
    section:"M01",
    course_title: "Cisco Academy Level I",
    capmus: "Manhattan Campus",
    location: "GGC ",
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
    instructor: "Altion Simo",
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
    location: "16W",
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
    section:"M01",
    course_title: "Operating Systems",
    capmus: "Manhattan Campus",
    location: "16W 16W",
    room: "624 624",
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
    location: "16W 16W",
    room: "624 624",
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
    course_title: "Data Structures",
    capmus: "Manhattan Campus",
    location: "GGC GGC",
    room: "624 624",
    term: "Spring 2019",
    instructor: "Michael Kadri",
    schedule: "2 09:30 10:50 4 09:30 10:50"
   }
  };
  var d = new Date();
  var z = d.getHours();
  var n = d.getMinutes();
  var current_min = z*60 + n;
  for(let i of Object.keys(courseArray_2))
  {
      var check_length = courseArray_2[i]["schedule"].split(" ").length;
      var real_leng = check_length/3;
      for(var j = 0 ; j < real_leng; j++)
      {
      var tempt_room  = courseArray_2[i]["room"].split(" ")[j];
      var tempt_location  = courseArray_2[i]["location"].split(" ")[j];
      var tempt1 = courseArray_2[i]["schedule"].split(" ")[j*3 + 1];
      var tempt2 = courseArray_2[i]["schedule"].split(" ")[j*3 + 2];
      var start_time = timeConverterMinute(tempt1);
      var end_time = timeConverterMinute(tempt2);
        if((start_time < current_min)&&(current_min < end_time))
        {
          var room_data = {
            room: tempt_room,
            location: tempt_location,
            book_list:[],
            status: "green"
          };
          db.collection("room").doc("b" + tempt_location + tempt_room).set(room_data);
        }
      }
  }
}

function check_time(){
  console.log("func called");
  var list_transfer_2 = [];
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
      });

      var d = new Date();
      var z = d.getHours();
      var n = d.getMinutes();
      var current_min = z*60 + n;
      console.log("Length is " + list_transfer_2.length);
      for(var i = 0; i < list_transfer_2.length; i++)
      {

          var check_length = list_transfer_2[i][7].split(" ").length;
          real_leng = check_length/3;
          for(var j = 0 ; j < real_leng; j++)
          {
          var tempt_room  = list_transfer_2[i][9].split(" ")[j];
          var tempt_location  = list_transfer_2[i][6].split(" ")[j];
          var tempt1 = list_transfer_2[i][7].split(" ")[j*3 + 1];
          var tempt2 = list_transfer_2[i][7].split(" ")[j*3 + 2];
          console.log(tempt1);
          console.log(tempt2);
          var start_time = timeConverterMinute(tempt1);
          var end_time = timeConverterMinute(tempt2);
            if((start_time < current_min)&&(current_min < end_time))
            {
              var room_data_r = {
                room: tempt_room,
                location: tempt_location,
                book_list:[],
                status: "red"
              };
              db.collection("room").add(docdata).then(function() {
                  console.log("Room : " + tempt_location + tempt_room);
                  console.log("Room Turn to Red");
              });
            }
          }
      }
}



exports.roomstatusupdate = functions.pubsub.schedule('every 1 minutes').onRun(async context => {
  // check_time2();
  check_time2();
  // const promisePool = new PromisePool(() => check_time2(), MAX_CONCURRENT);
  // await promisePool.start();
  console.log('Room Status Update Complete');
});


// export scheduledFunctionPlainEnglish =
// functions.pubsub.schedule('every 1 minutes').onRun((context) => {
//     console.log('This will be run every 1 minutes!');
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.status(200).send("Hello from Firebase!");
// });
