// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Expand cursor on hover
    document.querySelectorAll('a, .project-card, .interest-tag, .blog-card, .hobby-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Scroll indicator visibility
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollIndicator.style.opacity = '1';
        } else {
            scrollIndicator.style.opacity = '0';
        }
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Mobile dropdown toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = toggle.closest('.nav-dropdown');
            dropdown.classList.toggle('active');
        }
    });
});

// Header link dropdown toggle (click/touch)
document.querySelectorAll('.link-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = toggle.closest('.link-dropdown');
        dropdown.classList.toggle('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.link-dropdown')) {
        document.querySelectorAll('.link-dropdown').forEach(d => d.classList.remove('active'));
    }
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});
