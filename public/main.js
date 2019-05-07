var current = 0;

var current_user_email;

var course_list_global;

var user_name;


var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();

var conflict = false;

function courseConflict(){
  var db = firebase.firestore();
   var tempt = document.getElementById("course_select");
   var tempt_value = tempt.value;
   var tempt_text = tempt.options[tempt_value].text;
   var oneTrue = false;

  db.collection("user").doc(current_user_email).collection('courses')
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      let dep = doc.data().department_code;
      let cn = doc.data().course_number;
        console.log("NAME!!!", dep + cn);
        if(tempt_text.includes(dep) && tempt_text.includes(cn)){
            conflict = true;
            oneTrue = true;
            console.log("conflict", conflict);
        }else{
          if (oneTrue){
            conflict = true;
          }else{
            conflict = false;
          }
        }
    });
  });
}
// function displayf5()
// {
//   $('#floortitle').css('left','42%');
//   $('#floortitle').html("5th Floor");
//   $('#textbox').css('display','block');
//   turnoff_f(5);
//   $('#hold5').fadeIn();
//
//   $('#buildingt').fadeOut();
//   $('#floortitle').fadeIn();
//   alloutS();
//   current = 2;
// }
//
// function displayf6()
// {
//   $('#floortitle').css('left','42%');
//   $('#floortitle').html("6th Floor");
//   $('#textbox').css('display','block');
//   turnoff_f(6);
//   $('#hold6').fadeIn();
//
//   $('#buildingt').fadeOut();
//   $('#floortitle').fadeIn();
//   alloutS();
//   current = 2;
// }
//
// function displayf7()
// {
//   $('#floortitle').css('left','42%');
//   $('#floortitle').html("7th Floor");
//   $('#textbox').css('display','block');
//   turnoff_f(7);
//   $('#hold7').fadeIn();
//
//   $('#buildingt').fadeOut();
//   $('#floortitle').fadeIn();
//   alloutS();
//   current = 2;
// }
//
// function displayf8()
// {
//   $('#floortitle').css('left','42%');
//   $('#floortitle').html("8th Floor");
//   $('#textbox').css('display','block');
//   turnoff_f(8);
//   $('#hold8').fadeIn();
//
//   $('#buildingt').fadeOut();
//   $('#floortitle').fadeIn();
//   alloutS();
//   current = 2;
// }

// function turnoff_f(num)
// {
//   for(var i = 5; i < 9;i++)
//     if(i != num)
//       $('#hold' + i).css("display", "none" );
// }

// back button


// var position = vm2.selected;
//   for(i = 0; i< 10; i++){
//     if (vm2.selected == vm2.options[i].text)
//     position = vm2.options[i].value;
//   }
//
//   $('#coursetest').html(position);

var second_list = [];


function book_update(){
  var db = firebase.firestore();
  var selectElement = document.getElementById("time_select_month");
  var selectElement2 = document.getElementById("time_select_day");
  var selectElement3 = document.getElementById("time_select");
  selectElement.addEventListener('change', add_book);
  selectElement2.addEventListener('change', add_book);
  selectElement3.addEventListener('change', add_book);
}

function add_book(){
  var db = firebase.firestore();
  var ele1 = document.getElementById("time_select_month");
  var ele2 = document.getElementById("time_select_day");
  var ele3 = document.getElementById("time_select");

  var the_day_tempt = $("#time_select_day option:selected").text();
  var the_month = $("#time_select_month option:selected").val();
  var time_area = $("#time_select option:selected").val();

  var the_month_text = $("#time_select_month option:selected").text();
  var dt = new Date(the_month_text+ " " + the_day_tempt +", 2019 23:15:00");
  var the_day = dt.getDay() + 1;



  var book_string = the_day_tempt + "," + the_month + "," + time_area;

  var unable_list = book_check_class(time_area,the_day);

    db.collection("room")
    .onSnapshot(function(querySnapshot) {
      var select = document.getElementById("book_select");
      select.innerHTML = '';
      querySnapshot.forEach(function(doc) {

        var ref = doc.data();
        var x = document.getElementById("book_select");
        var room_des = ref.location + ref.room;

        if(!unable_list.includes(room_des))
        {
              console.log(the_day_tempt + "," + the_month + "," + time_area);
              if(ref.book == " ")
                {
                  var option = document.createElement("option");
                  option.value = "b" + ref.location + ref.room;
                  option.text = ref.location + ref.room;
                  x.add(option);
                }
              else
              {
                var tempt_list = ref.book.split(" ");
                console.log("List first Element : " + tempt_list[0]);
                console.log("List second Element : " + tempt_list[1]);
                if(!tempt_list.includes(book_string))
                {
                  console.log("Not include : " + book_string);
                  var option2 = document.createElement("option");
                  option2.value = "b" + ref.location + ref.room;
                  option2.text = ref.location + ref.room;
                  x.add(option2);
                }
              }
        }
      });
      var select2 = document.getElementById("book_select");
      var length = select2.options.length;
      var aa = document.getElementById("showp");
      aa.innerHTML = "Number : " + length;
    });


}

