function round_optin_onYesClick() {
    clearTimeout(Grabba.Data.timer);
    $G.set(Grabba.State.ROUND_JOIN);
}

function round_optin_onNoClick() {
    clearTimeout(Grabba.Data.timer);
    $G.set(Grabba.State.ROUND_PASS);
}

function round_optin_startTimer() {
    $.titleAlert("A new round has started!", {
        requireBlur:true,
        stopOnFocus:true,
        duration:30000,
        interval:1000
    });
    Grabba.Data.timer = setTimeout(round_optin_onNoClick,30000);
}

Grabba.State.states[Grabba.State.ROUND_OPTIN] = {
    name:"Round optin",
    page:"round_optin",
    id:"round_optin",
    listeners:[
        [null,"ready",round_optin_startTimer],
        ["yes","click",round_optin_onYesClick],
        ["no","click",round_optin_onNoClick]
    ],
    serverListeners:[
    ]
};

