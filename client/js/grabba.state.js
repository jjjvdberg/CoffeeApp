Grabba = (typeof Grabba === "undefined") ? {} : Grabba;
Grabba.State = function() {
    this.state = Grabba.State.START;    
    this.socket = io();
    this.message = null;
};
Grabba.State.states = [];
Grabba.State.START = "start";
Grabba.State.CONFIG = "config";
Grabba.State.OBSERVER = "observer";
Grabba.State.DRINK_START = "drink_start";
Grabba.State.ROUND_START = "round_start";
Grabba.State.ROUND_OPTIN = "round_optin";
Grabba.State.ROUND_JOIN = "round_join";
Grabba.State.ROUND_PASS = "round_pass";
Grabba.State.ROUND_END = "round_end";
Grabba.State.ROUND_END_LUCKY = "round_end_lucky";

Grabba.State.prototype.set = function(state) {
    var previousStateObject = Grabba.State.states[this.state];
    Grabba.State.setListeners(this.message, previousStateObject.listeners, false);
    Grabba.State.setServerListeners(previousStateObject.serverListeners, false);
    this.state = state;
    
    var stateObject = Grabba.State.states[state];
    this.message = $("#stackitems").find("."+stateObject.page).clone();
    
    Grabba.State.setListeners(this.message, stateObject.listeners, true);
    Grabba.State.setServerListeners(stateObject.serverListeners, true);
    
    this.message.trigger("before");
    $("#messagestack").messageStack("send",this.message);
    this.message.trigger("ready");
};

Grabba.State.setListeners = function(message, listeners, on) {
    if(message === null) return;
    $.each(listeners,function(_,e){
        var elem = message;
        if(null !== e[0]) {
            elem = elem.find("." + e[0]);
        }
        var event = e[1];
        var listener = e[2];
        if(on) {
            elem.on(event,listener);
        } else {
            elem.off(event,listener);            
        }
    });
};
Grabba.State.setServerListeners = function(listeners, on) {
    $.each(listeners,function(_,e){
        var event = e[0];
        var listener = e[1];
        if(on) {
            $G.socket.on(event,listener);
        } else {
            $G.socket.off(event,listener);            
        }
    });
};

Grabba.State.prototype.get = function() {
    return this.state;
};

$G = new Grabba.State;