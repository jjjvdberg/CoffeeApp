function round_optin_onYesClick() {
    $G.set(Grabba.State.ROUND_START);
}

function round_optin_onNoClick() {
    $G.set(Grabba.State.DRINK_START);
}

Grabba.State.states[Grabba.State.ROUND_OPTIN] = {
    name:"Round optin",
    page:"round_optin",
    listeners:[
        ["round_optin_yes","click",round_optin_onYesClick],
        ["round_optin_no","click",round_optin_onNoClick]
    ]
};

