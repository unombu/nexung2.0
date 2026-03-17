/* ============================================================
   SCRIPT.JS — Nexung
   ============================================================ */
 
/* ---- EmailJS ---- */
(function() {
    emailjs.init("TU_PUBLIC_KEY_AQUI");
})();
 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const btn = document.querySelector('.btn-submit');
    const message = document.getElementById("formMessage");
 
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        btn.innerText = 'ENVIANDO...';
 
        emailjs.sendForm('default_service', 'template_id_ejemplo', this)
            .then(() => {
                btn.innerText = 'ENVIAR';
                message.innerText = '¡Mensaje enviado con éxito!';
                message.style.color = "lightgreen";
                this.reset();
            }, (err) => {
                btn.innerText = 'ENVIAR';
                message.innerText = "Error al enviar: " + JSON.stringify(err);
                message.style.color = "red";
            });
    });
}
 
/* ---- Navbar hide/show on scroll ---- */
let lastScroll = 0;
const navbar = document.querySelector(".navbar");
 
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
});
 
/* ---- Reveal on scroll ---- */
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            reveals[i].classList.add("active");
        }
    }
}
 
window.addEventListener("scroll", reveal);
reveal();
 
/* ---- Observer para .text-side ---- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.3 });
 
document.querySelectorAll(".text-side").forEach(el => observer.observe(el));
 
/* ---- FIX: activar reveals al navegar por link interno ---- */
document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
            document.querySelectorAll('.text-side').forEach(el => el.classList.add('show'));
        }, 900);
    });
});
 
/* ---- Hamburger + Sidebar ---- */
const hamburger    = document.getElementById('hamburger');
const sidebar      = document.getElementById('sidebar');
const navOverlay   = document.getElementById('navOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebar.classList.add('open');
    navOverlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger)    hamburger.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (navOverlay)   navOverlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});

document.querySelectorAll('.sidebar-link, .sidebar-sublink').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

/* ---- Acordeón servicios ---- */
const accordionBtn = document.querySelector('.sidebar-accordion-btn');
if (accordionBtn) {
    accordionBtn.addEventListener('click', () => {
        accordionBtn.closest('.sidebar-accordion').classList.toggle('open');
    });
}

/* FIX: si la página cargó con un hash (viniendo desde otra página),
   activar todos los reveals de golpe sin animación para evitar el overflow */
if (window.location.hash) {
    document.querySelectorAll('.reveal').forEach(el => {
        el.style.transition = 'none';
        el.classList.add('active');
    });
    document.querySelectorAll('.text-side').forEach(el => {
        el.style.transition = 'none';
        el.classList.add('show');
    });
}