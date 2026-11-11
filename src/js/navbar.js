function initSideNavToggle() {
    const sideNavBtn = document.getElementById('side-nav-btn');
    const sideNav = document.getElementById('side-nav');

    if (sideNavBtn && sideNav) {
        sideNavBtn.addEventListener('click', function() {
            sideNav.classList.toggle('active');
        });
    }
}

const navbarPlaceholder = document.getElementById('navbar-placeholder');

const isSubpage = window.location.pathname.includes('/webpages/');
const basePath = isSubpage ? '../../' : '';

fetch(`${basePath}src/html/navbar.html`)
  .then(response => {
      if (!response.ok) throw new Error('Navbar failed to load');
      return response.text();
  })
  .then(data => {
      navbarPlaceholder.innerHTML = data;
      initSideNavToggle();
  })
  .catch(error => console.error(error));
