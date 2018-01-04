var ws;
var game = new Phaser.Game(655, 655, Phaser.CANVAS, "game", {
    preload: preload,
    create: WebSocketTest
});


function preload() {

    game.load.image("background", "static/img/chessboard_bgd.png");
    game.load.image("chance", "static/img/icon_chessboard/chance.png");
    game.load.image("community_chest", "static/img/icon_chessboard/community_chest.png");
    game.load.image("electricity", "static/img/icon_chessboard/electricity.png");
    game.load.image("go", "static/img/icon_chessboard/go.png");
    game.load.image("go_jail", "static/img/icon_chessboard/go_jail.png");
    game.load.spritesheet("hotel", "static/img/icon_chessboard/hotel.png", 200, 200);
    game.load.spritesheet("house", "static/img/icon_chessboard/house.png", 200, 200);
    game.load.image("in_jail", "static/img/icon_chessboard/in_jail.png");
    game.load.image("income_tax", "static/img/icon_chessboard/income_tax.png");
    game.load.image("luxury_tax", "static/img/icon_chessboard/luxury_tax.png");
    game.load.image("parking_lot", "static/img/icon_chessboard/parking_lot.png");
    game.load.image("railway_station", "static/img/icon_chessboard/railway_station.png");
    game.load.spritesheet("street_colors", "static/img/icon_chessboard/street_colors.png", 165, 240);
    game.load.spritesheet("avatar", "static/img/icon_chessboard/avatars.png", 200, 200);
    game.load.image("water", "static/img/icon_chessboard/water.png");
    game.load.spritesheet("dice", "static/img/icon_chessboard/dice.png", 140, 140);
    game.load.spritesheet("roll_dice_btn", "static/img/icon_chessboard/roll_dice_btn.png");
    game.load.spritesheet("end_turn_btn", "static/img/icon_chessboard/end_turn_btn.png");
    game.load.json('json', 'static/json/init_result.json');
    game.load.json('update', 'static/json/update.json');
    game.load.json("dice_result", 'static/json/dice_result.json');
    ws = new WebSocket("ws://10.20.2.35:8888/websocket?Id=" + sessionStorage.uid + "&roomid=" + sessionStorage.room_id);
    game.load.json('record', 'static/json/record.json');
}

var block = new Array(40); //to save the object of every block

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
    for (var i = 0; i < 40; i++) {
        /*
        information for stations
         */
        if (i == 5 || i == 15 || i == 25 || i == 35) {
            block_information[i] = {
                "name": "",
                "block_id": "",
                "position": 0,
                "owner_id": "",
                "owner_name": "",
                "estate_value": 0,
                "status": 0,
                "mortgage_value": 0,
                "payment": "",
                "with_one_station": 0,
                "with_two_station": 0,
                "with_three_station": 0,
                "with_four_station": 0
            }
        }
        /*
        information for utility
         */
        else if (i == 12 || i == 28) {
            block_information[i] = {
                "estate_value": 0,
                "block_id": 0,
                "mortgage_value": 75.0,
                "position": 12,
                "owner_id": "99",
                "name": "Power Station",
                "status": -1,
                "rate_with_one_utility": 0,
                "rate_with_two_utility": 0,
                "owner_name": ""
            }
        } else if (i == 0 || i == 10 || i == 20 || i == 30 || i == 2 || i == 4 || i == 7 || i == 17 || i == 22 || i == 33 || i == 36 || i == 38) {
            block_information[i] = {
                "name": "",
                "owner_name": "",
                "block_id": 0,
                "position": 0

            }

        } else {
            block_information[i] = {
                "name": "",
                "owner_name": "",
                "block_id": 0,
                "position": 0,
                "owner_id": "",
                "estate_value": 0,
                "status": "",
                "street_id": "",
                "house_value": 0,
                "has_house": 0,
                "mortgage_value": 0,
                "with_one_house": 0,
                "with_two_house": 0,
                "with_three_house": 0,
                "with_four_house": 0,
                "with_five_house": 0,
                "with_six_house": 0
            }
        }
    }
}

/*
change the table value in in_game.html
correspond to the window show when click the chessboard
 */
