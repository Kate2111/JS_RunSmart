import {postData} from './services';
import reviews from './reviews';
import { nanoid } from 'nanoid';

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
           
            //const enterId = nanoid(5);
            const formData = new FormData(form);
            const formDataForAuth = Object.fromEntries(formData.entries());
            const json = JSON.stringify(formDataForAuth);
            const data = JSON.parse(json);
           
            postData(data)
            .then(() => {
               reviews();
            }).catch(() => {
                console.log('отзыв добавлен');
            }).finally(() => {
                form.reset();
            });
        });
    }
}

export default forms;