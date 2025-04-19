document.addEventListener('DOMContentLoaded', function () { 
  // Inicializa o EmailJS
  emailjs.init("HHgXYvITsuOl8GYaL");

  // Função para mostrar notificações
  function showNotification(type, message) {
    // Remove notificações anteriores
    const existingNotification = document.querySelector('.newsletter-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `newsletter-notification ${type}`;
    
    let icon = '';
    switch(type) {
      case 'success':
        icon = 'fa-circle-check';
        break;
      case 'error':
        icon = 'fa-circle-xmark';
        break;
      case 'warning':
        icon = 'fa-triangle-exclamation';
        break;
    }

    notification.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span class="message">${message}</span>
      <button class="close" aria-label="Fechar">
        <i class="fa-solid fa-times"></i>
      </button>
    `;

    document.body.appendChild(notification);

    // Adiciona evento para fechar
    notification.querySelector('.close').addEventListener('click', () => {
      notification.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
    });

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Função para validar email
  function validateEmail(email) {
    // Regex mais robusta para validação de email
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!email) {
      showNotification('error', 'Por favor, insira seu e-mail.');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      showNotification('error', 'Por favor, insira um e-mail válido.');
      return false;
    }

    return true;
  }

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[name="email"]');
    
    // Validação em tempo real
    emailInput.addEventListener('input', function() {
      this.classList.remove('error');
    });

    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim().toLowerCase();

      // Validação do email
      if (!validateEmail(email)) {
        emailInput.classList.add('error');
        return;
      }

      // Mostrar mensagem de carregamento
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
      submitButton.disabled = true;

      try {
        // URL do Google Apps Script
        const url = "https://script.google.com/macros/s/AKfycbx_kABtnulsYQALUtzVgGqBIZ-fQIpa1gvJW7PyyRCfipGKyRrnD9UzbAUNiuqjQXkF/exec";
        
        // Preparar dados para envio
        const searchParams = new URLSearchParams();
        searchParams.append('email', email);

        // Enviar para o Google Apps Script
        const response = await fetch(url + "?" + searchParams.toString(), {
          method: "POST",
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });

        // Enviar email de confirmação
        await emailjs.send("service_2tbacnk", "template_egzp13d", {
          to_email: email,
          from_name: "20Pilla",
          name: "Cliente",
          message: "Obrigado por se cadastrar em nossa newsletter!"
        });

        // Mostrar mensagem de sucesso
        showNotification('success', '🎉 Cadastro realizado com sucesso! Em breve você receberá nossas novidades.');
        newsletterForm.reset();

      } catch (error) {
        console.error("Erro:", error);
        showNotification('error', '⚠️ Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
        emailInput.classList.add('error');
      } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }
});
