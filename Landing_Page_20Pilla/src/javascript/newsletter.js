document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o EmailJS (só precisa fazer uma vez)
    emailjs.init("HHgXYvITsuOl8GYaL"); // Substitua pelo seu User ID do EmailJS

    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const nameInput = this.querySelector('input[name="name"]');
            const userName = nameInput ? nameInput.value : '';

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

            // Enviar email via EmailJS
            emailjs.send("service_2tbacnk", "template_egzp13d", {
                to_email: email,
                from_name: "20Pilla",
                name: userName,
                message: "Obrigado por se cadastrar em nossa newsletter!"
            })
                .then(function () {
                    alert('Obrigado por se inscrever! Em breve você receberá todas as nossas novidades.');
                    emailInput.value = '';
                    if (nameInput) nameInput.value = '';
                })
                .catch(function (error) {
                    console.error('Erro ao enviar email:', error);
                    alert('Ocorreu um erro ao cadastrar seu e-mail. Por favor, tente novamente mais tarde.');
                })
                .finally(function () {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        });
    }
});
