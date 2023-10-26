<?php
require '../config.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

mysqli_select_db($con,$dbname);

$sql = "UPDATE login SET senha = '$senha' WHERE email = '$email'";
$stmt = $con->prepare($sql);

if ($stmt) {
    if ($stmt->execute()) {
        $data = array('status' => 'sucesso');
    } else {
        $data = array('status' => 'erro', 'mensagem' => $stmt->error);
    }

    $stmt->close();
} else {
    $data = array('status' => 'erro', 'mensagem' => $con->error);
}

header('Content-type: application/json');
echo json_encode($data);

$con->close();

?>