
var game=new Phaser.Game(655, 655, Phaser.CANVAS,"midPart", { preload: preload, create: create,update:update});


        function preload() {

            game.load.image("background","img/chessboard_bgd.png");
            game.load.image("chance","img/icon_chessboard/chance.png");
            game.load.image("community_chest","img/icon_chessboard/community_chest.png");
            game.load.image("dice","img/icon_chessboard/dice.png");
            game.load.image("electricity","img/icon_chessboard/electricity.png");
            game.load.image("go","img/icon_chessboard/go.png");
            game.load.image("go_jail","img/icon_chessboard/go_jail.png");
            game.load.image("hotel","img/icon_chessboard/hotel.png");
            game.load.image("house","img/icon_chessboard/house.png");
            game.load.image("in_jail","img/icon_chessboard/in_jail.png");
            game.load.image("income_tax","img/icon_chessboard/income_tax.png");
            game.load.image("luxury_tax","img/icon_chessboard/luxury_tax.png");
            game.load.image("parking_lot","img/icon_chessboard/parking_lot.png");
            game.load.image("railway_station","img/icon_chessboard/railway_station.png");
            game.load.image("street_colors","img/icon_chessboard/street_colors.png");
            game.load.image("water","img/icon_chessboard/water.png");
        }
        var block = new Array(40);//to save the object of every block
        var i,j;
        /*This array is to store the information:
        name:The block name
        owner: owner
        original price
        current rent:current rent depend on the economic factor
        original rent
        with_one_house:the rent when there is one house
        with_two-house:the rent when there are two houses
        with_three_house；the rent when there are three houses
        with_four_house:the rent when there are four houses
        with_one_hotel:the rent with one hotel
        house_cost:the cost when build a house
        hotel_cost:the cost when build a hotel
        mortgage_value:
        house_amount:the amount of the house of the block
        hotel_amount:the amount of the hotel of the block
        */
        var block_information = new Array(40);
        function initial_block_information() {
            for(i=0;i<40;i++)
            {
                if(i==5||i==12||i==15||i==25||i==28||i==35)
                {
                    block_information[i]={
                        "name":"",
                        "block_id":"",
                        "position":0,
                        "owner_id":"",
                        "owner_name":"",
                        "estate_value":0,
                        "status":0,
                        "mortgage_value":0,
                        "payment":0
                    }
                }
                else
                {
                    block_information[i]={
                        "name":"",
                        "owner_name":"",
                        "block_id":0,
                        "position":0,
                        "owner_id":"",
                        "estate_value":0,
                        "status":"",
                        "street_id":"",
                        "house_value":0,
                        "house_number":0,
                        "mortgage_value":0,
                        "payment":0
                    }
                }


            }
        }
        /*
        change the table value in in_game.html
        correspond to the window show when click the chessboard
         */
        function show_block_infoContect(blockid)
        {
            //show utility information
            if(blockid==5||blockid==12||blockid==15||blockid==25||blockid==28||blockid==35)
            {

                document.getElementById("utility_block_name").innerHTML =block_information[blockid].name;
                document.getElementById("utility_owner_name").innerHTML =block_information[blockid].owner_name;
                document.getElementById("utility_estate_value").innerHTML =block_information[blockid].estate_value.toString();
                document.getElementById("utility_mortgage_value").innerHTML =block_information[blockid].mortgage_value.toString();
                document.getElementById("utility_payment").innerHTML =block_information[blockid].payment.toString();

            }
            else
            {
                document.getElementById("block_name").innerHTML =block_information[blockid].name;
                document.getElementById("owner_name").innerHTML =block_information[blockid].owner_name;
                document.getElementById("estate_value").innerHTML =block_information[blockid].estate_value.toString();
                document.getElementById("house_value").innerHTML =block_information[blockid].house_value.toString();
                document.getElementById("house_number").innerHTML =block_information[blockid].house_number.toString();
                document.getElementById("mortgage_value").innerHTML =block_information[blockid].mortgage_value.toString();
                document.getElementById("payment").innerHTML =block_information[blockid].payment.toString();

            }



        }
        /*
        picture array stores the pictures of every block
         */
        var picture = new Array(40);//to save the picture of every block
        /*
        position_x:x coordinate of every block position
        position_y:y coordinate of every block position
        */
        var position_x=new Array(40);
        var position_y=new Array(40);



        /*
        initial_player:
        player:array:store every player's information
        name:array:player's name
        id array:id
        alliance array
        pre_position
        card_num
        proterty
        avatar: the avatar of every player

        these attributes store the information of players

        player_sprite:
        this array aimed to store the sprite of each player
        sprites are showed on the canvas
         */
        var player=new Array(6);
        var player_sprite=new Array(6);
        function initial_player() {
            for(i=0;i<6;i++)
            {
                player[i]={
                    "name": "player1",
                    "id": "12345678",
                    "alliance": "america",
                    "cash": 123456789,
                    "position": 1,
                    "pre_position": 39,
                    "card_num": 1,
                    "property": [1, 2, 3],
                    "avatar":""
                }

            }

        }

        function create_player(playerid) {
            var current_create_player;
            var id=0;
            for(i=0;i<6;i++) {
                if (player[i].id == playerid) {
                    current_create_player = player[i];
                    id = i;
                }
            }
            player_sprite[i]=game.add.sprite(position_x[current_create_player.position]+parseInt(id/3)*25+5,position_y[current_create_player.position()]+25*(id%3)+5,current_create_player.avatar);
            player_sprite[i].width=20;
            player_sprite[i].height=20;
            player_sprite[i].idleFrame=0;
            game.physics.enable(player_sprite[i],Phaser.Physics.ARCADE);
        }



        /*
        this function aims to create the canvas
         */
        function create() {


            createChessBoard();
            initial_block_information();
            initial_player()


        }

        function createChessBoard()
        {
            /*
            first should determine the picture of each block
            the picture that do not change:go, in jail, parking, go to jail,community chest,luxury tax,income tax,chance
             */
            picture[0]="go";
            picture[10]="in_jail";
            picture[20]="parking_lot";
            picture[30]="go_jail";
            picture[2]="community_chest";
            picture[17]="community_chest";
            picture[33]="community_chest";
            picture[4]="income_tax";
            picture[38]="luxury_tax";
            picture[7]="chance";
            picture[22]="chance";
            picture[36]="chance";

            /*
           Draw the chessboard
            */

            game.add.tileSprite(0,0,655, 655,"background");
            var spriteCornerLeftTop = game.add.sprite(0, 0, picture[20]);
            spriteCornerLeftTop.width = width;
            spriteCornerLeftTop.height = width;
            position_x[20]=0;
            position_y[20]=0;
            block[20]=spriteCornerLeftTop;
            var spriteTop = new Array(9);
            var spriteTopSprite=new Array(9);
            for(i=1;i<10;i++)
            {
                spriteTop[i]={
                    "id":"",
                    "x":"",
                    "y":"",
                    "picture":""
                };
                spriteTop[i].id=10+i;
                spriteTop[i].x=width+height*(i-1);
                spriteTop[i].y=0;
                //here should be the picture of the item
                spriteTop[i].picture=picture[20+i];
                spriteTopSprite[i]=game.add.sprite(spriteTop[i].x+55,spriteTop[i].y+80,spriteTop[i].picture);

                //roate the picture
                spriteTopSprite[i].angle=parseInt((20+i)/10)*90;
                spriteTopSprite[i].width=height;
                spriteTopSprite[i].height=width;
                spriteTopSprite[i].inputEnabled = true;
                spriteTopSprite[i].input.useHandCursor = true;
                spriteTopSprite[i].events.onInputDown.add(listener,this);
                position_x[20+i]=width+height*(i-1);
                position_y[20+i]=0;
                block[20+i]=spriteTop[i];

            }
            var spriteCornerRightTop = game.add.sprite(width + height * 9, 0, picture[30]);
            spriteCornerRightTop.width = width;
            spriteCornerRightTop.height = width;
            position_x[30]=width+height*9;
            position_y[30]=0;
            block[30]=spriteCornerRightTop;
            var spriteLeft = new Array(9);
            var spriteLeftSprite = new Array(9);
            for (i = 1; i <= 9; i++) {
                spriteLeft[i]={
                    "id":"",
                    "x":"",
                    "y":"",
                    "picture":""
                };
                spriteLeft[i].x=0;
                spriteLeft[i].y=width+height*(i-1);
                //here should  be the picture of the item.
                spriteLeft[i].picture=picture[10+10-i];
                spriteLeftSprite[i]=game.add.sprite(spriteLeft[i].x+80,spriteLeft[i].y,spriteLeft[i].picture);
                spriteLeftSprite[i].angle=parseInt((20-i)/10)*90;
                spriteLeftSprite[i].width = height;
                spriteLeftSprite[i].height = width;
                spriteLeftSprite[i].inputEnabled = true;
                spriteLeftSprite[i].input.useHandCursor = true;
                spriteLeftSprite[i].events.onInputDown.add(listener,this);
                position_x[10+10-i]=0;
                position_y[10+10-i]=width+height*(i-1);
                block[10+10-i]=spriteLeft[i];
            }
            var spriteCornerLeftBottom = game.add.sprite(0, width + height * 9, picture[10]);
            spriteCornerLeftBottom.width = width;
            spriteCornerLeftBottom.height = width;
            position_x[10]=0;
            position_y[10]=width+height*9;
            block[10] = spriteCornerLeftBottom;
            var spriteBottom = new Array(9);
            var spriteBottomSprite=new Array(9);
            for (i = 1; i <= 9; i++) {
                spriteBottom[i]={
                    "id":"",
                    "x":"",
                    "y":"",
                    "picture":""
                };
                spriteBottom[i].x=width+height*(i-1);
                spriteBottom[i].y=width+height*9;
                //here should  be the picture of the item.
                spriteBottom[i].picture=picture[10-i];
                spriteBottomSprite[i]=game.add.sprite(spriteBottom[i].x,spriteBottom[i].y,spriteBottom[i].picture);

                spriteBottomSprite[i].angle=parseInt((10-i)/10)*90;
                spriteBottomSprite[i].width = height;
                spriteBottomSprite[i].height = width;
                spriteBottomSprite[i].inputEnabled = true;
                spriteBottomSprite[i].input.useHandCursor = true;
                spriteBottomSprite[i].events.onInputDown.add(listener,this);
                position_x[10-i]=width+height*(i-1);
                position_y[10-i]=width+height*9;
                block[10-i]=spriteBottom[i];
            }
            var spriteRight = new Array(9);
            var spriteRightSprite = new Array(9);
            for (i = 1; i <= 9; i++) {
                spriteRight[i]={
                    "id":"",
                    "x":"",
                    "y":"",
                    "picture":""
                };
                spriteRight[i].x=width+height*9;
                spriteRight[i].y=width+height*(i-1);
                //here should  be the picture of the item.
                spriteRight[i].picture=picture[30+i];
                spriteRightSprite[i]=game.add.sprite(spriteRight[i].x,spriteRight[i].y+55,spriteRight[i].picture);
                spriteRightSprite[i].angle=parseInt((30+i)/10)*90;
                spriteRightSprite[i].width = height;
                spriteRightSprite[i].height = width;
                spriteRightSprite[i].inputEnabled = true;
                spriteRightSprite[i].input.useHandCursor = true;
                spriteRightSprite[i].events.onInputDown.add(listener,this);
                position_x[30+i]=width+height*9;
                position_y[30+i]=width+height*(i-1);
                block[30+i]=spriteRight[i];
            }
            var spriteCornerRightBottom = game.add.sprite(width + height * 9, width + height * 9, picture[0]);
            block[0]=spriteCornerRightBottom;
            spriteCornerRightBottom.width = width;
            spriteCornerRightBottom.height = width;
            position_x[0]=width+height*9;
            position_y[0]=width+height*9;

        }
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
            {*/
        /*
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

        /*
        this
         */
        function move_player(player,x1_input,x2_input) {
                player.visible=false;
                var new_player=game.add.sprite(position_x[x2_input],position_y[x2_input],player.avatar);
                new_player.width=player.width;
                new_player.height=player.height;
                player=new_player;
        }

        function update() {


            //parse json file
            WebSocketTest();









        }
        /*
        listener is a array of functions
        these functions are aimed to show a window when click the sprite
         */
       function listener(pointer)
       {


                //postintion:block id
                var position=0;
                for(i=0;i<10;i++)
                {
                    if(pointer.x==position_x[i] && pointer.y==position_y[i])
                    {
                        position=i;
                    }
                }
                for(i=10;i<20;i++)
                {
                    if(pointer.x-80==position_x[i] && pointer.y==position_y[i])
                    {
                        position=i;
                    }
                }
                for(i=20;i<30;i++)
                {
                    if(pointer.x-55==position_x[i] && pointer.y-80==position_y[i])
                    {
                        position=i;
                    }
                }
                for(i=30;i<40;i++)
                {
                    if(pointer.x==position_x[i] && pointer.y-55==position_y[i])
                    {
                        position=i;
                    }
                }
           var infoWindow;
           if(position==5||blockid==12||blockid==15||blockid==25||blockid==28||blockid==35)
           {
               infoWindow = document.getElementById("informationWindowUtility");
           }
           else
           {
               infoWindow = document.getElementById("informationWindowEstate");
           }

                show_block_infoContect(position);
                infoWindow.style.visibility = "visible";
       }


        function roll_dice(dice_1, dice_2) {
            var dice = dice_1 + dice_2;
            for(i = 0; i < 5; ++i) {
                var dice_num = Math.floor(Math.random() * 6) + 1;
                switch (dice_num) {
                    case 1:
                        game.load.image('img/dice/dice1.png');
                        break;
                
                    default:
                        break;
                }
            }
             
        }


var ws = new WebSocket("ws://self.sustech.pub:8888/websocket?Id=" + guid());
var i, j;
function WebSocketTest() {
    if ("WebSocket" in window) {
        ws.onopen = function () {
            ws.send("Message to send");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            try {
                //parse json file
                dat = JSON.parse(received_msg);
                //this part is to initial block
                if (dat["type"] == "block_data")
                {
                    var block_name,block_id,position,block_type,description;
                    //change the data of the blocks
                    for(i=0;i<dat["data"].length;i++)
                    {
                        block_name = dat["data"][i]["name"];
                        block_id=dat["data"][i]["block_id"];
                        position=dat["data"][i]["position"];
                        block_type=dat["data"][i]["block_type"];
                        description=dat["data"][i]["description"];


                    }
                }
                if (dat.data_type == "")
                {

                }
            } catch (e) {
                // 不符合json格式的字符串打印出来


            }
        };
        ws.onclose = function () {

        };
    } else {

    }
}
function req() {
    var text = {"type": "json", "request": "uid"}; //json对象
    ws.send(JSON.stringify(text));//将json转化为字符串输出
}
function push() {
    var msg = document.getElementById("choice").value;
    document.getElementById("choice").value = "";
    ws.send(msg);
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function type_read(json_obj) {
    var type = json_obj.type;
    switch (type) {
        case "init":
            add_item("init", "start");
            data_iter(json_obj.data);
            add_item("init", "end");
            break;
        case "bank":
            var dat = json_obj.data[0];
            add_item("house_number", dat.house_number);
            add_item("hotel_number", dat.hotel_number);
            break;
        case "block":
            var dat = json_obj.data[0];
            add_item("name", dat.name);
            add_item("block_id", dat.block_id);
            add_item("block_id", dat.block_id);
            add_item("position", dat.position);
            add_item("description", dat.description);
            break;
        case "board":
            var dat = json_obj.data[0];
            add_item("block_list", dat.block_list);
            break;
        case "built":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("estate_id", dat.estate_id);
            add_item("built_number", dat.built_number);
            break;
        case "card":
            var dat = json_obj.data[0];
            add_item("description", dat.description);
            break;
        case "ef":
            var dat = json_obj.data[0];
            add_item("variation", dat.variation);
            add_item("cur_rate", dat.cur_rate);
            break;
        case "input":
            var dat = json_obj.data[0];
            add_item("from_player_id", dat.from_player_id);
            add_item("request", dat.request);
            break;
        case "mortgage":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("asset_id", dat.asset_id);
            break;
        case "output":
            data_iter(json_obj.data);
            break;
        case "dice_result":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("dice_result", dat.dice_result);
            break;
        case "room":
            var dat = json_obj.data[0];
            add_item("room_id", dat.room_id);
            add_item("room_name", dat.room_name);
            add_item("owner_id", dat.owner_id);
            add_item("status", dat.status);
            add_item("level", dat.level);
            add_item("init_fund", dat.init_fund);
            add_item("go_salary", dat.go_salary);
            add_item("is_limited", dat.is_limited);
            add_item("room_info", "end");
            break;
        case "estate":
            estate_iter(json_obj.data);
            break;
        case "player":
            player_iter(json_obj.data);
            break;
        case "station":
            station_iter(json_obj.data);
            break;
        case "trade":
            trade_iter(json_obj.data);
            break;
        case "utility":
            utility_iter(json_obj.data);
            break;
    }
}

function data_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        type_read(data[i]);
    }
}

