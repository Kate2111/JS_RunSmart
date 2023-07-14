import {postData} from './services';
import reviews from './reviews';
import { postPhoto } from './services';

function forms(formSelector, selectorName, selectorMarathon, selectorReview, file) {
    const forms = document.querySelectorAll(formSelector);
    const inputName = document.querySelector(selectorName);
    const inputMarathon = document.querySelector(selectorMarathon);
    const inputReview = document.querySelector(selectorReview);
    //const inputPhoto = document.querySelector(selectorPhoto);

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
           
            const infoUserReview = {
                name: inputName.value,
                marathon: inputMarathon.value,
                text: inputReview.value,
                photo: 'https/www.site.ru'
            }
            console.log(infoUserReview);

    
            if(infoUserReview.name !== '' && infoUserReview.marathon !== '' && infoUserReview.text !== '') {
                postPhoto(file);
                postData(infoUserReview)
                .then(() => {
                    console.log('jnghfdktyj')
                //reviews(); //вызываю чтобы отрисовать отзывы с учетом добавленного нового, пока работает только после перезагрузки страницЫ, нужно исправить
                }).catch(() => {
                    console.log('отзыв добавлен');
                }).finally(() => {
                    form.reset();
                });
            }
        });
    }
}

export default forms;


