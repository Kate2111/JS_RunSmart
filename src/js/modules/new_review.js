import {postData} from './services';
import reviews from './reviews';

function forms(formSelector, selectorName, selectorMarathon, selectorReview) {
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
                name: inputName,
                marathon: inputMarathon,
                text: inputReview
            }
            //const enterId = nanoid(5);
           /*  const formData = new FormData(form);
            const formDataForAuth = Object.fromEntries(formData.entries());
            const json = JSON.stringify(formDataForAuth);
            const data = JSON.parse(json); */
           
            if(name !== '' || marathon !== '', text !== '') {
                postData(infoUserReview)
                .then(() => {
                reviews();
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