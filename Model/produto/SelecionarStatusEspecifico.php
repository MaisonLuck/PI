<?php
    require_once '../config.php';
    header("Content-Type: application/json");

    $codPatrimonio = $_POST["codPatrimonio"];
    $dados =[];

    mysqli_select_db($con,$dbname);


	$query = "SELECT status.idStatus, status.nome_status FROM status
                    INNER JOIN produtos 
                        on produtos.Status_idStatus = status.idStatus and produtos.cod_patrimonio = '$codPatrimonio'";

	$resultado = mysqli_query($con,$query);

	if(mysqli_num_rows($resultado) > 0){
      
        while($row = mysqli_fetch_array($resultado)){
            
            array_push($dados, $row["idStatus"]);
            array_push($dados, $row["nome_status"]);
        }
      
        
    }else if(mysqli_num_rows($resultado) == 0){
         $dados["status"] = "Sem registro";

    } 
    else{
        
         $dados["status"] = "error";
    }
	
    echo json_encode($dados);

    mysqli_close($con);

?>