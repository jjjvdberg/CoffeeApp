(function($) {
    $.fn.anipager = function(action) {
        action = action === undefined ? "init" : action;
        switch(action) {
            case "init":
                init(this);
                break;
            case "show":
                var pageId = arguments[1];
                if (pageId === undefined) {
                    return;
                }
                showPage(this,pageId);
                break;
        }
    };
    
    function showPage(obj, pageId) {
        if(obj.data("hideDone") && obj.data("showDone")) {
            obj.data("showDone",false).data("hideDone",false);
            var currentPage = obj.find(".page.active");
            var nextPage = $("#" + pageId);
            if(nextPage.attr("id") === currentPage.attr("id")) {
                obj.data("showDone",true).data("hideDone",true);
                return;
            }
            nextPage.appendTo(obj).removeClass("inactive").addClass("active");
            currentPage.switchClass("active","inactive",function(){
                $(this).addClass("hide");  
                $(this).parent().data("hideDone",true);
            });
            nextPage.switchClass("hide","",function() {
                $(this).parent().data("showDone",true);
            });
        }
    }
    
    function init(obj) {
        obj.data("showDone",true).data("hideDone",true);
        obj.find(".page").each(function(k,e) {
            if(k === 0) {
                $(e).addClass("active");
            } else {
                $(e).addClass("inactive hide");
            }
        });
        obj.find(".page").first().appendTo($("#pages"));  
    }
})(jQuery);
