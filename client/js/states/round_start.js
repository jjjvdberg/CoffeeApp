round_start_onReady = function() {
    $G.socket.emit("round start");    
};

round_start_roundStarted = function() {
    $G.socket.emit("round ready",true);
};

round_start_roundEnded = function(lucky) {
    if(lucky) {
        $G.set(GRABBA.State.ROUND_END_LUCKY);
    } else {
        $G.set(GRABBA.State.ROUND_END);
    }
};



Grabba.State.states[Grabba.State.ROUND_START] = {
    name:"Round Start",
    page:"round_start",
    listeners:[
        ["round_start","ready",round_start_onReady]
    ],
    serverListeners:[
        ["round started",round_start_roundStarted],
        ["round ended",round_start_roundEnded]
    ]
};

