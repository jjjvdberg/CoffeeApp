round_start_onReady = function() {
    $G.socket.emit("round start");    
};

round_start_roundStarted = function() {
    $G.socket.emit("round ready",true);
};

Grabba.State.states[Grabba.State.ROUND_START] = {
    name:"Round Start",
    page:"round_start",
    listeners:[
        ["round_start","ready",round_start_onReady]
    ],
    serverListeners:[
        ["round started",round_start_roundStarted]
    ]
};

