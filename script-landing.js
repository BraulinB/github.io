document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; // Símbolo X
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                menuToggle.innerHTML = '☰'; // Símbolo hamburguesa
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }

    // Smooth scroll para enlaces de anclaje y cerrar menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.innerHTML = '☰';
                        menuToggle.setAttribute('aria-label', 'Abrir menú');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }

                    const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Activar enlace de navegación según la sección visible
    const sections = document.querySelectorAll('section[id]');
    const navLiA = document.querySelectorAll('.nav-links li a'); 

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "";
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 70;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (headerHeight + 50); 
            
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });
        
        navLiA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') && a.getAttribute('href').substring(1) === currentSectionId) {
                a.classList.add('active');
            }
        });
    }
    
    if (sections.length > 0 && navLiA.length > 0) {
        navHighlighter(); 
        window.addEventListener('scroll', navHighlighter);
    }
});