function clear_book()
{
  var select = document.getElementById("book_select");
  var length = select.options.length;
  var aa = document.getElementById("showp");
  aa.innerHTML = "Length : " + length;
  if(length != 0)
  {
      for (i = 0; i < length; i++) {
        select.options[i] = null;
      }
  }
}

function confirm_book()
{
  var db = firebase.firestore();
  var the_day = $("#time_select_day option:selected").text();
  var the_month = $("#time_select_month option:selected").val();
  var time_area = $("#time_select option:selected").val();
  var book_string;

  var origin_list ;

  var room =  $("#book_select option:selected").val();
  if(room == "")
      return "error";

  db.collection("room").doc(room).get().then(function(doc) {
        var userRef = doc.data();
        origin_list = userRef.book;

  if (origin_list == " ")
     book_string = the_day + "," + the_month + "," + time_area;
  else
     book_string = origin_list + " " + the_day + "," + the_month + "," + time_area;


  let action = confirm("Confirm to Reserve " + room);
  if(action == true){
    db.collection("room").doc(room).update({"book" : book_string}).then(function() {
        console.log("Room  booked");
    });
        alert("You have successfully reserved " + room);
  }else{
        console.log("cancel book");
  }

  });
}


function courseList(lista){
  course_list_global = lista;
  console.log("course_list_global : ");
  console.log(typeof course_list_global);
  console.log(course_list_global.length);
  console.log(typeof lista);

  console.log(lista.length);
  for(var i = 0 ; i < lista.length; i++)
  {
    var x = document.getElementById("course_select");
    var option = document.createElement("option");
    option.value = i;
    option.text = lista[i][4] + "  "+ lista[i][2] + " " + lista[i][10];
    x.add(option,i);
  }
}

// function course_add(){
//   var tempt = document.getElementById("course_select");
//   var tempt_value = tempt.value;
//   var tempt_text = tempt.options[tempt_value].text;
//   var db = firebase.firestore();
//
//   db.collection('user').doc(current_user_email).collection('courses').get().then(snap => {
//   if(snap.size < 6)
//   {

function course_add(){
  var tempt = document.getElementById("course_select");
  var tempt_value = tempt.value;
  var tempt_text = tempt.options[tempt_value].text;
  var str = tempt_text.substring(0,tempt_text.length-4);
  var db = firebase.firestore();
  var check = courseConflict();
  console.log(conflict);
  courseConflict();
  db.collection('user').doc(current_user_email).collection('courses').get().then(snap => {
    if(conflict){
        alert("You already enrolled "+  str + ". Therefore, you can not enroll " + tempt_text + " again.");
    }
    else if(snap.size < 6) // will return the collection size
    {


    global_count = 1;
    let action = confirm("Do you really want to add " + tempt_text);
    if(action == true){
      addcoursefromdatabase(current_user_email,course_list_global[tempt_value][0],course_list_global[tempt_value][1],course_list_global[tempt_value][2],course_list_global[tempt_value][3],course_list_global[tempt_value][4],course_list_global[tempt_value][5],course_list_global[tempt_value][6],course_list_global[tempt_value][7],course_list_global[tempt_value][8],course_list_global[tempt_value][9],course_list_global[tempt_value][10]);
      alert("You have successfully added " + tempt_text);
    }else{
      console.log("cancel course");
    }
  }
  else{
    alert("More than 6 courses are not allowed. ");
  }

});
}

function delete_course(current_user_email,buttonid){
  console.log("=====button pressed===========");
  var countt = 0;
  var id_check ="drop_but";
  var tempt_text = $("#delete_select option:selected").text();
  var course_id = $("#delete_select").val();
  var db = firebase.firestore();
  db.collection("user").doc(current_user_email).collection('courses').where("course_id", "==", course_id)


            const action = confirm("Do you really want to delete " + tempt_text + " ?");
            if(action){
                db.collection("user").doc(current_user_email).collection('courses').doc(course_id).delete().then(function() {
                      alert("Course successfully deleted!");
                      console.log("Course successfully deleted!");
                  }).catch(function(error) {
                      console.error("Error removing course: ", error);
                  });
            }
            else
            {

            }

}

