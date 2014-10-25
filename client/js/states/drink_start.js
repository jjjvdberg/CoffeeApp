function onStartRoundClick(e) {
    $G.set(Grabba.State.ROUND_START);
}

Grabba.State.states[Grabba.State.DRINK_START] = {
    name:"Drink Start",
    page:"drink_start",
    listeners:[
        ["drink_start_start_round","click",onStartRoundClick]
    ]
};

