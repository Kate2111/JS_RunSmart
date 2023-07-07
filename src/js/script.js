import catalog from './modules/catalog';
import modal from './modules/modal';
import scrollUp from './modules/scroll_up';
import timer from './modules/timer';


$(document).ready(function(){
   
    modal();
    scrollUp();
    catalog('run', '#run');
    catalog('fitness', '#fitness');
    catalog('triatlon', '#triatlon');

    timer();
});

  
