round_join_onReady = function() {
    $G.socket.emit("round ready", true);    
};

round_join_roundEnded = function(lucky) {
    if(lucky) {
        $G.socket.emit("round get order");
    } else {
        $G.set(Grabba.State.ROUND_END);
    }
};

round_join_setOrder = function(order) {
    Grabba.Data.order = order;
    $G.set(Grabba.State.ROUND_END_LUCKY);
};

Grabba.State.states[Grabba.State.ROUND_JOIN] = {
    name:"Round Join",
    page:"round_join",
    id:"round_join",
    listeners:[
        [null,"ready",round_join_onReady]
    ],
    serverListeners:[
        ["round ended",round_join_roundEnded],
        ["round order",round_join_setOrder]
    ]
};

