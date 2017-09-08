'use strict';

$("#menu button").click(function() {
    $("#menu button").attr("class", "");
    $(this).attr("class", "active");
    if($(this).text()==="事件数") {
        alert(`${$(this).text()}的曲线图`);
    }
    else if($(this).text()==="声誉值") {
        alert(`${$(this).text()}的曲线图`);
    }
    else if($(this).text()==="稳定性") {
        alert(`${$(this).text()}的曲线图`);
    }
    else if($(this).text()==="影响力") {
        alert(`${$(this).text()}的曲线图`);
    }
});