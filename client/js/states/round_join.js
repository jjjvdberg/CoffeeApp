round_join_onReady = function() {
    $G.socket.emit("round ready", true);    
};

round_join_roundEnded = function(lucky) {
    if(lucky) {
        $G.set(Grabba.State.ROUND_END_LUCKY);
    } else {
        $G.set(Grabba.State.ROUND_END);
    }
};

Grabba.State.states[Grabba.State.ROUND_JOIN] = {
    name:"Round Join",
    page:"round_join",
    listeners:[
        ["round_join","ready",round_join_onReady]
    ],
    serverListeners:[
        ["round ended",round_join_roundEnded]
    ]
};

