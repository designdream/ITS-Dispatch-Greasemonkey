// ==UserScript==
// @name       ITS-Dispatch PowerUser Enhancements 
// @namespace  http://www.padremedia.com
// @version    0.715
// @description  shows gross margins, gross profits,  dispatcher names, and opperating capital requirements 
// @match      http://its-dispatch.com/dispatch.php
// @include      http://its-dispatch.com/dispatch.php
// @include      http://itsdispatch.com/dispatch.php
// @include      http://www.itsdispatch.com/dispatch.php
// @include      http://www.its-dispatch.com/dispatch.php
// @updateURL     https://www.padremedia.com/bquick.user.js
// @downloadURL     https://www.padremedia.com/bquick.user.js	
// @copyright  2013+, by Brad, additional functions by Felipe Recalde 
// ==/UserScript==


(function($) {

    $('#glu').load( function() {

        var loadcount =$('#glu').contents().find('.ld_lk').length;
        var count = loadcount - 1;
        var total=0;
       // var start=2;
        var carrier_costs = 0;
        
        $('#glu').contents().find('#tabbey th:eq(0)').width(120);
        $('#glu').contents().find('#tabbey th:eq(3)').width(90);
        $('#glu').contents().find('#tabbey th:eq(4)').width(90);
        
        
        $('#glu').contents().find('.ld_lk').each( function(k,v) {
            
            var e = $(this);  
            var did = e.attr('id').match(/[0-9]+/)[0];
            
            var fee;
            var rate;
            var profit;
            var carrier_percent;

            //var dispatcher;
            
            var callPage = "/modules/loads/data/edit_data.php?id="+did+"&office_id=0&id="+did;
            
            $.get(callPage, function(pageHTML) {
               var pageDOM = $(pageHTML);
               carrier_costs = carrier_costs+ parseFloat(pageDOM.find('#carrier_fee').val());
               fee = parseFloat(pageDOM.find('#carrier_fee').val());
               rate =  parseFloat(pageDOM.find('#total_rate').val());
               carrier_percent =  parseFloat(pageDOM.find('#carrier_percent').val());
               //dispatcher =  pageDOM.find('#user_id :selected').text();
               profit = Math.round(rate - fee);
               total = total + profit;
               $(e).after("<b>"+carrier_percent+"% | $"+profit+"</b>");
               //$('#glu').contents().find('#tabbey td:eq('+start+')').append("<br/>"+dispatcher); 
               //start = start + 9 ;  
               if (k == count) $('#glu').contents().find('#search_tool_wrapper div:eq(0)').html(loadcount+' Loads, GP $'+Math.round((total)*100)/100+', OC $'+Math.round(carrier_costs));
            });

        });
    }); 
})(jQuery);

