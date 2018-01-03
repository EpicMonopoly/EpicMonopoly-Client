setTimeout('setCfg()', 10);
function setCfg() {
    if (document.getElementById("roomID") == null)
        setTimeout('setCfg()', 10);
    document.getElementById("roomID").innerHTML = sessionStorage.room_id;
    cfgContent = document.getElementById("cfgContent");
    cfgContent.rows.item(0).cells.item(1).innerHTML = sessionStorage.room_id;
    cfgContent.rows.item(1).cells.item(1).innerHTML = sessionStorage.room_name;
    cfgContent.rows.item(2).cells.item(1).innerHTML = sessionStorage.level;
    cfgContent.rows.item(3).cells.item(1).innerHTML = sessionStorage.init_fund;
    cfgContent.rows.item(4).cells.item(1).innerHTML = sessionStorage.go_salary;
    cfgContent.rows.item(5).cells.item(1).innerHTML = sessionStorage.is_limited;
    // setAvatar('avatar1', sessionStorage.avatar[0], sessionStorage.avatar[1]);
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
    switch (colorID){
        case 0:img.addClass("player-0");break;
        case 1:img.addClass("player-1");break;
        case 2:img.addClass("player-2");break;
        case 3:img.addClass("player-3");break;
        case 4:img.addClass("player-4");break;
        case 5:img.addClass("player-5");break;
    }
}
