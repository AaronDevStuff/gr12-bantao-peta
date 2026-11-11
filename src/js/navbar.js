document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) {
        console.error('Error: #navbar-placeholder was not found in the HTML.');
        return;
    }

    const isSubpage = window.location.pathname.includes('/webpages/');
    const basePath = isSubpage ? '../../' : '';
    const navbarUrl = `${basePath}src/html/navbar.html`;

    console.log('Attempting to load navbar from:', navbarUrl);

    fetch(navbarUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} - Could not find ${navbarUrl}`);
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            if (isSubpage) {
                navbarPlaceholder.querySelectorAll('[href], [src]').forEach(el => {
                    if (el.hasAttribute('href')) {
                        const href = el.getAttribute('href');
                        if (href && !href.startsWith('http') && !href.startsWith('#')) {
                            el.setAttribute('href', basePath + href);
                        }
                    }
                    if (el.hasAttribute('src')) {
                        const src = el.getAttribute('src');
                        if (src && !src.startsWith('http')) {
                            el.setAttribute('src', basePath + src);
                        }
                    }
                });
            }

            const sideNavBtn = document.getElementById('side-nav-btn');
            const sideNav = document.getElementById('side-nav');
            if (sideNavBtn && sideNav) {
                sideNavBtn.addEventListener('click', () => {
                    sideNav.classList.toggle('active');
                });
            }
        })
        .catch(error => console.error('Navbar Error:', error));
});
