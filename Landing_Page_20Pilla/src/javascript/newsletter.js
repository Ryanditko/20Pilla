document.addEventListener('DOMContentLoaded', function () { 
  // Inicializa o EmailJS
  emailjs.init("HHgXYvITsuOl8GYaL");

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        const nameInput = this.querySelector('input[name="name"]');
        const userName = nameInput ? nameInput.value : "";

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
        const url = "https://script.google.com/macros/s/AKfycbyiRHncp5eYlofNdpfDdr6m2jZaW4hWgTDcT4MSc8qtSkt-LzSDn_jKMt_ecOnmHl-u/exec";
        
        // Preparar dados para envio
        const formData = new FormData();
        formData.append("email", email);

        // Enviar para o Google Apps Script
        fetch(url, {
          method: "POST",
          body: formData
        })
        .then(response => response.text())
        .then(text => {
          if (text.includes("já cadastrado")) {
            alert("⚠️ Este e-mail já está cadastrado em nossa newsletter!");
            return;
          }
          
          if (text.includes("sucesso")) {
            // Se cadastrou com sucesso na planilha, envia o email de boas-vindas
            return emailjs.send("service_2tbacnk", "template_egzp13d", {
              to_email: email,
              from_name: "20Pilla",
              name: userName,
              message: "Obrigado por se cadastrar em nossa newsletter!"
            });
          }
          
          throw new Error(text);
        })
        .then(() => {
          alert("🎉 Cadastro realizado com sucesso! Em breve você receberá nossas novidades.");
          emailInput.value = "";
          if (nameInput) nameInput.value = "";
        })
        .catch(error => {
          console.error("Erro:", error);
          alert("⚠️ Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.");
        })
        .finally(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
      });
  }
});
