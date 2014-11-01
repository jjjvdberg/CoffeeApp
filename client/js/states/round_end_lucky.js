function round_end_onBackClick(e) {
    $G.set(Grabba.State.DRINK_START);
}

Grabba.State.states[Grabba.State.ROUND_END] = {
    name:"Round End Lucky",
    page:"round_end_lucky",
    listeners:[
        ["round_end_lucky_back","click",round_end_lucky_onBackClick]
    ],
    serverListeners:[
    ]
};

