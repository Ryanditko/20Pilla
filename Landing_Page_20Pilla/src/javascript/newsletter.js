document.addEventListener('DOMContentLoaded', function () { 
  // Inicializa o EmailJS
  emailjs.init("HHgXYvITsuOl8GYaL");

  // Configurações
  const CONFIG = {
    minEmailLength: 5,
    maxEmailLength: 100,
    GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx_kABtnulsYQALUtzVgGqBIZ-fQIpa1gvJW7PyyRCfipGKyRrnD9UzbAUNiuqjQXkF/exec"
  };

  // Estado do formulário
  let state = {
    captchaVerified: false,
    isSubmitting: false
  };

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

  // Função para verificar se o email já está cadastrado
  async function checkEmailExists(email) {
    try {
      const url = `${CONFIG.GOOGLE_SCRIPT_URL}?action=check&email=${encodeURIComponent(email)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  }

  // Função para validar email
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

  // Função para cancelar inscrição
  async function unsubscribeEmail(email) {
    try {
      const url = `${CONFIG.GOOGLE_SCRIPT_URL}?action=unsubscribe&email=${encodeURIComponent(email)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        showNotification('success', 'Sua inscrição foi cancelada com sucesso.');
      } else {
        showNotification('error', 'Não foi possível encontrar seu email em nossa lista.');
      }
    } catch (error) {
      console.error("Erro ao cancelar inscrição:", error);
      showNotification('error', 'Ocorreu um erro ao tentar cancelar sua inscrição. Tente novamente mais tarde.');
    }
  }

  // Adiciona o captcha e formulário de cancelamento
  function setupFormExtras() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    // Adiciona container do captcha
    const captchaContainer = document.createElement('div');
    captchaContainer.className = 'captcha-container';
    captchaContainer.innerHTML = `
      <div class="captcha-box">
        <input type="checkbox" id="captcha-checkbox">
        <label for="captcha-checkbox">
          Não sou um robô
        </label>
      </div>
    `;
    form.appendChild(captchaContainer);

    // Adiciona link para cancelar inscrição
    const unsubscribeLink = document.createElement('div');
    unsubscribeLink.className = 'unsubscribe-link';
    unsubscribeLink.innerHTML = `
      <button type="button" class="btn-link" id="unsubscribe-btn">
        Cancelar inscrição da newsletter
      </button>
    `;
    form.parentElement.appendChild(unsubscribeLink);

    // Adiciona modal de cancelamento
    const modal = document.createElement('div');
    modal.className = 'unsubscribe-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Cancelar Inscrição</h3>
        <p>Digite seu email para cancelar a inscrição na newsletter:</p>
        <input type="email" id="unsubscribe-email" placeholder="Seu email">
        <div class="modal-buttons">
          <button type="button" class="btn-secondary" id="modal-cancel">Cancelar</button>
          <button type="button" class="btn-primary" id="modal-confirm">Confirmar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Eventos do captcha
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

    // Eventos do modal de cancelamento
    const unsubscribeBtn = document.getElementById('unsubscribe-btn');
    const modalCancelBtn = document.getElementById('modal-cancel');
    const modalConfirmBtn = document.getElementById('modal-confirm');

    unsubscribeBtn.addEventListener('click', () => {
      modal.classList.add('show');
    });

    modalCancelBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      document.getElementById('unsubscribe-email').value = '';
    });

    modalConfirmBtn.addEventListener('click', async () => {
      const email = document.getElementById('unsubscribe-email').value.trim();
      if (validateEmail(email)) {
        await unsubscribeEmail(email);
        modal.classList.remove('show');
        document.getElementById('unsubscribe-email').value = '';
      }
    });

    // Fecha modal ao clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.getElementById('unsubscribe-email').value = '';
      }
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    setupFormExtras();
    const emailInput = newsletterForm.querySelector('input[name="email"]');
    
    // Validação em tempo real
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

      // Verificações iniciais
      if (!validateEmail(email)) {
        emailInput.classList.add('error');
        return;
      }

      if (!state.captchaVerified) {
        showNotification('error', 'Por favor, confirme que você não é um robô.');
        return;
      }

      // Verifica se o email já está cadastrado
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        showNotification('warning', 'Este email já está cadastrado em nossa newsletter!');
        return;
      }

      // Atualiza estado
      state.isSubmitting = true;

      // Atualiza UI
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
      submitButton.disabled = true;

      try {
        // Preparar dados para envio
        const searchParams = new URLSearchParams();
        searchParams.append('email', email);
        searchParams.append('action', 'subscribe');

        // Enviar para o Google Apps Script
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL + "?" + searchParams.toString(), {
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

        // Reseta estado do formulário
        state.captchaVerified = false;
        document.getElementById('captcha-checkbox').checked = false;
        document.querySelector('.captcha-box').classList.remove('verified');
        
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
        state.isSubmitting = false;
      }
    });
  }
});
