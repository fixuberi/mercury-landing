
$('.owl-carousel').owlCarousel(
    {
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false,
        smartSpeed: 500,
        loop: true,
        startPosition: 1,
        nav: false,
        dots: false
    }
);
var owl = $('.owl-carousel');
let nav_prev = $('.nav-prev').parent();
let nav_next = $('.nav-next').parent();

nav_prev.click(function () {
    owl.trigger('prev.owl.carousel');
})
nav_next.click(function () {
    owl.trigger('next.owl.carousel');
})