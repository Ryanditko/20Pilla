document.addEventListener('DOMContentLoaded', function () { 
  // Inicializa o EmailJS
  emailjs.init("HHgXYvITsuOl8GYaL");

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[name="email"]');
        const email = emailInput.value.trim().toLowerCase();
        const nameInput = this.querySelector('input[name="name"]');
        const userName = nameInput ? nameInput.value.trim() : "";

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Por favor, insira um e-mail válido.");
          return;
        }

        // Mostrar mensagem de carregamento
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // URL do Google Apps Script
        const url = "https://script.google.com/macros/s/AKfycbx_kABtnulsYQALUtzVgGqBIZ-fQIpa1gvJW7PyyRCfipGKyRrnD9UzbAUNiuqjQXkF/exec";
        
        // Preparar dados para envio
        const queryString = `?email=${encodeURIComponent(email)}`;

        // Enviar para o Google Apps Script
        fetch(url + queryString, {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => response.text())
        .then(text => {
          console.log("Resposta do servidor:", text); // Para debug
          
          if (text.includes("já cadastrado")) {
            alert("⚠️ Este e-mail já está cadastrado em nossa newsletter!");
            return;
          }
          
          if (text.includes("sucesso")) {
            // Se cadastrou com sucesso na planilha, envia o email de boas-vindas
            return emailjs.send("service_2tbacnk", "template_egzp13d", {
              to_email: email,
              from_name: "20Pilla",
              name: userName || "Cliente",
              message: "Obrigado por se cadastrar em nossa newsletter!"
            });
          }
          
          throw new Error(text);
        })
        .then(() => {
          alert("🎉 Cadastro realizado com sucesso! Em breve você receberá nossas novidades.");
          newsletterForm.reset();
        })
        .catch(error => {
          console.error("Erro detalhado:", error); // Para debug
          alert("⚠️ Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.");
        })
        .finally(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
      });
  }
});
