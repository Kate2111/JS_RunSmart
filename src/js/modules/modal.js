export default function modal() {
    
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

}