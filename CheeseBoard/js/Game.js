var game;
window.onload = function() {

    game = new Phaser.Game(895, 895, Phaser.CANVAS, 'chessboard');
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

    var playGame =function (game) {};
    playGame.prototype={

     preload:function () {
        game.load.image('arrow', 'assets/images/editor.ico');
        game.load.spritesheet('player1','assets/images/george.png',48,48);
        game.load.json('chessboard.json');

    },

    create:function () {

        /*
        Draw the chessboard
         */
        var width = 110;
        var height = 75;
        game.stage.backgroundColor = "#feffb7";
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
        }
        var spriteCornerRightBottom=game.add.sprite(width+height*9,width+height*9,'arrow');
        spriteCornerRightBottom.width=width;
        spriteCornerRightBottom.height=width;


        /*
        create players
         */
        this.player1 = game.add.sprite(30,30,'boy');
        this.player1.idleFrame=0;
        this.player1.animations.add('down',[0,4,8,12],10,true);
        this.player1.animations.add('right',[3,7,11,15],10,true);


    },

    update:function () {
         var direction=document.getElementById('')
        var tweenBoy=game.add.tween(this.player1).to({x:200},2000,"Quart.easeOut");
        tweenBoy.start();
          this.player1.animations.play('down',10,true);
        this.player1.animations.stop('down');

        this.player1.animations.play('right', 5, true);


    }
  }