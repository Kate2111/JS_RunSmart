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


    // modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('slow');
        })
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                        required: true,
                        email: true
                }
            },
            messages: {
                name: 'Пожалуйста, введите свое имя',
                phone: 'Пожалуйста, введите свой номер телефона',
                email: {
                    required: 'Пожалуйста, введите свою почту',
                    email: 'Неправильно введен адрес почты'
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');
    
    $('input[name=phone]').mask('+7 (999) 999-99-99');

    $('form').submit(function(e) { 
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

      // Timer

    const deadline = '2022-07-05';

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // с помощью метода Date.parse превращаем дату в виде строки в число. Тут получаем количество милисекунд- время до которого нам надо досчитать 
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours =  Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes =  Math.floor((t / 1000 / 60) % 24);
        const seconds =  Math.floor(t / 1000 % 60);

        return {
            'total': t, // свойство 'total' показывает общее количество милисекунд
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    class MenuCard {
        constructor (src, alt, subtitle, descr, oldprice, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.oldprice = oldprice;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }
            
        render () {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="catalog-item">
                    <div class="catalog-item__wrapper">
                        <div class="catalog-item__content catalog-item__content_active">
                            <img src=${this.src}" alt=${this.alt} class="catalog-item__img">
                            <div class="catalog-item__subtitle">${this.subtitle}</div>
                            <div class="catalog-item__descr">${this.descr}</div>
                            <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
                        </div>
                        <div class="catalog-item__list">
                            <ul>
                                <li>Вы услышите звуковое оповещение о нужном пульсе во время тренировки;</li>
                                <li>Вы увидите информативный графический индикатор целевых тренировочных зон пульса;</li>
                                <li>Также Вы увидите информацию о расходе калорий за тренировку;</li>
                                <li>Вы сможете посмотреть данные по 10 тренировкам.</li>
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
                </div>
            `;

            this.parent.append(element);
        }

    }

    new MenuCard(
        "img/catalogue_model.jpg",
        "catalog",
        "Пульсометр Polar FT1",
        "Для первых шагов в тренировках, основанных на сердечном ритме",
        4750,
        4500,
        ".catalog .catalog__content_two",
    ).render();

    new MenuCard(
        "img/bg_shoes.jpg",
        "catalog",
        "Пульсометр Polar FT1",
        "Для первых шагов в тренировках, основанных на сердечном ритме",
        4750,
        4500,
        ".catalog .catalog__content_two",
    ).render();

    


});

  