// function course_add(){
//   var tempt = $("#course_select").val();
//   var db = firebase.firestore();
//
//   db.collection('user').doc(current_user_email).collection('courses').get().then(snap => {
//   if(snap.size < 6) // will return the collection size
//   {
//       global_count = 1;
//       addcoursefromdatabase(current_user_email,course_list_global[tempt][0],course_list_global[tempt][1],course_list_global[tempt][2],course_list_global[tempt][3],course_list_global[tempt][4],course_list_global[tempt][5],course_list_global[tempt][6],course_list_global[tempt][7],course_list_global[tempt][8],course_list_global[tempt][9],course_list_global[tempt][10]);
//   }
//   else{
//     alert("More than 6 courses are not allowed. ")
//   }
//   });
// }


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

// Not Using Below anymore
// function courseList_vue(lista){
//
//   var vm2 = new Vue({
//   el: '#test',
//   data: {
//     selected: lista[0],
//     options: [
//         { text: lista[0].split(" ")[0], value: 0 },
//         { text: lista[1], value: 1 },
//         { text: lista[2], value: 2 },
//         { text: lista[3], value: 3 },
//         { text: lista[4], value: lista[4] },
//         { text: lista[5], value: lista[5] },
//         { text: lista[6], value: lista[6] },
//         { text: lista[7], value: lista[7] },
//         { text: lista[8], value: lista[8] },
//         { text: lista[9], value: lista[9] },
//
//         { text: lista[10], value: lista[10] },
//         { text: lista[11], value: lista[11] },
//         { text: lista[12], value: lista[12] },
//         { text: lista[13], value: lista[13] },
//         { text: lista[14], value: lista[14] },
//         { text: lista[15], value: lista[15] },
//         { text: lista[16], value: lista[16] },
//         { text: lista[17], value: lista[17] },
//         { text: lista[18], value: lista[18] },
//         { text: lista[19], value: lista[19] },
//
//         { text: lista[20], value: lista[20] },
//         { text: lista[21], value: lista[21] },
//         { text: lista[22], value: lista[22] },
//         { text: lista[23], value: lista[23] },
//         { text: lista[24], value: lista[24] },
//         { text: lista[25], value: lista[25] },
//         { text: lista[26], value: lista[26] },
//         { text: lista[27], value: lista[27] },
//         { text: lista[28], value: lista[28] },
//         { text: lista[29], value: lista[29] }
//     ]
//   },
// })
//
// }


function logoutclick(){
    const action = confirm("Do you really want to SignOut ");
            if(action){
                firebase.auth().signOut().then(function() {
                  window.location.href = "index.html";
                }).catch(function(error) {
                  // An error happened.
                });
            }
            else
            {
              return ;
            }
}

function goback()
{
    if(current ==1)
    {
      $('#buildingt').fadeOut();

      $('#map').fadeIn();

      $('#hold').fadeOut();
      $('#textbox').fadeOut();
      $('#floortitle').fadeOut();
      $('#floorselect').fadeOut();
      $('#floorselect16').fadeOut();
      // turnoff_f(0);
      alloutS();
      current = 0;
    }
    else if (current ==2)
    {
      $('#map').fadeIn();
      $('#message_section').css("display","none");
        current = 0;
    }
    else if (current ==3)
    {
      $('#map').fadeIn();
      $('#book_room').css("display","none");
      current = 0;
    }
    else if(current == 5)
    {
      $('#accountinfo').css("display", "none" );
      $('#map').css("display", "block" );
      current = 0;
    }
}

function allout()
{
  $('#titleA').css("display", "none" );
  $('#titleB').css("display", "none" );
  $('#titleC').css("display", "none" );
}

function alloutS()
{
  $('#titleSA').css("display", "none" );
  $('#titleSB').css("display", "none" );
  $('#titleSC').css("display", "none" );
  $('#floorselect').css("display", "none" );
  $('#floorselect16').css("display", "none" );
  $('#floortitle').css("display", "none" );

  $('#MAP16W_7').css("display", "none" );
  $('#MAP16W_8').css("display", "none" );
  $('#MAP26W').css("display", "none" );
  mapclose();
}

