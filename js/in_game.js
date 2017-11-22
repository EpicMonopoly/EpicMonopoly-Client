function showCfg() {
    
}

function addToRecords(newEvent) {
    var recordContent = document.getElementById("recordContent");
    recordContent.textContent += newEvent +'\r\n';
    recordContent.scrollTop = recordContent.scrollHeight;
}

for (i = 0; i < 1000; ++i)
    setTimeout(updateInterest(i), 1000);  /*TODO add increase or decrease arrow*/
function updateInterest(newInterest) {
    var statesContent = document.getElementById("stateContent");
    statesContent.rows[0].cells[0].innerHTML += i;
}

function callTrade() {
    var tradeWindow = document.getElementById("tradeWindow");
    tradeWindow.style.visibility = "visible";
}

function hideWindow(windowId) {
    var window = document.getElementById(windowId);
    window.style.visibility = "hidden";
}
