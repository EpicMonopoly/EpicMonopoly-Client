var tradeBaseText = null;

function showCfg() {
    
}

function addToRecords(newEvent) {
    var recordContent = document.getElementById("recordContent");
    recordContent.textContent += newEvent +'\r\n';
    recordContent.scrollTop = recordContent.scrollHeight;
}

setTimeout(updateStates(1,2,3,4), 1500);  /*TODO add increase or decrease arrow*/
function updateStates(newInterest, newTaxesRate, newHouseInBank, newHotelsInBank) {
    var statesContent = document.getElementById("stateContent");
    var states = "Interest: %f\nTaxes rate:\nHouse in bank:\nHotels in bank:", newInterest;
    statesContent.textContent = states;
}

function callTrade() {
    var tradeWindow = document.getElementById("tradeWindow");
    tradeWindow.style.visibility = "visible";

}

function hideWindow(windowId) {
    var window = document.getElementById(windowId);
    window.style.visibility = "hidden";
}
