var PAGES;
var LISTENERS;

$(document).ready(function() {
    $("#messagestack").messageStack();
});

$(document).ready(function() {
    PAGES = $("#pages");
    PAGES.anipager("init");
    $G.set(Grabba.State.START);
    Grabba.Data.init();
});