function show_block_infoContect(blockid) {
    //show utility information
    if (blockid == 12 || blockid == 28) {

        document.getElementById("utility_block_name").innerHTML = block_information[blockid].name;
        document.getElementById("utility_owner_name").innerHTML = block_information[blockid].owner_name;
        document.getElementById("utility_estate_value").innerHTML = block_information[blockid].estate_value.toString();
        document.getElementById("utility_mortgage_value").innerHTML = block_information[blockid].mortgage_value.toString();
        document.getElementById("with_one_utility").innerHTML = block_information[blockid].rate_with_one_utility.toString();
        document.getElementById("with_two_utility").innerHTML = block_information[blockid].rate_with_two_utility.toString();

    } else if (blockid == 5 || blockid == 15 || blockid == 25 || blockid == 35) {
        document.getElementById("station_block_name").innerHTML = block_information[blockid].name;
        document.getElementById("station_owner_name").innerHTML = block_information[blockid].owner_name;
        document.getElementById("station_estate_value").innerHTML = block_information[blockid].estate_value.toString();
        document.getElementById("mortgage_value").innerHTML = block_information[blockid].mortgage_value.toString();
        document.getElementById("with_one_station").innerHTML = block_information[blockid].with_one_station.toString();
        document.getElementById("with_two_station").innerHTML = block_information[blockid].with_two_station.toString();
        document.getElementById("with_three_station").innerHTML = block_information[blockid].with_three_station.toString();
        document.getElementById("with_four_station").innerHTML = block_information[blockid].with_four_station.toString();

    } else if (blockid != 2 && blockid != 17 && blockid != 33 && blockid != 4 && blockid != 38 && blockid != 7 && blockid != 22 && blockid != 36) {
        document.getElementById("block_name").innerHTML = block_information[blockid].name;
        document.getElementById("owner_name").innerHTML = block_information[blockid].owner_name;
        document.getElementById("estate_value").innerHTML = block_information[blockid].estate_value.toString();
        document.getElementById("mortgage_value").innerHTML = block_information[blockid].mortgage_value.toString();
        document.getElementById("with_one_house").innerHTML = block_information[blockid].with_one_house.toString();
        document.getElementById("with_two_house").innerHTML = block_information[blockid].with_two_house.toString();
        document.getElementById("with_three_house").innerHTML = block_information[blockid].with_three_house.toString();
        document.getElementById("with_four_house").innerHTML = block_information[blockid].with_four_house.toString();
        document.getElementById("with_five_house").innerHTML = block_information[blockid].with_five_house.toString();
        document.getElementById("with_six_house").innerHTML = block_information[blockid].with_six_house.toString();
        document.getElementById("house_value").innerHTML = block_information[blockid].house_value.toString();
        document.getElementById("house_number").innerHTML = block_information[blockid].has_house.toString();

    }


}

/*
picture array stores the pictures of every block
 */
var picture = new Array(40); //to save the picture of every block
/*
position_x:x coordinate of every block position
position_y:y coordinate of every block position
*/
var position_x = new Array(40);
var position_y = new Array(40);


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
var player = new Array(6);
var player_sprite = new Array(6);

function initial_player() {
    for (var i = 0; i < 6; i++) {
        player[i] = {
            "name": "",
            "id": "",
            "alliance": "",
            "cash": 0,
            "position": 0,
            "pre_position": 0,
            "card_num": 0,
            "property": [1, 2, 3],
            "avatar_id": "",
            "avatar_color": ""
        }

    }

}

function create_player(playerid) {
    var current_create_player;
    var id = 0;
    for (var i = 0; i < 6; i++) {
        if (player[i].id == playerid) {
            current_create_player = player[i];
            id = i;
        }
    }
    player_sprite[id] = game.add.sprite(position_x[current_create_player.position] + parseInt(id / 3) * 10 + 5, position_y[current_create_player.position] + 10 * (id % 3) + 5, 'avatar');
    player_sprite[id].frame = current_create_player.avatar_id * 6 + current_create_player.avatar_color;
    player_sprite[id].width = 20;
    player_sprite[id].height = 20;
    player_sprite[id].idleFrame = 0;
    game.physics.enable(player_sprite[id], Phaser.Physics.ARCADE);
}


