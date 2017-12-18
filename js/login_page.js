window.onload = window.onresize =function () {


    var theCanvas = document.getElementById("canvasPanel");
    var context = theCanvas.getContext("2d");
    var userName = document.getElementById("UserName");
    userName.addEventListener('keyup', textBoxChanged, false);
    var message = "your text";
    drawScreen();

//这是一个测试
    function drawScreen() {
        //背景
        theCanvas.width = window.innerWidth;
        theCanvas.height = window.innerHeight;
        drawRoundedRect(340, 40, 800, 600, 10, true, "rgba(255,255,255,0.8)");


        //内容
        context.font = 'bold 24px Arial';
        context.fillStyle = 'black';
        context.fillText('Welcome to EpicMonopoly!', 430, 100);

        context.font = 'bold 18px Arial';
        context.fillStyle = 'black';
        context.fillText('Choose your avatar', 650, 170);

        //TEST


    }

    function textBoxChanged(e) {
        var target = e.target;
        message = target.value;
        drawScreen();

    }

    // 绘制圆角矩形
    // @param {Number} x - 矩形左上角x轴坐标
    // @param {Number} y - 矩形左上角y轴坐标
    // @param {Number} width - 矩形的宽度
    // @param {Number} height - 矩形的高度
    // @param {Number} radius - 矩形圆角的半径
    // @param {Boolean} isFill - 是否绘制填充，true填充，false边框
    // @param {String} color - 矩形的颜色
    function drawRoundedRect(x, y, width, height, radius, isFill, color) {
        context.save();
        context.beginPath();
        context.moveTo(x + radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        context.arcTo(x, y + height, x, y + height - radius, radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.closePath();
        if (isFill) {
            context.fillStyle = color;
            context.fill();
        }
        else {
            context.strokeStyle = color;
            context.stroke();
        }
        context.restore();
    }


};

function showWindow(windowId) {
    var tradeWindow = document.getElementById(windowId);
    tradeWindow.style.visibility = "visible";

}

function hideWindow(windowId) {
    var window = document.getElementById(windowId);
    window.style.visibility = "hidden";
}
function getName() {
    var name = document.getElementById("UserName");

    
}








