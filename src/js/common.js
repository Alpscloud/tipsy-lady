$(document).ready(function() {

	$('.js-accept-age-btn').on('click', function(e) {
		e.preventDefault();

		$(this).parents('.age-checker').stop().hide();

		$('html').removeClass('is-fixed');
		$('.content__wrapper.is-homepage').addClass('is-opened');
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


	$('form').submit(function(e) {
		e.preventDefault();

		var self = $(this),
			inputs = self.find('.js-required-input'),
			flag = true;


		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).parents('.form-group__label').addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: self.serialize()
		}).done(function() {
			self.trigger("reset");
			alert('send');
		});

	});


});
