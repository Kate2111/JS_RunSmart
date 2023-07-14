

export default function upload(selector, parent) {
    return new Promise((resolve) => {
        const input = document.querySelector(selector);
        const newReview = document.querySelector(parent);

        const button = document.createElement('button');
        button.classList.add('button', 'button__white');
        button.textContent = 'Загрузить фото';
        input.insertAdjacentElement('afterend', button); 

        const trigerInput = () => input.click();

        const changeHandler = (event) => {
            if (!event.target.files) {
                return
            }

            const file = event.target.files[0];

            const reader = new FileReader();

            reader.onload = event => {
                const src = event.target.result
                input.insertAdjacentHTML('afterend', `
                    <div class="reviews__photo">
                        <div class="reviews__photo-remove">удалить фото</div>
                        <img class="reviews__photo-img" src="${src}" alt=${file.name}/>
                    </div>
                `);
                button.style.display = 'none'; 
                resolve(file);
            }
            
            //console.log(reader.readAsDataURL(file)); 
            reader.readAsDataURL(file);
           
        }

        const removePhotoUser = event => {
            if(event.target.className === 'reviews__photo-remove') {
                const photoBlock = newReview.querySelector('.reviews__photo');
                photoBlock.remove();
                button.style.display = 'inline-block';
            }
        } 


        button.addEventListener('click', trigerInput);
        input.addEventListener('change', changeHandler);
        newReview.addEventListener('click', removePhotoUser);
    })
}

