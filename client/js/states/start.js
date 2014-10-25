function start_onStartClick(e) {
    $G.set(Grabba.State.CONFIG);
}

function start_onObserveClick(e) {
    $G.set(Grabba.State.OBSERVER);
}

Grabba.State.states[Grabba.State.START] = {
    name:"Start",
    page:"start",
    listeners:[
        ["start_to_config","click",start_onStartClick],
        ["start_to_observer","click",start_onObserveClick]
    ]
};

