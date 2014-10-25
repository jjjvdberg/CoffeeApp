function config_onStartClick(e) {
    Grabba.Data.name = $("#config_name").val();
    Grabba.Data.drink = $("#config_drink").val();
    $G.set(Grabba.State.DRINK_START);
}

Grabba.State.states[Grabba.State.CONFIG] = {
    name:"Config",
    page:"config",
    listeners:[
        ["config_start","click",config_onStartClick]
    ]
};

