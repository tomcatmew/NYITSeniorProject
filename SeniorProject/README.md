# BackEnd

# Add function get specific format from the database.
# 1 course  : "16W 703 1 14:00 16:20"
# 2 courses : 3 14:00 16:20,5 14:00 16:20
# 3 courses : 2 18:00 20:20,4 18:00 20:20,3 9:00 11:00
# Error Prevention: Up to 3 courses.  Time, location, and room must have same length or number.

function courseDescription(room,location,time){

  var rooms  = [];
  var locations = [];
  var times = [];
  var result;

  var tempRoomString = room.split(" ");
  var tempLocationString = location.split(" ");
  var tempTimesString = time.split(",");

  for(var i = 0; i < tempRoomString.length; i++){
    rooms.push(tempRoomString[i]);
  }
  for(var i = 0; i < tempLocationString.length; i++){
    locations.push(tempLocationString[i]);
  }
  for(var i = 0; i < tempTimesString.length; i++){
    times.push(tempTimesString[i]);
  }
  if (times.length == 3){
    result = locations[0] + " " + rooms[0] + " " + times[0] + " " + locations[1] + " " + rooms[1] + " " + times[1] + locations[2] + " " + rooms[2] + " " + times[2];
  }
  else if (times.length == 2){
    result = locations[0] + " " + rooms[0] + " " + times[0] + " " + locations[1] + " " + rooms[1] + " " + times[1];
  }else{
    result = locations[0] + " " + rooms[0] + " " + times[0];
  }

  return result;
}
