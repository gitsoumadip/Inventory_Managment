const clicktooltip = () => {
	jQuery("body").on("click", ".details-tooltip__button", function (e) {
		e.preventDefault();

		jQuery(".details-tooltip__button").parent().not((jQuery(this))).removeClass("active");
		jQuery(this).parent().toggleClass("active");

		jQuery(".details-tooltip__content").not(jQuery(this).next(".details-tooltip__content")).removeClass("active");
		jQuery(this).next(".details-tooltip__content").toggleClass("active");

	})
};

const clickAccount = () => {
	jQuery("body").on("click", ".my__account > a", function (e) {
		e.preventDefault();

		jQuery(".my__account > ul").not(jQuery(this).next(".my__account > ul")).removeClass("active");
		jQuery(this).next(".my__account > ul").toggleClass("active");
		jQuery(".account__information").removeClass("active__cart");

	})

};

const forms = () => {
	let e = document.querySelectorAll(".form-field");
	setTimeout((function () {
		for (let t = 0; t < e.length; t++) e[t].value && (e[t].parentNode.classList.add("has-value"), "TEXTAREA" == e[t].tagName && (e[t].style.cssText = "height: var(--initHeight);", e[t].style.cssText = `height: ${this.scrollHeight}px`))
	}), 100);
	for (let t = 0; t < e.length; t++) "TEXTAREA" == e[t].tagName && e[t].addEventListener("input", (function () {
		this.style.cssText = "height: var(--initHeight);", this.style.cssText = `height: ${this.scrollHeight}px`
	})), e[t].addEventListener("focus", (function () {
		this.parentNode.classList.add("has-value")
	})), e[t].addEventListener("blur", (function () {
		this.value || this.parentNode.classList.remove("has-value")
	}));
	! function (e, t, s) {
		var n = e.querySelectorAll(".inputfile");
		Array.prototype.forEach.call(n, (function (e) {
			var t = e.nextElementSibling,
				s = t.innerHTML;
			e.addEventListener("change", (function (e) {
				var n = "";
				(n = this.files && this.files.length > 1 ? (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length) : e.target.value.split("\\").pop()) ? t.querySelector("span").innerHTML = n : t.innerHTML = s
			})), e.addEventListener("focus", (function () {
				e.classList.add("has-focus")
			})), e.addEventListener("blur", (function () {
				e.classList.remove("has-focus")
			}))
		}))
	}(document, window)
};



const clickCart = () => {
	jQuery("body").on("click", ".account__links .clickCart", (function (e) {
		if (jQuery(this).data('status') != 0) {
			e.preventDefault();
			jQuery(this).closest(".account__information").addClass("active__cart");
			jQuery(".personDropdown").removeClass("active");
		}
	}))
	jQuery("body").on("click", ".divya__minicart .cart__close", (function (e) {
		e.preventDefault();
		jQuery(this).closest(".account__information").removeClass("active__cart");
	}))
};

const shareInit = () => {
	jQuery("body").on("click", ".cart__button-container .share", (function (e) {
		e.preventDefault();
		jQuery(this).toggleClass("share__main");
		jQuery(this).find(".share__reveal").toggleClass("share__active");
	}))
};

// const inputIncrement = () => {
// 	jQuery("body").on("click", ".quantity__grid .minus", (function (e) {
// 		e.preventDefault();
// 		var $input = $(this).parent().find('input');
// 		var count = parseInt($input.val()) - 1;
// 		count = count < 1 ? 1 : count;
// 		$input.val(count);
// 		$input.change();
// 		return false;
// 	})),
// 	// jQuery("body").on("click", ".quantity__grid .plus", (function (e) {
// 	// 	e.preventDefault();
// 	// 	var $input = $(this).parent().find('input');
// 	// 	$input.val(parseInt($input.val()) + 1);
// 	// 	$input.change();
// 	// 	return false;
// 	// }))
// };

