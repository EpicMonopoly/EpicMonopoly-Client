//     var spriteTop = new Array(9);
//     for(var i=1;i<10;i++)
//     {
//         spriteTop[i]={
//             "id":"",
//             "x":"",
//             "y":"",
//             "picture":""
//         };
//         spriteTop[i].id=10+i;
//         spriteTop[i].x=width+height*(i-1);
//         spriteTop[i].y=0;
//         //here should be the picture of the item
//         spriteTop[i].picture=picture[20+i];
//         spriteTopSprite[i]=game.add.sprite(spriteTop[i].x+55,spriteTop[i].y+80,spriteTop[i].picture);
//
//         //roate the picture
//         spriteTopSprite[i].angle=parseInt((20+i)/10)*90;
//         spriteTopSprite[i].width=height;
//         spriteTopSprite[i].height=width;
//         spriteTopSprite[i].inputEnabled = true;
//         spriteTopSprite[i].input.useHandCursor = true;
//         spriteTopSprite[i].events.onInputDown.add(listener,this);
//         position_x[20+i]=width+height*(i-1);
//         position_y[20+i]=0;
//         block[20+i]=spriteTop[i];
//
//     }
//
//     var spriteLeft = new Array(9);
//     var spriteLeftSprite = new Array(9);
//     for(var i = 1; i <= 9; i++) {
//         spriteLeft[i]={
//             "id":"",
//             "x":"",
//             "y":"",
//             "picture":""
//         };
//         spriteLeft[i].x=0;
//         spriteLeft[i].y=width+height*(i-1);
//         //here should  be the picture of the item.
//         spriteLeft[i].picture=picture[10+10-i];
//         spriteLeftSprite[i]=game.add.sprite(spriteLeft[i].x+80,spriteLeft[i].y,spriteLeft[i].picture);
//         spriteLeftSprite[i].angle=parseInt((20-i)/10)*90;
//         spriteLeftSprite[i].width = height;
//         spriteLeftSprite[i].height = width;
//         spriteLeftSprite[i].inputEnabled = true;
//         spriteLeftSprite[i].input.useHandCursor = true;
//         spriteLeftSprite[i].events.onInputDown.add(listener,this);
//         position_x[10+10-i]=0;
//         position_y[10+10-i]=width+height*(i-1);
//         block[10+10-i]=spriteLeft[i];
//     }
//
//     var spriteBottom = new Array(9);
//     var spriteBottomSprite=new Array(9);
//     for(var i = 1; i <= 9; i++) {
//         spriteBottom[i]={
//             "id":"",
//             "x":"",
//             "y":"",
//             "picture":""
//         };
//         spriteBottom[i].x=width+height*(i-1);
//         spriteBottom[i].y=width+height*9;
//         //here should  be the picture of the item.
//         spriteBottom[i].picture=picture[10-i];
//         spriteBottomSprite[i]=game.add.sprite(spriteBottom[i].x,spriteBottom[i].y,spriteBottom[i].picture);
//
//         spriteBottomSprite[i].angle=parseInt((10-i)/10)*90;
//         spriteBottomSprite[i].width = height;
//         spriteBottomSprite[i].height = width;
//         spriteBottomSprite[i].inputEnabled = true;
//         spriteBottomSprite[i].input.useHandCursor = true;
//         spriteBottomSprite[i].events.onInputDown.add(listener,this);
//         position_x[10-i]=width+height*(i-1);
//         position_y[10-i]=width+height*9;
//         block[10-i]=spriteBottom[i];
//     }
//     var spriteRight = new Array(9);
//     var spriteRightSprite = new Array(9);
//     for(var i = 1; i <= 9; i++) {
//         spriteRight[i]={
//             "id":"",
//             "x":"",
//             "y":"",
//             "picture":""
//         };
//         spriteRight[i].x=width+height*9;
//         spriteRight[i].y=width+height*(i-1);
//         //here should  be the picture of the item.
//         spriteRight[i].picture=picture[30+i];
//         spriteRightSprite[i]=game.add.sprite(spriteRight[i].x,spriteRight[i].y+55,spriteRight[i].picture);
//         spriteRightSprite[i].angle=parseInt((30+i)/10)*90;
//         spriteRightSprite[i].width = height;
//         spriteRightSprite[i].height = width;
//         spriteRightSprite[i].inputEnabled = true;
//         spriteRightSprite[i].input.useHandCursor = true;
//         spriteRightSprite[i].events.onInputDown.add(listener,this);
//         position_x[30+i]=width+height*9;
//         position_y[30+i]=width+height*(i-1);
//         block[30+i]=spriteRight[i];
//     }
//
//
// }

