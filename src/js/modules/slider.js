export default function slider () {
    $('.carousel__inner').slick({
        speed: 500,
        infinite: true,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
        responsive: [
                {
                        breakpoint: 300,
                        settings: {
                                speed: 500,
                                dots: true,
                                arrows: false
                        }
                }
        ]
    });
}