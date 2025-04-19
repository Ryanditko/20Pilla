document.addEventListener('DOMContentLoaded', function () { 
  // Inicializa o EmailJS (só precisa fazer uma vez)
  emailjs.init("HHgXYvITsuOl8GYaL"); // Substitua pelo seu User ID do EmailJS

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o envio padrão do formulário 

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
        submitButton.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...'; // Troca o texto do botão

        // Desabilita o botão para evitar múltiplos envios
        submitButton.disabled = true;

        // Enviar e-mail para o Google Apps Script
        const url = "https://script.google.com/macros/s/AKfycbwLcEoMdE6hKCunQSbVC2O7woafNoyJSW053-qI39RJzvEZql1BxGVb8-X_WIBMW16E/exec";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ email: email }).toString()  // Certifique-se de que o e-mail está sendo enviado corretamente
        })
        .then(response => response.text())
        .then(text => {
          if (text.toLowerCase().includes("sucesso")) {
            // Se o envio para Google Apps Script foi bem-sucedido, enviar o e-mail via EmailJS
            emailjs.send("service_2tbacnk", "template_egzp13d", {
              to_email: email,
              from_name: "20Pilla",
              name: userName,
              message: "Obrigado por se cadastrar em nossa newsletter!",
            })
            .then(function () {
              alert(
                "Obrigado por se inscrever! Em breve você receberá todas as nossas novidades."
              );
              emailInput.value = "";
              if (nameInput) nameInput.value = "";
            })
            .catch(function (error) {
              console.error("Erro ao enviar email:", error);
              alert(
                `Erro: ${
                  error.text ||
                  "Não foi possível enviar o e-mail. Verifique os campos e tente novamente."
                }`
              );
            });
          } else {
            alert("⚠️ Algo deu errado ao registrar seu e-mail no nosso banco de dados.");
          }
        })
        .catch(error => {
          console.error(error);
          alert("❌ Ocorreu um erro ao tentar registrar o seu e-mail. Tente novamente.");
        })
        .finally(function () {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
      });
  }
});
