import { postPhoto } from './services';
import {postData} from './services';
import reviews from './reviews';

async function forms(formSelector, selectorName, selectorMarathon, selectorReview, file) {
    const forms = document.querySelectorAll(formSelector);
    const inputName = document.querySelector(selectorName);
    const inputMarathon = document.querySelector(selectorMarathon);
    const inputReview = document.querySelector(selectorReview);
   

    forms.forEach(item => {
        bindPostData(item);
    });

    async function bindPostData(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const urlPhotoUSer =  await postPhoto(file);
           
            const infoUserReview = {
                name: inputName.value,
                marathon: inputMarathon.value,
                text: inputReview.value,
                photo: urlPhotoUSer
            }
    
            if(infoUserReview.name !== '' && infoUserReview.marathon !== '' && infoUserReview.text !== '') {
                await postData(infoUserReview)
                inputName.value = '';
                inputMarathon.value = '';
                inputReview.value = '';
                //reviews('.reviews__items');когда вызываем эту функцию, то у нас добавляются к имеющимся отзывам , те же отзывы плюч новый, нужно сделать какую то проверку , чтобы добавлять отзыв только тот  которого нет
            }
        });
    }
}

export default forms;


