darkMode = localStorage.getItem("darkMode");
document.addEventListener("DOMContentLoaded", function() {
	let body = document.querySelector("body");
	darkMode == 'active' ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");

	$(".sub-link.active").closest(".nav-item").addClass('show');
});

getVh = () => {
	let e = .01 * window.innerHeight;
	document.documentElement.style.setProperty("--vh", `${e}px`)
}

themechanger = () => {
	$(".theme-changer a").click(function () {
		$("body").toggleClass("dark-mode");
		$(this).toggleClass("t__change");
		darkMode == "active" 
			? localStorage.setItem("darkMode" , "inactive")
			: localStorage.setItem("darkMode" , "active");
	});
}

forms = () => {
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
}

sidebarmenu = () => {

	$(".sidebar").on("mouseenter mouseleave", function (e) {
		var isHover = e.type === "mouseenter" ? true : false;

		if ($(".sidebar").hasClass("minimized")) {
			if (isHover) {
				setTimeout(function () {
					$(".sidebar").addClass("expand");

				});
			} else {
				$(".sidebar").removeClass("expand");
				$(".sidebar-body").scrollTop(0);

			}
		}
	});

	// content menu
	$("#contentMenu").on("click", function (e) {
		e.preventDefault();
		$(".sidebar").toggleClass("minimized");

		$(".sidebar-body").scrollTop(0);

	});

	// mobile menu
	$("#mobileMenu").on("click", function (e) {
		e.preventDefault();
		$("body").toggleClass("sidebar-show");
	});
}

sidebarmenuDropdown = () => {
	// single level menu
	$(".nav-sidebar > .nav-link").on("click", function (e) {
		e.preventDefault();

		// remove active siblings
		$(this).addClass("active").siblings().removeClass("active");

		// remove active siblings from other nav
		var ss = $(this).closest(".nav-sidebar").siblings(".nav-sidebar");
		var sg = $(this).closest(".nav-group").siblings(".nav-group");

		ss.find(".active").removeClass("active");
		ss.find(".show").removeClass("show");

		sg.find(".active").removeClass("active");
		sg.find(".show").removeClass("show");
	});

	

	// two level menu
	$(".nav-sidebar .nav-item").on("click", ".nav-link", function (e) {
		// e.preventDefault();

		if ($(this).hasClass("with-sub")) {
			$(this).parent().toggleClass("show");
			$(this).parent().siblings().removeClass("show");
		} else {
			$(this).parent().addClass("active").siblings().removeClass("active");
			$(this).parent().siblings().find(".sub-link").removeClass("active");
		}

		var ss = $(this).closest(".nav-sidebar").siblings(".nav-sidebar");
		var sg = $(this).closest(".nav-group").siblings(".nav-group");

		ss.find(".active").removeClass("active");
		ss.find(".show").removeClass("show");

		sg.find(".active").removeClass("active");
		sg.find(".show").removeClass("show");


	});

	$(".nav-sub").on("click", ".sub-link", function (e) {
		// e.preventDefault();

		$(this).addClass("active").siblings().removeClass("active");

		$(this)
			.closest(".nav-item")
			.addClass("active")
			.siblings()
			.removeClass("active");
		$(this)
			.closest(".nav-item")
			.siblings()
			.find(".sub-link")
			.removeClass("active");

		$(this)
			.closest(".nav-sidebar")
			.siblings()
			.find(".active")
			.removeClass("active");
		$(this)
			.closest(".nav-group")
			.siblings()
			.find(".active")
			.removeClass("active");
	});

	$(".nav-group-label").on("click", function () {
		$(this).closest(".nav-group").toggleClass("show");
		$(this).closest(".nav-group").siblings().removeClass("show");


	});
}

function notification() {
	document.getElementById("notificationDropdown").classList.toggle("show");
}

window.onclick = function (event) {
	if (!event.target.matches('.dropbtn-noti')) {
		var dropdowns = document.getElementsByClassName("dropdown-content-noti");
		
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function profile() {
	document.getElementById("profileDropdown").classList.toggle("show");
}


window.onclick = function (event) {
	if (!event.target.matches('.dropbtn-noti')) {
		var dropdowns = document.getElementsByClassName("dropdown-content-noti");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

editDropdown = () => {
	jQuery("body").on("click", ".button--2", function () {
		jQuery(".left-flow").not(jQuery(this).next(".left-flow")).removeClass("active");
		jQuery(this).next(".left-flow").toggleClass("active");
	})


	$(".accordClick").click(function(){
		$('.accord-target').toggleClass("active");
	});

	// Appended by Pritam
	$('.accord-target li a').click(function(){
		$('.accord-target').toggleClass("active");
	});

	// for dropdown under datatable -- Appended by Pritam
	$(document).on('click','ul.left-flow>li>a',function(){
		$(this).closest('.left-flow').toggleClass("active");
	});
	// $(".btn-close-sidecart").click(function(){ 
	// 	$('.accord-target').removeClass("active");
	// });
	
	$('body').click(function(event){
	  const ignoreElements = ["accordClick", "accord-target","button--2","left-flow"];
	  let pass = true;
	
	  $(ignoreElements).each(function(key, value) {
		if ($(event.target).hasClass(value) || $(event.target).closest(`.${value}`).length > 0) {
		  pass = false;
		}
	  });
	
	  if (pass) {
		$('.accord-target').removeClass('active');
		$('.left-flow').removeClass('active');
	  }
	});
}



$(document).on('click','.left_flow_dropdown_btn', function() {
	$(this).parents('.left-flow').removeClass('active');
});





initAcc = () => {
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
}

initTab = () => {
	const whichTab = document.querySelector(".wrapper");
	const tabButton = document.querySelectorAll(".tab-button");
	const contents = document.querySelectorAll(".tab-content");

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
}

fileUpload = () => {
	let fileInput = document.querySelector('input[type=file]');
	let filenameContainer = document.querySelector('#filename');
	let dropzone = document.querySelector('div');

	if (fileInput) {
		fileInput.addEventListener('change', function () {
			filenameContainer.innerText = fileInput.value.split('\\').pop();
		});

		fileInput.addEventListener('dragenter', function () {
			dropzone.classList.add('dragover');
		});

		fileInput.addEventListener('dragleave', function () {
			dropzone.classList.remove('dragover');
		});
	}
}

multiselect = () => {
	$('#categories').multiSelect();
}


window.addEventListener("DOMContentLoaded", (() => {
	getVh();
	themechanger();
	forms();
	sidebarmenu();
	sidebarmenuDropdown();
	editDropdown();
	initAcc();
	initTab();
	fileUpload();
	multiselect();
	feather.replace();
}))