/*
create_chess_board:this function will create the blocks which will not change during the game
 */
var chess_sprite = new Array(40);

function create_ChessBoard() {
    var width = 80;
    var height = 55;
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
    var width = 80;
    var height = 55;
    if (20 < blockid && blockid < 30) {
        if (blockid == 25 || blockid == 22 || blockid == 28) {

            chess_sprite[blockid] = game.add.sprite(width + height * (blockid - 20 - 1) + 55, 80, picture[blockid]);
            chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        } else {

            chess_sprite[blockid] = game.add.sprite(width + height * (blockid - 20 - 1), 0, 'street_colors');
            chess_sprite[blockid].frame = picture[blockid];
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        }

    }
    if (10 < blockid && blockid < 20) {

        if (blockid == 17 || blockid == 12 || blockid == 15) {
            chess_sprite[blockid] = game.add.sprite(80, width + height * (20 - blockid - 1), picture[blockid]);
            chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        } else {

            chess_sprite[blockid] = game.add.sprite(0, width + height * (20 - blockid - 1), 'street_colors');
            chess_sprite[blockid].frame = picture[blockid];
            chess_sprite[blockid].width = width;
            chess_sprite[blockid].height = height;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        }
    }
    if (0 < blockid && blockid < 10) {


        if (blockid == 7 || blockid == 4 || blockid == 2 || blockid == 5) {
            chess_sprite[blockid] = game.add.sprite(width + height * (10 - blockid - 1), width + height * 9, picture[blockid]);
            chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        } else {

            chess_sprite[blockid] = game.add.sprite(width + height * (10 - blockid - 1), width + height * 9, 'street_colors');
            chess_sprite[blockid].frame = picture[blockid];
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        }
    }
    if (30 < blockid && blockid < 40) {

        if (blockid == 38 || blockid == 35 || blockid == 33 || blockid == 36) {
            chess_sprite[blockid] = game.add.sprite(width + height * 9, width + height * (blockid - 30 - 1) + 55, picture[blockid]);
            chess_sprite[blockid].angle = parseInt(blockid / 10) * 90;
            chess_sprite[blockid].width = height;
            chess_sprite[blockid].height = width;
            chess_sprite[blockid].inputEnabled = true;
            chess_sprite[blockid].input.useHandCursor = true;
            chess_sprite[blockid].events.onInputDown.add(listener, this);


        } else {

            chess_sprite[blockid] = game.add.sprite(width + height * 9, width + height * (blockid - 30 - 1), 'street_colors');
            chess_sprite[blockid].frame = picture[blockid];
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


//买地皮


//抵押后地皮消失
//盖房子
var block_house = new Array(40)
var block_house_number = new Array(40);

function initial_block_sprite() {
    for (var i = 0; i < 40; i++) {
        block_house_number[i] = 0;
        block_house[i] = new Array(6);
    }

}

function create_house(blockid) {
    var color;

    for (var i = 0; i < 6; i++) {
        if (player[i].id == block_information[blockid].owner_id) {

            color = player[i].avatar_color;
        }
    }

    for (var i = block_house_number[blockid]; i < block_information[blockid].has_house; i++) {
        if (i < 4) {
            block_house[blockid][i] = game.add.sprite(position_x[blockid] + 5 + 25 * parseInt(i / 2), position_y[blockid] + 5 + 25 * (1 - i % 2), 'house');
            block_house[blockid][i].frame = color;
            block_house[blockid][i].width = 20;
            block_house[blockid][i].height = 20;
        } else if (i == 4) {
            block_house[blockid][0].kill();
            block_house[blockid][1].kill();
            block_house[blockid][2].kill();
            block_house[blockid][3].kill();
            block_house[blockid][4] = game.add.sprite(position_x[blockid] + 5, position_y[blockid] + 5, 'hotel');
            block_house[blockid][4].frame = color;
            block_house[blockid][i].width = 20;
            block_house[blockid][i].height = 20;
        } else if (i == 5) {

            block_house[blockid][5] = game.add.sprite(position_x[blockid] + 5, position_y[blockid] + 30, 'hotel');
            block_house[blockid][5].frame = color;
            block_house[blockid][i].width = 20;
            block_house[blockid][i].height = 20;
        }
        block_house_number[blockid] = block_information[blockid].has_house;
    }


}


/*
listener is a array of functions
these functions are aimed to show a window when click the sprite
 */
var current_choose_block;

function listener(sprite, pointer) {



    //postintion:block id
    var position = 0;
    for (var i = 1; i < 10; i++) {

        if (position_x[i] < pointer.x && pointer.x < position_x[i] + 55 && position_y[i] < pointer.y && pointer.y < position_y[i] + 80) {
            position = i;
        }
    }
    for (var i = 10; i < 20; i++) {
        if (pointer.x > position_x[i] && pointer.x < position_x[i] + 80 && pointer.y > position_y[i] && pointer.y < position_y[i] + 55) {
            position = i;
        }
    }
    for (var i = 20; i < 30; i++) {
        if (position_x[i] < pointer.x && pointer.x < position_x[i] + 55 && position_y[i] < pointer.y && pointer.y < position_y[i] + 80) {
            position = i;
        }
    }
    for (var i = 30; i < 40; i++) {
        if (pointer.x > position_x[i] && pointer.x < position_x[i] + 80 && pointer.y > position_y[i] && pointer.y < position_y[i] + 55) {
            position = i;
        }
    }
    var infoWindow;
    if (12 == position || 28 == position) {
        infoWindow = document.getElementById("informationWindowUtility");
    } else if (5 == position || 15 == position || 25 == position || 35 == position) {
        infoWindow = document.getElementById("informationWindowStation");
    } else if (position != 2 && position != 17 && position != 33 && position != 4 && position != 38 && position != 7 && position != 22 && position != 36) {
        infoWindow = document.getElementById("informationWindowEstate");

    } else {
        return;
    }

    show_block_infoContect(position);
    current_choose_block = position;
    infoWindow.style.visibility = "visible";
}


function roll_dice() {
    setInterval(dice1.animations.play('dice1'), 3000);
    setInterval(dice2.animations.play('dice2'), 3000);
    var string;
    string = {
        "type": "input",
        "data": [{
            "from_player_id": sessionStorage.uid,
            "request": 2
        }]
    }
    ws.send(JSON.stringify(string));
    button1.visible = false;
    // var dice = dice_1 + dice_2;
}


function buy() {

}


// var ws = new WebSocket("ws://self.sustech.pub:8888/websocket?Id=" + guid());
// function WebSocketTest() {
//     var dat1 = game.cache.getJSON('json');
//
// }

var cur_player;
function WebSocketTest() {
    if ("WebSocket" in window) {
        ws.onopen = function () {
            ws.send("Message to send");
        };
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            console.log(received_msg);
            try {
                //parse json file
                var dat = JSON.parse(received_msg);
                //this part is to initial block
                console.log(dat);
                if (dat.type == "init") {
                    console.log("init");
                    /*
                    Firstly, initialize the chessboard
                      Create the part that never change:four corners, tax, community chest
                     */
                    var canvas = document.getElementById("game");
                    canvas.style.visibility = "visible";
                    var startBtn = document.getElementById("startBtn");
                    startBtn.style.visibility = "hidden";
                    console.log("visible");
                    initial_position();
                    initial_block_information();
                    initial_player();
                    create_ChessBoard();
                    initial_dice();
                    initial_button();
                    initial_block_sprite();

                    var information = dat.data;
                    for (var j = 0; j < information.length; j++) {
                        if (information[j].type == 'block') {
                            block_iter(information[j].data);
                        }
                        if (information[j].type == 'estate') {
                            estate_iter(information[j].data);
                        }
                        if (information[j].type == 'utility') {
                            utility_iter(information[j].data);
                        }
                        if (information[j].type == 'station') {
                            station_iter(information[j].data);
                        }

                        if (information[j].type == 'player') {
                            player_iter(information[j].data);
                        }
                        if (information[j].type == 'ef') {
                            document.getElementById("economic_factor").innerHTML = information[j].data[0].cur_rate;
                        }
                    }

                }

                // var dat2 = game.cache.getJSON('update');
                if (dat.type == "update") {
                    var information = dat.data;
                    for (var j = 0; j < information.length; j++) {
                        if (information[j].type == 'estate') {
                            estate_update(information[j].data);
                        } else if (information[j].type == 'utility') {
                            utility_update(information[j].data);
                        } else if (information[j].type == 'station') {
                            station_update(information[j].data);
                        } else if (information[j].type == 'player') {
                            player_update(information[j].data);
                        } else if (information[j].type == 'ef') {
                            document.getElementById("economic_factor").innerHTML = information[j].data[0].cur_rate;
                        } else if (information[j].type == 'bank') {
                            document.getElementById("house_in_bank").innerHTML = information[j].data[0].house_number;
                            document.getElementById("hotel_in_bank").innerHTML = information[j].data[0].hotel_number;
                        }
                    }
                }
                // var dat3 = game.cache.getJSON('choice');
                if (dat.type == 'choice') {
                    var choice_text=document.getElementById("choice_text");
                    choice_text.innerHTML=dat.data[0].message;
                    var choice_window = document.getElementById("choiceWindow");
                    choice_window.style.visibility = "visible";
                }
                // var dat4 = game.cache.getJSON('hint');
                if (dat.type == 'hint') {

                    var myText = dat.data[0].message;
                    alert(myText);
                    // this.instructions = this.add.text(game.world.centerX, game.world.centerY,
                    //     myText, {
                    //         font: '50px lato',
                    //         fill: '#f5f5f5',
                    //         align: 'center'
                    //     }
                    // );
                    // this.instructions.stroke = "#7f34de";
                    // this.instructions.strokeThickness = 16;
                    // //  Apply the shadow to the Stroke only
                    // this.instructions.setShadow(1, 1, "#333333", 1, true, false);
                    // this.instructions.anchor.setTo(0.5, 0.5);
                    // this.time.events.add(1000, this.instructions.destroy, this.instructions);
                   

                }

                // var dat5 = game.cache.getJSON('dice_result');
                if (dat.type == 'dice_result') {

                    dice1_num = dat.data[0].dice_result[0];
                    dice2_num = dat.data[0].dice_result[1];
                    console.log(dice1_num);
                    console.log(dice2_num);
                }

                if (dat.type == 'newturn') {
                    cur_player = dat.data[0].id;
                    console.log(sessionStorage.uid);
                    console.log(cur_player);
                    if (sessionStorage.uid == cur_player) {
                        button1.visible = true;
                        button2.visible = true;
                    }
                    else {
                        button1.visible = false;
                        button2.visible = false;
                    }
                }

                if (dat.type == 'record') {
                    addToRecords(dat.data[0].message);
                }

            } catch (e) {
                //not json format
            }
        }
    }
}
function mortgage() {

    if (block_information[current_choose_block].owner_id == sessionStorage.uid && block_information[current_choose_block].status == 1) {
        string = {
            "type": "input",
            "data": [{
                "from_player_id": sessionStorage.uid,
                "request": 5,
            }]
        }
        string_2 = {
            "type": "input",
            "data": [{
                "from_player_id": sessionStorage.uid,
                "request": block_information[current_choose_block].block_id
            }]
        }
    }
    ws.send(JSON.stringify(string));
    ws.send(JSON.stringify(string_2));

}
/*
solve the choice json
 */

function choose_yes() {
    var string;
    string = {
        "type": "input",
        "data": [{
            "from_player_id": sessionStorage.uid,
            "request": 1
        }]
    }
    ws.send(JSON.stringify(string));
    var choice_window = document.getElementById("choiceWindow");
    choice_window.style.visibility = "hidden";
    
}

function choose_no() {
    var string;
    string = {
        "type": "input",
        "data": [{
            "from_player_id": sessionStorage.uid,
            "request": 2
        }]
    }
    ws.send(JSON.stringify(string));
    var choice_window = document.getElementById("choiceWindow");
    choice_window.style.visibility = "hidden";
}

// function WebSocketTest() {
//     if ("WebSocket" in window) {
//         ws.onopen = function () {
//             ws.send("Message to send");
//         };
//         ws.onmessage = function (evt) {
//             var received_msg = evt.data;
//
//             try {
//                 //parse json file
//                 var dat = JSON.parse(received_msg);
//                 //this part is to initial block
//                 if (dat.type == "init") {
//                     /*
//                     Firstly, initialize the chessboard
//                       Create the part that never change:four corners, tax, community chest
//                      */
//                     var canvas = document.getElementById("game");
//                     canvas.style.visibility = "visible";
//                     initial_position();
//                     initial_block_information();
//                     initial_player();
//                     create_ChessBoard();
//                     initial_dice();
//                     initial_button();
//                     initial_block_sprite();
//
//                     var information = dat.data;
//                     for (var j = 0; j < information.length; j++) {
//                         if (information[j].type == 'block') {
//                             block_iter(information[j].data);
//                         }
//                         if (information[j].type == 'estate') {
//                             estate_iter(information[j].data);
//                         }
//                         if (information[j].type == 'utility') {
//                             utility_iter(information[j].data);
//                         }
//                         if (information[j].type == 'station') {
//                             station_iter(information[j].data);
//                         }
//
//                         if (information[j].type == 'player') {
//                             player_iter(information[j].data);
//                         }
//                         if (information[j].type == 'ef') {
//                             document.getElementById("economic_factor").innerHTML = information[j].data[0].cur_rate;
//                         }
//                     }
//
//                 }
//
//
//                 if (dat.type == "update") {
//                     var information = dat.data;
//                     for (var j = 0; j < information.length; j++) {
//                         if (information[j].type == 'estate') {
//                             estate_update(information[j].data);
//                         }
//                         else if (information[j].type == 'utility') {
//                             utility_update(information[j].data);
//                         }
//                         else if (information[j].type == 'station') {
//                             station_update(information[j].data);
//                         }
//                         else if (information[j].type == 'player') {
//                             player_update(information[j].data);
//                         }
//                         else if (information[j].type == 'ef') {
//                             document.getElementById("economic_factor").innerHTML = information[j].data[0].cur_rate;
//                         }
//                         else if (information[j].type == 'bank') {
//                             document.getElementById("house_in_bank").innerHTML = information[j].data[0].house_number;
//                             document.getElementById("hotel_in_bank").innerHTML = information[j].data[0].hotel_number;
//                         }
//                     }
//                 }
//
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



// function req() {
//     var text = {"type": "json", "request": "uid"}; //json对象
//     ws.send(JSON.stringify(text));//将json转化为字符串输出
// }



/*
add player information to player list from back end
 */
function player_iter(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        player[i].name = dat.name;
        player[i].id = dat.id;
        player[i].alliance = dat.alliance;
        player[i].cash = Number(dat.cash);
        player[i].position = Number(dat.position);
        player[i].pre_position = Number(dat.pre_position);
        player[i].card_num = Number(dat.card_num);
        player[i].property = dat.property;
        player[i].avatar_id = dat.avatar[0];
        player[i].avatar_color = dat.avatar[1];
        create_player(player[i].id);
        var string="player"+((i+1).toString());
        var avatar="avatar"+((i+1).toString());
        var cash="player"+((i+1).toString())+"_cash";
        setAvatar(avatar,player[i].avatar_id,player[i].avatar_color);
        var player_info=document.getElementById(string);
        player_info.style.visibility="visible";
        string=string+"_name";
        var player_name=document.getElementById(string);
        player_name.innerHTML=player[i].name;
        var player_cash=document.getElementById(cash);
        player_cash.innerHTML=player[i].cash;

    }
}

function initial_position() {
    var width = 80;
    var height = 55;

    position_x[20] = 0;
    position_y[20] = 0;
    position_x[30] = width + height * 9;
    position_y[30] = 0;
    position_x[10] = 0;
    position_y[10] = width + height * 9;
    position_x[0] = width + height * 9;
    position_y[0] = width + height * 9;
    for (var i = 0; i < 40; i++) {
        if (20 < i && i < 30) {

            position_x[i] = width + height * (i - 20 - 1);
            position_y[i] = 0;

        }
        if (10 < i && i < 20) {
            position_y[i] = width + height * (20 - i - 1);
            position_x[i] = 0;
        }
        if (0 < i && i < 10) {
            position_x[i] = width + height * (10 - i - 1);
            position_y[i] = width + height * 9;
        }
        if (30 < i && i < 40) {
            position_x[i] = width + height * 9;
            position_y[i] = width + height * (i - 30 - 1);
        }
    }

}

function block_iter(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        block[Number(dat.position)] = {
            "name": "",
            "block_id": 0,
            "position": 0,
            "description": ""
        }
        block[Number(dat.position)].name = dat.name;
        block[Number(dat.position)].block_id = dat.block_id;
        block[Number(dat.position)].position = dat.position;
        block[Number(dat.position)].description = dat.description;


    }

}


