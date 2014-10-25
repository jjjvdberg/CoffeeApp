Grabba = (typeof Grabba === "undefined") ? {} : Grabba;
Grabba.State = function() {
    this.state = Grabba.State.START;    
};
Grabba.State.states = [];
Grabba.State.START = "start";
Grabba.State.CONFIG = "config";
Grabba.State.OBSERVER = "observer";
Grabba.State.DRINK_START = "drink_start";
Grabba.State.ROUND_OPTIN = "round_optin";
Grabba.State.ROUND_START = "round_start";
Grabba.State.ROUND_END = "round_end";

Grabba.State.prototype.set = function(state) {
    var previousStateObject = Grabba.State.states[this.state];
    Grabba.State.setListeners(previousStateObject.listeners, false);
    this.state = state;
    var stateObject = Grabba.State.states[state];
    Grabba.State.setListeners(stateObject.listeners, true);
    $("#pages").anipager("show",stateObject.page);
};

Grabba.State.setListeners = function(listeners,on) {
    $.each(listeners,function(_,e){
        var elem = $("#"+e[0]);
        var event = e[1];
        var listener = e[2];
        if(on) {
            elem.on(event,listener);
        } else {
            elem.off(event,listener);            
        }
    });
};

Grabba.State.prototype.get = function() {
    return this.state;
};

$G = new Grabba.State;