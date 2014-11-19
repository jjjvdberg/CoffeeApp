round_end_lucky_onBackClick = function() {
    $G.set(Grabba.State.DRINK_START);
};

round_end_lucky_roundStarted = function() {
    $G.set(Grabba.State.ROUND_OPTIN);
};

round_end_lucky_printOrder = function() {
    var orderList = $G.message.find("#orderList");
    orderList.empty();
    $.each(Grabba.Data.order,function(_,e){
        orderList.append("<li><strong>" + e.name + "</strong> wants a " + e.drink + "</li>");
    });
};

Grabba.State.states[Grabba.State.ROUND_END_LUCKY] = {
    name:"Round End Lucky",
    page:"round_end_lucky",
    id:"round_end_lucky",
    listeners:[
        [null,"before", round_end_lucky_printOrder],
        ["back","click",round_end_lucky_onBackClick]
    ],
    serverListeners:[
        ["round started",round_end_lucky_roundStarted]
    ]
};

