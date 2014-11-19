round_pass_roundEnded = function() {
    $G.set(Grabba.State.DRINK_START);
};

round_pass_onReady = function() {
    $G.socket.emit("round ready",false);
};

Grabba.State.states[Grabba.State.ROUND_PASS] = {
    name:"Round Pass",
    page:"round_pass",
    listeners:[
        [null,"ready",round_pass_onReady]
    ],
    serverListeners:[
        ["round ended",round_pass_roundEnded]
    ]
};

