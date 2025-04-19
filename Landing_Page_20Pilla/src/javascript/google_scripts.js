document.getElementById("newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const url = "https://script.google.com/macros/s/AKfycbwLcEoMdE6hKCunQSbVC2O7woafNoyJSW053-qI39RJzvEZql1BxGVb8-X_WIBMW16E/exec" + encodeURIComponent(email);


  const formData = new URLSearchParams();
  formData.append("email", email);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  })
  .then(response => response.text())
  .then(text => {
    if (text.toLowerCase().includes("sucesso")) {
      alert("🎉 Cadastro realizado com sucesso!");
      document.getElementById("newsletter-form").reset();
    } else {
      alert("⚠️ Algo deu errado: " + text);
    }
  })
  .catch(error => {
    console.error(error);
    alert("❌ Ocorreu um erro. Tente novamente.");
  });
});

//function doPost(e) {
    //var sheet = SpreadsheetApp.openById("1AffemlcmQDTGBuqNPqGYhJNJJwzsWAXsRovBOXFX4P4").getSheetByName("Página1");//

   // var email = e.parameter.email;
   // var data = new Date();//
  
   // sheet.appendRow([email, data]);//
  
    //return ContentService.createTextOutput("Cadastro realizado com sucesso!");
  //}//
  
  //function enviarEmails() {
    // var sheet = SpreadsheetApp.openById("1AffemlcmQDTGBuqNPqGYhJNJJwzsWAXsRovBOXFX4P4").getSheetByName("Página1");
    // var dados = sheet.getRange("A2:A" + sheet.getLastRow()).getValues();
    // var assunto = "Novidades da 20Pilla!";
    // var mensagem = "Olá! Aqui estão as últimas novidades. Fique ligado! 💜";//
  
    //dados.forEach(function(linha) {
    //   var email = linha[0];
    //   if (email) {
        // MailApp.sendEmail(email, assunto, mensagem);
    //   }
    // });//
  //} //
  