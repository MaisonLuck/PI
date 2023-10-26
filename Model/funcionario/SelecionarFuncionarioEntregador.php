<?php
    require_once '../config.php';
    header("Content-Type: application/json");

    $dados = [];

    mysqli_select_db($con, $dbname);

    $query = "SELECT f.cod_matricula, f.nome, c.nome_cargo, f.data_Cadastro, t.telefone FROM funcionario as f 
                INNER JOIN telefone as t 
                    ON f.cod_matricula = t.matricula_Funcionario 
                INNER JOIN cargo as c 
                    ON f.Cargo_idCargo = c.idCargo
                WHERE c.nome_cargo = 'apoio'"; 

    $resultado = mysqli_query($con, $query);

    if (mysqli_num_rows($resultado) > 0) {
        while ($row = mysqli_fetch_array($resultado)) {
            array_push($dados, $row["cod_matricula"]);
            array_push($dados, $row["nome"]);
            array_push($dados, $row["nome_cargo"]);
            array_push($dados, $row["data_Cadastro"]);
            array_push($dados, $row["telefone"]);
        }
    } else {
        $dados["status"] = "Sem registro";
    }

    echo json_encode($dados);

    mysqli_close($con);
?>
