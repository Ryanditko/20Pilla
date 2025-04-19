document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    const email = document.getElementById("email").value;  // Certifique-se de pegar o valor do campo com id 'email'
    const url = "https://script.google.com/macros/s/AKfycbwLcEoMdE6hKCunQSbVC2O7woafNoyJSW053-qI39RJzvEZql1BxGVb8-X_WIBMW16E/exec"; // Sua URL do Google Apps Script

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}`  // Envia o parâmetro 'email'
    }).then(() => {
        // Se o cadastro for bem-sucedido
        alert("🎉 Cadastro realizado com sucesso!");
        document.getElementById("newsletter-form").reset();  // Reseta o formulário
    }).catch(() => {
        // Se houver algum erro
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
  