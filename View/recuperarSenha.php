<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="imagens/logo.png" type="image/x-icon">
    <!-- css: -->
    <link rel="stylesheet" href="css/geral.css">
    <link rel="stylesheet" href="css/styleIndex.css">
    <link rel="stylesheet" href="css/cont-modal.css">
    <!-- fonte: -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Pro">
    <!-- icones: -->
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <!-- js: -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="../Controller/js/modalRuperarSenha.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
	<script type="text/javascript" src="https://smtpjs.com/v3/smtp.js"></script>
    <script type="text/javascript">
        (function() {
            // https://dashboard.emailjs.com/admin/account
            emailjs.init('YnAsfkAz7OZ-C0SSp');
        })();
    </script>
    <title>Recuperação de Senhas || Lendme</title>
</head>
<body>

<section class="box forms2">

    <div class="form login">
        <div class="form-conteudo">
            <header>
                <img src="imagens/logo.png" alt="" class="img_logo">
                <h1>Recuperação de Senha</h1>
                <div id="mensagem"><span class="confirmacao"></span></div>
                <h3 class="explic">
                        Por favor, informe o endereço de e-mail associado à sua conta. <br>Enviaremos um código de
                        autenticação para prosseguir com o processo.
                </h3>
            </header>

            <form id=" MudeSenha">
                <div class="dados input-dados">
                    <input type="text" name="emailRec" id="emailRec" placeholder="E-mail">
                </div>

                <div id="btnSen">
                    <button type="button" class="recup btn-VE" onclick="voltarLogin()">Voltar ao
                            Login</button>
                    <button type="button" id="enviarMudanca" class="recup btn-VE">Enviar</button>
                </div>
            </form>
        </div>
<div id="myModalCodigo" class="modal space">
                <div class="content-recup">

                    <div class="md-cabe">
                        <img src="imagens/logo.png" alt="" class="logo">
                        <h2 class="tittle">Código de Verificação</h2>
                        <span class="closeCodigo" onclick="closeCodigo()">&times;</span>
                    </div>

                    <div class="md-cont">
                        <input type="text" name="codigo" class="input" id="codigo" placeholder="Insira o código" />
                    </div>

                    <div id="conjB">
                        <button type=" button" class="btnCancelar_modal" onclick="closeCodigo()">Cancelar</button>

                        <button type=" button" class="btn_modal" id="ValidaCod"
                            onclick="ValidarCodigo()">Validar</button>
                    </div>

                </div>
            </div>

            <div id="myModal" class="modal2 space">
                <div class="content-recup">

                    <div class="md-cabe">
                        <img src="imagens/logo.png" alt="" class="logo">
                        <h2 class="tittle">Alterar Senha</h2>
                        <span class="closeEnviar" onclick="closeEnviar()">&times;</span>
                    </div>

                    <div class="md-cont2">
                        <label for="senha1" class="label">Nova senha:</label>
                        <input type="password" name="senha1" class="inputS" id="senha1">
                        <br><br>
                        <label for="senha1" class="label">Confirmar nova senha:</label>
                        <input type="password" name="senha2" class="inputS" id="senha2">
                    </div>

                    <div id="conjB">
                        <button type=" button" class="btnCancelar_modal" onclick="closeCodigo()">Cancelar</button>

                        <button type=" button" class="btn_modal" id="MudarSenha"
                            onclick="EnviarMudanca()">Alterar</button>
                    </div>
                </div>
            </div>

        </div>

    </section>

    <script type="text/javascript" src="../Controller/MudarSenha/MudarSenha.js"></script>

</body>

</html>