/*
       funtion that can move the object
       player:the current moving player
       x1:the player's previous location
       x2:the player's destination
       */

/*
var x_path;
var y_path;
function path(x1_input,x2_input)
{
    var x1=parseInt(x1_input);
    var x2=parseInt(x2_input);
    var turn=Math.floor(x2/10)-Math.floor(x1/10);
    if(turn <0)
        turn=4;
    x_path=new Array(turn+1);
    y_path=new Array(turn+1);
    /*
    if (turn==0)//the player do not turn a corner
    {
        x_path[0]=position_x[x2];
        y_path[0]=position_y[x2];

    }
    if(turn == 1)//the player turn a corner
    {
        if(0<=x1<10 && 10<x2<=20)
        {
            x_path[0]=position_x[10];
            y_path[0]=position_y[10];
            x_path[1]=position_x[x2];
            y_path[1]=position_y[x2];

        }
        if(10<=x1<20 && 20<x2<=30)
        {
            x_path[0]=position_x[20];
            y_path[0]=position_y[20];
            x_path[1]=position_x[x2];
            y_path[1]=position_y[x2];
        }
        if((20<=x1<30 && 30<x2<=39)||(20<=x1<30 && x2==0))
        {
            x_path[0]=position_x[30];
            y_path[0]=position_y[30];
            x_path[1]=position_x[x2];
            y_path[1]=position_y[x2];
        }
        if(30<=x1<=39 && 0<x2<=10)
        {
            x_path[0]=position_x[0];
            y_path[0]=position_y[0];
            x_path[1]=position_x[x2];
            y_path[1]=position_y[x2];
        }
    }
    if(turn == 2)//the player turn two corner
    {
        if(0<=x1<10 && 20<x2<=30)
        {
            x_path[0]=position_x[10];
            y_path[0]=position_y[10];
            x_path[1]=position_x[20];
            y_path[1]=position_y[20];
            x_path[2]=position_x[x2];
            y_path[2]=position_y[x2];

        }
        if((10<=x1<20 && 30<x2<=39)||(10<=x1<=20 && x2==0))
        {
            x_path[0]=position_x[20];
            y_path[0]=position_y[20];
            x_path[1]=position_x[30];
            y_path[1]=position_y[30];
            x_path[2]=position_x[x2];
            y_path[2]=position_y[x2];
        }
        if(20<=x1<30 && 0<x2<=10)
        {
            x_path[0]=position_x[30];
            y_path[0]=position_y[30];
            x_path[1]=position_x[40];
            y_path[1]=position_y[40];
            x_path[2]=position_x[x2];
            y_path[2]=position_y[x2];
        }
        if(30<=x1<=39 && 10<x2<=20)
        {
            x_path[0]=position_x[0];
            y_path[0]=position_y[0];
            x_path[1]=position_x[10];
            y_path[1]=position_y[10];
            x_path[2]=position_x[x2];
            y_path[2]=position_y[x2];
        }
    }
    if(turn == 3)//the player turn three corner
    {
        if((0<=x1<10 && 30<x2<=39)||(0<=x1<10 && x2==0))
        {
            x_path[0]=position_x[10];
            y_path[0]=position_y[10];
            x_path[1]=position_x[20];
            y_path[1]=position_y[20];
            x_path[2]=position_x[30];
            y_path[2]=position_y[30];
            x_path[3]=position_x[x2];
            y_path[3]=position_y[x2];

        }
        if(10<=x1<=20 && 0<x2<10)
        {
            x_path[0]=position_x[20];
            y_path[0]=position_y[20];
            x_path[1]=position_x[30];
            y_path[1]=position_y[30];
            x_path[2]=position_x[0];
            y_path[2]=position_y[0];
            x_path[3]=position_x[x2];
            y_path[3]=position_y[x2];
        }
        if(20<=x1<30 && 10<x2<20)
        {
            x_path[0]=position_x[30];
            y_path[0]=position_y[30];
            x_path[1]=position_x[0];
            y_path[1]=position_y[0];
            x_path[2]=position_x[10];
            y_path[2]=position_y[10];
            x_path[3]=position_x[x2];
            y_path[3]=position_y[x2];
        }
        if(30<=x1<=39 && 20<x2<=30)
        {
            x_path[0]=position_x[0];
            y_path[0]=position_y[0];
            x_path[1]=position_x[10];
            y_path[1]=position_y[10];
            x_path[2]=position_x[20];
            y_path[2]=position_y[20];
            x_path[3]=position_x[x2];
            y_path[3]=position_y[x2];
        }
    }
    if(turn == 4)//the player turn four corners
    {

        var t=x1/10+1;
        if(t==4) t==0;
        for(var i=0;i<turn;i++)
        {
            x_path[i]=position_x[t*10];
            t=t+1;
            if(t==4) t==0;
        }
        x_path[turn]=position_x[x2];
        y_path[turn]=position_y[x2];
    //}


}*/

