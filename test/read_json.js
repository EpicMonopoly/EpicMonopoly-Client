var json_demo = {
    "type": "init",
    "data": [
        {
            "type": "room_info",
            "data": [
                {
                    "room_id": "a3sd54654ads",
                    "initial_cash": 2000,
                    "reward_pass_go": 200,
                    "difficulty": "easy",
                    "building_limitation": "no"
                }
            ]
        },
        {
            "type": "player_info",
            "data": [
                {
                    "name": "fsdsfdd",
                    "player_id": "asdasd6542a1s3d"
                }
            ]
        },
        {
            "type": "player_info",
            "data": [
                {
                    "name": "fsdsfdd",
                    "player_id": "asdasd6542a1s3d"
                }
            ]
        }
    ]
};

function type_read(json_obj) {
    var type = json_obj.type;
    switch (type) {
        case "init":
            add_item("init", "start");
            data_iter(json_obj.data);
            add_item("init", "end");
            break;
        case "hint":
            var dat = json_obj.data[0];
            add_item("message", dat.message);
            break;
        case "record":
            var dat = json_obj.data[0];
            add_item("message", dat.message);
            break;
        case "choice":
            var dat = json_obj.data[0];
            add_item("message", dat.message);
            break;
        case "bank":
            var dat = json_obj.data[0];
            add_item("house_number", dat.house_number);
            add_item("hotel_number", dat.hotel_number);
            break;
        case "block":
            var dat = json_obj.data[0];
            add_item("name", dat.name);
            add_item("block_id", dat.block_id);
            add_item("block_id", dat.block_id);
            add_item("position", dat.position);
            add_item("description", dat.description);
            break;
        case "board":
            var dat = json_obj.data[0];
            add_item("block_list", dat.block_list);
            break;
        case "built":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("estate_id", dat.estate_id);
            add_item("built_number", dat.built_number);
            break;
        case "card":
            var dat = json_obj.data[0];
            add_item("description", dat.description);
            break;
        case "ef":
            var dat = json_obj.data[0];
            add_item("variation", dat.variation);
            add_item("cur_rate", dat.cur_rate);
            break;
        case "input":
            var dat = json_obj.data[0];
            add_item("from_player_id", dat.from_player_id);
            add_item("request", dat.request);
            break;
        case "mortgage":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("asset_id", dat.asset_id);
            break;
        case "output":
            data_iter(json_obj.data);
            break;
        case "dice_result":
            var dat = json_obj.data[0];
            add_item("player_id", dat.player_id);
            add_item("dice_result", dat.dice_result);
            break;
        case "room":
            var dat = json_obj.data[0];
            add_item("room_id", dat.room_id);
            add_item("room_name", dat.room_name);
            add_item("owner_id", dat.owner_id);
            add_item("status", dat.status);
            add_item("level", dat.level);
            add_item("init_fund", dat.init_fund);
            add_item("go_salary", dat.go_salary);
            add_item("is_limited", dat.is_limited);
            add_item("room_info", "end");
            break;
        case "estate":
            estate_iter(json_obj.data);
            break;
        case "player":
            player_iter(json_obj.data);
            break;
        case "station":
            station_iter(json_obj.data);
            break;
        case "trade":
            trade_iter(json_obj.data);
            break;
        case "utility":
            utility_iter(json_obj.data);
            break;
    }
}

function data_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        type_read(data[i]);
    }
}

function add_item(name, value) {
    document.getElementById("demo").innerHTML += name + ": " + value + "<br/>";
}

function player_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("name", dat.name);
        add_item("id", dat.id);
        add_item("alliance", dat.alliance);
        add_item("cash", dat.cash);
        add_item("position", dat.position);
        add_item("pre_position", dat.pre_position);
        add_item("card_num", dat.card_num);
        add_item("property", dat.property);
    }
}

function estate_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("name", dat.name);
        add_item("block_id", dat.block_id);
        add_item("position", dat.position);
        add_item("owner_id", dat.owner_id);
        add_item("estate_value", dat.estate_value);
        add_item("status", dat.status);
        add_item("street_id", dat.street_id);
        add_item("house_value", dat.house_value);
        add_item("house_number", dat.house_number);
        add_item("mortgage_value", dat.mortgage_value);
        add_item("payment", dat.payment);
    }
}

function utility_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("name", dat.name);
        add_item("block_id", dat.block_id);
        add_item("position", dat.position);
        add_item("owner_id", dat.owner_id);
        add_item("estate_value", dat.estate_value);
        add_item("status", dat.status);
        add_item("mortgage_value", dat.mortgage_value);
        add_item("payment", dat.payment);
    }
}

function station_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("name", dat.name);
        add_item("block_id", dat.block_id);
        add_item("position", dat.position);
        add_item("owner_id", dat.owner_id);
        add_item("estate_value", dat.estate_value);
        add_item("status", dat.status);
        add_item("mortgage_value", dat.mortgage_value);
        add_item("payment", dat.payment);
    }
}

function trade_iter(data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var dat = json_obj.data[i];
        add_item("player_id", dat.player_id);
        add_item("money_give", dat.money_give);
        add_item("asset_give", dat.asset_give);
        add_item("card_give", dat.card_give);
    }
}

type_read(json_demo);


// read json
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json_format/bank.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);
    });

}

init();
