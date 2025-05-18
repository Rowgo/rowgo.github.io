function highlightNav() {
    const currentUrl = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item a');

    navItems.forEach(item => {
        const itemUrl = item.pathname;

        if (currentUrl === itemUrl) {
            item.classList.add('active');
        }
    });
}