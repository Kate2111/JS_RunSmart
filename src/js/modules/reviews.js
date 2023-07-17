import {getData} from './local_storage';



async function reviews(selector) {
    class Review {
        constructor (id, name, photo, marathon, text, parentSelector) {
            this.id = id
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
            element.setAttribute("data-index", `${this.id}`);
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
            const isReview = document.querySelector(`[data-index="${key}"]`);
            if(isReview) {
                return
            }
            const review = new Review(
                key,
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
