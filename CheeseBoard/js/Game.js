window.onload = function() {

    var game = new Phaser.Game(895, 895, Phaser.CANVAS, 'chessboard', {
        preload: preload, create: create,update:update
    });

    function preload() {
        game.load.image('arrow', 'assets/images/test.jpg');
    }

    function create() {
        var width=110;
        var height=75;
        game.stage.backgroundColor="#feffb7";
        var spriteCornerLeftTop = game.add.sprite(0, 0, 'arrow');
        spriteCornerLeftTop.width = width;
        spriteCornerLeftTop.height=width;
        var spriteTop = new Array(9);
        spriteTop[1] = game.add.sprite(width+height*(1-1), 0, 'arrow');
        spriteTop[2] = game.add.sprite(width+height*(2-1), 0, 'arrow');
        spriteTop[3] = game.add.sprite(width+height*(3-1), 0, 'arrow');
        spriteTop[4] = game.add.sprite(width+height*(4-1), 0, 'arrow');
        spriteTop[5] = game.add.sprite(width+height*(5-1), 0, 'arrow');
        spriteTop[6] = game.add.sprite(width+height*(6-1), 0, 'arrow');
        spriteTop[7] = game.add.sprite(width+height*(7-1), 0, 'arrow');
        spriteTop[8] = game.add.sprite(width+height*(8-1), 0, 'arrow');
        spriteTop[9] = game.add.sprite(width+height*(9-1), 0, 'arrow');
        for(var i=1;i<=9;i++)
        {
            spriteTop[i].width=height;
            spriteTop[i].height=width;
        }
        var spriteCornerRightTop = game.add.sprite(width+height*9,0,'arrow');
        spriteCornerRightTop.width = width;
        spriteCornerRightTop.height=width;
        var spriteLeft = new Array(9);
        spriteLeft[1] = game.add.sprite(0,width+height*(1-1), 'arrow');
        spriteLeft[2] = game.add.sprite(0,width+height*(2-1), 'arrow');
        spriteLeft[3] = game.add.sprite(0,width+height*(3-1),  'arrow');
        spriteLeft[4] = game.add.sprite(0,width+height*(4-1), 'arrow');
        spriteLeft[5] = game.add.sprite(0,width+height*(5-1), 'arrow');
        spriteLeft[6] = game.add.sprite(0,width+height*(6-1), 'arrow');
        spriteLeft[7] = game.add.sprite(0,width+height*(7-1), 'arrow');
        spriteLeft[8] = game.add.sprite(0,width+height*(8-1), 'arrow');
        spriteLeft[9] = game.add.sprite(0,width+height*(9-1), 'arrow');
        for(var i=1;i<=9;i++)
        {
            spriteLeft[i].width=width;
            spriteLeft[i].height=height;
        }
        var spriteCornerRightBottom = game.add.sprite(0,width+height*9,'arrow');
        spriteCornerRightBottom.width = width;
        spriteCornerRightBottom.height=width;
        var spriteBottom = new Array(9);
        spriteBottom[1] = game.add.sprite(width+height*(1-1),width+height*9, 'arrow');
        spriteBottom[2] = game.add.sprite(width+height*(2-1),width+height*9, 'arrow');
        spriteBottom[3] = game.add.sprite(width+height*(3-1),width+height*9,  'arrow');
        spriteBottom[4] = game.add.sprite(width+height*(4-1),width+height*9, 'arrow');
        spriteBottom[5] = game.add.sprite(width+height*(5-1),width+height*9, 'arrow');
        spriteBottom[6] = game.add.sprite(width+height*(6-1),width+height*9, 'arrow');
        spriteBottom[7] = game.add.sprite(width+height*(7-1),width+height*9, 'arrow');
        spriteBottom[8] = game.add.sprite(width+height*(8-1),width+height*9,'arrow');
        spriteBottom[9] = game.add.sprite(width+height*(9-1),width+height*9, 'arrow');
        for(var i=1;i<=9;i++)
        {
            spriteBottom[i].width=height;
            spriteBottom[i].height=width;
        }
    }

    function update() {

    }
}