document.addEventListener('DOMContentLoaded', () => {

    // ── Intersection Observer for all animations ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.12 });

    // Observe hero elements
    document.querySelectorAll('.animate-left, .animate-right').forEach(el => {
        observer.observe(el);
    });

    // Observe scroll-reveal sections
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // ── Active nav link highlight on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));

});
