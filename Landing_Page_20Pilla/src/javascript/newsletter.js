document.getElementById("newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  // Primeiro, envie para o Google Scripts
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ email: email }).toString() 
  })
  .then(response => response.text())
  .then(text => {
    if (text.toLowerCase().includes("sucesso")) {
      alert("🎉 Cadastro realizado com sucesso!");

      // Depois, envie para o EmailJS
      emailjs.send("service_2tbacnk", "template_egzp13d", {
        to_email: email,
        from_name: "20Pilla",
        name: "",
        message: "Obrigado por se cadastrar em nossa newsletter!",
      })
      .then(function() {
        alert("Obrigado por se inscrever! Em breve você receberá todas as nossas novidades.");
      })
      .catch(function(error) {
        console.error("Erro ao enviar email:", error);
        alert("Erro ao enviar o e-mail.");
      });
    } else {
      alert("⚠️ Algo deu errado: " + text);
    }
  })
  .catch(error => {
    console.error(error);
    alert("❌ Ocorreu um erro. Tente novamente.");
  });
});