// function move_player(player,x1_input,x2_input) {
//         player.visible=false;
//         var new_player=game.add.sprite(position_x[x2_input],position_y[x2_input],player.avatar);
//         new_player.width=player.width;
//         new_player.height=player.height;
//         player=new_player;
//
// }
// function type_read(json_obj) {
//     var type = json_obj.type;
//     switch (type) {
//         case "init":
//             status="init";
//             // when we read the information "init" we can create chessboard first
//             create_ChessBoard();
//
//             break;
//         case "bank":
//             var dat = json_obj.data[0];
//             add_item("house_number", dat.house_number);
//             add_item("hotel_number", dat.hotel_number);
//             break;
//         case "block":
//             var dat = json_obj.data[0];
//             add_item("name", dat.name);
//             add_item("block_id", dat.block_id);
//             add_item("position", dat.position);
//             add_item("description", dat.description);
//             break;
//         case "board":
//             var dat = json_obj.data[0];
//             add_item("block_list", dat.block_list);
//             break;
//         case "built":
//             var dat = json_obj.data[0];
//             add_item("player_id", dat.player_id);
//             add_item("estate_id", dat.estate_id);
//             add_item("built_number", dat.built_number);
//             break;
//         case "card":
//             var dat = json_obj.data[0];
//             add_item("description", dat.description);
//             break;
//         case "ef":
//             var dat = json_obj.data[0];
//             add_item("variation", dat.variation);
//             add_item("cur_rate", dat.cur_rate);
//             break;
//         case "input":
//             var dat = json_obj.data[0];
//             add_item("from_player_id", dat.from_player_id);
//             add_item("request", dat.request);
//             break;
//         case "mortgage":
//             var dat = json_obj.data[0];
//             add_item("player_id", dat.player_id);
//             add_item("asset_id", dat.asset_id);
//             break;
//         case "output":
//             status="output";
//             data_iter(json_obj.data);
//             break;
//         case "dice_result":
//             var dat = json_obj.data[0];
//             add_item("player_id", dat.player_id);
//             add_item("dice_result", dat.dice_result);
//             break;
//         case "room":
//             var dat = json_obj.data[0];
//             add_item("room_id", dat.room_id);
//             add_item("room_name", dat.room_name);
//             add_item("owner_id", dat.owner_id);
//             add_item("status", dat.status);
//             add_item("level", dat.level);
//             add_item("init_fund", dat.init_fund);
//             add_item("go_salary", dat.go_salary);
//             add_item("is_limited", dat.is_limited);
//             add_item("room_info", "end");
//             break;
//         case "estate":
//             all_construct=all_construct+1;
//             estate_iter(json_obj.data);
//
//             break;
//         case "player":
//             player_iter(json_obj.data);
//
//             break;
//         case "station":
//             station_iter(json_obj.data);
//             break;
//         case "trade":
//             trade_iter(json_obj.data);
//             break;
//         case "utility":
//             utility_iter(json_obj.data);
//             break;
//     }
// }
//
// function data_iter(data) {
//     var i;
//     for(var i = 0; i < data.length; i++) {
//         type_read(data[i]);
//     }
// }
//
// function add_item(name, value) {
//     document.getElementById("demo").innerHTML += name + ": " + value + "<br/>";
// }