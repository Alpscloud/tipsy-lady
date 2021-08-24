$(document).ready(function() {

	$('.js-accept-age-btn').on('click', function(e) {
		e.preventDefault();

		localStorage.setItem('ageChecker', true);
		
		$(this).parents('.age-checker').stop().hide();



		$('html').removeClass('is-fixed');

		$('.content__wrapper').addClass('is-opened');
		$('.promo-block__img').addClass('is-animated');
	});

	$('.js-cancel-age-btn').on('click', function(e) {
		e.preventDefault();

		window.close();
	});
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});


	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$('html').toggleClass('is-fixed');
		$('.js-mobile-menu').toggleClass('is-opened');
	});


	// Parallax

	function parallax(item){
		var scrolled = $(window).scrollTop();
		var speed = $(item).attr('data-parallax-speed');
		var direction = $(item).attr('data-parallax-direction');



		if(direction === 'horisontal-right') {
			$(item).css({
				'transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-webkit-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-o-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)',
				'-moz-transform': 'translate3d(' + (scrolled*speed) + 'px' + ', 0, 0)'
				
			});
		} else if(direction === 'horisontal-left') {
			$(item).css({
				'transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-webkit-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-o-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)',
				'-moz-transform': 'translate3d(' + -(scrolled*speed) + 'px' + ', 0, 0)'
				
			});
		} else if(direction === 'vertical-top') {
			$(item).css({
				'transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-moz-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-ms-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-o-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)',
				'-webkit-transform': 'translate3d(0, ' + -(scrolled*speed)+'px' + ', 0)'
			});
		} else if(direction === 'vertical-bottom') {
			$(item).css({
				'transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-moz-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-ms-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-o-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)',
				'-webkit-transform': 'translate3d(0, ' + (scrolled*speed)+'px' + ', 0)'
			});
		}
		

	}


	var productCards = $('.product-card').toArray();

	if (productCards.length > 0) {

		$(window).on('scroll', function() {

			var documentScroll = $(document).scrollTop();
			var scroll = $(this).scrollTop();
			var windowHeight = $(window).height();

			productCards.forEach(function(item) {
				var itemOffset = $(item).offset().top;
				var itemHeight = $(item).outerHeight();
				var visibilityPoint = itemOffset - windowHeight + 150;

				if (documentScroll > visibilityPoint) {
					$(item).find('.product-card__label').addClass('is-animated');
				}

			});


		});
	}



	var itemsParallax = $('.js-item-parallax');



	if (itemsParallax.length > 0) {

		$(window).on('scroll', function(e) {
			var scroll = $(this).scrollTop();

			itemsParallax.each(function() {
				
				parallax($(this));
				
			});

			
		});

	}


	if (html >= 768) {


		$(function(){ // document ready function

			var $window = $(window);

			$('.product-bg').each(function() { //выполняем скрипт отдельно для каждой секции
				var $parallaxBlock = $(this);
				var parallaxFunc = function() {
					if ($window.width() >= 768) { //если ширина окна >= 768
						var offset = $parallaxBlock.offset().top; //расстояние от начала документа до секции
						var scrollTop = $window.scrollTop(); //прокрученное расстояние
						var yPos = -(offset - scrollTop)/3; //считаем смещение
						var coords = 'center '+ yPos + 'px';
						$parallaxBlock.css('background-position', coords); //устанавливаем смещение
					} else {
						$parallaxBlock.css('background-position', 'top center'); //отключаем параллакс на маленьких экранах
				}
			};

			parallaxFunc(); //выполняем нашу функцию при загрузке страницы

			$window.on('scroll', function() {
				parallaxFunc(); //и при прокрутке
			});

			});
		});

	}





	$('.form-input').on('focus', function() {
		var self = $(this);
		var label = self.parents('.form-group__label');

		label.addClass('is-active');
	});

	$('.js-required-input').on('focus',function() {
		var self = $(this);
		var formGroup = self.parents('.form-group__label');

		formGroup.addClass('is-active');

		if(formGroup.hasClass('is-error')) {
			formGroup.removeClass('is-error');
		}

	});

	$('.form-input').on('blur', function() {
		var self = $(this);
		var label = self.parents('.form-group__label');


		if (label.hasClass('is-active') && self.val() || self.val() !== '') {
			label.addClass('is-valid');
		} else {
			label.removeClass('is-valid');
			label.removeClass('is-active');
		}

		
	});


	// $('form').submit(function(e) {
	// 	e.preventDefault();

	// 	var self = $(this),
	// 		inputs = self.find('.js-required-input'),
	// 		flag = true;


	// 	// Validate
	// 	$(inputs).each(function() {
	// 		if(!$(this).val() || $(this).val() == "") {
	// 			$(this).parents('.form-group__label').addClass('is-error');
	// 			flag = false;
	// 		}
	// 	});

	// 	if(!flag) {return false;}

	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: self.serialize()
	// 	}).done(function() {
	// 		self.trigger("reset");
	// 		alert('send');
	// 	});

	// });


	$('.contacts-form .wpcf7-form').on('submit', function(e) {
		var self = $(this),
			inputs = self.find('.wpcf7-form-control.js-required-input'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).parents('.form-group__label').addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		self.trigger("reset");
		window.location.href = '/thanks';

	});


});
