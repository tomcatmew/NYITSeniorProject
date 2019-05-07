
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
         book_list:"room is free",
         status: "",
         book: " "
      },
      B26W_313:{
         room: "313",
         location: "26W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B26W_314:{
         room: "314",
         location: "26W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_601:{
         room: "601",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_312:{
         room: "312",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_602:{
         room: "602",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_603:{
         room: "603",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_604:{
         room: "604",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_605A:{
         room: "605A",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_605B:{
         room: "605B",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_607:{
         room: "607",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_608:{
         room: "608",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_701:{
         room: "701",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_702:{
         room: "702",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_703:{
         room: "703",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_704:{
         room: "704",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_705:{
         room: "705",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_706A:{
         room: "706A",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_707:{
         room: "707",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_708:{
         room: "708",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_801:{
         room: "801",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_401:{
         room: "401",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_408lab:{
         room: "408lab",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_404:{
         room: "404",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_405:{
         room: "405",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_406:{
         room: "406",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_407:{
         room: "407",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      GGC_408A:{
         room: "408A",
         location: "GGC",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_820:{
         room: "820",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_821:{
         room: "821",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_822:{
         room: "822",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_721:{
         room: "721",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_722:{
         room: "722",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
      },
      B16W_723:{
         room: "723",
         location: "16W",
         book_list:"room is free",
         status: "",
         book: " "
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
      db.collection("room").doc("b" + roomArray[i]["location"] + roomArray[i]["room"]).set(roomArray[i]).then(function() {
          console.log("room info successfully written!");
      });
    }
}