function estate_iter(data) {

    for (var i = 0; i < data.length; i++) {

        var dat = data[i];
        var blockid = Number(dat.position);
        block_information[blockid].name = dat.name;
        block_information[blockid].position = dat.position;
        block_information[blockid].block_id = dat.block_id;
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].street_id = dat.street_id;
        block_information[blockid].house_value = dat.house_value;
        block_information[blockid].has_house = dat.house_number;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].with_one_house = Number(dat.payment[0].payment);
        block_information[blockid].with_two_house = Number(dat.payment[1].payment);
        block_information[blockid].with_three_house = Number(dat.payment[2].payment);
        block_information[blockid].with_four_house = Number(dat.payment[3].payment);
        block_information[blockid].with_five_house = Number(dat.payment[4].payment);
        block_information[blockid].with_six_house = Number(dat.payment[5].payment);
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

    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid = Number(dat.position);
        block_information[blockid].name = dat.name;
        block_information[blockid].block_id = dat.block_id;
        block_information[blockid].position = dat.position;
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].rate_with_one_utility = dat.payment[0].rate;
        block_information[blockid].rate_with_two_utility = dat.payment[1].rate;
        for (var j = 0; j < 6; j++) {
            if (player[j].id == dat.owner_id) {
                block_information[blockid].owner_name = player[i].name;
                block_information[blockid].owner_id = dat.owner_id;
            }
        }
        if (dat.name == "Power Station") {
            picture[blockid] = 'electricity';
        } else if (dat.name == "Water Work") {
            picture[blockid] = 'water';
        }
        create_block(blockid);

    }
}

