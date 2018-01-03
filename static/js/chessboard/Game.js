
var game=new Phaser.Game(655, 655, Phaser.CANVAS,"midPart", { preload: preload, create: WebSocketTest});


        function preload() {

            game.load.image("background","static/img/chessboard_bgd.png");
            game.load.image("chance","static/img/icon_chessboard/chance.png");
            game.load.image("community_chest","static/img/icon_chessboard/community_chest.png");
            game.load.image("electricity","static/img/icon_chessboard/electricity.png");
            game.load.image("go","static/img/icon_chessboard/go.png");
            game.load.image("go_jail","static/img/icon_chessboard/go_jail.png");
            game.load.image("hotel","static/img/icon_chessboard/hotel.png");
            game.load.image("house","static/img/icon_chessboard/house.png");
            game.load.image("in_jail","static/img/icon_chessboard/in_jail.png");
            game.load.image("income_tax","static/img/icon_chessboard/income_tax.png");
            game.load.image("luxury_tax","static/img/icon_chessboard/luxury_tax.png");
            game.load.image("parking_lot","static/img/icon_chessboard/parking_lot.png");
            game.load.image("railway_station","static/img/icon_chessboard/railway_station.png");
            game.load.spritesheet("street_colors","static/img/icon_chessboard/street_colors.png",165,240);
            game.load.image("water","static/img/icon_chessboard/water.png");
            game.load.spritesheet("dice", "static/img/icon_chessboard/dice.png", 140, 140);
            game.load.spritesheet("roll_dice_btn", "static/img/icon_chessboard/roll_dice_btn.png");
            game.load.spritesheet("end_turn_btn", "static/img/icon_chessboard/end_turn_btn.png");
            game.load.json('json','json/init_result.json');
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
            for(var i=0;i<40;i++)
            {
                /*
                information for stations
                 */
                if(i==5||i==15||i==25||i==35)
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
                        "payment":"",
                        "with_one_station":0,
                        "with_two_station":0,
                        "with_three_station":0,
                        "with_four_station":0
                    }
                }
                /*
                information for utility
                 */
                else if(i==12 || i==28)
                {

                }
                else if(i==0||i==10||i==20||i==30||i==2||i==4||i==7||i==17||i==22||i==33||i==36||i==38)
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
                        "payment":""
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
                        "payment":""
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
            if(blockid==5||blockid==15||blockid==25||blockid==35)
            {
                alert(block_information[blockid].house_value);
                document.getElementById("station_block_name").innerHTML =block_information[blockid].name;
                document.getElementById("station_owner_name").innerHTML =block_information[blockid].owner_name;
                document.getElementById("station_estate_value").innerHTML =block_information[blockid].estate_value.toString();
                document.getElementById("mortgage_value").innerHTML =block_information[blockid].mortgage_value.toString();
                document.getElementById("with_one_station").innerHTML=block_information[blockid].with_one_station.toString();
                document.getElementById("with_two_station").innerHTML=block_information[blockid].with_two_station.toString();
                document.getElementById("with_three_station").innerHTML=block_information[blockid].with_three_station.toString();
                document.getElementById("with_four_station").innerHTML=block_information[blockid].with_four_station.toString();

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
            for(var i=0;i<6;i++)
            {
                player[i]={
                    "name": "",
                    "id": "",
                    "alliance": "",
                    "cash": 0,
                    "position": 0,
                    "pre_position": 0,
                    "card_num": 0,
                    "property": [1, 2, 3],
                    "avatar":""
                }

            }

        }

        function create_player(playerid) {
            var current_create_player;
            var id=0;
            for(var i=0;i<6;i++) {
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



            /* add dice sprite*/


            // button1 = game.add.button1(275, 430, 'button1', function () {
            //     alert('dice stop');
            //     dice1.animations.stop();
            //     dice2.animations.stop();
            // }, this, 2, 1, 0);
            // button1.width = 50;
            // button1.height = 50;
            // button1.input.useHandCursor = true;

        /*
        create_chess_board:this function will create the blocks which will not change during the game
         */
        var chess_sprite=new Array(40);

        function create_ChessBoard()
        {
            var width=80;
            var height=55;
            /*
            first should determine the picture of each block
            the picture that do not change:go, in jail, parking, go to jail,community chest,luxury tax,income tax,chance
             */
            picture[0] = "go";
            picture[10] = "in_jail";
            picture[20] = "parking_lot";
            picture[30] = "go_jail";
            picture[2] = "community_chest";
            picture[17] = "community_chest";
            picture[33] = "community_chest";
            picture[4] = "income_tax";
            picture[38] = "luxury_tax";
            picture[7] = "chance";
            picture[22] = "chance";
            picture[36] = "chance";

            /*
           Draw the chessboard
           chess_sprite:the sprite of every block
            */
            game.add.tileSprite(0, 0, 655, 655, "background");


            chess_sprite[20] = game.add.sprite(0, 0, picture[20]);
            chess_sprite[20].width = width;
            chess_sprite[20].height = width;
            chess_sprite[30] = game.add.sprite(width + height * 9, 0, picture[30]);
            chess_sprite[30].width = width;
            chess_sprite[30].height = width;
            chess_sprite[10] = game.add.sprite(0, width + height * 9, picture[10]);
            chess_sprite[10].width = width;
            chess_sprite[10].height = width;
            chess_sprite[0] = game.add.sprite(width + height * 9, width + height * 9, picture[0]);
            chess_sprite[0].width = width;
            chess_sprite[0].height = width;

            create_block(2);
            create_block(17);
            create_block(33);
            create_block(4);
            create_block(38);
            create_block(7);
            create_block(22);
            create_block(36);
        }

        /*
        We have to solve a problem when create the chessboard:
           every estate block has their own color, and the picutre from the spritesheet, we can only add a sprite object
           so we have to juduge whether the block is utility or estate
           utility:2,4,6,7,12,15,17,22,25,28,33,35,38
         */
        function create_block(blockid) {
            var width=80;
            var height=55;
            if (20 < blockid  && blockid < 30) {
                if(blockid==25||blockid==22||blockid==28)
                {

                    chess_sprite[blockid]=game.add.sprite(width+height*(blockid-20-1)+55,80,picture[blockid]);
                    chess_sprite[blockid].angle=parseInt(blockid/10)*90;
                    chess_sprite[blockid].width=height;
                    chess_sprite[blockid].height=width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener,this);


                }
                else{

                    chess_sprite[blockid]=game.add.sprite(width+height*(blockid-20-1),0,'street_colors');
                    chess_sprite[blockid].frame=picture[blockid];
                    chess_sprite[blockid].width=height;
                    chess_sprite[blockid].height=width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener,this);


                }

            }
            if(10<blockid && blockid<20) {

                if(blockid==17||blockid==12||blockid==15) {
                    chess_sprite[blockid] = game.add.sprite(80,width + height * (20-blockid - 1) , picture[blockid]);
                    chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
                    chess_sprite[blockid].width = height;
                    chess_sprite[blockid].height = width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);


                }
                else
                {

                    chess_sprite[blockid] = game.add.sprite(0,width + height * (20-blockid-1), 'street_colors');
                    chess_sprite[blockid].frame = picture[blockid];
                    chess_sprite[blockid].width = width;
                    chess_sprite[blockid].height = height;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);


                }
            }
            if(0<blockid && blockid<10) {


                if(blockid==7||blockid==4||blockid==2||blockid==5) {
                    chess_sprite[blockid] = game.add.sprite(width + height * (10-blockid - 1), width + height * 9, picture[blockid]);
                    chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
                    chess_sprite[blockid].width = height;
                    chess_sprite[blockid].height = width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);


                }
                else
                {

                    chess_sprite[blockid] = game.add.sprite(width + height * (10-blockid - 1), width + height * 9, 'street_colors');
                    chess_sprite[blockid].frame = picture[blockid];
                    chess_sprite[blockid].width = height;
                    chess_sprite[blockid].height = width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);


                }
            }
            if(30<blockid && blockid<40) {

                if(blockid==38||blockid==35||blockid==33||blockid==36) {
                    chess_sprite[blockid] = game.add.sprite(width + height * 9, width + height * (blockid - 30 - 1) + 55, picture[blockid]);
                    chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
                    chess_sprite[blockid].width = height;
                    chess_sprite[blockid].height = width;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);


                }
                else{

                    chess_sprite[blockid] = game.add.sprite(width + height * 9, width + height * (blockid - 30 - 1), 'street_colors');
                    chess_sprite[blockid].frame=picture[blockid];
                    chess_sprite[blockid].width = width;
                    chess_sprite[blockid].height = height;
                    chess_sprite[blockid].inputEnabled = true;
                    chess_sprite[blockid].input.useHandCursor = true;
                    chess_sprite[blockid].events.onInputDown.add(listener, this);

                }
            }
        }



        /*
        create land:
         */
        //这里是生成地皮的，还没写完
        var estate=new Array(40);
        var estate_sprite=new Array(40);
        function initial_land_information() {
            for(var i=0;i<40;i++) {
                estate[i]={
                    "name": "",
                    "block_id": 0,
                    "position": 0,
                    "owner_id": "",
                    "estate_value":0,
                    "status": 0,
                    "street_id":0,
                    "house_value": 123456789,
                    "house_number": 1,
                    "mortgage_value": 123456789,
                    "payment": [
                        {"house_number": 1, "payment": 123456789},
                        {"house_number": 2, "payment": 123456789},
                        {"house_number": 3, "payment": 123456789},
                        {"house_number": 4, "payment": 123456789},
                        {"house_number": 5, "payment": 123456789},
                        {"house_number": 6, "payment": 123456789}
                    ]

                }
            }

        }















        /*
        listener is a array of functions
        these functions are aimed to show a window when click the sprite
         */
       function listener(sprite,pointer)
       {



                //postintion:block id
                var position=0;
                for(var i=1;i<10;i++)
                {

                    if(position_x[i]<pointer.x && pointer.x < position_x[i]+55 && position_y[i]<pointer.y && pointer.y<position_y[i]+80)
                    {
                        position=i;
                    }
                }
                for(var i=10;i<20;i++)
                {
                    if(pointer.x>position_x[i] && pointer.x < position_x[i]+80 && pointer.y>position_y[i] && pointer.y<position_y[i]+55)
                    {
                        position=i;
                    }
                }
                for(var i=20;i<30;i++)
                {
                    if(position_x[i]<pointer.x && pointer.x < position_x[i]+55 && position_y[i]<pointer.y && pointer.y<position_y[i]+80)
                    {
                        position=i;
                    }
                }
                for(var i=30;i<40;i++)
                {
                    if(pointer.x>position_x[i] && pointer.x<position_x[i]+80 && pointer.y>position_y[i] && pointer.y<position_y[i]+55)
                    {
                        position=i;
                    }
                }
           var infoWindow;
           if(5==position||12==position||15==position||25==position||28==position||35==position)
           {
               infoWindow = document.getElementById("informationWindowUtility");
           }
           else if(position!= 2 &&  position !=17 && position!=33 && position != 4  && position!= 38  && position!= 7  && position!= 22 && position!=  36)
           {
               infoWindow = document.getElementById("informationWindowEstate");

           }

                show_block_infoContect(position);
                infoWindow.style.visibility = "visible";
       }


        function roll_dice(dice_1, dice_2) {
            setInterval(dice1.animations.play('dice1'), 5000);
            setInterval(dice2.animations.play('dice2'), 5000);
            var dice = dice_1 + dice_2;
            for (var i = 0; i < 5; ++i) {
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

/*
just a test
 */


        function buy() {

        }


// var ws = new WebSocket("ws://self.sustech.pub:8888/websocket?Id=" + guid());
// var i, j;
function WebSocketTest() {
    var dat = game.cache.getJSON('json');
    if (dat.type=="init")
    {
        /*
        Firstly, initialize the chessboard
          Create the part that never change:four corners, tax, community chest
         */

        initial_position();
        initial_block_information();
        initial_player();
        create_ChessBoard();
        initial_dice();
        initial_button();

       
        var information=dat.data;
        for(var j=0;j<information.length;j++)
        {
            if(information[j].type=='block')
            {
                block_iter(information[j].data);
            }
            if(information[j].type=='estate')
            {
                estate_iter(information[j].data);
            }
            if(information[j].type=='utility')
            {
                utility_iter(information[j].data);
            }
            if(information[j].type=='station')
            {
                station_iter(information[j].data);
            }

            if(information[j].type=='player')
            {
                player_iter(information[j].data);
            }
        }

    }

}



// var ws = new WebSocket("ws://self.sustech.pub:8888/websocket?Id=" + guid());
// var i, j;
// function WebSocketTest() {
//     if ("WebSocket" in window) {
//         ws.onopen = function () {
//             ws.send("Message to send");
//         };
//         ws.onmessage = function (evt) {
//             var received_msg = evt.data;
//             try {
//                 //parse json file
//                 var dat = JSON.parse(received_msg);
//                 //this part is to initial block
//                 if (dat.type=="init")
//                 {
//                     /*
//                     Firstly, initialize the chessboard
//                       Create the part that never change:four corners, tax, community chest
//                      */
//                     create_ChessBoard();
//                     var information=dat.data[0];
//                     block_iter(information['block']);
//                     estate_iter(information['estate']);
//                     utility_iter(information['utility']);
//                     station_iter(information['station']);
//                     player_iter(information['player']);
//                 }
//                 if (dat.data_type == "update")
//                 {
//
//                 }
//             } catch (e) {
//                 // 不符合json格式的字符串打印出来
//
//
//             }
//         };
//         ws.onclose = function () {
//
//         };
//     } else {
//
//     }
// }
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






/*
add player information to player list from back end
 */
function player_iter(data) {
    for(var i = 0; i < data.length; i++) {
        var dat = data[i];
            for(var j=0;j<6;j++)
            {
                if(player[j].id==dat.id)
                {
                    player_sprite[j].kill();
                    player[j].name=dat.name;
                    player[j].id=dat.id;
                    player[j].alliance=dat.alliance;
                    player[j].cash=Number(dat.cash);
                    player[j].position =Number(dat.position);
                    player[j].pre_position=Number(dat.pre_position);
                    player[j].card_num=Number(dat.card_num);
                    player[j].property=dat.property;

                }
            }
        create_player(player[i].id);
    }
}

function initial_position() {
    var width=80;
    var height=55;

    position_x[20] = 0;
    position_y[20] = 0;
    position_x[30] = width + height * 9;
    position_y[30] = 0;
    position_x[10] = 0;
    position_y[10] = width + height * 9;
    position_x[0] = width + height * 9;
    position_y[0] = width + height * 9;
    for(var i=0;i<40;i++)
    {
        if(20<i && i<30)
        {

            position_x[i]=width+height*(i-20-1);
            position_y[i]=0;

        }
        if(10<i && i<20)
        {
            position_y[i] = width + height * (20-i - 1);
            position_x[i] = 0;
        }
        if(0<i && i<10)
        {
            position_x[i] = width + height * (10-i-1);
            position_y[i] = width + height * 9;
        }
        if(30<i && i<40)
        {
            position_x[i] = width + height * 9;
            position_y[i] = width + height * (i-30 - 1);
        }
    }

}
function block_iter(data) {
    for(var i=0;i<data.length;i++)
    {
        var dat=data[i];
        block[Number(dat.position)]={
            "name": "",
            "block_id": 0,
            "position": 0,
            "description": ""
        }
        block[Number(dat.position)].name=dat.name;
        block[Number(dat.position)].block_id=dat.block_id;
        block[Number(dat.position)].position=dat.position;
        block[Number(dat.position)].description=dat.description;


    }

}


function estate_iter(data) {

    for(var i = 0; i < data.length; i++) {

            var dat = data[i];
            var blockid = Number(dat.position);
            block_information[blockid].name = dat.name;
            block_information[blockid].position = dat.position;
            block_information[blockid].block_id = dat.block_id;
            block_information[blockid].estate_value = dat.estate_value;
            block_information[blockid].status = dat.status;
            block_information[blockid].street_id = dat.street_id;
            block_information[blockid].house_value = dat.house_value;
            // block_information[blockid].house_number = dat.house_number;
            block_information[blockid].mortgage_value = dat.mortgage_value;
            block_information[blockid].payment = dat.payment;
            picture[blockid] = Number(dat.street_id) - 1;
            create_block(blockid);

        //to solve the problem that the block can change
        // create_block(blockid);
        // for(var j=0;j<6;j++)
        // {
        //     if(player[j].position==blockid)
        //     {
        //         create_player(player[j].id);
        //     }
        // }

    }

}

function utility_iter(data) {

    for(var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid=Number(dat.position);
        block_information[blockid].name=dat.name;
        block_information[blockid].block_id=dat.block_id;
        block_information[blockid].position=dat.position;
        block_information[blockid].estate_value=dat.estate_value;
        block_information[blockid].status=dat.status;
        block_information[blockid].mortgage_value=dat.mortgage_value;
        block_information[blockid].payment=dat.payment;
        if(dat.name=="Power Station")
        {
            picture[blockid]='electricity';
        }
        else if(dat.name=="Water Work")
        {
            picture[blockid]='water';
        }
        create_block(blockid);

    }
}

function station_iter(data) {

    for(var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid=dat.position;
        block_information[blockid].name=dat.name;
        block_information[blockid].block_id=dat.block_id;
        block_information[blockid].position=dat.position;
        block_information[blockid].estate_value=dat.estate_value;
        block_information[blockid].status=dat.status;
        block_information[blockid].mortgage_value=dat.mortgage_value;
        block_information[blockid].with_one_stationt=dat.payment[0].payment;
        block_information[blockid].with_two_stationt=dat.payment[1].payment;
        block_information[blockid].with_three_stationt=dat.payment[2].payment;
        block_information[blockid].with_four_stationt=dat.payment[3].payment;
        picture[blockid]='railway_station';
        create_block(blockid);

    }
}

function trade_iter(data) {

    for(var i = 0; i < data.length; i++) {
        var dat = data[i];
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

function initial_dice() {
    dice1 = this.game.add.sprite(270, 270, 'dice');
    dice1.frame = 0;
    dice2 = this.game.add.sprite(340, 270, 'dice');
    dice2.frame = 0;
    dice1.width = 45;
    dice1.height = 45;
    dice2.width = 45;
    dice2.height = 45;
    dice1.animations.add('dice1', [2, 0, 3, 5, 4, 1, 0, 5, 3, 0, 1, 2, 4], 15, true);
    dice2.animations.add('dice2', [4, 1, 0, 5, 3, 1, 5, 2, 0, 2, 1, 3, 4], 15, true);
}

function initial_button() {
    button1 = game.add.button(282, 330, 'roll_dice_btn', function () {
        roll_dice();
        setTimeout(function () {
            dice1.animations.stop();
            dice2.animations.stop();
            dice1.frame = dice1_num;
            dice2.frame = dice2_num;
        }, 5000);
    }, this, 2, 1, 0);
    button1.width = 90;
    button1.height = 30;
    button1.input.useHandCursor = true;
    button2 = game.add.button(282, 370, 'end_turn_btn', function () {
        alert('End turn.'); //TODO: need to implement
    }, this, 2, 1, 0);
    button2.width = 90;
    button2.height = 30;
    button2.input.useHandCursor = true;
}




