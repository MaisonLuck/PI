<?php
    require_once '../config.php';
    header("Content-Type: application/json");

    $dados =[];

    mysqli_select_db($con,$dbname);

    $query = "SELECT cod_patrimonio, nome FROM produtos
               WHERE Status_idStatus = 0";
	$resultado = mysqli_query($con,$query);
    
	if(mysqli_num_rows($resultado) > 0){
      
        while($row = mysqli_fetch_array($resultado)){
            
            array_push($dados, $row["cod_patrimonio"]);
            array_push($dados, $row["nome"]);
          
        }
          
    }else{
        
         $dados["status"] = "error";
    }
	
    echo json_encode($dados);

    mysqli_close($con);

?>