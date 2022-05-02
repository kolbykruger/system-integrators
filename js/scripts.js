//Global Definition for ScrollMagic Controller
let controller = new ScrollMagic.Controller()

// Taglines
// gsap.registerPlugin(SplitText)
console.log(SplitText)

document.addEventListener('DOMContentLoaded', function () {
    const taglineSplitText = new SplitText('.tagline h2', {
        type: 'lines,words,chars',
        charsClass: 'tagline-char',
        wordsClass: 'tagline-word',
        linesClass: 'tagline-line',
    })

    gsap.set('.tagline-char', {
        y: 150,
        rotateX: 5,
        d: 1350,
    })

    let taglines = document.querySelectorAll('.tagline')

    for (let i = 0; i < taglines.length; i++) {
        if (taglines[i]) {
            const elem = taglines[i]
            const chars = elem.querySelectorAll('.tagline-char')

            new ScrollMagic.Scene({
                triggerElement: elem,
                triggerHook: 0.75,
                reverse: true,
            })
                .setTween(
                    gsap.to(chars, {
                        y: 0,
                        rotateX: 0,
                        d: 0,
                        ease: 'power3.inOut',
                        stagger: 0.014,
                    })
                )
                .addTo(controller)
        }
    }
})

//background magic
document.addEventListener('DOMContentLoaded', function () {
    const magicBackground = document.getElementById('background-magic')
    const elems = document.querySelectorAll('section')

    if (magicBackground) {
        for (var i = 0; i < elems.length; i++) {
            if (elems[i]) {
                const magicColor = elems[i].dataset.color

                new ScrollMagic.Scene({
                    triggerElement: elems[i],
                    triggerHook: 0.9,
                })
                    .setTween(
                        TweenMax.to(magicBackground, 1.5, {
                            backgroundColor: magicColor ? magicColor : 'transparent',
                        })
                    )
                    //.addIndicators()
                    .addTo(controller)
            }
        }
    }
})

//Features
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.features img, .introduction img')

    for (let i = 0; i < elems.length; i++) {
        if (elems[i]) {
            const elem = elems[i],
                parent = elem.closest('.container')

            console.log(parent)

            if (parent) {
                new ScrollMagic.Scene({
                    triggerElement: parent,
                    duration: '200%',
                    triggerHook: 1,
                    reverse: true,
                })
                    .setTween(
                        TweenMax.to(elem, 5000, {
                            y: '12%',
                            scale: '1.03',
                            ease: Linear.easeNone,
                        })
                    )
                    .addTo(controller)

                new ScrollMagic.Scene({
                    triggerElement: parent,
                    triggerHook: 0.75,
                    reverse: true,
                })
                    .setTween(
                        gsap.to(elem.parentNode, {
                            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            ease: 'power3.inOut',
                            duration: 0.75,
                        })
                    )
                    .addTo(controller)
            }
        }
    }
})

//Product Features
document.addEventListener('DOMContentLoaded', function () {
    let productFeatures = document.querySelector('.product-features')

    if (productFeatures) {
        let productFeature = productFeatures.querySelectorAll('.feature-box'),
            productButton = productFeatures.querySelectorAll('button[data-id]')

        for (let i = 0; i < productButton.length; i++) {
            productButton[i].addEventListener('click', function () {
                let id = this.dataset.id

                let selectedButton = productButton[i]
                let selectedBounds = this.getBoundingClientRect()
                let selectedFeature = productFeatures.querySelector('.feature-box[data-id="' + id + '"]')

                if (selectedButton.classList.contains('active')) {
                    removeActive({
                        selectedButton,
                        selectedFeature,
                    })
                    return false
                }

                removeAllActive({
                    productButton,
                    productFeature,
                })
                setActive({
                    selectedButton,
                    selectedFeature,
                    selectedBounds,
                })
            })

            function setActive(props) {
                props.selectedFeature.style.display = 'block'
                props.selectedButton.classList.add('active')
                props.selectedFeature.classList.add('active')

                // Find offset of parent container
                const parent = props.selectedFeature.closest('.group')
                const parentBounds = parent.getBoundingClientRect()

                // Set Bounds of Feature
                props.selectedFeature.style.top = props.selectedBounds.top - 16 - parentBounds.top + 'px'
                props.selectedFeature.style.left = props.selectedBounds.left - 16 - parentBounds.left + 'px'

                props.selectedFeature.focus()
            }

            function removeActive(props) {
                props.selectedButton.classList.remove('active')
                props.selectedFeature.classList.remove('active')
                props.selectedFeature.style.display = 'none'
            }

            function removeAllActive(props) {
                for (let j = 0; j < props.productFeature.length; j++) {
                    props.productFeature[j].classList.remove('active')
                    props.productButton[j].classList.remove('active')
                    props.productFeature[j].style.display = 'none'
                }
            }
        }
    }
})

//Blog Categories (if a selectbox)
let blogCategories = {
    elem: document.querySelector('select#blog_categories'),
    init: function () {
        if (this.elem) {
            this.elem.addEventListener('change', function (e) {
                window.location.href = window.location.href.split('?')[0] + '?category=' + e.target.value
            })
        }
    },
}.init()

//Populate Blog Category select
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
        }
    }
    return false
}
var blogCat = getUrlParameter('category')
if (blogCat) {
    $('#blog_categories').val(blogCat)
} else {
    $('#blog_categories').val($('#blog_categories option:first').val())
}

//Responsive iFrame
$('iframe[src*="youtube"],iframe[src*="vimeo"]').wrap('<div class="responsive-iframe"/>')

//Accordion
document.addEventListener('DOMContentLoaded', function () {
    let accordion = document.querySelectorAll('.accordion-title')

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener('click', function () {
            let panel = this.nextElementSibling

            if (panel.style.maxHeight) {
                this.classList.remove('open')
                panel.style.maxHeight = null
                panel.setAttribute('aria-hidden', true)
                panel.setAttribute('aria-expanded', false)
            } else {
                this.classList.add('open')
                panel.style.maxHeight = panel.scrollHeight + 'px'
                panel.setAttribute('aria-hidden', false)
                panel.setAttribute('aria-expanded', true)
            }
        })
    }
})

//Flickity Carousel
$('.carousel .group').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 8000,
})

$('.slideshow .container').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 5000,
})

// Brand Rail
$('.dealers-rail').flickity({
    cellSelector: '.dealers-item',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'left',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    autoPlay: 5000,
})

//Universal Tables
$('table').wrap("<div class='universal-table'></div>")

//PDO Page loader
document.addEventListener('DOMContentLoaded', function () {
    let pdoElement = document.getElementById('pdopage')
    if (pdoElement) {
        let loadState = document.createElement('div')
        loadState.classList.add('pdo-loader')
        loadState.setAttribute('aria-hidden', true)
        //loadState.textContent = 'Loading';

        pdoElement.appendChild(loadState)

        if (pdoPage) {
            pdoPage.callbacks['before'] = function (config) {
                document.querySelector('.pdo-loader').classList.add('pdo-loading')
            }
            pdoPage.callbacks['after'] = function (config) {
                document.querySelector('.pdo-loader').classList.remove('pdo-loading')
            }
        }
    }
})
