
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
         book_list:"26W312 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B26W_313:{
         room: "313",
         location: "26W",
         book_list:"26W313 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B26W_314:{
         room: "314",
         location: "26W",
         book_list:"26W314 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_601:{
         room: "601",
         location: "GGC",
         book_list:"GGC601 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_312:{
         room: "312",
         location: "GGC",
         book_list:"GGC312 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_602:{
         room: "602",
         location: "GGC",
         book_list:"GGC602 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_603:{
         room: "603",
         location: "GGC",
         book_list:"GGC603 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_604:{
         room: "604",
         location: "GGC",
         book_list:"GGC604 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_605A:{
         room: "605A",
         location: "GGC",
         book_list:"GGC605A room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_605B:{
         room: "605B",
         location: "GGC",
         book_list:"GGC605B room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_607:{
         room: "607",
         location: "GGC",
         book_list:"GGC607 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_608:{
         room: "608",
         location: "GGC",
         book_list:"GGC608 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_701:{
         room: "701",
         location: "GGC",
         book_list:"GGC701 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_702:{
         room: "702",
         location: "GGC",
         book_list:"GGC702 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_703:{
         room: "703",
         location: "GGC",
         book_list:"GGC703 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_704:{
         room: "704",
         location: "GGC",
         book_list:"GGC704 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_705:{
         room: "705",
         location: "GGC",
         book_list:"GGC705 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_706A:{
         room: "706A",
         location: "GGC",
         book_list:"GGC706A room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_707:{
         room: "707",
         location: "GGC",
         book_list:"GGC707 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_708:{
         room: "708",
         location: "GGC",
         book_list:"GGC708 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_801:{
         room: "801",
         location: "GGC",
         book_list:"GGC801 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_401:{
         room: "401",
         location: "GGC",
         book_list:"GGC401 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_408lab:{
         room: "408lab",
         location: "GGC",
         book_list:"GGC408lab room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_404:{
         room: "404",
         location: "GGC",
         book_list:"GGC404 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_405:{
         room: "405",
         location: "GGC",
         book_list:"GGC405 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_406:{
         room: "406",
         location: "GGC",
         book_list:"GGC406 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_407:{
         room: "407",
         location: "GGC",
         book_list:"GGC407 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      GGC_408A:{
         room: "408A",
         location: "GGC",
         book_list:"GGC408A room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_820:{
         room: "820",
         location: "16W",
         book_list:"16W820 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_821:{
         room: "821",
         location: "16W",
         book_list:"16W821 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_822:{
         room: "822",
         location: "16W",
         book_list:"16W822 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_721:{
         room: "721",
         location: "16W",
         book_list:"16W721 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_722:{
         room: "722",
         location: "16W",
         book_list:"16W722 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_623:{
         room: "623",
         location: "16W",
         book_list:"16W623 room is free",
         status: "green",
         in_course_id:"0",
         book: " "
      },
      B16W_723:{
         room: "723",
         location: "16W",
         book_list:"16W723 room is free",
         status: "green",
         in_course_id:"0",
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
