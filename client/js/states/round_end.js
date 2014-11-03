round_end_onBackClick = function() {
    $G.set(Grabba.State.DRINK_START);
};

round_end_roundStarted = function() {
    $G.set(Grabba.State.ROUND_OPTIN);
};

Grabba.State.states[Grabba.State.ROUND_END] = {
    name:"Round End",
    page:"round_end",
    listeners:[
        ["round_end_back","click",round_end_onBackClick]
    ],
    serverListeners:[
        ["round started",round_end_roundStarted]
    ]
};

