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


