window.onload = window.onresize =function () {


    var theCanvas = document.getElementById("canvasPanel");
    var context = theCanvas.getContext("2d");
    var userName = document.getElementById("UserName");
    userName.addEventListener('keyup', textBoxChanged, false);
    var message = "your text";
    drawScreen();

    function drawScreen() {
        //背景
        theCanvas.width = window.innerWidth;
        theCanvas.height = window.innerHeight;
        drawRoundedRect(50, 50, 1400, 600, 10, true, "rgba(255,255,255,0.5)");


        //内容
        context.font = 'bold 34px arial';
        context.fillStyle = 'black';
        context.fillText('Welcome to EpicMonopoly!', 300, 150);

        context.font = 'bold 28px arial';
        context.fillStyle = 'black';
        context.fillText('Choose your avatar', 180, 250);
         getAvatar();
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

    function getAvatar() {
        var preview=new Image();
        preview.src="body_background.JPG";
        context.drawImage(preview,220,290,180,180);
        var avatarchoose = document.getElementById("userAvator");
        var previewer = document.getElementById("preview");
        var maxsize = 200 * 400;
        avatarchoose.onchange = function () {
            var files = this.files;
            var file = files[0];
            // 接受 jpeg, jpg, png 类型的图片
            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

            var reader = new FileReader();

            reader.onload = function () {
                var result = this.result;
                var img = new Image();
                // 如果图片小于 200kb，不压缩
                if (result.length <= maxsize) {
                    toPreviewer(result);
                    return;
                }

                img.onload = function () {
                    var compressedDataUrl = compress(img, file.type);
                    toPreviewer(compressedDataUrl);
                    img = null;
                }

                img.src = result;
            }

            reader.readAsDataURL(file);
        }

        function toPreviewer(dataUrl) {
            previewer.src = dataUrl;
            avatarchoose.value = '';
        }

        function compress(img) {

            var width = 180;
            var height = 180;


            context.fillStyle = "#fff";
            context.fillRect(220, 290, width, height);
            context.drawImage(img, 220, 290, width, height);


        }
        var canvas=$('<canvas width="'+180+'" height="'+180+'"></canvas>')[0],
            ctx=canvas.getContext('2d');
        var data=canvas.toDataURL();

// dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
        data=data.split(',')[1];
        data=window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        };

// canvas.toDataURL 返回的默认格式就是 image/png
        var blob=new Blob([ia], {type:"image/png"});
        var fd=new FormData();

        fd.append('file',blob);
        $.ajax({
            url:"your.server.com",
            type:"POST",
            data:fd,
            success:function(){}
        });
    }
}
