document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Verifica se há uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Adiciona o evento de clique ao botão
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme'); 
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Atualiza o ícone baseado no tema
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        const text = themeToggle.querySelector('span');
        
        if (theme === 'dark') {
            icon.textContent = '🌙';
            text.textContent = 'Modo Claro';
        } else {
            icon.textContent = '☀️';
            text.textContent = 'Modo Escuro';
        }
    }
    
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Atualiza o tema baseado na preferência do sistema
    function updateThemeFromSystem(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    }
    
    // Adiciona o listener para mudanças na preferência do sistema
    prefersDark.addListener(updateThemeFromSystem);
    
    // Inicializa o tema baseado na preferência do sistema se não houver preferência salva
    if (!localStorage.getItem('theme')) {
        updateThemeFromSystem(prefersDark);
    }
}); 