var game=new Phaser.Game(655, 655, Phaser.CANVAS,"midPart", { preload: preload, create: create,update:update});


        function preload() {
            game.load.image("arrow", "img/assets/images/rectangle.png");
            game.load.image("player1", "img/avatar/icon_bug.png");
            game.load.image("background","img/chessboard_bgd.png");

        }
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
        var i;
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

        var width ;//width of the sprite
        var height;//height of the sprite
        function create() {

            /*
            Draw the chessboard
             */
            width = 80;
            height = 55;
            game.add.tileSprite(0,0,655,655,"background");
            var spriteCornerLeftTop = game.add.sprite(0, 0, 'arrow');
            spriteCornerLeftTop.width = width;
            spriteCornerLeftTop.height = width;
            position_x[20]=0;
            position_y[20]=0;
            var spriteTop = new Array(9);
            spriteTop[1] = game.add.sprite(width + height * (1 - 1), 0, 'arrow');
            spriteTop[2] = game.add.sprite(width + height * (2 - 1), 0, 'arrow');
            spriteTop[3] = game.add.sprite(width + height * (3 - 1), 0, 'arrow');
            spriteTop[4] = game.add.sprite(width + height * (4 - 1), 0, 'arrow');
            spriteTop[5] = game.add.sprite(width + height * (5 - 1), 0, 'arrow');
            spriteTop[6] = game.add.sprite(width + height * (6 - 1), 0, 'arrow');
            spriteTop[7] = game.add.sprite(width + height * (7 - 1), 0, 'arrow');
            spriteTop[8] = game.add.sprite(width + height * (8 - 1), 0, 'arrow');
            spriteTop[9] = game.add.sprite(width + height * (9 - 1), 0, 'arrow');
            for (i = 1; i <= 9; i++) {
                spriteTop[i].width = height;
                spriteTop[i].height = width;
                spriteTop[i].x=width+height*(i-1);
                spriteTop[i].y=0;
                spriteTop[i].inputEnabled = true;
                spriteTop[i].input.useHandCursor = true;
                spriteTop[i].events.onInputDown.add(listener, this);
                position_x[10-i+20]=width+height*(i-1);
                position_y[10-i+20]=0;

            }
            var spriteCornerRightTop = game.add.sprite(width + height * 9, 0, 'arrow');
            spriteCornerRightTop.width = width;
            spriteCornerRightTop.height = width;
            position_x[30]=width+height*9;
            position_y[30]=0;
            var spriteLeft = new Array(9);
            spriteLeft[1] = game.add.sprite(0, width + height * (1 - 1), 'arrow');
            spriteLeft[2] = game.add.sprite(0, width + height * (2 - 1), 'arrow');
            spriteLeft[3] = game.add.sprite(0, width + height * (3 - 1), 'arrow');
            spriteLeft[4] = game.add.sprite(0, width + height * (4 - 1), 'arrow');
            spriteLeft[5] = game.add.sprite(0, width + height * (5 - 1), 'arrow');
            spriteLeft[6] = game.add.sprite(0, width + height * (6 - 1), 'arrow');
            spriteLeft[7] = game.add.sprite(0, width + height * (7 - 1), 'arrow');
            spriteLeft[8] = game.add.sprite(0, width + height * (8 - 1), 'arrow');
            spriteLeft[9] = game.add.sprite(0, width + height * (9 - 1), 'arrow');
            for (i = 1; i <= 9; i++) {
                spriteLeft[i].width = width;
                spriteLeft[i].height = height;
                spriteLeft[i].x=0;
                spriteLeft[i].y=width+height*(i-1);
                spriteLeft[i].inputEnabled = true;
                spriteLeft[i].input.useHandCursor = true;
                spriteLeft[i].events.onInputDown.add(listener, this);
                position_x[10+10-i]=0;
                position_y[10+10-i]=width+height*(i-1);
            }
            var spriteCornerLeftBottom = game.add.sprite(0, width + height * 9, 'arrow');
            spriteCornerLeftBottom.width = width;
            spriteCornerLeftBottom.height = width;
            position_x[10]=0;
            position_y[10]=width+height*9;
            var spriteBottom = new Array(9);
            spriteBottom[1] = game.add.sprite(width + height * (1 - 1), width + height * 9, 'arrow');
            spriteBottom[2] = game.add.sprite(width + height * (2 - 1), width + height * 9, 'arrow');
            spriteBottom[3] = game.add.sprite(width + height * (3 - 1), width + height * 9, 'arrow');
            spriteBottom[4] = game.add.sprite(width + height * (4 - 1), width + height * 9, 'arrow');
            spriteBottom[5] = game.add.sprite(width + height * (5 - 1), width + height * 9, 'arrow');
            spriteBottom[6] = game.add.sprite(width + height * (6 - 1), width + height * 9, 'arrow');
            spriteBottom[7] = game.add.sprite(width + height * (7 - 1), width + height * 9, 'arrow');
            spriteBottom[8] = game.add.sprite(width + height * (8 - 1), width + height * 9, 'arrow');
            spriteBottom[9] = game.add.sprite(width + height * (9 - 1), width + height * 9, 'arrow');
            for (i = 1; i <= 9; i++) {
                spriteBottom[i].width = height;
                spriteBottom[i].height = width;
                spriteBottom[i].x=width+height*(i-1);
                spriteBottom[i].y=width+height*9;
                spriteBottom[i].inputEnabled = true;
                spriteBottom[i].input.useHandCursor = true;
                spriteBottom[i].events.onInputDown.add(listener, this);
                position_x[10-i]=width+height*(i-1);
                position_y[10-i]=width+height*9
            }
            var spriteRight = new Array(9);
            spriteRight[1] = game.add.sprite(width + height * 9, width + height * (1 - 1), 'arrow');
            spriteRight[2] = game.add.sprite(width + height * 9, width + height * (2 - 1), 'arrow');
            spriteRight[3] = game.add.sprite(width + height * 9, width + height * (3 - 1), 'arrow');
            spriteRight[4] = game.add.sprite(width + height * 9, width + height * (4 - 1), 'arrow');
            spriteRight[5] = game.add.sprite(width + height * 9, width + height * (5 - 1), 'arrow');
            spriteRight[6] = game.add.sprite(width + height * 9, width + height * (6 - 1), 'arrow');
            spriteRight[7] = game.add.sprite(width + height * 9, width + height * (7 - 1), 'arrow');
            spriteRight[8] = game.add.sprite(width + height * 9, width + height * (8 - 1), 'arrow');
            spriteRight[9] = game.add.sprite(width + height * 9, width + height * (9 - 1), 'arrow');
            for (i = 1; i <= 9; i++) {
                spriteRight[i].width = width;
                spriteRight[i].height = height;
                spriteRight[i].x=width+height*9;
                spriteRight[i].y=width+height*(i-1);
                spriteRight[i].inputEnabled = true;
                spriteRight[i].input.useHandCursor = true;
                spriteRight[i].events.onInputDown.add(listener, this);
                position_x[30+10-i]=width+height*9;
                position_y[30+10-i]=width+height*(i-1);
            }
            var spriteCornerRightBottom = game.add.sprite(width + height * 9, width + height * 9, 'arrow');
            spriteCornerRightBottom.width = width;
            spriteCornerRightBottom.height = width;
            position_x[0]=width+height*9;
            position_y[0]=width+height*9;


            /*
            create players
             */
            create_player1(position_x[2],position_y[2],'player1');


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

        function update() {
            move_player(player1,2,38);








        }
        function listener() {
            var tradeWindow = document.getElementById("informationWindow");
            tradeWindow.style.visibility = "visible";
        }


