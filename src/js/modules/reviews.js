import {getData} from './local_storage';


async function reviews(selector) {
    class Review {
        constructor (name, photo, marathon, text, parentSelector) {
            this.name = name;
            this.photo = photo;
            this.marathon = marathon;
            this.text = text;
            this.parentSelector = parentSelector;
            this.parent = document.querySelector(this.parentSelector);
        }

        render () {
            const element = document.createElement('div');
            element.classList.add('reviews-item', 'animate__animated', 'animate__fadeInRight', 'wow');
            element.setAttribute("data-wow-duration", "1.5s");
            element.innerHTML = `
                <div class="reviews-item__img">
                    <img src=${this.photo} alt=${this.name}>
                </div>
                <div class="reviews-item__text">
                    <div class="reviews-item__subtitle">${this.name}</div>
                    <div class="reviews-item__minititle">${this.marathon}</div>
                    <div class="reviews-item__descr">
                        ${this.text}
                    </div>
                </div>
            `;
    
            this.parent.append(element);
        }
    }

      try {
        const arr = await getData('reviewsData', "reviews");
        const promises = arr.map(
            async ([key, info]) => {
            const {name, photo, marathon, text} = info;
            //тут добавить проверку по key, есть ли отзыв по данному ключу на странице, если нет , то добавляем новый. Скорей всего ключ записывать в дата атрибут
            const review = new Review(
                name,
                photo,
                marathon,
                text,
                `${selector}`
            );
            review.render();
            }
        );
        await Promise.all(promises);
        
      } catch (error) {
        console.error(error);
      }
}

export default reviews;