const passwordClick = () => {
	$('#togglePassword').click(function () {

		if ($(this).hasClass('fa-eye-slash')) {

			$(this).removeClass('fa-eye-slash');

			$(this).addClass('fa-eye');

			$('#password').attr('type', 'text');

		} else {

			$(this).removeClass('fa-eye');

			$(this).addClass('fa-eye-slash');

			$('#password').attr('type', 'password');
		}
	});

	$('#togglePassword-2').click(function () {

		if ($(this).hasClass('fa-eye-slash')) {

			$(this).removeClass('fa-eye-slash');

			$(this).addClass('fa-eye');

			$('#password-2').attr('type', 'text');

		} else {

			$(this).removeClass('fa-eye');

			$(this).addClass('fa-eye-slash');

			$('#password-2').attr('type', 'password');
		}
	});

	$('#togglePassword-3').click(function () {

		if ($(this).hasClass('fa-eye-slash')) {

			$(this).removeClass('fa-eye-slash');

			$(this).addClass('fa-eye');

			$('#password-3').attr('type', 'text');

		} else {

			$(this).removeClass('fa-eye');

			$(this).addClass('fa-eye-slash');

			$('#password-3').attr('type', 'password');
		}
	});
};

const journeyBox = () => {
	jQuery('body').on("click", '.journey__dots span', function (e) {
		e.preventDefault();

		jQuery(".journey__dots span").each(function () {
			jQuery(this).removeClass("activated-dots active-dots");
		});

		jQuery(this).removeClass("active-dots");
		var _thisParent = jQuery(this).parents('.journeys');
		var _thisIndex = jQuery(this).index();
		// console.log(_thisIndex);
		_thisParent[0].style.setProperty('--rotateLine', _thisIndex * 35 + 'deg');

		// add
		jQuery(this).addClass("active-dots");

		for (let i = 0; i < _thisIndex; i++) {
			jQuery('.journey__dots span').eq(i).addClass("activated-dots").removeClass("active-dots");
		}
	});

	jQuery('.journey__dots span:nth-child(1)').on('click', function () {
		jQuery('.journey__text div:nth-child(1)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(1)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	jQuery('.journey__dots span:nth-child(2)').on('click', function () {
		jQuery('.journey__text div:nth-child(2)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(2)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	jQuery('.journey__dots span:nth-child(3)').on('click', function () {
		jQuery('.journey__text div:nth-child(3)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(3)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	jQuery('.journey__dots span:nth-child(4)').on('click', function () {
		jQuery('.journey__text div:nth-child(4)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(4)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	jQuery('.journey__dots span:nth-child(5)').on('click', function () {
		jQuery('.journey__text div:nth-child(5)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(5)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	jQuery('.journey__dots span:nth-child(6)').on('click', function () {
		jQuery('.journey__text div:nth-child(6)').addClass("text-div").siblings().removeClass("text-div");
		jQuery('.journey-year a:nth-child(6)').addClass("journey-text").siblings().removeClass("journey-text");
	});

	// setInterval(function () {
	// 	dotmove();
	// }, 3000);
	// function dotmove() {
	// 	var len = $('.journey__dots span');
	// 	var i = 12;
	// 	$('.journey__dots span').each(function () {
	// 		i++;
	// 		if ($(this).attr('class') == "active-dots") {
	// 			$(this).next('.journey__dots span').addClass('active-dots').prev('.journey__dots span').addClass('activated-dots');
	// 			$(this).removeClass('active-dots');
	// 			return false;
	// 		}
	// 		if (len.length == i) {
	// 			$('.journey__dots span:nth-child(1)').addClass('active-dots');
	// 		}
	// 	});
	// }
};

const errorAnimation = () => {
	(function ($) {
		$(function () {

			$().ready(function () {
				(function () {
					var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					window.requestAnimationFrame = requestAnimationFrame
				})();
				var canvas = document.getElementById('canvas-404');
				if (canvas === null) return;
				setTimeout(function () {
					$('.js-toaster_lever').delay(20).animate({ top: 30 }, 100);
					$('.js-toaster_toast').removeClass('js-ag-hide').addClass('js-ag-animated js-ag-bounce-in-up')
				}, 800);
				var ctx = canvas.getContext("2d"),
					loading = true;

				canvas.height = 210;
				canvas.width = 300;

				var parts = [],
					minSpawnTime = 100,
					lastTime = new Date().getTime(),
					maxLifeTime = Math.min(6000, (canvas.height / (1.5 * 60) * 1000)),
					emitterX = canvas.width / 2 - 50,
					emitterY = canvas.height - 10,
					smokeImage = new Image();

				function spawn() {
					if (new Date().getTime() > lastTime + minSpawnTime) {
						lastTime = new Date().getTime();
						parts.push(new smoke(emitterX, emitterY))
					}
				}
				function render() {
					if (loading) {
						load();
						return false
					}
					var len = parts.length;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					while (len--) if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
						parts.splice(len, 1)
					} else {
						parts[len].update();
						ctx.save();
						var offsetX = -parts[len].size / 2, offsetY = -parts[len].size / 2;
						ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
						ctx.rotate(parts[len].angle / 180 * Math.PI);
						ctx.globalAlpha = parts[len].alpha;
						ctx.drawImage(smokeImage, offsetX, offsetY, parts[len].size, parts[len].size);
						ctx.restore()
					}
					spawn();
					requestAnimationFrame(render)
				}
				function smoke(x, y, index) {
					this.x = x;
					this.y = y;
					this.size = 1;
					this.startSize = 60;
					this.endSize = 69;
					this.angle = Math.random() * 359;
					this.startLife = new Date().getTime();
					this.lifeTime = 0;
					this.velY = -1 - (Math.random() * 0.5);
					this.velX = Math.floor(Math.random() * (-6) + 3) / 10
				}
				smoke.prototype.update = function () {
					this.lifeTime = new Date().getTime() - this.startLife;
					this.angle += 0.2;
					var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
					this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
					this.alpha = 1 - (lifePerc * .01);
					this.alpha = Math.max(this.alpha, 0);
					this.x += this.velX;
					this.y += this.velY
				}
				smokeImage.src = document.getElementsByTagName('img')[3].src;
				smokeImage.onload = function () {
					loading = false
				};
				function load() {
					if (loading) {
						setTimeout(load, 3000);
					} else {
						render();
					}
				}

				render();
			});

		});
	})(jQuery);
};

const letterImage = () => {
	jQuery(window).ready(function(){
		setInterval(function(){
			jQuery('.letter-image').addClass("fadeInUp")
		}, 300);

	});
};

const parallaxMain = () => {
	let didScroll = false;
	let paralaxTitles = document.querySelectorAll('.paralax-image');
	let paralaxTitles2 = document.querySelectorAll('.paralax-image-2');

	const scrollInProgress = () => {
		didScroll = true
	}

	const raf = () => {
		if (didScroll) {
			paralaxTitles.forEach((element, index) => {
				element.style.transform = "translateX(" + window.scrollY / 150 + "%)"
			})
			paralaxTitles2.forEach((element, index) => {
				element.style.transform = "translateX(" + window.scrollY / -50 + "%)"
			})
			didScroll = false;
		}
		requestAnimationFrame(raf);
	}


	requestAnimationFrame(raf);
	window.addEventListener('scroll', scrollInProgress)
};

const initZoom = () => {
	$(".imgZommOnHover").zoom();
};

const allCarousel = () => {
	jQuery(".divyaCarousel").lightSlider({
		auto: !1,
		gallery: true,
		mode: "fade",
		vertical: true,
		verticalHeight: 500,
		vThumbWidth: 100,
		item: 1,
		thumbItem: 5,
		thumbMargin: 10,
		auto: !1,
		loop: !0,
		controls: !0,
		enableTouch: !0,
		enableDrag: !0,
		lazyLoad: !0,

	});
};

const initTab = () => {
	const whichTab = document.querySelector(".wrapper");
	const tabButton = document.querySelectorAll(".tab-button");
	const contents = document.querySelectorAll(".content");

	if (whichTab) {
		whichTab.onclick = e => {
			const id = e.target.dataset.id;
			if (id) {
				tabButton.forEach(btn => {
					btn.classList.remove("active");
				});
				e.target.classList.add("active");

				contents.forEach(content => {
					content.classList.remove("active");
				});
				const element = document.getElementById(id);
				element.classList.add("active");
			}
		}
	}
};

const initTab2 = () => {
	jQuery(".tab-menu a").click(function(e) {
        e.preventDefault(), jQuery(this).addClass("actv"), jQuery(this).parents().siblings().find("a").removeClass("actv");
        var t = jQuery(this).attr("href");
        jQuery(".tab-content").not(t).hide(), jQuery(t).fadeIn()
    })
};

const initTab3 = () => {
	jQuery(".tab-menu-2 a").click(function(e) {
        e.preventDefault(), jQuery(this).addClass("active"), jQuery(this).parents().siblings().find("a").removeClass("active");
        var t = jQuery(this).attr("href");
        jQuery(".tab-content-2").not(t).hide(), jQuery(t).fadeIn()
    })
};

const accordMain = () => {
	jQuery('body').on("click", '.accord .accord-btn', function (e) {
		e.preventDefault();
		var _thisParent = jQuery(this).parents('.accord');

		_thisParent.find(jQuery('.accord-target')).not(jQuery(this).next('.accord-target')).slideUp();
		jQuery(this).next('.accord-target').slideToggle();

		_thisParent.find(jQuery('.accord-btn')).not(jQuery(this)).removeClass('actv');
		jQuery(this).toggleClass('actv');
	});
};

const other = () => {

	$(document).on("scroll", function(){
		if
      ($(document).scrollTop() > 10){
		  $("header").addClass("header-on-scroll");
		}
		else
		{
			$("header").removeClass("header-on-scroll");
		}
	});

	jQuery('body').on('click', ".scrollTop", function (e) {
		jQuery('html, body').animate({
			scrollTop: jQuery(jQuery(this).attr('href')).offset().top
		}, 500);
		return false;
	});
};

const initslider = () => {

	var swiper = new Swiper('.swiper-container', {
		autoplay: {
			delay: 11125000,
		},
		speed: 1400,
		parallax: true,
		slidesPerView: "auto",
		centeredSlides: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		runCallbacksOnInit: true,
		on: {
			init: function () {
				zoomImage(this.$el);
				moveDownText(this.$el);
			},
			slideNextTransitionStart: function () {
				zoomImage(this.$el);
				moveDownText(this.$el);
			},
			slidePrevTransitionStart: function () {
				zoomImage(this.$el);
				moveDownText(this.$el);
			}
		}
	});

	var swiper_2 = new Swiper('.swiper-container-2', {
		// autoplay: {
		// 	delay: 5000,
		// },
		speed: 700,
		loop: true,
		allowTouchMove: false,
		parallax: true,
		slidesPerView: 1,
		pagination: true,
		pagination: {
			el: '.swiper-pagination-2',
			clickable: true,
		},
		breakpoints: {
			320: {
				allowTouchMove: true
			},

			876: {
				allowTouchMove: false
			}
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next-2',
			prevEl: '.swiper-button-prev-2',
		},
		runCallbacksOnInit: true,
		on: {
			init: function () {
				moveDownText(this.$el);
			},
			slideNextTransitionStart: function () {
				moveDownText(this.$el);
			},
			slidePrevTransitionStart: function () {
				moveDownText(this.$el);
			}
		}
	});

	var swiper_3 = new Swiper('.mega__carousel', {
		autoplay: {
			delay: 3000,
		},
		speed: 1400,
		parallax: true,
		slidesPerView: "auto",
		centeredSlides: true,
	});


	var thumbs = new Swiper('.gallery-thumbs', {
		slidesPerView: 1,
		loop: true,
		autoplay: false
	});

	swiper_2.controller.control = thumbs;
	thumbs.controller.control = swiper_2;


	var swiper_4 = new Swiper('.swiper-container-4', {
		// autoplay: {
		// 	delay: 5000,
		// },
		speed: 700,
		loop: false,
		spaceBetween: 10,
		allowTouchMove: true,
		parallax: true,
		slidesPerView: 5,
		pagination: {
			el: '.swiper-pagination-4',
			clickable: true,
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next-4',
			prevEl: '.swiper-button-prev-4',
		},
		breakpoints: {
			320: {
				slidesPerView: 1
			},

			475: {
				slidesPerView: 2
			},

			775: {
				slidesPerView: 3
			},

			1240: {
				slidesPerView: 4
			},

			1500: {
				slidesPerView: 5
			}
		}
	});

	var swiper_5 = new Swiper('.swiper-container-5', {
		// autoplay: {
		// 	delay: 5000,
		// },
		speed: 700,
		loop: false,
		spaceBetween: 10,
		allowTouchMove: true,
		parallax: true,
		slidesPerView: 5,
		pagination: {
			el: '.swiper-pagination-5',
			clickable: true,
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next-5',
			prevEl: '.swiper-button-prev-5',
		},
		breakpoints: {
			320: {
				slidesPerView: 2
			},

			975: {
				slidesPerView: 3
			},

			1240: {
				slidesPerView: 4
			},

			1500: {
				slidesPerView: 5
			}
		}
	});

	var swiper_6 = new Swiper('.swiper-container-6', {
		autoplay: true,
		autoplay: {
			delay: 3000,
		},
		speed: 700,
		loop: false,
		spaceBetween: 15,
		allowTouchMove: false,
		parallax: true,
		slidesPerView: 4,
		pagination: {
			el: '.swiper-pagination-6',
			clickable: true,
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next-6',
			prevEl: '.swiper-button-prev-6',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				loop: true
			},

			790: {
				slidesPerView: 2,
				loop: true
			},

			975: {
				slidesPerView: 3,
				loop: true
			},

			1500: {
				slidesPerView: 4
			}
		}
	});

	var swiper_7 = new Swiper('.swiper-container-7', {
		// autoplay: {
		// 	delay: 5000,
		// },
		speed: 700,
		loop: false,
		spaceBetween: 10,
		allowTouchMove: true,
		parallax: true,
		slidesPerView: 5,
		pagination: {
			el: '.swiper-pagination-7',
			clickable: true,
		},
		// If we need pagination
		navigation: {
			nextEl: '.swiper-button-next-7',
			prevEl: '.swiper-button-prev-7',
		},
		breakpoints: {
			320: {
				slidesPerView: 4
			},

			475: {
				slidesPerView: 4
			},

			575: {
				slidesPerView: 5
			},

			675: {
				slidesPerView: 6
			},

			980: {
				slidesPerView: 7
			},

			1099: {
				slidesPerView: 8
			},

			1200: {
				slidesPerView: 9
			},

			1500: {
				slidesPerView: 9
			}
		}
	});


	function zoomImage(sliderDOM) {
		const slideActive = sliderDOM.find('.swiper-slide-active, .swiper-slide-duplicate-active');
		const imageSlide = slideActive.find('.slide-inner--image');

		const otherImages = sliderDOM.find('.swiper-slide-prev, .swiper-slide-next');
		const notActiveImage = otherImages.find('.slide-inner--image');


		gsap.set(imageSlide, { opacity: 0 });
		gsap.to(imageSlide, { duration: 0, y: 0, opacity: 1 });
	}

	function moveDownText(sliderDOM) {
		const slideActive = sliderDOM.find('.swiper-slide-active');
		const slideCaption = slideActive.find('.slide-inner--info');

		const oldActive = sliderDOM.find('.swiper-slide-prev, .swiper-slide-prev');
		const oldCaption = oldActive.find('.slide-inner--info');

		// out
		gsap.to(oldCaption, .3, {
			ease: Power2.easeOut,
			startAt: {
				autoAlpha: 1
			},

			autoAlpha: 0
		});


		// in
		gsap.set(slideCaption, {
			autoAlpha: 0
		});
		gsap.to(slideCaption, 3, {
			ease: Power4.easeOut,
			startAt: {
				autoAlpha: 0
			},

			autoAlpha: 1,
			display: "block"
		});

	}
};

const initAcc = () => {
	const accordionTitles = document.querySelectorAll(".accordionTitle");

	accordionTitles.forEach((accordionTitle) => {
		accordionTitle.addEventListener("click", () => {
			if (accordionTitle.classList.contains("is-open")) {
				accordionTitle.classList.remove("is-open");
			} else {
				const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
				accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
					accordionTitleWithIsOpen.classList.remove("is-open");
				});
				accordionTitle.classList.add("is-open");
			}
		});
	});
};

const hamMenu = () => {
	$('.hamburger').click(function(){

		var $this = $( this );

		if ($this.hasClass('is-active')){
			$('.fsmenu, .logo').removeClass('is-active');
		} else{
			$('.fsmenu, .logo').addClass('is-active');
		};
		$this.toggleClass('is-active');
	});

	$( ".fsmenu--list-element" ).hover(
		function() {
			$( this ).addClass('open');
			$( this ).removeClass('is-closing');
		}, function() {
			$( this ).removeClass('open');
			$( this ).addClass('is-closing');
		}
	);
}

window.addEventListener("DOMContentLoaded", () => {
	clicktooltip();
	clickAccount();
	forms();
	clickCart();
	shareInit();
	// inputIncrement();
	passwordClick();
	journeyBox();
	errorAnimation();
	letterImage();
	parallaxMain();
	initZoom();
	allCarousel();
	initTab();
	initTab2();
	initTab3();
	accordMain();
	other();
	initslider();
	initAcc();
	hamMenu();
});
