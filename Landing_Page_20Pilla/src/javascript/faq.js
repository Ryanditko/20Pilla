document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todas as outras perguntas
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se não estava ativo, abre esta pergunta
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Adiciona animação suave ao expandir/recolher
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        answer.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out';
    });
}); 