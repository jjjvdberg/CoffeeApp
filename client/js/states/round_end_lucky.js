round_end_lucky_onBackClick = function() {
    $G.set(Grabba.State.DRINK_START);
};

round_end_lucky_roundStarted = function() {
    $G.set(Grabba.State.ROUND_OPTIN);
};

Grabba.State.states[Grabba.State.ROUND_END_LUCKY] = {
    name:"Round End Lucky",
    page:"round_end_lucky",
    listeners:[
        ["round_end_lucky_back","click",round_end_lucky_onBackClick]
    ],
    serverListeners:[
        ["round started",round_end_lucky_roundStarted]
    ]
};

