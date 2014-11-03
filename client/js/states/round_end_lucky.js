round_end_lucky_onBackClick = function() {
    $G.set(Grabba.State.DRINK_START);
};

round_end_lucky_roundStarted = function() {
    $G.set(Grabba.State.ROUND_OPTIN);
};

round_end_lucky_getOrder = function() {
    $G.socket.emit("round get order");
};

round_end_lucky_printOrder = function(order) {
    var orderList = $("#round_end_lucky").find("#orderList");
    orderList.empty();
    $.each(order,function(_,e){
        orderList.append("<li><strong>" + e.name + "</strong> wants a " + e.drink + "</li>");
    });
}

Grabba.State.states[Grabba.State.ROUND_END_LUCKY] = {
    name:"Round End Lucky",
    page:"round_end_lucky",
    listeners:[
        ["round_end_lucky","ready",round_end_lucky_getOrder],
        ["round_end_lucky_back","click",round_end_lucky_onBackClick]
    ],
    serverListeners:[
        ["round started",round_end_lucky_roundStarted],
        ["round order",round_end_lucky_printOrder]
    ]
};