function b1_trigger(number)
{
  $('#floortitle').css('display','block');
  current = 1;

  $('#buildingt').css('display','block');

  $('#titleB').css("display", "none" );
  $('#titleC').css("display", "none" );
  $('#titleA').css("display", "none" );

  $('#map').fadeOut();

  if(number == 0)
  {
    $('#titleSC').css("display", "block" );
    $('#centerMAP4').css("display", "block" );
    $('#floorselect').css("display", "block" );

    $("#classdes").css("display", "block");
    eggcfloorc4();
    $('#accountinfo').css("display","none");
    allout();
  }
  else if(number == 1)
  {
    $('#titleSB').css("display", "block" );
    $('#floorselect16').css("display", "block" );

    $("#classdes").css("display", "block");
    f_select_16_7();
    $('#MAP16W_7').css("display", "block" );
    $('#accountinfo').css("display","none");
    allout();
  }
  else if(number == 2)
  {
    $('#titleSA').css("display", "block" );
    $('#MAP26W').css("display", "block" );

    $("#classdes").css("display", "block");
    $('#accountinfo').css("display","none");
    allout();
  }
}

function titela_fin()
{
  $('#titleB').css("display", "none" );
  $('#titleC').css("display", "none" );
  $('#titleA').fadeIn();
  // setTimeout(function () {
  //   $('#titleA').fadeIn();
  // }, 500);
}

function titelb_fin()
{
  $('#titleA').css("display", "none" );
  $('#titleC').css("display", "none" );
  $('#titleB').fadeIn();
  // setTimeout(function () {
  //     $('#titleB').fadeIn();
  //   }, 500);
}

function titelc_fin()
{
  $('#titleB').css("display", "none" );
  $('#titleA').css("display", "none" );
  $('#titleC').fadeIn();
  // setTimeout(function () {
  //     $('#titleC').fadeIn();
  //   }, 500);
}

function titela_fout()
{
  $('#titleA').fadeOut();
}

function titelb_fout()
{
  $('#titleB').fadeOut();
}

function titelc_fout()
{
  $('#titleC').fadeOut();
}

function showacc()
{
  if(current == 1){
    $('#buildingt').css("display", "none" );
    $('#hold').css("display", "none" );
    $('#textbox').css("display", "none" );
    $('#floortitle').css("display", "none" );
    $('#floorselect').css("display","none");
    $('#floorselect16').css("display","none");
    alloutS();
  }
  else if(current == 2){
    $('#message_section').css("display","none");
  }
  else if(current == 3){
    $('#book_room').css("display","none");
  }
  $('#accountinfo').css("display", "block" );
  $('#map').css("display", "none" );
  current = 5;
}

function mapclose()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP7').css("display", "none" );
  $('#centerMAP8').css("display", "none" );
}
function eggcfloorc4()
{
  $('#centerMAP4').css("display", "block" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP7').css("display", "none" );
  $('#centerMAP8').css("display", "none" );
  $('#eggc4').css("color", "#f44242" );
  $('#eggc6').css("color", "#000000" );
  $('#eggc7').css("color", "#000000" );
  $('#eggc8').css("color", "#000000" );
}
function eggcfloorc6()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "block" );
  $('#centerMAP7').css("display", "none" );
  $('#centerMAP8').css("display", "none" );
  $('#eggc4').css("color", "#000000" );
  $('#eggc6').css("color", "#f44242" );
  $('#eggc7').css("color", "#000000" );
  $('#eggc8').css("color", "#000000" );
}
function eggcfloorc7()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP7').css("display", "block" );
  $('#centerMAP8').css("display", "none" );
  $('#eggc4').css("color", "#000000" );
  $('#eggc6').css("color", "#000000" );
  $('#eggc7').css("color", "#f44242" );
  $('#eggc8').css("color", "#000000" );
}
function eggcfloorc8()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP7').css("display", "none" );
  $('#centerMAP8').css("display", "block" );
  $('#eggc4').css("color", "#000000" );
  $('#eggc6').css("color", "#000000" );
  $('#eggc7').css("color", "#000000" );
  $('#eggc8').css("color", "#f44242" );
}
function f_select_16_7()
{
  $('#MAP16W_8').css("display", "none" );
  $('#MAP16W_7').css("display", "block" );
  $('#ft16_8').css("color", "#000000" );
  $('#ft16_7').css("color", "#f44242" );
}
function f_select_16_8()
{
  $('#MAP16W_7').css("display", "none" );
  $('#MAP16W_8').css("display", "block" );
  $('#ft16_7').css("color", "#000000" );
  $('#ft16_8').css("color", "#f44242" );
}


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

$(document).ready(function () {
});
