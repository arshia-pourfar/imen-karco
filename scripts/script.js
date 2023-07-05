$(document).ready(function () {
    (function () {
        for (let i = 0; i < boxContainer.length; i++) {
            document.querySelector("#product .container-product-slider").innerHTML += `
            <div class="rpd-slider" data-base-width="340">
            <div class="box-title mb-3">
                        <h5 class="d-inline-block post-title">`+ boxContainer[i].whatTitleBox + `</h5>
                        <img src="`+ boxContainer[i].icon + `" alt="smdkc">
                    </div>
                <div class="main-wrapper">
                    <ul class="rpd-slider-wrapper `+ boxContainer[i].whatBox + `">
                    </ul>
                    <div class="rpd-slider-navs">
                        <div class="nav-element previous" data-step="previous">&#10094;</div>
                        <div class="nav-element next" data-step="next">&#10095;</div>
                    </div>
                </div>
            </div>`;
            if (i == boxContainer.length - 1) {
                addObjects();
            }
        }
    }());

    // header animates
    $('.container-header-image .list1').animate({ right: "10px", rotate: "0deg" }, 1000);

    $(".scroll-to-product").click(function () {
        scrollToItem("product");
    });

    $(".click-phone").click(function () {
        scrollToItem("footer");
    });

    $("#btn-back-to-top").click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    pageSize();
    $(window).resize(function () {
        pageSize();
    });

    // carousel slider for product
    function navigationHandler() {
        const thisElement = $(this);
        const navs = thisElement.parent().find(".nav-element");

        if (thisElement.hasClass("disabled")) {
            return;
        }

        var enableNavAllElement = function () {
            navs.removeClass("disabled");
        }

        var disableNavCurrentElement = function () {
            enableNavAllElement();
            thisElement.addClass("disabled");
        }


        const thisElementMainParent = thisElement.parents(".rpd-slider");
        const thisElementSliderWrapper = thisElementMainParent.find(".rpd-slider-wrapper");
        const thisElementSliderChildren = $(thisElementSliderWrapper.children());

        const step = thisElement.attr("data-step");
        let currentScrollLeft = thisElementSliderWrapper.scrollLeft();
        let rateScrollLeft = parseInt(thisElementMainParent.attr("data-base-width"));
        let animation_rateScrollLeft = 5;

        const childrenCount = thisElementSliderChildren.length;
        const oldActiveChild = thisElementSliderWrapper.find(".active-child").first();
        let currentChildIndex = parseInt(oldActiveChild.attr("data-index"));

        for (const element of thisElementSliderChildren) {
            $(element).removeClass("active-child").removeClass("active-complete");
        }

        if (step == "previous") {
            rateScrollLeft = rateScrollLeft * -1;
            animation_rateScrollLeft = animation_rateScrollLeft * -1;
            currentChildIndex--;

        } else if (step == "next") {
            rateScrollLeft = rateScrollLeft * 1;
            animation_rateScrollLeft = animation_rateScrollLeft * 1;
            currentChildIndex++;
        }

        let isDisableState = false;

        if (currentChildIndex == 0 || currentChildIndex == (childrenCount - 1)) {
            disableNavCurrentElement();
            isDisableState = true;
        }

        if (currentChildIndex < 0 || (childrenCount - 1) < currentChildIndex) {
            return;
        }

        if (!isDisableState)
            enableNavAllElement();

        const currentActiveChild = $(thisElementSliderChildren[currentChildIndex]);
        currentActiveChild.addClass("active-child");

        let finalScrollLeft = (currentScrollLeft) + (rateScrollLeft);


        var interval = setInterval(() => {

            var clearIntervalAction = false;

            currentScrollLeft = thisElementSliderWrapper.scrollLeft();
            let currentScrollLeft_toBe = (currentScrollLeft) + (animation_rateScrollLeft);

            if ((finalScrollLeft < currentScrollLeft_toBe && step == "next") || currentScrollLeft_toBe < finalScrollLeft && step == "previous") {
                currentScrollLeft_toBe = finalScrollLeft;
                const beforeChildScrollX = currentActiveChild.prev().attr('data-scroll-x');
                if (beforeChildScrollX) {
                    currentScrollLeft_toBe = parseInt(beforeChildScrollX) + Math.abs(rateScrollLeft);
                }
                if (!currentActiveChild.attr("data-scroll-x"))
                    currentActiveChild.attr("data-scroll-x", currentScrollLeft_toBe);

                clearIntervalAction = true;
            }

            thisElementSliderWrapper.scrollLeft(currentScrollLeft_toBe);

            currentScrollLeft = thisElementSliderWrapper.scrollLeft();

            if (window['currentScrollLeftSilder'] == currentScrollLeft) {
                if (!window['duplicateScrollLeftSilder']) {
                    window['duplicateScrollLeftSilder'] = 0;
                }

                window['duplicateScrollLeftSilder'] += 1;

                if (3 <= window['duplicateScrollLeftSilder']) {
                    clearIntervalAction = true;
                    window['duplicateScrollLeftSilder'] = 0;
                }
            }

            window['currentScrollLeftSilder'] = currentScrollLeft;

            if (clearIntervalAction || finalScrollLeft == currentScrollLeft) {
                if (clearIntervalAction) thisElementSliderWrapper.scrollLeft(currentScrollLeft_toBe);
                currentActiveChild.addClass("active-complete")
                clearInterval(interval);
            }
        }, 1);
    }

    const slidersList = $(".rpd-slider");
    for (let elementMain of slidersList) {
        elementMain = $(elementMain);

        const sliderMain = elementMain;
        const sliderWrapper = sliderMain.find(".rpd-slider-wrapper");
        const sliderChildren = $(sliderWrapper.children());
        const navs = sliderMain.find(".rpd-slider-navs .nav-element");

        const baseWidthSlider = parseInt(sliderMain.attr("data-base-width"));

        navs.on("click", navigationHandler);

        if (sliderChildren.length) {
            $(sliderChildren[0]).addClass("active-child active-complete");
            var i = 0;
            for (const element of sliderChildren) {
                $(element).attr("data-index", i).addClass("slide-child-element").css("width", baseWidthSlider + "px");
                i++;
            }
        }

        sliderMain.find(".main-wrapper").css("max-width", (baseWidthSlider + 50) + "px");
        sliderWrapper.css("max-width", (baseWidthSlider) + "px");

        sliderMain.find(".nav-element.previous").addClass("disabled");
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 300) {
            $("#btn-back-to-top").fadeIn(400);
        } else {
            $("#btn-back-to-top").fadeOut(400);
        }
    });
});

