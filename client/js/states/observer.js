observer_updateUserList = function(users) {
    var users = JSON.parse(users);
    var userlist = $("#observer").find("#userlist");
    userlist.empty();
    $.each(users,function(k,e){
        userlist.append("<li><strong>" + e.name + "</strong> is having " + e.drink + "</li>");
    });
};

Grabba.State.states[Grabba.State.OBSERVER] = {
    name:"Observer",
    page:"observer",
    listeners:[
    ],
    serverListeners:[
        ["update users",observer_updateUserList]
    ]
};

