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

document.addEventListener('DOMContentLoaded', () => {
    const verMenosItems = document.querySelectorAll('.verMenos-item');

    verMenosItems.forEach((item) => {
        const botaoVerMenos = item.querySelector('.verMenos-question');
        
        botaoVerMenos.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todas as seções
            verMenosItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Reabre somente se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }

            // Voltar para a seção de avaliações ao clicar em "Ver menos"
            const secaoAvaliacoes = document.querySelector('#avaliacoes'); // ID da seção de avaliações principal
            if (secaoAvaliacoes) {
                secaoAvaliacoes.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Aplica animações suaves
    verMenosItems.forEach(item => {
        const answer = item.querySelector('.faq-answer'); // pode ajustar a classe se for diferente
        if (answer) {
            answer.style.transition = 'max-height 0.5s ease-in-out, opacity 0.3s ease-in-out';
        }
    });
});
