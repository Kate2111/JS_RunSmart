import catalog from './modules/catalog';
import modal from './modules/modal';
import scrollUp from './modules/scroll_up';
import reviews from './modules/reviews';
import timer from './modules/timer';
import forms from './modules/new_review';
import upload from './modules/upload';

$(document).ready(function(){
    
   
    modal();
    scrollUp();
    catalog('run', '#run');
    catalog('fitness', '#fitness');
    catalog('triatlon', '#triatlon');
    reviews('.reviews__items');
    forms('#review-form', '#name', '#marathon', '#text');
    upload('#file');
    timer();
});

  
