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
    const ripples = document.querySelector('.ripples');
    const heroImage = document.querySelector('.hero-image');
    const profilePicWidth = heroImage.querySelector('img').offsetWidth;
    const ripplesInitialLeft = Math.round(heroImage.offsetHeight / 5) * 2 + 32;
    const translateAmount = heroImage.offsetWidth - profilePicWidth;

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
    ripples.style.setProperty("--translate-amount", `calc(${translateAmount}px - 50%)`);

    window.addEventListener('scroll', function() {
        const background = document.querySelector('.background');
        const heroContainer = document.querySelector('.hero-content');
        const initialviewportReference = heroContainer.offsetTop + heroImage.offsetTop;
        const rect = heroImage.getBoundingClientRect();
        background.style.top = rect.top - initialviewportReference + 'px';

        if ( scrollTrigger('#about-me', 25, 'bottom') )
        {
            ripples.style.willChange = 'transform';
            heroImage.style.willChange = 'background-position, mask-position';
            document.querySelector('body').classList.add('past-hero');
        }
        else
        {
            document.querySelector('body').classList.remove('past-hero');
        }
    });
});

const headerLinks = document.querySelectorAll('#main-header a');
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
            lenis.scrollTo( e.currentTarget.getAttribute("href") );
        }
	});
});

const menuToggleButton = document.querySelector('.menu-toggle');
menuToggleButton.addEventListener('click', function() {
    document.getElementById('main-menu').classList.toggle('active');
});

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkVisiblePortion(el) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    const elHeight = rect.height;
    const elVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

    return (elVisibleHeight / elHeight) * 100;
}

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