function station_iter(data) {

    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid = dat.position;
        block_information[blockid].name = dat.name;
        block_information[blockid].block_id = dat.block_id;
        block_information[blockid].position = dat.position;
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].with_one_station = dat.payment[0].payment;
        block_information[blockid].with_two_station = dat.payment[1].payment;
        block_information[blockid].with_three_station = dat.payment[2].payment;
        block_information[blockid].with_four_station = dat.payment[3].payment;
        picture[blockid] = 'railway_station';
        create_block(blockid);

    }
}

/*
   refer to build house,
 */
function estate_update(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid = dat.position;
        block_information[blockid].owner_id = dat.owner_id;
        for (var j = 0; j < 6; j++)
            if (player[j].id == dat.owner_id) {
                block_information[blockid].owner_name = player[j].name;
            }
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].street_id = dat.street_id;
        block_information[blockid].house_value = dat.house_value;
        block_information[blockid].has_house = dat.house_number;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].with_one_house = Number(dat.payment[0].payment);
        block_information[blockid].with_two_house = Number(dat.payment[1].payment);
        block_information[blockid].with_three_house = Number(dat.payment[2].payment);
        block_information[blockid].with_four_house = Number(dat.payment[3].payment);
        block_information[blockid].with_five_house = Number(dat.payment[4].payment);
        block_information[blockid].with_six_house = Number(dat.payment[5].payment);
        if (block_information[blockid].has_house > block_house_number[blockid]) {
            create_house(blockid);
        }
    }

}

