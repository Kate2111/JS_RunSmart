import {getResource} from './services';

async function reviews(selector) {
    
     class Review {
        constructor (name, marathon, text, parentSelector) {
            this.name = name;
            this.marathon = marathon;
            this.text = text;
            this.parentSelector = parentSelector;
            this.parent = document.querySelector(this.parentSelector);
        }

        render () {
            const element = document.createElement('div');
            element.classList.add('reviews-item', 'animate__animated', 'animate__fadeInUp', 'wow');
            element.setAttribute("data-wow-duration", "2s");
            element.setAttribute("data-wow-delay", "1s");
            element.innerHTML = `
                <div class="reviews-item__img">
                    <img src="img/catalogue_model.jpg" alt=${this.name}>
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
        const data = await getResource("reviews");
        const arr = Object.entries(data);
      
        const promises = arr.map(
            async ([key, info]) => {
            const {name, marathon, text} = info;
            const review = new Review(
                name,
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