function add_item(name, value) {
    document.getElementById("demo").innerHTML += name + ": " + value + "<br/>";
}


/*
add player information to player list from back end
 */
function player_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        // add_item("name", dat.name);
        // add_item("id", dat.id);
        // add_item("alliance", dat.alliance);
        // add_item("cash", dat.cash);
        // add_item("position", dat.position);
        // add_item("pre_position", dat.pre_position);
        // add_item("card_num", dat.card_num);
        // add_item("property", dat.property);
        player[i].name=dat.name;
        player[i].id=dat.id;
        player[i].alliance=dat.alliance;
        player[i].cash=Number(dat.cash);
        player[i].position =Number(dat.position);
        player[i].pre_position=Number(dat.pre_position);
        player[i].card_num=Number(dat.card_num);
        player[i].property=dat.property;
    }
}

function estate_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        var blockid=dat.position;
        block_information[blockid].name=dat.name;
        block_information[blockid].position=dat.position;
        block_information[blockid].block_id=dat.block_id;
        for (j=0;j<6;j++)
        {
            if(player[i].player_id==dat.owner_id)
            {
                block_information[blockid].owner_id=player[i].player_id;
                block_information[blockid].owner_name=player[i].name;
            }
        }
        block_information[blockid].estate_value=dat.estate_value;
        block_information[blockid].status=dat.status;
        block_information[blockid].street_id=dat.street_id;
        block_information[blockid].house_value=dat.house_value;
        block_information[blockid].house_number=dat.house_number;
        block_information[blockid].mortgage_value=dat.mortgage_value;
        block_information[blockid].payment=dat.payment;

    }
}

function utility_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        var blockid=dat.position;
        block_information[blockid].name=dat.name;
        block_information[blockid].block_id=dat.block_id;
        block_information[blockid].position=dat.position;
        for (j=0;j<6;j++)
        {
            if(player[i].player_id==dat.owner_id)
            {
                block_information[blockid].owner_id=player[i].player_id;
                block_information[blockid].owner_name=player[i].name;
            }
        }
        block_information[blockid].estate_value=dat.estate_value;
        block_information[blockid].status=dat.status;
        block_information[blockid].mortgage_value=dat.mortgage_value;
        block_information[blockid].payment=dat.payment;
    }
}

function station_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("name", dat.name);
        add_item("block_id", dat.block_id);
        add_item("position", dat.position);
        add_item("owner_id", dat.owner_id);
        add_item("estate_value", dat.estate_value);
        add_item("status", dat.status);
        add_item("mortgage_value", dat.mortgage_value);
        add_item("payment", dat.payment);
    }
}

function trade_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("player_id", dat.player_id);
        add_item("money_give", dat.money_give);
        add_item("asset_give", dat.asset_give);
        add_item("card_give", dat.card_give);
    }
}

type_read(json_demo);


// read json
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json_format/bank.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);
    });

}








