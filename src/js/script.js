
import catalog from './modules/catalog';
import modal from './modules/modal';
import scrollUp from './modules/scroll_up';
import reviews from './modules/reviews';
import timer from './modules/timer';
import newReview from './modules/new_review';
import upload from './modules/upload';
import forms from './modules/user_consultation';



$(document).ready(function(){
    
    async function processUpload() {
        const file = await upload('#file', '.reviews__new-review');
        newReview('#review-form', '#name', '#marathon', '#text', '.reviews__photo', '.button.button__white', file);
    }
    modal();
    scrollUp();
    catalog('run', '#run');
    catalog('fitness', '#fitness');
    catalog('triatlon', '#triatlon');
    reviews('.reviews__items');
    processUpload();
    timer();
    forms('.feed-form', '#consultation','#order','.overlay', '#thanks');
});

  
