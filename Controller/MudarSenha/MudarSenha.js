const verification_code = validador()

function send(codigo, email){
    var params = {
        from_name: 'LendMe',
        email_from: 'lendmeproject@gmail.com',
        email_to: email,
        subject: "Redefinição de senha",
        codigo: codigo,
        message:  `Código de verificação para redefinir a sua senha no site LENDME`
    }

    let email_body = `
        <b>Remetente: </b> ${params.from_name}
        <br>
        <b>Email de: </b> ${params.email_from}
        <br>
        <b>Assunto: </b> ${params.message}
        <br>
        <b>Código de Verificação: </b> ${params.codigo}
        <br>
        
        
    `

    Email.send({
        SecureToken : "7b8c7497-8057-4038-a20f-b03bf70baf10",
        To : params.email_to,
        From : params.email_from,
        Subject : params.subject,
        Body : email_body
    }).then(
    message => alert(message)
    );
    console.log("Deu tudo certo!")
}

function validador (){
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
}

$(document).ready(function() {
    $('#enviarMudanca').click(function() {
        var emailRec = $("#emailRec").val();
        var modalCodigo = document.getElementById("myModalCodigo");
        
        if(!emailRec.includes("@")){
            alert("Digite um email válido!")
            document.getElementById("emailRec").style.borderColor = "red";
        }else{
        $.ajax({
            url: "../Model/funcionario/VerificarUsuario.php",
            data: { email: emailRec },
            method: 'get',
            dataType: "json",
            success: function(data) {
                if (data.comentario != "Email não encontrado") {
                    var emailRetornado = data.email;
                    console.log("AAAAAAA:"+emailRetornado)
                    MudaSenha(emailRec);
                    modalCodigo.style.display = "block"
                } else {
                    alert("Error: " + data.comentario);
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                console.log(error);
            }
        });
        }
    });
});

function MudaSenha(email) {
    send(verification_code, email)
}



function ValidarCodigo(){
    var modal = document.getElementById("myModal");
    var modalCodigo = document.getElementById("myModalCodigo");
    var inputCod = $("#codigo").val();

    if (verification_code == inputCod){
        modalCodigo.style.display = "none";
        modal.style.display = "block";
    }else{
        alert ("Código incorreto");
    }
}




function EnviarMudanca(){
    console.log("Entrei na mudança")
    var senha1 = $('#senha1').val();
    var senha2 = $('#senha2').val();
    var emailRec = $("#emailRec").val();  
    var modal = document.getElementById("myModal");
    
    if(senha1 == senha2)
    
        $.ajax({
            url: '../Model/MudarSenha/AtualizarSenha.php',
            method: 'post',
            dataType: 'json',
            data: {
                senha: senha1,
                email: emailRec
            },
            success: function(response) {
                console.log(response);
                if(response.status != 'erro'){
                    alert("Senha atualizada");
                    modal.style.display = "none"
                }else{
                    alert("Tente outra vez");
                }
                },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                
            }
        });
    else{

        alert("Senhas diferentes");
    }

}