function round_end_onBackClick(e) {
    $G.set(Grabba.State.DRINK_START);
}

Grabba.State.states[Grabba.State.ROUND_END] = {
    name:"Round End",
    page:"round_end",
    listeners:[
        ["round_end_back","click",round_end_onBackClick]
    ]
};

