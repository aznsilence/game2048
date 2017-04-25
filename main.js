
(function($) {

    $.fn.mygame = function( size ) {

        // Establish our default settings
        var gameObject = $(this).attr("id");
        var blockSize = size;
        var boardSize = 4*size+40;  

        function createboard(){

          $("#"+gameObject+"").append("<div id='board' style='width:"+ boardSize +"px; height:" + boardSize +"px'></div>");
        }

        function insertSubsquare(){
          for(i = 1; i <= 16; i++)
          {
            $("#board").append("<div style='width:"+ blockSize +"px; height:"+ blockSize +"px' class='square-container' id='square-container"+i+"'></div>");
          }
        }

        function getRandomInt(min, max) {       
            // Create byte array and fill with 1 random number
            var byteArray = new Uint8Array(1);
            window.crypto.getRandomValues(byteArray);

            var range = max - min + 1;
            var max_range = 16;
            if (byteArray[0] >= Math.floor(max_range / range) * range)
                return getRandomInt(min, max);
            return min + (byteArray[0] % range);
        }

        function insertRandomTile(){

            tile_value1 = Math.random();
            tile_value2 = Math.random();

            sq_location1 = getRandomInt(1,16);
            sq_location2 = getRandomInt(1,16);

            if(tile_value1 > 0.5)
            tile_value1 = 4;
            else tile_value1 = 2;

            if(tile_value2 > 0.5)
            tile_value2 = 4;
            else tile_value2 = 2;      

            for(j = 1; j <= 16; j++)
            {
              $("#square-container"+j+"").append("<div style='width:"+ blockSize +"px; height:"+ blockSize +"px' class='tile' id='sqtile"+j+"'></div>");
            }
              
              if(sq_location1==sq_location2)
              {
                  if(sq_location2 + 1==17)
                  {
                    sq_location2 = sq_location2 - 1;
                  }
                  else
                  {
                    sq_location2 = sq_location2 + 1;
                  }
              }

              if(tile_value1==4)
                tileClass1 = "selectTileFour";
              else tileClass1 = "selectTile";

              if(tile_value2==4)
                tileClass2 = "selectTileFour";
              else tileClass2 = "selectTile";

              fontsize = 3*blockSize/110;
              $(".tile").css("font-size",fontsize+"em");

              $("#sqtile"+sq_location1+"").append("<div class='number'>"+tile_value1+"</div>");
              $("#sqtile"+sq_location2+"").append("<div class='number'>"+tile_value2+"</div>");
              $("#sqtile"+sq_location1+"").addClass(tileClass1);
              $("#sqtile"+sq_location2+"").addClass(tileClass2);
              $("#sqtile"+sq_location1+"").css({"height":blockSize});
              $("#sqtile"+sq_location2+"").css({"height":blockSize}); 

              $(".number").toggle({ effect: "scale", direction: "horizontal" });
        }

        function insertRandomOneTile(){

            tile_value1 = Math.random();

            sq_location1 = getRandomInt(1,16);

            //console.log("NUMBER EMPTY CASE:"+$(".tile:empty").length);

            if($(".tile:empty").length != 0)
            {
              while($("#sqtile"+sq_location1+":nth-child(1) .number").text()!="")
              {
                //console.log("regénère une position case tile");
                sq_location1 = getRandomInt(1,16);
                if($("#sqtile"+sq_location1+":nth-child(1) .number").text()=="")
                {
                  
                  //console.log("case tile vide trouvé ajout");
                  break;
                }
              }              
            }
            else 
            {       
                 if(

                  $("#sqtile1 div").html() != $("#sqtile5 div").html() && 
                  $("#sqtile5 div").html() != $("#sqtile9 div").html() &&
                  $("#sqtile9 div").html() != $("#sqtile13 div").html() &&
                  $("#sqtile2 div").html() != $("#sqtile6 div").html() &&
                  $("#sqtile6 div").html() != $("#sqtile10 div").html() &&
                  $("#sqtile10 div").html() != $("#sqtile12 div").html() &&
                  $("#sqtile3 div").html() != $("#sqtile7 div").html() &&
                  $("#sqtile7 div").html() != $("#sqtile11 div").html() &&
                  $("#sqtile11 div").html() != $("#sqtile15 div").html() &&
                  $("#sqtile1 div").html() != $("#sqtile2 div").html() &&
                  $("#sqtile3 div").html() != $("#sqtile4 div").html() &&
                  $("#sqtile5 div").html() != $("#sqtile6 div").html() &&
                  $("#sqtile7 div").html() != $("#sqtile8 div").html() &&
                  $("#sqtile9 div").html() != $("#sqtile10 div").html() &&
                  $("#sqtile11 div").html() != $("#sqtile12 div").html() &&
                  $("#sqtile13 div").html() != $("#sqtile14 div").html() &&
                  $("#sqtile15 div").html() != $("#sqtile16 div").html()

                  )

                {
                  $("#board").addClass("animated hinge");
                  setTimeout(function(){
                  $("#gameover").text("GAME OVER !");
                  $("#gameover").css("display","block");
                  $("#gameover").addClass("animated fadeInDown");
                  $("#replay").fadeIn("slow");
                  $("#replay").append("<span class='button_replay glyphicon glyphicon-repeat'></span><span class='text' >PLAY AGAIN</span>");
                  $(".button_replay").addClass("animated rotateIn");   
                }, 2200);

                }         
                //alert("GAME OVER");
                return;
            }

                if(tile_value1 > 0.5)
                tile_value1 = 4;
                else tile_value1 = 2;  

                fontsize = 3*blockSize/110;
                $(".tile").css("font-size",fontsize+"em");

                $("#sqtile"+sq_location1+"").append("<div class='number'>"+tile_value1+"</div>");
                $("#sqtile"+sq_location1+":nth-child(1)").addClass("selectTileFour");
                $("#sqtile"+sq_location1+":nth-child(1) .number").css({"height":blockSize});
                $("#sqtile"+sq_location1+":nth-child(1) .number").toggle({ effect: "scale", direction: "horizontal" });

                nb_tile = $('[id^="sqtile"]').length;

                for (i=1;i<=nb_tile;i++)
                {
                    if(typeof $("#sqtile"+i+" div").html()!=="undefined")
                    {
                      $("#sqtile"+i+"").css("background-color",change_color(parseInt($("#sqtile"+i+" div").text())));
                    }
                }

                for (i=1;i<=nb_tile;i++)
                {
                    if(typeof $("#sqtile"+i+" div").html()==="undefined")
                    {
                      $("#sqtile"+i+"").css("background-color","#f5f5f5");
                    }
                }
        }


function move_left(start_check,end_check,end_limit) // 2, 5, 0
{
  var multiple = false;

  for(i=0;i<3;i++)
  {
    var row1 = start_check+i;

    //console.log("CHECK CASE :"+row1+"");
    //console.log("GET VALUE FIND :"+$("#sqtile"+row1+" .number").html());

    if(row1-1 != end_limit && typeof $("#sqtile"+parseInt(row1)+" .number").html()!== "undefined")
    {
      var j = row1-1;

      get_value = $("#sqtile"+parseInt(j+1)+" div").html();
      get_value = parseInt(get_value);  

        while(typeof $("#sqtile"+parseInt(j)+" .number").html()=== "undefined" && j > end_limit)
        {
         
          //console.log("VALUE J:"+j+"");
       
          if(typeof $("#sqtile"+parseInt(j)+" div").html()== "undefined")
          {  

              
              $("#sqtile"+parseInt(j+1)).css("background-color", "");
              $("#sqtile"+parseInt(j+1)).removeClass("selectTile");
              $("#sqtile"+parseInt(j+1)).removeClass("selectTileFour");
              $("#sqtile"+parseInt(j)).addClass("selectTile");
              $("#sqtile"+parseInt(j)).css({"height":blockSize});
              $("#sqtile"+parseInt(j+1)+" div").appendTo("#sqtile"+parseInt(j));
          }
          j--;

        }
          if(typeof $("#sqtile"+parseInt(j)+" div").html()!== "undefined" && j > end_limit)
          {

              get_value_collision = $("#sqtile"+parseInt(j)+" div").html();

              if(parseInt(get_value_collision) == parseInt(get_value) && multiple===false)
              {

                multiple = true;
                score($(".score").text(),get_value_collision*2);
                
                $("#sqtile"+parseInt(j+1)).css("background-color", "");
                $("#sqtile"+parseInt(j+1)).removeClass("selectTile");
                $("#sqtile"+parseInt(j+1)).removeClass("selectTileFour");

                //$("#points").css("display","none");
                $("#points").append("<div>+ "+get_value_collision*2+" pts</div>");

                $("#points div").addClass("animated fadeOutUp");
                setTimeout(function(){
                  $("#points div").removeClass("animated fadeOutUp");
                  $("#points div").remove();
              }, 1000);

                $("#sqtile"+parseInt(j)).addClass("selectTile");
                $("#sqtile"+parseInt(j)).css({"height":blockSize});
                $("#sqtile"+parseInt(j+1)+" div").remove();
                $("#sqtile"+parseInt(j)+" div").text($("#sqtile"+parseInt(j)+" div").text()*2);

                $("#sqtile"+parseInt(j)+"").addClass("animated bounceIn");
                setTimeout(function(){$("#sqtile"+parseInt(j)+"").removeClass("animated bounceIn");}, 500);
            }
          }
        }
    } //end for
  } // end fonction


function move_UpDown(array_position) // 2, 5, 0
{
  var multiple = false;
  var array = array_position;

  for(i=2;i<5;i++)
  {
    var row1 = array[i];

    console.log("move to:"+row1);

    if(row1 != 0 && typeof $("#sqtile"+parseInt(row1)+" .number").html()!== "undefined")
    {

      var j = i-1;

      get_value = $("#sqtile"+parseInt(array[j+1])+" div").html();
      get_value = parseInt(get_value);  
      console.log("get_value:"+get_value);

        while(typeof $("#sqtile"+parseInt(array[j])+" .number").html()=== "undefined" && j > 0)
        {
       
          if(typeof $("#sqtile"+parseInt(array[j])+" div").html()== "undefined")
          {  

               $("#sqtile"+parseInt(array[j+1])).css("background-color", "");
              $("#sqtile"+parseInt(array[j+1])).removeClass("selectTile");
              $("#sqtile"+parseInt(array[j+1])).removeClass("selectTileFour");
              $("#sqtile"+parseInt(array[j])).addClass("selectTile");
              $("#sqtile"+parseInt(array[j])).css({"height":blockSize});
              $("#sqtile"+parseInt(array[j+1])+" div").appendTo("#sqtile"+parseInt(array[j]));
          }
          j--;

        }
          if(typeof $("#sqtile"+parseInt(array[j])+" div").html()!== "undefined")
          {
    
              get_value_collision = $("#sqtile"+parseInt(array[j])+" div").html();

              if(parseInt(get_value_collision) == parseInt(get_value) && multiple===false)
              {
                multiple = true;
                score($(".score").text(),get_value_collision*2);
                $("#sqtile"+parseInt(array[j+1])).css("background-color", "");
                $("#sqtile"+parseInt(array[j+1])).removeClass("selectTile");
                $("#sqtile"+parseInt(array[j+1])).removeClass("selectTileFour");
                $("#sqtile"+parseInt(array[j])).addClass("selectTile");
                $("#sqtile"+parseInt(array[j])).css({"height":blockSize});

                $("#sqtile"+parseInt(array[j+1])+" div").remove();
                $("#sqtile"+parseInt(array[j])+" div").text($("#sqtile"+parseInt(array[j])+" div").text()*2);
                $("#sqtile"+parseInt(array[j])+"").addClass("animated bounceIn");
                setTimeout(function(){$("#sqtile"+parseInt(array[j])+"").removeClass("animated bounceIn");}, 400);
            }
          }
        } 
    } //end for
  } // end fonction

function move_right(start_check,end_check,end_limit) // 2, 5, 0
{
  var multiple = false;

  for(i=0;i<3;i++)
  {
    var row1 = start_check-i;

    if(row1+1 != end_limit && typeof $("#sqtile"+parseInt(row1)+" .number").html()!== "undefined")
    {
      var j = row1+1;

      get_value = $("#sqtile"+parseInt(row1)+" div").html();
      get_value = parseInt(get_value);  

        while(typeof $("#sqtile"+parseInt(j)+" .number").html()=== "undefined" && j < end_limit)
        {
       
          if(typeof $("#sqtile"+parseInt(j)+" div").html()== "undefined")
          {  
     
              $("#sqtile"+parseInt(j-1)).css("background-color", "");
              $("#sqtile"+parseInt(j-1)).removeClass("selectTile");
              $("#sqtile"+parseInt(j-1)).removeClass("selectTileFour");
              $("#sqtile"+parseInt(j)).addClass("selectTile");
              $("#sqtile"+parseInt(j)).css({"height":blockSize});
              $("#sqtile"+parseInt(j-1)+" div").appendTo("#sqtile"+parseInt(j));
          }

          j++;
        }
          if(typeof $("#sqtile"+parseInt(j)+" div").html()!== "undefined" && j < end_limit)
          {
              get_value_collision = $("#sqtile"+parseInt(j)+" div").html();

              if(parseInt(get_value_collision) == parseInt(get_value) && multiple===false)
              {
                multiple = true;
                score($(".score").text(),get_value_collision*2);
                $("#sqtile"+parseInt(j-1)).css("background-color", "");
                $("#sqtile"+parseInt(j-1)).removeClass("selectTile");
                $("#sqtile"+parseInt(j-1)).removeClass("selectTileFour");
                $("#sqtile"+parseInt(j)).addClass("selectTile");
                $("#sqtile"+parseInt(j)).css({"height":blockSize});
                $("#sqtile"+parseInt(j-1)+" div").remove();
                $("#sqtile"+parseInt(j)+" div").text($("#sqtile"+parseInt(j)+" div").text()*2);
                $("#sqtile"+parseInt(j)+"").addClass("animated bounceIn");
                setTimeout(function(){$("#sqtile"+parseInt(j)+"").removeClass("animated bounceIn");}, 500);
            }
          }
        }
    } //end if row limit
  } //end for
// end fonction

function change_color_norandom(){

  nb_tile = $('[id^="sqtile"]').length;

  for (i=1;i<=nb_tile;i++)
  {
      if(typeof $("#sqtile"+i+" div").html()!=="undefined")
      {
        $("#sqtile"+i+"").css("background-color",change_color(parseInt($("#sqtile"+i+" div").text())));
      }
  }

  for (i=1;i<=nb_tile;i++)
  {
      if(typeof $("#sqtile"+i+" div").html()==="undefined")
      {
        $("#sqtile"+i+"").css("background-color","#f5f5f5");
      }
  }
}

function change_color(number){

  switch(number){

    case 2:
      color = "#ff7f50";
    break;

    case 4:
      color = "#ff4b09";
    break;

    case 8:
      color = "#fa4481";
    break;

    case 16:
      color = "#a275fd";
    break;

    case 32:
      color = "#3bbbd1";
    break;

    case 64:
      color = "#02e667";
    break;

    case 128:
      color = "#fc0d23";
    break;

    case 256:
      color = "#b2145e";
    break;

    case 512:
      color = "#798dec";
    break;

    case 1024:
      color = "#632da6";
    break;

    case 2048:
      color = "#80de18";
    break;

    default:
      color = "#ff7f50";

  }

  return color;
}

var count_left = 0;
var count_right = 0;
var count_up = 0;
var count_down = 0;

function score(score_atm,add_score){

    $.ajax({
    url : 'score.php',
    type : 'POST',
    dataType : 'html',
    data: 'score=' + score_atm + '& add_score=' + add_score,
    success : function(data, statut){

        //alert(data);              
         $('.score').text("");
         $('.score').append("<br/>"+data+" points");
         $('.score').addClass("animated bounceIn");
         setTimeout(function(){$(".score").removeClass("animated bounceIn");}, 400);



         $('.score_best').text("");
         $('.score_best').append("<br/>"+data+" points");
     
    },

    error : function(data, statut, erreur){

  $(".error").append("<div class='alert alert-danger'><strong>Error: </strong>" + erreur + "</div>"); 

    },

    
     complete : function(data, statut){

       }
  })
}

function control()
{
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          //console.log("left");
          count_left++;
          count_right = 0;
          count_up = 0;
          count_down = 0;

          move_left(2,5,0); // check ROW 1
          move_left(6,9,4); // check ROW 2
          move_left(10,13,8); // check ROW 3
          move_left(14,17,12); // check ROW 4

          if(count_left==1)
          {
            insertRandomOneTile();
          }
          else{
            if(typeof $("#sqtile1 div").html()!=="undefined" && typeof $("#sqtile5 div").html()!=="undefined" && typeof $("#sqtile9 div").html()!=="undefined" && typeof $("#sqtile13 div").html()!=="undefined")
            {
              
              change_color_norandom();
              return;
            }
            else
            {
              insertRandomOneTile();
            }
          }

          break;

          case 38: // up
          //console.log("up")
          count_up++;
          count_right = 0;
          count_left = 0;
          count_down = 0;

          move_UpDown([0,1,5,9,13]);
          move_UpDown([0,2,6,10,14]);
          move_UpDown([0,3,7,11,15]);
          move_UpDown([0,4,8,12,16]);

          if(count_up==1)
          {
            insertRandomOneTile();
          }
          else{

                if(typeof $("#sqtile1 div").html()!=="undefined" && typeof $("#sqtile2 div").html()!=="undefined" && typeof $("#sqtile3 div").html()!=="undefined" && typeof $("#sqtile4 div").html()!=="undefined")
                {
                  change_color_norandom();
                  return;
                }
                else
                {
                  insertRandomOneTile();
                }
          }
          
          break;

          case 39: // right
          //console.log("right");
          count_right++;
          count_left = 0;
          count_up = 0;
          count_down = 0;

          move_right(3,0,5); // check ROW 1
          move_right(7,4,9); // check ROW 2
          move_right(11,8,13); // check ROW 3
          move_right(15,12,17); // check ROW 4

          if(count_right==1)
          {
            insertRandomOneTile();
          }
          else
          {
            if(typeof $("#sqtile4 div").html()!=="undefined" && typeof $("#sqtile8 div").html()!=="undefined" && typeof $("#sqtile12 div").html()!=="undefined" && typeof $("#sqtile16 div").html()!=="undefined")
            {
              change_color_norandom();
              return;
            }
            else
            {
              insertRandomOneTile();
            }
          }
          
          break;

          case 40: // down
          //console.log("down");
          count_down++;
          count_right = 0;
          count_up = 0;
          count_left = 0;

          move_UpDown([0,13,9,5,1]);
          move_UpDown([0,14,10,6,2]);
          move_UpDown([0,15,11,7,3]);
          move_UpDown([0,16,12,8,4]);

          if(count_down==1)
          {
            insertRandomOneTile();
          }
          else
          {
            if(typeof $("#sqtile13 div").html()!=="undefined" && typeof $("#sqtile14 div").html()!=="undefined" && typeof $("#sqtile15 div").html()!=="undefined" && typeof $("#sqtile16 div").html()!=="undefined")
            {
              change_color_norandom();
              return;
            }
            else
            {
              insertRandomOneTile();
            }
          }
          
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

}
        return this.each( function() {
            // We'll get back to this in a moment
            createboard();
            insertSubsquare();
            insertRandomTile();
            control();
        });

    }

}(jQuery));