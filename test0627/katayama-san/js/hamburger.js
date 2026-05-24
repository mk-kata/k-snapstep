// JavaScript Document

/*hamburger*/

$(function () {
	$('.hamburger').click(function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.globalMenuSp').addClass('active');
		} else {
			$('.globalMenuSp').removeClass('active');
		}
	});
	$('.globalMenuSp ul li a').on('click', function () {
		$('.globalMenuSp').removeClass('active');
		$('.hamburger').removeClass('active');
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.global_nav');
	const navTop = nav.offsetTop;

	window.addEventListener('scroll', function () {
		if (window.scrollY >= navTop) {
			nav.classList.add('fixed');
		} else {
			nav.classList.remove('fixed');
		}
	});
});
