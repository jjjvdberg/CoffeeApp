drink_start_onStartRoundClick = function() {
    $G.set(Grabba.State.ROUND_START);
};

drink_start_roundStarted = function() {
    $G.set(Grabba.State.ROUND_OPTIN);
};

Grabba.State.states[Grabba.State.DRINK_START] = {
    name:"Drink Start",
    page:"drink_start",
    id:"drink_start",
    listeners:[
        ["start_round","click",drink_start_onStartRoundClick]
    ],
    serverListeners:[
        ["round started", drink_start_roundStarted]
    ]
};

