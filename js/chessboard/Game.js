var game=new Phaser.Game(655, 655, Phaser.CANVAS,"midPart", { preload: preload, create: create,update:update});


        function preload() {
            game.load.image("arrow", "img/assets/images/rectangle.png");
            game.load.image("player1", "img/avatar/icon_bug.png");
            game.load.image("background","img/chessboard_bgd.png");

        }
        var player1;
        function create() {

            /*
            Draw the chessboard
             */
            var width = 80;
            var height = 55;
            game.add.tileSprite(0,0,655,655,"background");
            var spriteCornerLeftTop = game.add.sprite(0, 0, 'arrow');
            spriteCornerLeftTop.width = width;
            spriteCornerLeftTop.height = width;
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
            for (var i = 1; i <= 9; i++) {
                spriteTop[i].width = height;
                spriteTop[i].height = width;
                spriteTop[i].inputEnabled = true;
                spriteTop[i].input.useHandCursor = true;
                spriteTop[i].events.onInputDown.add(listener, this);
            }
            var spriteCornerRightTop = game.add.sprite(width + height * 9, 0, 'arrow');
            spriteCornerRightTop.width = width;
            spriteCornerRightTop.height = width;
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
            for (var i = 1; i <= 9; i++) {
                spriteLeft[i].width = width;
                spriteLeft[i].height = height;
                spriteLeft[i].inputEnabled = true;
                spriteLeft[i].input.useHandCursor = true;
                spriteLeft[i].events.onInputDown.add(listener, this);
            }
            var spriteCornerRightTop = game.add.sprite(0, width + height * 9, 'arrow');
            spriteCornerRightTop.width = width;
            spriteCornerRightTop.height = width;
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
            for (var i = 1; i <= 9; i++) {
                spriteBottom[i].width = height;
                spriteBottom[i].height = width;
                spriteBottom[i].inputEnabled = true;
                spriteBottom[i].input.useHandCursor = true;
                spriteBottom[i].events.onInputDown.add(listener, this);
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
            for (var i = 1; i <= 9; i++) {
                spriteRight[i].width = width;
                spriteRight[i].height = height;
                spriteRight[i].inputEnabled = true;
                spriteRight[i].input.useHandCursor = true;
                spriteRight[i].events.onInputDown.add(listener, this);
            }
            var spriteCornerRightBottom = game.add.sprite(width + height * 9, width + height * 9, 'arrow');
            spriteCornerRightBottom.width = width;
            spriteCornerRightBottom.height = width;


            /*
            create players
             */
            player1 = game.add.sprite(30, 30, 'player1');
            player1.width=20;
            player1.height=20;
            player1.idleFrame = 0;
            var tweenBoy = game.add.tween(player1).to({x: 200}, 2000, "Quart.easeOut");
            tweenBoy.start();


        }

        function update() {






        }
        function listener() {
            var tradeWindow = document.getElementById("informationWindow");
            tradeWindow.style.visibility = "visible";
        }


