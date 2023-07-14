import catalog from './modules/catalog';
import modal from './modules/modal';
import scrollUp from './modules/scroll_up';
import reviews from './modules/reviews';
import timer from './modules/timer';
import forms from './modules/new_review';
import upload from './modules/upload';
import { postPhoto } from './modules/services';

$(document).ready(function(){
    
    async function processUpload() {
        const file = await upload('#file', '.reviews__new-review');
        console.log(file);
        postPhoto(file);
        //forms('#review-form', '#name', '#marathon', '#text', file);
    }
   
    modal();
    scrollUp();
    catalog('run', '#run');
    catalog('fitness', '#fitness');
    catalog('triatlon', '#triatlon');
    reviews('.reviews__items');
    processUpload();
    timer();
});

  