function pageSize() {
    pageHeight = $(window).height();
    $('.header-image').css('height', pageHeight);
}

function addObjects() {
    for (let i = 0; i < allProduct.length; i++) {
        document.querySelector(".main-wrapper ." + allProduct[i].category + "").innerHTML += `
        <li onclick="setIdProduct(`+ allProduct[i].id + `)" data-bs-toggle="modal" data-bs-target="#myModal"><a href="product.html"><img class="rounded-1" src="` + allProduct[i].imgSrc + `" alt=""></a></li>`
    }
    for (let i = 0; i < customersLogo.length; i++) {
        document.querySelector("#customers .logo-image").innerHTML += `
            <img class="` + customersLogo[i].className + `" src=" ` + customersLogo[i].imgSrc + `">
        `;
    }
    for (let i = 0; i < whyus.length; i++) {
        document.querySelector(".posts-container .row").innerHTML += `
                <article class="posts col-lg-2 col-6">
                    <div class="post-item">
                        <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="whyusItemClick(`+ whyus[i].id + `)" class="icon-post row d-flex justify-content-center pb-2">
                            <img class="icon col-12 p-0 d-block" src="`+ whyus[i].imgSrc + `">
                            <div class="title-post col-12 d-block">`+ whyus[i].postTitle + `</div>
                        </div>
                    </div>
                </article>
        `;
    }
}

function whyusItemClick(id) {
    $('.modal-body').html('<h5 class="lh-base">' + whyus[id].content + '</h5><button type="button" class="btn btn-primary mt-4">بستن</button>');
    $('.modal-header').html('<h4 class="modal-title ms-auto" id="staticBackdropLabel"><img class="ms-3" height="60" src="' + whyus[id].imgSrc + '" alt="">' + whyus[id].postTitle + '</h4>');
}

function scrollToItem(item) {
    $('.navbar-collapse').removeClass('show');
    $('.navbar-toggler').removeClass('opened');
    $('.navbar-toggler').addClass('collapsed');
    let elementScroll = document.getElementById(item).offsetTop;
    window.scrollTo({ top: elementScroll - 10, behavior: 'smooth' });
}

function setIdProduct(id) {
    localStorage.setItem("idClicked", id);
}