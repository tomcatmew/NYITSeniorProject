
var roomArray = [];
function roomArray_init(){
    var db = firebase.firestore();
    //ggc 4,6,7,8
    //16w 7,8
    //26w 3

    var rooms = {

      B26W_312:{
         room: "312",
         location: "26W",
         book_list:[],
         status: ""
      },
      B26W_313:{
         room: "313",
         location: "26W",
         book_list:[],
         status: ""
      },
      B26W_314:{
         room: "314",
         location: "26W",
         book_list:[],
         status: ""
      },
      GGC_601:{
         room: "601",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_602:{
         room: "602",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_603:{
         room: "603",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_604:{
         room: "604",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_605A:{
         room: "605A",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_605B:{
         room: "605B",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_607:{
         room: "607",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_608:{
         room: "608",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_701:{
         room: "701",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_702:{
         room: "702",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_703:{
         room: "703",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_704:{
         room: "704",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_705:{
         room: "705",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_706A:{
         room: "706A",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_707:{
         room: "707",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_708:{
         room: "708",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_801:{
         room: "801",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_401:{
         room: "401",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_404:{
         room: "404",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_405:{
         room: "405",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_406:{
         room: "406",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_407:{
         room: "407",
         location: "GGC",
         book_list:[],
         status: ""
      },
      GGC_408A:{
         room: "408A",
         location: "GGC",
         book_list:[],
         status: ""
      },
      B16W_820:{
         room: "820",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_821:{
         room: "821",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_822:{
         room: "822",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_621:{
         room: "621",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_622:{
         room: "622",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_620:{
         room: "620",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_721:{
         room: "721",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_722:{
         room: "722",
         location: "16W",
         book_list:[],
         status: ""
      },
      B16W_723:{
         room: "723",
         location: "16W",
         book_list:[],
         status: ""
      }

};
for(let i of Object.keys(rooms)){
   roomArray.push(rooms[i]);
}
  console.log("Rooms Test: ", roomArray);

}

function roomDatabase(){
    var db = firebase.firestore();
    for(i = 0; i < roomArray.length; i++){
      db.collection("room").add(roomArray[i]).then(function() {
          console.log("room info successfully written!");
      });
    }
}
