var json_demo = {
    "type": "init",
    "data": [{
            "type": "room_info",
            "data": [{
                "room_id": "a3sd54654ads",
                "initial_cash": 2000,
                "reward_pass_go": 200,
                "difficulty": "easy",
                "building_limitation": "no"
            }]
        },
        {
            "type": "player_info",
            "data": [{
                "name": "fsdsfdd",
                "player_id": "asdasd6542a1s3d"
            }]
        },
        {
            "type": "player_info",
            "data": [{
                "name": "fsdsfdd",
                "player_id": "asdasd6542a1s3d"
            }]
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
        case "built":
            break;
        case "bank":
            var dat = json_obj.data[0];
            add_item("house_number", dat.house_number);
            add_item("hotel_number", dat.hotel_number);
            break;
        case "room_info":
            add_item("", "");
            add_item("room_info", "start");
            var dat = json_obj.data[0];
            add_item("room_id", dat.room_id);
            add_item("initial_cash", dat.initial_cash);
            add_item("reward_pass_go", dat.reward_pass_go);
            add_item("difficulty", dat.difficulty);
            add_item("building_limitation", dat.building_limitation);
            add_item("room_info", "end");
            break;
        case "player_info":
            add_item("", "");
            add_item("player_info", "start");
            var dat = json_obj.data[0];
            add_item("name", dat.name);
            add_item("player_id", dat.player_id);
            add_item("player_info", "end");
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

init()
