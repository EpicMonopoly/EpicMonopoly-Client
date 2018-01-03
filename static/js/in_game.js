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
}
