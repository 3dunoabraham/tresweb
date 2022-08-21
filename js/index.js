
var swiperH, swiperV = {};
var currentPage = "none";

var projects = [
	{
		name: "Scheduling",
		desc: "Scheduling and Payroll Software",
		techstack: ["Laravel", "Vue", "Semantic UI"],
	},
	{
		name: "ClerksHub",
		desc: "Collection of Sport Tools for Clerking.",
		techstack: ["HTML5", "Fuse Js"],
	},
];

function updateCard(index)
{
	// $('.owl-carousel').trigger('destroy.owl.carousel');

	var project = projects[index];
	// console.log($(".swiper-slide-active").data("index"));

	$(".project .title").text(project.name);
	$(".project .desc").text(project.desc);
	$(".project .techstack li").remove();
	for (var i = 0; i < project.techstack.length; i++)
	{
		$(".project .techstack").append("<li>"+project.techstack[i]+"</li>");//project.techstack[i]
	}
}
function getSection(elem)
{
	return $(elem).hasClass("section") || $(elem).is("body") ? elem : getSection($(elem).parent());
}
function checkCenter()
{
	let centerX = 0;
	let centerY = document.documentElement.clientHeight / 2;

	let elem = getSection(document.elementFromPoint(centerX, centerY));

	$(".section.active-section").removeClass("active-section");
	$(".section."+$(elem).attr("id")).addClass("active-section");
	$("#menu .active").removeClass("active");
	$("[data-section='"+$(elem).attr("id")+"']").addClass("active");
}
function ready()
{
	// $("#loading").fadeOut();
    $("#menu").css("display","");
	$(".shape").shape({});
	checkCenter();

	$("#menu-toggle").on("click mouseover touchstart", function(e)
	{
		if ($("#menu").hasClass("hidden"))
		{
			$("#menu").removeClass("hidden");
			$("#menu-toggle i").removeClass("fa-chevron-left");
			$("#menu-toggle i").addClass("fa-chevron-right");
			return;
		}

		if (e.type != "mouseover")
		{
			$("#menu").addClass("hidden");
			$("#menu-toggle i").addClass("fa-chevron-left");
			$("#menu-toggle i").removeClass("fa-chevron-right");
		}
	})

	$(".mobile-touch").on("touchstart", function(e)
	{
		$(".touch-active").removeClass("touch-active");
		$(this).addClass("touch-active");
	})

	$('[type="submit"]').on("click",function()
	{
		$.post("contact.php",
		{
			name: $("[name='name']").val(),
			subject: $("[name='subject']").val(),
			email: $("[name='email']").val(),
			message: $("[name='message']").val()
		},function(data, status)
		{
			console.log(data, status);
			let response = JSON.parse(data);
			$(".result").html(response.message);

			if (response.success)
			{
				alert();
			}
		});
	});

	$(document).on("scroll resize ready load", function() { checkCenter() });

	$(".project .prev-button").on("click",function()
	{
		if (!swiperH.isBeginning)
		{
			swiperH.slidePrev();
		} else {
			swiperH.slideTo(swiperH.slidesSizesGrid.length);
		}
		updateCard(swiperH.activeIndex);
		// if (window.matchMedia("(min-width: 992px)").match())
		// {
		// 	$('.description')
		// 	.transition({
		// 		animation  : 'pulse',
		// 		duration   : '800ms',
		// 		onComplete : () => {  },
		// 	});
		// }
	});
	$(".project .next-button").on("click",function()
	{
		if (!swiperH.isEnd)
		{
			swiperH.slideNext();
		} else {
			swiperH.slideTo(0);
		}
		updateCard(swiperH.activeIndex);
		// if (window.matchMedia("(min-width: 992px)").match())
		// {
		// 	$('.description')
		// 	.transition({
		// 		animation  : 'pulse',
		// 		duration   : '800ms',
		// 		onComplete : () => {  },
		// 	})
		// };
	});

    swiperH = new Swiper('.projects-cube', {
      spaceBetween: 50,
      loot: true,
      effect: 'cube',
      navigation: false,
      allowTouchMove: false,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      on: {
	    slideChange: function () {
	      console.log(swiperH.activeIndex);
	    },
	  }
    });
    swiperV = new Swiper('.gallery-carousel', {
      direction: 'horizontal',
      spaceBetween: 50,
      pagination: {
        el: '.gallery-dots',
        clickable: true,
      },
    });

    $(".content").css("display","");
}
