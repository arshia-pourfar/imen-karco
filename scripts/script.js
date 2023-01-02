$(document).ready(function () {
    (function () {
        for (let i = 0; i < boxContainer.length; i++) {
            document.querySelector(".Products .row").innerHTML += `
                <div class="`+ boxContainer[i].whatBox + ` col-11 container" data-aos="zoom-in-up" data-aos-duration="2000">
                    <div class="row">
                        <div class="about-container-post col-md-2 col-3">
                            <span class="text col-12">`+ boxContainer[i].whatTitleBox + `</span>
                            <a href="#" class="show-more col-12">مشاهده همه<i class="fas fa-arrow-left"></i></a>
                        </div>
                        <div class="post-container col-md-10 col-9">
                            <button class="scroll-left-post" id="scroll-left-post-`+ boxContainer[i].whatBox + `">
                                <i class="fas fa-arrow-left"></i></button>
                            <button class="scroll-right-post " id="scroll-right-post-`+ boxContainer[i].whatBox + `">
                                <i class="fas fa-arrow-right"></i></button>
                            <div class="post" id="box-post-`+ boxContainer[i].whatBox + `"></div>
                        </div>
                    </div>
                </div>`;
            if (i == boxContainer.length - 1) {
                addProductToBox();
            }
        }
    }());

    $(".click-home-page").click(function () {
        window.location = "index.html";
    });

    $(".scroll-to-product").click(function () {
        scrollToItemSelect("product");
    });

    $(".click-info").click(function () {
        scrollToItemSelect("footer");
    });

    $(".click-phone").click(function () {
        scrollToItemSelect("footer");
    });

    $(".menu-btn").click(function () {
        $(".menu-btn").css("display", "none");
        $(".slide-nav").addClass('col-6');
        $(".slide-nav").show(800);
        $(".slide-nav .nav").css("display", "block");
    });

    $(".close-slide-nav").click(function () {
        $(".slide-nav .nav").css("display", "none");
        $(".slide-nav").hide(600);
        $(".slide-nav").removeClass('col-6');
        $(".menu-btn").css("display", "block");
    });

    $("#scroll-left-post-shert").click(function () {
        checkScrollBox("shert", "left");
    });

    $("#scroll-right-post-shert").click(function () {
        checkScrollBox("shert", "right");
    });

    $("#scroll-left-post-hat").click(function () {
        checkScrollBox("hat", "left");
    });

    $("#scroll-right-post-hat").click(function () {
        checkScrollBox("hat", "right");
    });

    $("#scroll-left-post-shoose").click(function () {
        checkScrollBox("shoose", "left");
    });

    $("#scroll-right-post-shoose").click(function () {
        checkScrollBox("shoose", "right");
    });

    $("#footer .item-about-us .read-more p").click(function () {
        $("#footer .item-about-us .read-more p").css("visibility", "hidden");
        $("#footer .item-about-us .read-more").css("visibility", "hidden");
        $("#footer .fade-text").css("visibility", "hidden");
    });

    $(".close-container-product-secifications").click(function () {
        $(".bg-container-product-secifications").fadeOut(700);

    })

});

let lastScrollSize, oneToTheLastScrollSize;
function checkScrollBox(product, direction) {
    let oppositeDirection, minusOrPlusLeftScroll;
    if (direction == "left") {
        oppositeDirection = "right";
        minusOrPlusLeftScroll = "-";

    } else if (direction == "right") {
        oppositeDirection = "left";
        minusOrPlusLeftScroll = "+";
    }
    $("#box-post-" + product + "").animate({
        scrollLeft: "" + minusOrPlusLeftScroll + "=250"
    }, 10, function () {
        lastScrollSize = $("#box-post-" + product + "").scrollLeft();
        if (lastScrollSize == oneToTheLastScrollSize) {
            $("#scroll-left-post-" + product + "").css("visibility", "hidden");
        } else if (lastScrollSize != oneToTheLastScrollSize) {
            oneToTheLastScrollSize = lastScrollSize;
        }
        if ($("#box-post-" + product + "").scrollLeft() >= -0.9) {
            oneToTheLastScrollSize = -0.9;
            $("#scroll-right-post-" + product + "").css("visibility", "hidden");
        }
        $("#scroll-" + oppositeDirection + "-post-" + product + "").css("visibility", "visible");
    });
}

function addProductToBox() {
    for (let selectProducts = 0; selectProducts < allProduct.length; selectProducts++) {
        document.getElementById("box-post-" + allProduct[selectProducts].category + "").innerHTML += `
            <article onclick="getIdItemClicked(`+ allProduct[selectProducts].id + `);" class="post-item col-lg-2 col-md-3 col-4">
                <div class="post-image">
                    <img src="`+ allProduct[selectProducts].imgSrc + `" alt="">
                </div>
                <div class="post-content">
                    <p>`+ allProduct[selectProducts].title + `</p>
                </div>
            </article>`
    }
    for (let i = 0; i < customersLogo.length; i++) {
        document.querySelector(".logo-image").innerHTML += `
            <img class="col-lg-1 col-sm-2 col-3 ` + customersLogo[i].className + `" src=" ` + customersLogo[i].imgSrc + `">
        `;
    }
    for (let i = 0; i < whyus.length; i++) {
        document.querySelector(".posts-container").innerHTML += `
                <article class="posts col-lg-4 col-md-6 col-6">
                    <div class="post-item">
                        <div class="icon-post container">
                            <div class="row">
                                <img class="icon col-md-4" src="`+ whyus[i].imgSrc + `">
                                <div class="title-post col-md-8 col-12">`+ whyus[i].postTitle + `</div>
                            </div>
                        </div>
                        <div class="post-content">
                            <p>`+ whyus[i].content + `</p>
                        </div>
                    </div>
                </article>
        `;
    }
}

function scrollToItemSelect(item) {
    let elementScroll = document.getElementById(item).offsetTop;
    if (item == "product") {
        window.scrollTo({ top: elementScroll + 50, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: elementScroll - 50, behavior: 'smooth' });
    }
}


function getIdItemClicked(id) {
    $(".bg-container-product-secifications").fadeIn(800);
    $(".container-product-secifications .main-image").attr("src", "" + allProduct[id].mainImage + "");
    $(".container-product-secifications .more-image .bottom-image").attr("src", "" + allProduct[id].bottomImage1 + "");
    $(".container-product-secifications .more-image .bottom-image").attr("src", "" + allProduct[id].bottomImage2 + "");
    $(".container-product-secifications .more-image .bottom-image").attr("src", "" + allProduct[id].bottomImage3 + "");
    $(".container-product-secifications .more-image .bottom-image").attr("src", "" + allProduct[id].bottomImage4 + "");
    $(".container-product-secifications .product-secifications .title").text(" تست : " + allProduct[id].title);
    $(".container-product-secifications .product-secifications .material").text(" تست : " + allProduct[id].material);
    $(".container-product-secifications .product-secifications .description").text(" توضیحات : " + allProduct[id].description);
}