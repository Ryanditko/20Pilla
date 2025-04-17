document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Mostrar mensagem de carregamento
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Enviar email usando EmailJS
            emailjs.init("SEU_USER_ID"); // Substitua pelo seu User ID do EmailJS
            
            emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
                to_email: email,
                from_name: "20Pilla",
                message: "Obrigado por se cadastrar em nossa newsletter!"
            })
            .then(function() {
                alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
                emailInput.value = '';
            })
            .catch(function(error) {
                console.error('Erro ao enviar email:', error);
                alert('Ocorreu um erro ao cadastrar seu e-mail. Por favor, tente novamente mais tarde.');
            })
            .finally(function() {
                // Restaurar o botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
}); 