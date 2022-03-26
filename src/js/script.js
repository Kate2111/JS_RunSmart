/* let number ='Ivan';
        переменная, которую можно изменить позже */

/* const pi=3.14;
        нельзя изменять эту переменную */

/* Типы данных:
Number - все, что можно измерить количественно
String - все, что можем описать словами используя разные ковычки "",''
True/false логический
Null - чего просто не существует в природе
Undefined - существует, но не имеет никакого значения
Symbol -  */

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
        responsive: [
                {
                        breakpoint: 992,
                        settings: {
                                speed: 1200,
                                dots: true,
                                arrows: false
                        }
                }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');    
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                })
            });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
}); 


