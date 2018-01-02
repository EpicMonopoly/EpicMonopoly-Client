function showCfg() {
    
}

function addToRecords(newEvent) {
    var recordContent = document.getElementById("recordContent");
    recordContent.textContent += newEvent +'\r\n';
    recordContent.scrollTop = recordContent.scrollHeight;
}

function updateInterest(newInterest) {
    var statesContent = document.getElementById("stateContent");
    statesContent.rows[0].cells[0].innerHTML += i;
}

function setAvatar() {
    var avatar1 = document.getElementById("avatar1");
    avatar1.addClass("svg-red");
    avatar1.src = "static/img/avatar/icon_bug.svg";
}
