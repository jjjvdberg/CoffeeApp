round_start_onReady = function() {
    $G.socket.emit("round start");
    $G.set(Grabba.State.ROUND_JOIN);    
};

Grabba.State.states[Grabba.State.ROUND_START] = {
    name:"Round Start",
    page:"round_start",
    id:"round_start",
    listeners:[
        [null,"ready",round_start_onReady]
    ],
    serverListeners:[
    ]
};

