
var game=new Phaser.Game(655, 655, Phaser.CANVAS,"midPart", { preload: preload, create: create,update:update});


        function preload() {

            game.load.image("player1", "img/avatar/icon_bug.png");
            game.load.image("background","img/chessboard_bgd.png");
            game.load.image("parking","img/icon_chessboard/parking_lot.png")
            game.load.json("");
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

                block_information[i]={
                    "block_name":"None",
                    "owner_name":"None",
                    "original_price":0,
                    "investment":0,
                    "current_rent":0,
                    "original_rent":0,
                    "with_one_house":0,
                    "with_two_house":0,
                    "with_three_house":0,
                    "with_four_house":0,
                    "with_one_hotel":0,
                    "house_cost":0,
                    "hotel_cost":0,
                    "mortgage_value":0,
                    "house_amount":0,
                    "hotel_amount":0
                }
                block_information[i].block_name="None";
                block_information[i].owner_name="None";
                block_information[i].original_price=0;
                block_information[i].investment=0;
                block_information[i].current_rent=0;
                block_information[i].original_rent=0;
                block_information[i].with_one_house=0;
                block_information[i].with_two_house=0;
                block_information[i].with_three_house=0;
                block_information[i].with_four_house=0;
                block_information[i].with_one_hotel=0;
                block_information[i].house_cost=0;
                block_information[i].hotel_cost=0;
                block_information[i].mortgage_value=0;
                block_information[i].house_amount=0;
                block_information[i].hotel_amount=0;
            }
        }
        /*
        change the table value in in_game.html
        correspond to the window show when click the chessboard
         */
        function show_block_infoContect(blockid)
        {
            document.getElementById("block_name").innerHTML =block_information[blockid].block_name;
            document.getElementById("owner_name").innerHTML =block_information[blockid].owner_name;
            document.getElementById("original_price").innerHTML =block_information[blockid].original_price;
            document.getElementById("investment").innerHTML =block_information[blockid].investment;
            document.getElementById("current_rent").innerHTML =block_information[blockid].current_rent;
            document.getElementById("original_rent").innerHTML =block_information[blockid].owner_name;
            document.getElementById("with_one_house").innerHTML =block_information[blockid].with_one_house;
            document.getElementById("with_two_house").innerHTML =block_information[blockid].with_two_house;
            document.getElementById("with_three_house").innerHTML =block_information[blockid].with_three_house;
            document.getElementById("with_four_house").innerHTML =block_information[blockid].with_four_house;
            document.getElementById("with_one_hotel").innerHTML =block_information[blockid].with_one_hotel;
            document.getElementById("house_cost").innerHTML =block_information[blockid].house_cost;
            document.getElementById("hotel_cost").innerHTML =block_information[blockid].hotel_cost;
            document.getElementById("mortgage_value").innerHTML =block_information[blockid].mortgage_value;


        }
        var picture = new Array(40);//to save the picture of every block
        var icon = new Array();
        var player1;
        var player1_x;
        var player1_y;
        var player2;
        var player2_x;
        var player2_y;
        var player3;
        var player3_x;
        var player3_y;
        var player4;
        var player4_x;
        var player4_y;
        var player5;
        var player5_x;
        var player5_y;
        var player6;
        var player6_x;
        var player6_y;
        var position_x=new Array(40);
        var position_y=new Array(40);
        function create_player1(x,y,avatar_player) {
            player1 = game.add.sprite(x,y, avatar_player);
            player1.width=20;
            player1.height=20;
            player1.idleFrame=0;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }
        function create_player2(x,y,avatar_player) {
            player2 = game.add.sprite(x,y,avatar_player);
            player2.width=20;
            player2.height=20;
            player2.idleFrame = 1;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }
        function create_player3(x,y,avatar_player) {
            player3 = game.add.sprite(x,y,avatar_player);
            player3.width=20;
            player3.height=20;
            player3.idleFrame = 2;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }
        function create_player4(x,y,avatar_player) {
            player4 = game.add.sprite(x,y,avatar_player);
            player4.width=20;
            player4.height=20;
            player4.idleFrame = 3;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }
        function create_player5(x,y,avatar_player) {
            player5 = game.add.sprite(x, y,avatar_player);
            player5.width=20;
            player5.height=20;
            player5.idleFrame = 4;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }
        function create_player6(x,y,avatar_player) {
            player6 = game.add.sprite(x,y,avatar_player);
            player6.width=20;
            player6.height=20;
            player6.idleFrame = 5;
            game.physics.enable(player1,Phaser.Physics.ARCADE);
        }

        function update_block(id) {



        }


        var width=80;//width of the sprite
        var height=55;//height of the sprite
        function create() {

            for(i=0;i<40;i++)
            {
                picture[i]='parking';
            }


            createChessBoard();
            /*
            create players
             */
            create_player1(position_x[2],position_y[2],'bug');
            initial_block_information();

                block_information[21].block_name = "yixixi";
                block_information[21].owner_name = "yixi";
                block_information[21].original_price = 0;
                block_information[21].current_rent = 233;
                block_information[21].original_rent = 233;
                block_information[21].with_one_house = 233;
                block_information[21].with_two_house = 233;
                block_information[21].with_three_house = 233;
                block_information[21].with_four_house = 233;
                block_information[21].with_one_hotel = 2333;
                block_information[21].house_cost = 2333;
                block_information[21].hotel_cost = 233;
                block_information[21].mortgage_value = 233;
                block_information[21].house_amount = 233;
                block_information[21].hotel_amount = 233;

            alert(block_information[21].with_four_house);


        }

        function createChessBoard()
        {
            /*
           Draw the chessboard
            */
            game.add.tileSprite(0,0,655,655,"background");
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
                spriteTopSprite[i]=game.add.sprite(spriteTop[i].x,spriteTop[i].y,spriteTop[i].picture);
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
                spriteLeftSprite[i]=game.add.sprite(spriteLeft[i].x,spriteLeft[i].y,spriteLeft[i].picture);
                spriteLeftSprite[i].width = width;
                spriteLeftSprite[i].height = height;
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
                spriteRightSprite[i]=game.add.sprite(spriteRight[i].x,spriteRight[i].y,spriteRight[i].picture);
                spriteRightSprite[i].width = width;
                spriteRightSprite[i].height = height;
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

        function move_player(player,x1_input,x2_input) {
                player.visible=false;
                var new_player=game.add.sprite(position_x[x2_input],position_y[x2_input],"player1");
                new_player.width=player.width;
                new_player.height=player.height;
                player=new_player;





        }
        var dat;// the data to store json
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
                var infoWindow = document.getElementById("informationWindow");
                //postintion:block id
                var position=0;
                for(i=0;i<40;i++)
                {
                    if(pointer.x==position_x[i] && pointer.y==position_y[i])
                    {
                        position=i;
                    }
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







