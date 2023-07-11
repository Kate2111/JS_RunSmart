import { connectDatabaseEmulator } from "firebase/database";

function createElem(className, parent, text) {
    const elem = document.createElement(button);
    elem.classList.add(...className);
    elem.textContent = text;
    parent.insertAdjacentElement('afterend', elem);; 
}

export default function upload(selector) {
    const input = document.querySelector(selector);

    const button = document.createElement('button');
    button.classList.add('button', 'button__white');
    button.textContent = 'Загрузить фото';
    input.insertAdjacentElement('afterend', button); 
    //createElem(['button', 'button__white'], input, 'Загрузить фото');

    const trigerInput = () => input.click();

    const changeHandler = (event) => {
        if (!event.target.files) {
            return
        }

        const file = event.target.files[0];
        console.log(file);

        
        
       
        const reader = new FileReader();

        reader.onload = event => {
            console.log(event.target)
            input.insertAdjacentElement('afterend', `<img src="${event.target.result}"/>`);
        }

        console.log(reader.readAsDataURL(file));
        
        
        //reader.readAsDataURL(file);
    }

    button.addEventListener('click', trigerInput);
    input.addEventListener('change', changeHandler);
}