<?php
    require_once '../config.php';
    header('Content-type: application/json');

    $dados = json_decode($_POST['dados'], true);

    $codPatrimonio = $_POST['codPatrimonio'];
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $apelido = $_POST['apelido'];
    $categoria = $_POST['categoria'];
    $status = $_POST['status'];



     mysqli_select_db($con,$dbname);
    $query = "SELECT * FROM produtos WHERE cod_patrimonio = '$codPatrimonio'";
    $resultado = mysqli_query($con,$query);

    if(mysqli_num_rows($resultado) > 0){

    $sqlProd ="UPDATE produtos SET nome = '$nome', descricao = '$descricao', apelido = '$apelido', Categoria_idCategoria = '$categoria', Status_idStatus = '$status' WHERE cod_patrimonio = '$codPatrimonio'";
    

        if ($con->query($sqlProd) === TRUE) {
          $data = array('status' => 'Alterado com sucesso');
        } else {
          $data = array('status' => 'erro', 'mensagem' => $con->error);
        }

    }else{

      $data = array('status' => 'Produto não encontrado');
    }
  
    echo json_encode($data);

    $con->close();

?>