# Get Special Format from database

# 1 course  : "3 14:00 16:20,5 14:00 16:20"
# 2 courses : "3 14:00 16:20,5 14:00 16:20"
# 3 course  : "2 18:00 20:20,4 18:00 20:20,3 9:00 11:00"
# Error Prevention: locations are not check!! not checking: meet 3 times with 2 rooms or meet 3 times with 1 rooms.
# Number of Times in the database must equal to numbers of locations.

```
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
  if (times.length == 3 && rooms.length == 3){
      //meet 3 times with 3 room
    result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[1]} ${times[1]} ${locations[2]} ${rooms[2]} ${times[2]}`;
  }
  else if (times.length == 2 && rooms.length == 2){
      //meet 2 times with 2 room
    result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[1]} ${times[1]}`;
  }
  else if (times.length == 2 && rooms.length == 1){
    //meet 2 times with 1 room
    result = `${locations[0]} ${rooms[0]} ${times[0]} ${locations[1]} ${rooms[0]} ${times[1]}`;
  }
  else if (times.length == 1 && rooms.length == 1){
    //meet 1 times with 1 room
    result = `${locations[0]} ${rooms[0]} ${times[0]}`;
  }
  else{
    console.log("Condition is not found");
  }

  return result;
}//end courseDescription(room,location,time)
```
