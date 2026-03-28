const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.getElementById('sidebar');
        const navLinks = document.getElementById('navLinks');
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        // Toggle Logic
        menuBtn.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                // Desktop: Toggle Sidebar Collapse
                sidebar.classList.toggle('collapsed');
            } else {
                // Mobile: Toggle Link Overlay
                navLinks.classList.toggle('active');
            }
        });

        // Theme Toggle Logic
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', targetTheme);
            themeIcon.textContent = targetTheme === 'light' ? '☀️' : '🌙';
            localStorage.setItem('theme', targetTheme);
        });

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
