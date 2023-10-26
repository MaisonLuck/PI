<?php
require '../config.php';
header("Content-Type: application/json");


$email = $_GET['email'];
//$dados =[];


mysqli_select_db($con,$dbname);


$sql = "SELECT email FROM login WHERE email = '$email'";
$result = $con->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $emailEncontrado = $row["email"];
    $response = array("status" => "Encontrado", "email" => $emailEncontrado);
    echo json_encode($response);
} else {
    $response = array("status" => "Sem registro", "comentario" => "Email não encontrado");
    echo json_encode($response);
}

$con->close();
?>