function utility_update(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid = Number(dat.position);
        block_information[blockid].owner_id = dat.owner_id;
        for (var j = 0; j < 6; j++)
            if (player[j].id == dat.owner_id) {
                block_information[blockid].owner_name = player[j].name;
            }

        block_information[blockid].position = dat.position;
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].rate_with_one_utility = dat.payment[0].rate;
        block_information[blockid].rate_with_two_utility = dat.payment[1].rate;
    }

}

function station_update(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        var blockid = dat.position;
        block_information[blockid].owner_id = dat.owner_id;
        for (var j = 0; j < 6; j++)
            if (player[j].id == dat.owner_id) {
                block_information[blockid].owner_name = player[j].name;
            }
        block_information[blockid].position = dat.position;
        block_information[blockid].estate_value = dat.estate_value;
        block_information[blockid].status = dat.status;
        block_information[blockid].mortgage_value = dat.mortgage_value;
        block_information[blockid].with_one_station = dat.payment[0].payment;
        block_information[blockid].with_two_station = dat.payment[1].payment;
        block_information[blockid].with_three_station = dat.payment[2].payment;
        block_information[blockid].with_four_station = dat.payment[3].payment;

    }
}

function player_update(data) {
    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        for (var j = 0; j < 6; j++) {
            if (dat.id == player[j].id) {

                if (dat.position != player[j].position) {
                    player_sprite[j].kill();
                    player[j].position = Number(dat.position);
                    player[j].pre_position = Number(dat.pre_position);
                    create_player(dat.id);
                }
                player[j].cash = Number(dat.cash);
                player[j].card_num = Number(dat.card_num);
                player[j].property = dat.property;

            }
        }

    }

}

