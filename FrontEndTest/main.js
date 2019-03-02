var current = 0;

function displayf5()
{
  $('#floortitle').css('left','42%');
  $('#floortitle').html("5th Floor");
  $('#textbox').css('display','block');
  turnoff_f(5);
  $('#hold5').fadeIn();
}

function displayf6()
{
  $('#floortitle').css('left','42%');
  $('#floortitle').html("6th Floor");
  $('#textbox').css('display','block');
  turnoff_f(6);
  $('#hold6').fadeIn();
}

function displayf7()
{
  $('#floortitle').css('left','42%');
  $('#floortitle').html("7th Floor");
  $('#textbox').css('display','block');
  turnoff_f(7);
  $('#hold7').fadeIn();
}

function displayf8()
{
  $('#floortitle').css('left','42%');
  $('#floortitle').html("8th Floor");
  $('#textbox').css('display','block');
  turnoff_f(8);
  $('#hold8').fadeIn();
}

function turnoff_f(num)
{
  for(var i = 5; i < 9;i++)
    if(i != num)
      $('#hold' + i).css("display", "none" );
}

function goback()
{
    if(current ==1)
    {
      $('#buildingt').fadeOut();
      $('#world').fadeIn();
      $('#hold').fadeOut();
      $('#textbox').fadeOut();
      $('#floortitle').fadeOut();
      turnoff_f(0);
      alloutS();
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
}

function b1_trigger(number)
{
  $('#floortitle').css('display','block');
  current = 1;
  $('#buildingt').fadeIn(1600);
  $('#titleB').css("display", "none" );
  $('#titleC').css("display", "none" );
  $('#titleA').css("display", "none" );
  $('#world').fadeOut();
  if(number == 0)
  {
    $('#titleSA').css("display", "block" );
    allout();
  }
  else if(number == 1)
  {
    $('#titleSB').css("display", "block" );
    allout();
  }
  else if(number == 2)
  {
    $('#titleSC').css("display", "block" );
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

$(document).ready(function () {
    var $buildingz = $('.buildingz');
    var $groundFloor = $('.floor.floor-ground');
    var floorHeight = 30;
    var floorCount = 10;
    for (var i = 1; i <= floorCount; i++) {
        var floorDefinition = {
            id: 'floor-' + i,
            "class": 'floor floor-inhabited',
            css: {
                'z-index': 10 + (i * 10),
                'top': (floorCount - i) * floorHeight + 'px'
            },
            'data-floor': i
        };
        var isLastFloor = i === floorCount;
        var $floor = $('<div>', floorDefinition).prependTo($buildingz);
        $(document.createElement('span')).prop({ "class": 'floor-number' }).html(i).prependTo($floor);
        $(document.createElement('span')).prop({ "class": 'face left' }).prependTo($floor);
        $(document.createElement('span')).prop({ "class": 'face right' }).prependTo($floor);
        $(document.createElement('span')).prop({ "class": 'face bottom' }).prependTo($floor);
        if (isLastFloor) {
            $(document.createElement('span')).prop({ "class": 'face top' }).prependTo($floor);
        }
    }
    $groundFloor.css({
        'top': ((floorCount - 1) * floorHeight) + 'px'
    });
    document.getElementById("floor-5").onclick = displayf5;
    document.getElementById("floor-6").onclick = displayf6;
    document.getElementById("floor-7").onclick = displayf7;
    document.getElementById("floor-8").onclick = displayf8;
});
