observer_updateUserList = function(users) {
    var users = JSON.parse(users);
    var userlist = $("#observer").find("#userlist");
    userlist.empty();
    $.each(users,function(k,e){
        userlist.append("<li><strong>" + e.name + "</strong> is having " + e.drink + "</li>");
    });
};

observer_onReady = function() {
    $G.socket.emit("get users");
};

Grabba.State.states[Grabba.State.OBSERVER] = {
    name:"Observer",
    page:"observer",
    listeners:[
        ["observer","ready",observer_onReady]
    ],
    serverListeners:[
        ["update users",observer_updateUserList]
    ]
};

