document.querySelector('.menu-toggle').addEventListener('click', function(event) {
    const button = event.currentTarget;
    const navMenu = document.querySelector('#main-menu');
    navMenu.classList.toggle('active');
    button.toggleAttribute('aria-expanded');
})

window.addEventListener('scroll', function() {
    const header = this.document.querySelector('#main-header');
    if (window.scrollY > 10)
    {
        header.classList.add('scrolled');
    }
    else {
        header.classList.add('scrolled');
    }
})