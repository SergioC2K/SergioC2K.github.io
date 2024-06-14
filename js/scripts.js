/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
    const myEmail = "sergio0725m@gmail.com";
    const emailInput = document.getElementById('email');

    emailInput.value = myEmail;
    emailInput.setAttribute('disabled', 'disabled');

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }


    async function copiarTexto(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            console.log("Texto copiado al portapapeles correctamente.");
        } catch (error) {
            console.error("Error al copiar el texto:", error);
        }
    }


    function showAlert(message) {
        const alertHTML = `
                <div class="alert alert-info alert-dismissible fade show alert-overlay" role="alert">
                    <i class="fas fa-info fa-fw"></i>  <strong>${message}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        document.body.insertAdjacentHTML('beforeend', alertHTML);
    }

    const buttonCopyEmail = document.getElementById('buttonCopyEmail');

    buttonCopyEmail.addEventListener('click', event => {
      copiarTexto(myEmail);
      showAlert(' Copied to clipboard successfully.');
    })


    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
