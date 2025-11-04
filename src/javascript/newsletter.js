document.addEventListener('DOMContentLoaded', function () { 
  emailjs.init("HHgXYvITsuOl8GYaL"); 

  const CONFIG = {
    minEmailLength: 5,
    maxEmailLength: 100,
    GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx21YbY6v7P509V2ZMUdE0jsO3tr6jIImW-O8N7MIJ8hlPJd8sChtgBsgdDgWnpHNK4/exec"
  };
  
  let state = {
    captchaVerified: false,
    isSubmitting: false
  };

  function showNotification(type, message) {
    const existingNotification = document.querySelector('.newsletter-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `newsletter-notification ${type}`;
    
    let icon = '';
    switch(type) {
      case 'success': icon = 'fa-circle-check'; break;
      case 'error': icon = 'fa-circle-xmark'; break;
      case 'warning': icon = 'fa-triangle-exclamation'; break;
    }

    notification.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span class="message">${message}</span>
      <button class="close" aria-label="Fechar">
        <i class="fa-solid fa-times"></i>
      </button>
    `;

    document.body.appendChild(notification);

    notification.querySelector('.close').addEventListener('click', () => {
      notification.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  function validateEmail(email) {
    if (!email) {
      showNotification('error', 'Por favor, insira seu e-mail.');
      return false;
    }

    if (email.length < CONFIG.minEmailLength || email.length > CONFIG.maxEmailLength) {
      showNotification('error', `O e-mail deve ter entre ${CONFIG.minEmailLength} e ${CONFIG.maxEmailLength} caracteres.`);
      return false;
    }
    
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!emailRegex.test(email)) {
      showNotification('error', 'Por favor, insira um e-mail válido.');
      return false;
    }

    return true;
  }

  function setupFormExtras() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.remove();
    }

    const captchaContainer = document.createElement('div');
    captchaContainer.className = 'captcha-container';
    captchaContainer.innerHTML = `
      <div class="captcha-box">
        <input type="checkbox" id="captcha-checkbox">
        <label for="captcha-checkbox" class="captcha-label">
          Não sou um robô
        </label>
      </div>
    `;
    form.appendChild(captchaContainer);

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn-default';
    button.innerHTML = `
      Quero receber novidades
      <i class="fa-solid fa-paper-plane"></i>
    `;
    form.appendChild(button);

    const captchaCheckbox = document.getElementById('captcha-checkbox');
    const captchaBox = document.querySelector('.captcha-box');

    captchaCheckbox.addEventListener('change', (e) => {
      state.captchaVerified = e.target.checked;

      if (state.captchaVerified) {
        captchaBox.classList.add('verified');
        captchaBox.style.animation = 'checkPulse 0.4s ease-in-out';
        setTimeout(() => {
          captchaBox.style.animation = '';
        }, 400);
      } else {
        captchaBox.classList.remove('verified');
      }
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    setupFormExtras();
    const emailInput = newsletterForm.querySelector('input[name="email"]');
    
    emailInput.addEventListener('input', function() {
      this.classList.remove('error');
    });

    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (state.isSubmitting) {
        showNotification('warning', 'Aguarde, sua solicitação está sendo processada...');
        return;
      }

      const email = emailInput.value.trim().toLowerCase();

      if (!validateEmail(email)) {
        emailInput.classList.add('error');
        return;
      }

      if (!state.captchaVerified) {
        showNotification('error', 'Por favor, confirme que você não é um robô.');
        return; 
      }

      state.isSubmitting = true;

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
      submitButton.disabled = true;

      try {
        await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(email)}&action=subscribe`
        });

        try {
          await emailjs.send("service_2tbacnk", "template_7q5cj4h", {
            to_email: email,
            from_name: "20Pilla",
            name: "Cliente",
            message: "Obrigado por se cadastrar em nossa newsletter! Se precisar de contato, escreva para 20.pillamarca@gmail.com."
          }); 

          state.captchaVerified = false;
          document.getElementById('captcha-checkbox').checked = false;
          document.querySelector('.captcha-box').classList.remove('verified');
          
          showNotification('success', '🎉 Cadastro realizado com sucesso! Em breve você receberá nossas novidades.');
          newsletterForm.reset();
        } catch (emailError) {
          console.error("Erro ao enviar email:", emailError);
          showNotification('success', '🎉 Cadastro realizado com sucesso!');
          newsletterForm.reset();
        }

      } catch (error) {
        console.error("Erro:", error);
        showNotification('error', '⚠️ Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.');
        emailInput.classList.add('error');
      } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        state.isSubmitting = false;
      }
    });
  }
});
