fetch('examples/example.json')
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON
  console.log(responseAsJson);
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});




var current = 0;

var current_user_email;

var course_list_global;

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



function courseList(lista){
  course_list_global = lista;
  lista.sort();
  for(var i = 0 ; i < lista.length; i++)
  {
    var x = document.getElementById("course_select");
    var option = document.createElement("option");
    option.value = i;
    option.text = lista[i][4] + "  "+ lista[i][2] + " " + lista[i][10];
    x.add(option,i);
  }
}


function course_add(){
  var tempt = $("#course_select").val();
  var db = firebase.firestore();

  db.collection('user').doc(current_user_email).collection('courses').get().then(snap => {
  if(snap.size < 6) // will return the collection size
  {
      global_count = 1;
      addcoursefromdatabase(current_user_email,course_list_global[tempt][0],course_list_global[tempt][1],course_list_global[tempt][2],course_list_global[tempt][3],course_list_global[tempt][4],course_list_global[tempt][5],course_list_global[tempt][6],course_list_global[tempt][7],course_list_global[tempt][8],course_list_global[tempt][9],course_list_global[tempt][10]);
  }
  else{
    alert("More than 6 courses are not allowed. ")
  }
  });
  // var tempt = $("#course_select").val();
  // addcoursefromdatabase(current_user_email,course_list_global[tempt][0],course_list_global[tempt][1],course_list_global[tempt][2],course_list_global[tempt][3],course_list_global[tempt][4],course_list_global[tempt][5],course_list_global[tempt][6],course_list_global[tempt][7],course_list_global[tempt][8]);
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
  $('#floortitle').css("display", "none" );

  $('#MAP16W').css("display", "none" );
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
    allout();
  }
  else if(number == 1)
  {
    $('#titleSB').css("display", "block" );
    $('#MAP26W').css("display", "block" );
    allout();
  }
  else if(number == 2)
  {
    $('#titleSA').css("display", "block" );
    $('#MAP16W').css("display", "block" );
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
  $('#centerMAP8').css("display", "none" );
}
function eggcfloorc4()
{
  $('#centerMAP4').css("display", "block" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP8').css("display", "none" );
  $('#eggc4').css("color", "#f44242" );
  $('#eggc6').css("color", "#000000" );
  $('#eggc8').css("color", "#000000" );
}
function eggcfloorc6()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "block" );
  $('#centerMAP8').css("display", "none" );
  $('#eggc4').css("color", "#000000" );
  $('#eggc6').css("color", "#f44242" );
  $('#eggc8').css("color", "#000000" );
}
function eggcfloorc8()
{
  $('#centerMAP4').css("display", "none" );
  $('#centerMAP6').css("display", "none" );
  $('#centerMAP8').css("display", "block" );
  $('#eggc4').css("color", "#000000" );
  $('#eggc6').css("color", "#000000" );
  $('#eggc8').css("color", "#f44242" );
}
$(document).ready(function () {
});
