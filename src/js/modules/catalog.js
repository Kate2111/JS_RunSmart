import {getData} from './local_storage';
import slider from './slider';
import tabs from './tabs';



async function cards(category, selector) {
    
     class CatalogCard {
        constructor (src1, src2, src3, descr1, descr2, descr3, descr4, subtitle, oldprice, price, parentSelector) {
            this.src1 = src1;
            this.src2 = src2;
            this.src3 = src3;
            this.descr1 = descr1;
            this.descr2 = descr2;
            this.descr3 = descr3;
            this.descr4 = descr4;
            this.subtitle = subtitle;
            this.oldprice = oldprice;
            this.price = price;
            this.parentSelector = parentSelector;
            this.parent = document.querySelector(this.parentSelector);
        }

        render () {
            const element = document.createElement('div');
            element.classList.add('catalog-item');
            element.innerHTML = `
                <div class="catalog-item__wrapper">
                    <div class="catalog-item__content catalog-item__content_active">
                        <div class="carousel">
                            <div class="carousel__inner">
                                <div>
                                    <img src=${this.src1} alt="slide">
                                </div>
                                <div>
                                    <img src=${this.src2} alt="slide">
                                </div>
                                <div>
                                    <img src=${this.src3} alt="slide">
                                </div>
                            </div>
                        </div>
                        <div class="catalog-item__subtitle">${this.subtitle}</div>
                        <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
                    </div>
                    <div class="catalog-item__list">
                        <ul>
                            <li>${this.descr1}</li>
                            <li>${this.descr2}</li>
                            <li>${this.descr3}</li>
                            <li>${this.descr4}</li>
                        </ul>
                        <a href="#" class="catalog-item__back">назад</a>
                    </div>
                </div>
                <hr>

                <div class="catalog-item__footer">
                    <div class="catalog-item__prices">
                        <div class="catalog-item__old-price">${this.oldprice} руб.</div>
                        <div class="catalog-item__price">${this.price} руб.</div>
                    </div>
                    <button class="button button_mini">КУПИТЬ</button>
                </div> 
            `;
    
            this.parent.append(element);
        }
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve();
          };
          img.onerror = (error) => {
            reject(error);
          };
          img.src = src;
        });
      };
      
      
      try {
        const data = await getData('catalogData', "catalog");
    
          const categoryData = data.find((item) => item.category === category);
          if (categoryData && Array.isArray(categoryData.info)) {
            const promises = categoryData.info.map(
              async ({ carusel, detail, price, oldprice, subtitle }) => {
                const [src1, src2, src3] = carusel;
                const [descr1, descr2, descr3, descr4] = detail;
      
                const card = new CatalogCard(
                  src1,
                  src2,
                  src3,
                  descr1,
                  descr2,
                  descr3,
                  descr4,
                  subtitle,
                  oldprice,
                  price,
                  `${selector}`
                );
      
                card.render();
                await Promise.all([
                  loadImage(src1),
                  loadImage(src2),
                  loadImage(src3),
                ]);
              }
            );
      
            await Promise.all(promises);
            tabs();
            slider();
            
            $('.button_mini').each(function(i) {
                $(this).on('click', function() {
                        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                        $('.overlay, #order').fadeIn('slow');
                })
            });
           
          }
      } catch (error) {
        console.error(error);
      }
}

export default cards;
