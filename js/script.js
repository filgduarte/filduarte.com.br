const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener('load', function () {
    const body = document.querySelector('body');
    const headerLinks = document.querySelectorAll('#main-header a');
    const menuToggleButton = document.querySelector('.menu-toggle');
    const background = document.querySelector('.background');
    const ripples = document.querySelector('.ripples');
    const heroImage = document.querySelector('.hero-image');
    const profilePicWidth = heroImage.querySelector('img').offsetWidth;
    const ripplesInitialLeft = Math.round(heroImage.offsetHeight / 5) * 2 + 32;
    const ripplesTranslateAmount = heroImage.offsetWidth - profilePicWidth;
    const heroContainer = document.querySelector('.hero-content');
    const myWork = document.querySelector('#my-work');
    const socialItems = document.querySelectorAll('.contact-social li');

// Change menu items action to trigger lenis scroll
    headerLinks.forEach( headerLink => {
        headerLink.addEventListener('click', function(e) {
            e.preventDefault();
            target = e.currentTarget.getAttribute("href");

            if (target == "#")
            {
                lenis.scrollTo('top');
            }
            else
            {
                lenis.scrollTo( target );
            }
        });
    });

// Mobile menu toggle
    menuToggleButton.addEventListener('click', function() {
        document.getElementById('main-menu').classList.toggle('active');
    });

// Change fixed "Get in touch" button action to trigger lenis scroll
    document.querySelector('aside .button-primary').addEventListener('click', function(e) {
        e.preventDefault();
        lenis.scrollTo( e.currentTarget.getAttribute("href") );
    });

// Social icons animation setup
    socialItems.forEach( contactItem => {
        const fakeItem = document.querySelector(`.fake .${contactItem.className}`);
        const fakeItemOffset = {
            x: fakeItem.offsetLeft,
            y: fakeItem.offsetTop,
        };
        const contactItemOffset = {
            x: contactItem.offsetLeft,
            y: contactItem.offsetTop,
        };
        const translateX = contactItemOffset.x - fakeItemOffset.x;
        const translateY = contactItemOffset.y - fakeItemOffset.y;

        fakeItem.style.setProperty("--translate-amount", `${translateX}px, ${translateY}px`);
    });

// Ripples background animation setup
    ripples.addEventListener('transitionstart', function() {
        const rippleItems = ripples.querySelectorAll('.ripple');
        rippleItems.forEach( rippleItem  => {
            rippleItem.style.animationPlayState = "paused";
        });
    });
    ripples.addEventListener('transitionend', function() {
        const rippleItems = ripples.querySelectorAll('.ripple');
        rippleItems.forEach( rippleItem => {
            rippleItem.style.animationPlayState = "running";
        });

        ripples.style.willChange = 'auto';
        heroImage.style.willChange = 'auto';
    });
    ripples.style.left = `${ripplesInitialLeft}px`;
    ripples.style.setProperty("--translate-amount", `calc(${ripplesTranslateAmount}px - 50%)`);

// Scroll Triggers
    window.addEventListener('scroll', function() {
        const initialviewportReference = heroContainer.offsetTop + heroImage.offsetTop;
        const rect = heroImage.getBoundingClientRect();
        background.style.top = rect.top - initialviewportReference + 'px';

        if ( scrollTrigger('#about-me', 25, 'bottom') )
        {
            ripples.style.willChange = 'transform';
            heroImage.style.willChange = 'background-position, mask-position';
            body.classList.add('past-hero');
        }
        else
        {
            body.classList.remove('past-hero');
        }

        if ( scrollTrigger('#my-work', 25, 'bottom') )
        {
            if ( ! myWork.classList.contains('on-viewport') )
            {
                // Check if has class .on-viewport
                // so it doesn't reset the toggler
                const works = document.querySelectorAll('.work-item');
                works.forEach(workItem => {
                    workItem.style.setProperty('--toggler', 1);
                });

                myWork.classList.add('on-viewport');
            }
        }
        else
        {
            myWork.classList.remove('on-viewport');
        }

        if ( scrollTrigger('#contact .layout-container', 'bottom', 'bottom') )
        {
            body.classList.add('contact-visible');
        }
        else
        {
            body.classList.remove('contact-visible');
        }
    });

    document.querySelector('.work-item:last-child').addEventListener('transitionend', function() {
        const works = document.querySelectorAll('.work-item');
        works.forEach(workItem => {
            workItem.style.setProperty('--toggler', 0);
        });
    })
});

function scrollTrigger(trigger, triggerReference, viewportReference) {
/*
 *  trigger: DOM element
 *  triggerReference: trigger's reference point (percentage or keyword) to check agains viewport
 *  viewportReference: Viewport's referebce point (percentage or keyword) to check against trigger
 *  
 *  E.g.
 *  scrollTrigger('#el', 25, 50)
 *  Checks if '#el' has 25% of it's height above 50% (center) of viewport height.
 *  Returns true or false
 */

    const keywords = {
        'top': 0,
        'center': 50,
        'bottom': 100,
    }

    triggerReference = keywords[triggerReference] ?? triggerReference;
    viewportReference = keywords[viewportReference] ?? viewportReference;

    const element = document.querySelector(trigger);
    const triggerTop = element.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const triggerReferencePosition = (triggerReference / 100) * element.offsetHeight;
    const viewportReferencePosition = (viewportReference / 100) * viewportHeight;

    return triggerTop <= (viewportReferencePosition - triggerReferencePosition);
}

// #TODO: Use IntersectionObserver instead of EventListener
// function scrollTrigger(selector, options = {}) {
//     const keywords = {
//         'top': 0,
//         'center': 0.5,
//         'bottom': 1,
//     }

//     options.threshold = options.threshold[keywords] ?? options.threshold;

//     let elements = document.querySelectorAll(selector);
//     elements.forEach(el => {
//         addObserver(el, options);
//     });
// }

// function addObserver(element, options) {
//     if ( ! ('IntersectionObserver' in window) )
//     {
//         if (options.callback)
//         {
//             options.callback(element);
//         }
//         else
//         {
//             entry.target.classList.add('active');
//         }

//         return
//     }

//     let observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting)
//             {
//                 if (options.callback)
//                 {
//                     options.callback(element);
//                 }
//                 else
//                 {
//                     entry.target.classList.add('visible')
//                 }

//                 if (options.once)
//                 {
//                     observer.unobserve(entry.target);
//                 }
//             }
//         });
//     }, options);

//     observer.observe(element);
// }