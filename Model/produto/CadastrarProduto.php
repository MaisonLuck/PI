<?php
    require_once '../config.php';
    
    header('Content-type: application/json');
    $codPatrimonio = $_POST['codPatrimonio'];
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $apelido = $_POST['apelido'];
    $categoria = $_POST['categoria'];
    $status = $_POST['status'];
  
    mysqli_select_db($con,$dbname);
   
    $sql_Produtos ="insert into produtos (cod_patrimonio, nome, descricao, apelido, Categoria_idCategoria, Status_idStatus) values ('$codPatrimonio' , '$nome' , '$descricao' , '$apelido' , '$categoria' , '$status')";

    if ($con->query($sql_Produtos) === TRUE) {
      $data = array('status' => 'Inserido com sucesso');
    } else {
      $data = array('status' => 'error', 'mensagem' => $con->error);
    }
  
   
    echo json_encode($data);

    $con->close();

?>