import { postPhoto } from './services';
import {postData} from './services';
import reviews from './reviews';

async function newReview(formSelector, selectorName, selectorMarathon, selectorReview, selectorPhoto, downloadPhoto, file) {
    const forms = document.querySelectorAll(formSelector);
    const inputName = document.querySelector(selectorName);
    const inputMarathon = document.querySelector(selectorMarathon);
    const inputReview = document.querySelector(selectorReview);
    const inputPhoto = document.querySelector(selectorPhoto);
    const btnDownloadPhoto = document.querySelector(downloadPhoto);
   

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
                await postData("reviews", infoUserReview)
                inputName.value = '';
                inputMarathon.value = '';
                inputReview.value = '';
                inputPhoto.remove();
                btnDownloadPhoto.style.display = 'inline-block';
                await reviews('.reviews__items');
            }
        });
    }
}

export default newReview;