function trade_iter(data) {

    for (var i = 0; i < data.length; i++) {
        var dat = data[i];
        add_item("player_id", dat.player_id);
        add_item("money_give", dat.money_give);
        add_item("asset_give", dat.asset_give);
        add_item("card_give", dat.card_give);
    }
}


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

var dice1_num;
var dice2_num;


function initial_button() {
    button1 = game.add.button(282, 330, 'roll_dice_btn', function () {
        roll_dice();

        setTimeout(function () {
            dice1.animations.stop();
            dice2.animations.stop();
            dice1.frame = dice1_num - 1;
            dice2.frame = dice2_num - 1;
        }, 3000);
    }, this, 2, 1, 0);
    button1.width = 90;
    button1.height = 30;
    button1.input.useHandCursor = true;
    button2 = game.add.button(282, 370, 'end_turn_btn', function () {
        var string;
        string = {
            "type": "input",
            "data": [{
                "from_player_id": sessionStorage.uid,
                "request": 6
            }]
        }
        ws.send(JSON.stringify(string));
    }, this, 2, 1, 0);
    button2.width = 90;
    button2.height = 30;
    button2.input.useHandCursor = true;
    console.log(sessionStorage.uid);
    console.log(cur_player);
    if (sessionStorage.uid == cur_player) {
        button1.visible = true;
        button2.visible = true;
    }
    else {
        button1.visible = false;
        button2.visible = false;
    }
}

function get_hint() {
    // pop up hint message
    var message = game.cache.getJSON('hint');
    alert(message.data[0].message);
}



function addToRecords(newEvent) {
    var recordContent = document.getElementById("recordContent");
    recordContent.textContent += newEvent + '\r\n';
    recordContent.scrollTop = recordContent.scrollHeight;
}

function updateInterest(newInterest) {
    var statesContent = document.getElementById("stateContent");
    statesContent.rows[0].cells[0].innerHTML += i;
}


function startGame() {
    ws.send("start");
}
function setAvatar(objID, avatarID, colorID) {
    img = document.getElementById(objID);
    switch (avatarID){
        case 0:img.src = "static/img/avatar/icon_bug.svg";break;
        case 1:img.src = "static/img/avatar/icon_apple.svg";break;
        case 2:img.src = "static/img/avatar/icon_aircraft.svg";break;
        case 3:img.src = "static/img/avatar/icon_github.svg";break;
        case 4:img.src = "static/img/avatar/icon_google.svg";break;
        case 5:img.src = "static/img/avatar/icon_wifi.svg";break;
    }
   
}
