Grabba = (typeof Grabba === "undefined") ? {} : Grabba;

Grabba.Data = {};

Grabba.Data._name = "";
Grabba.Data._drink = "";
Grabba.Data._listeners = new Array();

Object.defineProperty(Grabba.Data,"name",{
    get: function() { return _name; },
    set: function(value) { 
        _name = value;
        Grabba.Data._notify("name");
    }
});

Object.defineProperty(Grabba.Data,"drink",{
    get: function() { return _drink; },
    set: function(value) { 
        _drink = value;
        Grabba.Data._notify("drink");
    }
});

Grabba.Data._notify = function(field) {
    $.each(Grabba.Data._listeners,function(_,e) {
        if(e.field === field) {
            e.target.html(Grabba.Data[field]);
        }
    });
};
  
Grabba.Data._listen = function() {
    $(".grabba-data").each(function(_,e){
       var field = $(e).data("listen");
       Grabba.Data._listeners.push({field:field,target:$(e)});
    });
};

Grabba.Data.init = function() {
    Grabba.Data._listen();
};