$(document).ready(function() {
    // Aplica o tema salvo ao carregar a página
    const savedTheme = localStorage.getItem('theme') || 'system';
    if (savedTheme === 'dark' || savedTheme === 'light') {
        $('body').addClass(savedTheme);
    } else {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        $('body').addClass('system');
    }

    // Atualiza o texto do botão de tema
    const toggle = $('#toggle');
    const currentTheme = $('body').hasClass('dark') ? 'Tema Claro' :
                        $('body').hasClass('light') ? 'Tema Escuro' : 'Tema Sistema';
    toggle.text(currentTheme);

    $('#mobile_btn').on('click', function () { 
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.review-card', {
        origin: 'bottom',
        duration: 1000,
        distance: '20%',
        delay: 200
    });

    // Controle do botão "Ver mais avaliações"
    const btnVerMais = $('#ver-mais-avaliacoes');
    const maisAvaliacoes = $('#mais-avaliacoes');

    if (btnVerMais.length && maisAvaliacoes.length) {
        // Inicialmente esconde a seção de mais avaliações
        maisAvaliacoes.hide();

        function mostrarAvaliacoes() {
            const duration = 800;

            maisAvaliacoes.slideDown({
                duration: duration,
                easing: 'easeInOutQuart',
                start: function() {
                    btnVerMais.fadeOut(100);

                    maisAvaliacoes.find('.more-reviews-title').css({
                        opacity: 0,
                        transform: 'translateY(30px)'
                    }).animate({
                        opacity: 1,
                        transform: 'translateY(0)'
                    }, {
                        duration: duration,
                        easing: 'easeOutQuart'
                    });

                    maisAvaliacoes.find('.review-card').each(function(index) {
                        $(this).css({
                            opacity: 0,
                            transform: 'translateY(50px)'
                        }).delay(index * 150).animate({
                            opacity: 1,
                            transform: 'translateY(0)'
                        }, {
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    });
                },
                complete: function() {
                    $('html, body').animate({
                        scrollTop: maisAvaliacoes.offset().top - 100
                    }, {
                        duration: 800,
                        easing: 'easeInOutQuart'
                    });
                }
            });
        }

        btnVerMais.on('click', function() {
            mostrarAvaliacoes();
        });

        // Easing custom
        $.easing.easeInOutQuart = function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        };

        $.easing.easeOutQuart = function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        };
    }
});
