(function() {
    $(function(){
		function photosSlide(id) {
			var oContainer = $("#" + id + " .swiper-container");
			if (oContainer.length > 0) {
				var src = "",
				len = 0,
				index = 0,
				oImgs = null,
				curImg = null;
				var mySwiper = oContainer.swiper({
					pagination: "#" + id + " .pagination",
					loop: true,
					speed: 600,
					autoplay: 4000,
					keyboardControl: true,
					mousewheelControl: true,
					paginationClickable: true,
					onSlideChangeEnd: function() {
						for (var i = 0; i < len; i++) {
							curImg = oImgs.eq(i);
							if (curImg.length > 0 && (curImg.attr("data-imgdelay") != 1)) {
								src = curImg.attr("data-src");
								curImg.attr("src", src).attr("data-imgdelay", "1")
							}
						}
					}
				});
				oImgs = oContainer.find("img");
				len = oImgs.length;
				index = mySwiper.activeIndex;
				curImg = oImgs.eq(index - 1);
				if (curImg.length > 0 && (curImg.attr("data-imgdelay") != 1)) {
					src = curImg.attr("data-src");
					curImg.attr("src", src).attr("data-imgdelay", "1")
				}
			}
		}
		function photosSlideInit() {
			var oSwipes = $(".j_ptotos_swiper"),
			len = oSwipes.length;
			if (len == 0) {
				return false
			}
			var i, id = "";
			for (i = 0; i < len; i++) {
				id = "j_photos_swiper_" + i;
                if($("#"+id).length > 0) continue;
				oSwipes.eq(i).attr("id", id);
				photosSlide(id)
			}
		}
		function imgDelay() {
			var area = $(".j_imgdelay"),
			areaLen = area.length,
			loadCount = 0;
			if (areaLen == 0) {
				return false
			}
			var viewHeight = document.documentElement.clientHeight;
			viewHeight = viewHeight * 2;
			function loadingImg() {
				if (loadCount >= areaLen) {
					return false
				}
				for (var i = 0; i < areaLen; i++) {
					var currObj = area.eq(i);
					if (currObj.data("imgdelay") === 1) {
						continue
					}
					var scrollY = document.body.scrollTop || document.documentElement.scrollTop,
					maxHeight = viewHeight + scrollY;
					if (currObj.offset().top < maxHeight) {
						var oImg = currObj.find("img"),
						imgLen = oImg.length;
						for (var j = 0; j < imgLen; j++) {
							var currImg = oImg.eq(j);
							currImg.attr("src", currImg.data("src"))
						}
						currObj.data("imgdelay", "1");
						loadCount = loadCount + 1
					}
				}
			}
			var timer;
			addOnscroll(function() {
				if (timer) {
					clearTimeout(timer);
					timer = null
				}
				timer = setTimeout(loadingImg, 200)
			})
		}
		function viewModeInit() {
			var o = $("b.j_viewmode"), b = $('#page_view');
			if (o.length > 0 && b.length > 0) {
                o.click(function() {
                    o.toggleClass('idaytime');
                    b.toggleClass('night');
				})
			}
		}
        var loadImg = function (url, fn) {
            var img = new Image();
            img.src = url;
            if (img.complete) {
                fn.call(img);
            } else {
                img.onload = function () {
                    fn.call(img);
                    img.onload = null;
                };
            };
        };
        $.fn.imgAutoSize = function (padding) {
            var maxWidth = this.innerWidth() - (padding || 0);
            return this.find('img').each(function (i, img) {
                loadImg(this.src, function () {
                    if (this.width > maxWidth) {
                        var height = maxWidth / this.width * this.height,
                            width = maxWidth;
                        img.width = width;
                        img.height = height;
                    };
                });
            });
        };
		setTimeout(function() {
			photosSlideInit();
			imgDelay();
            viewModeInit();
		},300);
    });
})();