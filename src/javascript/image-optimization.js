document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading para todas as imagens
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01 
    });

    images.forEach(img => imageObserver.observe(img));

    // Função para verificar suporte a WebP
    async function supportsWebP() { 
        if (!self.createImageBitmap) return false;
        
        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='; 
        const blob = await fetch(webpData).then(r => r.blob());
        
        return createImageBitmap(blob).then(() => true, () => false);
    }

    // Substituir imagens por versão WebP se suportado
    supportsWebP().then(hasWebP => {
        if (hasWebP) {
            const jpgImages = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
            jpgImages.forEach(img => {
                const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                img.src = webpSrc;
            });
        }
    });

    // Pré-carregar imagens críticas
    const preloadImages = document.querySelectorAll('img[data-preload]');
    preloadImages.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.dataset.src;
        imageLoader.onload = () => {
            img.src = img.dataset.src;
            img.removeAttribute('data-preload');
            img.removeAttribute('data-src');
        };
    });
}); 