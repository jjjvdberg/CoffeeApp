/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
    var stackOld = $("<div/>",{class:"messageStack_old"});
    var stackNew = $("<div/>",{class:"messageStack_new"});
    
    var _messages = [];
    var _handlingMessage = false;
    
    $.fn.messageStack = function(action) {
        action = action === undefined ? "init" : action;
        switch(action) {
            case "init":
                init(this);
                return;
            case "send":
                var msg = arguments[1];
                if (msg === undefined) {
                    return;
                }
                addMessage(msg);
        }
    };
    
    function addMessage(msg) {
        _messages.unshift(msg);
        _checkForMessage();
    }
    
    function _checkForMessage() {
        if(_handlingMessage) return;
        var msg = _messages.pop();
        if("undefined" !== typeof(msg)) {
            _handlingMessage = true;
            var oldMessage = stackNew.find("div.message");
            var newMessage = _createNewMessage(msg);
            if(oldMessage.length > 0) {
                stackOld.css("margin-top","0px");
                oldMessage.prependTo(stackOld);
                oldMessage.switchClass("","read");
                stackOld.animate({"margin-top":newMessage.find('div').outerHeight(true)});
            }
        }
    }
    
    function init(obj) {
        obj.addClass("messageStack_container");
        obj.append(stackNew);
        obj.append(stackOld);
    }
    
    function _createNewMessage(msg) {
        var div = $("<div/>").addClass("message");
        if(msg instanceof jQuery) {
            div.append(msg);
        } else {
            div.html("<div>"+msg+"</div>");
        }
        div.hide();
        stackNew.append(div);
        div.css("margin-top",-(div.height()+80)).show().animate({"margin-top":"0px"},1000,"easeOutBounce",function(){
            _handlingMessage = false;
            _checkForMessage();
        });
        return div;
    }
})(jQuery);

