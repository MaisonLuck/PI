<?php
    require_once '../config.php';
    
    header('Content-type: application/json');
    $codPatrimonio = $_POST['codPatrimonio'];
    $data = $_POST['data'];
    $turma = $_POST['turma'];
    $entregador = $_POST['entregador'];
    $solicitante = $_POST['solicitante'];
    $turno = $_POST['turno'];
    $idPedidos = 0;
    mysqli_select_db($con,$dbname);
   
    $sql_Pedidos = "insert into pedidos (data, turma,  Entregue_Funcionario_cod_matricula, Solicitado_Funcionario_cod_matricula, turno) values ('$data' , '$turma' , '$entregador' , '$solicitante', '$turno')";
    $sql_Select_idPedido = "select idPedidos from pedidos ORDER BY data DESC limit 1";

    $resultado = mysqli_query($con, $sql_Select_idPedido);

    if(mysqli_num_rows($resultado) > 0){

        while($row = mysqli_fetch_array($resultado)){
            
            $idPedidos = $row["idPedidos"];         
            
        }

        $sql_detalhePedido = "insert into 	detalhepedido (Pedidos_idPedidos, Produtos_cod_patrimonio) values ('$idPedidos', '$codPatrimonio')"; 
        $sql_update_Produto = "update produtos set Status_idStatus = 1 where cod_patrimonio = '$codPatrimonio'";

            if ($con->query($sql_Pedidos) === TRUE and $con->query($sql_detalhePedido) === TRUE and $con->query($sql_update_Produto) === TRUE) {
                    $data = array('status' => 'Inserido com sucesso');
            }
    } else {
      $data = array('status' => 'error', 'mensagem' => $con->error);
    }
  
   
    echo json_encode($data);

    $con->close();

?>