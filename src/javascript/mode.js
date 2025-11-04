/*
const toggle = document.getElementById('toggle');
const body = document.body;
const root = document.documentElement;
const bannerImage = document.querySelector('#banner img');
const logoImage = document.querySelector('#testimonial_chef');

// Função para detectar preferência do sistema
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Função para aplicar o tema
function applyTheme(theme) {
    // Adiciona classe de transição para animação suave
    root.classList.add('theme-transition');
    
    // Aplica o tema
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-toggle span');
    
    // Atualiza o ícone e texto do botão
    if (theme === 'dark') {
        themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        themeText.textContent = 'Modo Claro';
        themeToggle.classList.add('dark-mode');
        themeToggle.classList.remove('light-mode');
    } else if (theme === 'light') {
        themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        themeText.textContent = 'Modo Escuro';
        themeToggle.classList.add('light-mode');
        themeToggle.classList.remove('dark-mode');
    } else {
        // Modo sistema
        const systemTheme = getSystemTheme();
        themeIcon.innerHTML = systemTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        themeText.textContent = systemTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
        themeToggle.classList.add(systemTheme + '-mode');
        themeToggle.classList.remove(systemTheme === 'dark' ? 'light-mode' : 'dark-mode');
    }
    
    // Aplica as cores específicas do tema
    if (theme === 'dark') {
        root.style.setProperty('--color-primary-1', '#121212');
        root.style.setProperty('--color-primary-2', '#1a1a1a');
        root.style.setProperty('--color-neutral-0', '#ffffff');
        root.style.setProperty('--color-neutral-1', '#f5f5f5');
        
        // Altera as imagens para o tema escuro
        if (bannerImage) {
            bannerImage.src = 'src/img/Layer_5[1].png';
        }
        if (logoImage) {
            logoImage.src = 'src/img/globo_2[1].png';
        }
    } else if (theme === 'light') {
        root.style.setProperty('--color-primary-1', '#ffffff');
        root.style.setProperty('--color-primary-2', '#f5f5f5');
        root.style.setProperty('--color-neutral-0', '#000000');
        root.style.setProperty('--color-neutral-1', '#333333');
        
        // Altera as imagens para o tema claro
        if (bannerImage) {
            bannerImage.src = 'src/img/Layer_4[1].png';
        }
        if (logoImage) {
            logoImage.src = 'src/img/globo 1[1].png';
        }
    } else {
        // Modo sistema
        const systemTheme = getSystemTheme();
        if (systemTheme === 'dark') {
            root.style.setProperty('--color-primary-1', '#121212');
            root.style.setProperty('--color-primary-2', '#1a1a1a');
            root.style.setProperty('--color-neutral-0', '#ffffff');
            root.style.setProperty('--color-neutral-1', '#f5f5f5');
            
            // Altera as imagens para o tema escuro
            if (bannerImage) {
                bannerImage.src = 'src/img/Layer_5[1].png';
            }
            if (logoImage) {
                logoImage.src = 'src/img/globo_2[1].png';
            }
        } else {
            root.style.setProperty('--color-primary-1', '#ffffff');
            root.style.setProperty('--color-primary-2', '#f5f5f5');
            root.style.setProperty('--color-neutral-0', '#000000');
            root.style.setProperty('--color-neutral-1', '#333333');
            
            // Altera as imagens para o tema claro
            if (bannerImage) {
                bannerImage.src = 'src/img/Layer_4[1].png';
            }
            if (logoImage) {
                logoImage.src = 'src/img/globo 1[1].png';
            }
        }
    }
    
    // Remove a classe de transição após a animação
    setTimeout(() => {
        root.classList.remove('theme-transition');
    }, 300);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    
    // Adiciona evento de clique ao botão de tema
    toggle.addEventListener('click', function() {
        const currentTheme = root.getAttribute('data-theme');
        let newTheme;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'system';
        } else {
            newTheme = 'dark';
        }
        
        applyTheme(newTheme);
    });
});

// Listener para mudanças no sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'system') {
        applyTheme('system');
    }
});
*/
